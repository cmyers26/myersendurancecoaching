import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { sendOwnerNotificationEmail } from './lib/email';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-12-15.clover',
});

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

// Webhook secret for signature verification
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper function to read raw body
async function getRawBody(req: VercelRequest): Promise<Buffer> {
  const chunks: Buffer[] = [];
  return new Promise((resolve, reject) => {
    req.on('data', (chunk: Buffer) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
      message: 'Only POST requests are allowed'
    });
  }

  try {
    // Validate environment variables
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('STRIPE_SECRET_KEY is not set');
      return res.status(500).json({
        error: 'Configuration error',
        message: 'Stripe is not configured'
      });
    }

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      console.error('STRIPE_WEBHOOK_SECRET is not set');
      return res.status(500).json({
        error: 'Configuration error',
        message: 'Webhook secret is not configured'
      });
    }

    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('Supabase credentials are not set');
      return res.status(500).json({
        error: 'Configuration error',
        message: 'Database is not configured'
      });
    }

    // Get raw body and signature
    const rawBody = await getRawBody(req);
    const signature = req.headers['stripe-signature'];

    if (!signature) {
      console.error('No Stripe signature found in headers');
      return res.status(400).json({
        error: 'Bad request',
        message: 'Missing Stripe signature'
      });
    }

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        webhookSecret
      );
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return res.status(400).json({
        error: 'Signature verification failed',
        message: err.message
      });
    }

    console.log('Webhook event received:', event.type);

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionCompleted(session);
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('Payment intent succeeded:', paymentIntent.id);
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        console.log('Invoice payment succeeded:', invoice.id);
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdate(subscription);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionCancellation(subscription);
        break;
      }

      default:
        console.log('Unhandled event type:', event.type);
    }

    // Return success response
    return res.status(200).json({ received: true });

  } catch (error: any) {
    console.error('Webhook handler error:', error);
    console.error('Error stack:', error.stack);
    console.error('Error details:', JSON.stringify(error, null, 2));
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message || 'An error occurred processing the webhook',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}

// Handle successful checkout session
async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session
) {
  try {
    console.log('Processing checkout session:', session.id);

    const productType = session.metadata?.productType || '';
    const customerEmail = session.customer_details?.email || session.customer_email || '';
    const customerId = session.customer as string;
    const subscriptionId = session.subscription as string;
    const paymentIntentId = session.payment_intent as string;

    // Update or create order record
    const { data: existingOrder, error: fetchError } = await supabase
      .from('orders')
      .select('*')
      .eq('stripe_session_id', session.id)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error fetching order:', fetchError);
      throw fetchError;
    }

    const orderData = {
      product_type: productType,
      status: 'completed',
      stripe_session_id: session.id,
      stripe_customer_id: customerId || null,
      stripe_subscription_id: subscriptionId || null,
      stripe_payment_intent_id: paymentIntentId || null,
      amount_total: session.amount_total,
      currency: session.currency,
      customer_email: customerEmail,
      updated_at: new Date().toISOString(),
    };

    if (existingOrder) {
      // Update existing order
      const { error: updateError } = await supabase
        .from('orders')
        .update(orderData)
        .eq('id', existingOrder.id);

      if (updateError) {
        console.error('Error updating order:', updateError);
        throw updateError;
      }

      console.log('Order updated successfully:', existingOrder.id);
    } else {
      // Create new order
      const { error: insertError } = await supabase
        .from('orders')
        .insert([{
          ...orderData,
          created_at: new Date().toISOString(),
        }]);

      if (insertError) {
        console.error('Error creating order:', insertError);
        throw insertError;
      }

      console.log('Order created successfully');
    }

    // Update or create user record
    if (customerEmail) {
      const { data: existingUser, error: userFetchError } = await supabase
        .from('users')
        .select('*')
        .eq('email', customerEmail)
        .single();

      if (userFetchError && userFetchError.code !== 'PGRST116') {
        console.error('Error fetching user:', userFetchError);
      }

      if (existingUser) {
        // Update existing user
        const { error: userUpdateError } = await supabase
          .from('users')
          .update({
            product_type: productType,
            stripe_customer_id: customerId || null,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingUser.id);

        if (userUpdateError) {
          console.error('Error updating user:', userUpdateError);
        } else {
          console.log('User updated successfully:', existingUser.id);
        }
      } else {
        // Create new user
        const { error: userInsertError } = await supabase
          .from('users')
          .insert([{
            email: customerEmail,
            product_type: productType,
            stripe_customer_id: customerId || null,
            intake_complete: false,
            created_at: new Date().toISOString(),
          }]);

        if (userInsertError) {
          console.error('Error creating user:', userInsertError);
        } else {
          console.log('User created successfully');
        }
      }
    }

    // Send owner notification email
    try {
      console.log('Attempting to send owner notification email...');
      
      // Extract data for email
      const customerEmail = session.customer_details?.email || session.customer_email || 'unknown@example.com';
      const productType = session.metadata?.productType || 'unknown';
      const amountTotal = session.amount_total || 0;

      // Send notification
      const emailResult = await sendOwnerNotificationEmail(
        customerEmail,
        productType,
        amountTotal
      );

      if (emailResult.success) {
        console.log('Owner notification email sent successfully');
      } else {
        console.error('Failed to send owner notification email:', emailResult.error);
      }
    } catch (emailError: any) {
      // Log error but don't throw - we don't want email failures to break the webhook
      console.error('Error sending owner notification email:', emailError);
      console.error('Email error details:', {
        message: emailError?.message,
        stack: emailError?.stack
      });
      // Continue processing - email failure should not fail the webhook
    }

  } catch (error: any) {
    console.error('Error handling checkout session:', error);
    console.error('Checkout session error details:', {
      sessionId: session?.id,
      errorMessage: error?.message,
      errorCode: error?.code,
      errorStack: error?.stack
    });
    throw error;
  }
}

// Handle subscription updates
async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  try {
    console.log('Processing subscription update:', subscription.id);

    const customerId = subscription.customer as string;
    const productType = subscription.metadata?.productType || '';

    // Update order with subscription ID
    const { error: updateError } = await supabase
      .from('orders')
      .update({
        stripe_subscription_id: subscription.id,
        status: subscription.status === 'active' ? 'completed' : 'pending',
        updated_at: new Date().toISOString(),
      })
      .eq('stripe_customer_id', customerId)
      .eq('product_type', productType);

    if (updateError) {
      console.error('Error updating order for subscription:', updateError);
    } else {
      console.log('Order updated with subscription info');
    }

  } catch (error) {
    console.error('Error handling subscription update:', error);
  }
}

// Handle subscription cancellation
async function handleSubscriptionCancellation(subscription: Stripe.Subscription) {
  try {
    console.log('Processing subscription cancellation:', subscription.id);

    // Update order status
    const { error: updateError } = await supabase
      .from('orders')
      .update({
        status: 'cancelled',
        updated_at: new Date().toISOString(),
      })
      .eq('stripe_subscription_id', subscription.id);

    if (updateError) {
      console.error('Error updating order for cancellation:', updateError);
    } else {
      console.log('Order marked as cancelled');
    }

  } catch (error) {
    console.error('Error handling subscription cancellation:', error);
  }
}

