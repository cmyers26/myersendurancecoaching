import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-18.acacia',
});

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
    // Validate Stripe secret key
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('STRIPE_SECRET_KEY environment variable is not set');
      return res.status(500).json({
        error: 'Configuration error',
        message: 'Payment processing is not configured. Please contact support.'
      });
    }

    // Extract request body parameters
    const { 
      priceId, 
      billingType, 
      productType, 
      customerEmail,
      successUrl,
      cancelUrl 
    } = req.body;

    // Validate required parameters
    if (!priceId) {
      return res.status(400).json({
        error: 'Missing parameter',
        message: 'priceId is required'
      });
    }

    if (!billingType || !['recurring', 'one_time'].includes(billingType)) {
      return res.status(400).json({
        error: 'Invalid parameter',
        message: 'billingType must be either "recurring" or "one_time"'
      });
    }

    // Determine Stripe checkout mode based on billing type
    const mode: Stripe.Checkout.SessionCreateParams.Mode = 
      billingType === 'recurring' ? 'subscription' : 'payment';

    // Create Stripe Checkout Session
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl || `${req.headers.origin || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${req.headers.origin || 'http://localhost:3000'}/pricing`,
      metadata: {
        productType: productType || '',
      },
    };

    // Add customer email if provided
    if (customerEmail) {
      sessionParams.customer_email = customerEmail;
    }

    // Add specific settings for subscription mode
    if (mode === 'subscription') {
      sessionParams.subscription_data = {
        metadata: {
          productType: productType || '',
        },
      };
    }

    // Create the checkout session
    const session = await stripe.checkout.sessions.create(sessionParams);

    // Return the session details
    return res.status(200).json({
      sessionId: session.id,
      url: session.url,
    });

  } catch (error: any) {
    console.error('Error creating Stripe checkout session:', error);

    // Handle Stripe-specific errors
    if (error.type === 'StripeInvalidRequestError') {
      return res.status(400).json({
        error: 'Invalid request',
        message: error.message || 'Invalid request to Stripe'
      });
    }

    // Handle authentication errors
    if (error.type === 'StripeAuthenticationError') {
      return res.status(500).json({
        error: 'Configuration error',
        message: 'Payment processing authentication failed. Please contact support.'
      });
    }

    // Generic error response
    return res.status(500).json({
      error: 'Internal server error',
      message: 'An error occurred while creating the checkout session. Please try again.'
    });
  }
}

