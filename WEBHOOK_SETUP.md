# Stripe Webhook Setup Guide

## Overview
The Stripe webhook handler (`/api/stripe-webhook`) automatically updates your Supabase database when payments are completed, subscriptions are updated, or other payment events occur.

## What It Does

The webhook handler:
- ✅ Verifies Stripe webhook signatures for security
- ✅ Handles checkout session completion
- ✅ Updates order records in Supabase
- ✅ Creates/updates user records
- ✅ Tracks subscription status changes
- ✅ Handles subscription cancellations

## Prerequisites

1. Deployed Vercel project
2. Stripe account with webhook secret
3. Supabase project with service role key

## Setup Instructions

### 1. Add Supabase Service Role Key to Vercel

The webhook needs the **service role key** (not the anon key) to bypass RLS policies:

```bash
# Add Supabase URL (if not already added)
vercel env add SUPABASE_URL production
# Enter: https://your-project.supabase.co
# 

# Add Supabase Service Role Key (important!)
vercel env add SUPABASE_SERVICE_ROLE_KEY production
# Enter: your_service_role_key (starts with eyJ...)
```

**Where to find the service role key (DETAILED STEPS):**

1. Go to https://app.supabase.com
2. Select your project
3. In the left sidebar, click the **Settings** icon (⚠️ gear icon at the bottom)
4. Under "Project Settings", click **API**
5. Scroll down to the "Project API keys" section
6. You'll see two keys:
   - `anon` `public` - This is your public/anon key (safe for frontend)
   - `service_role` `secret` - This is what you need! (⚠️ Keep this secret!)
7. Click the **eye icon** next to `service_role` to reveal it
8. Click the **copy icon** to copy the key
9. It should start with `eyJ...` and be very long

**⚠️ IMPORTANT:** 
- The service_role key bypasses Row Level Security (RLS)
- NEVER expose this key in frontend code
- Only use it in secure backend environments (like Vercel serverless functions)

### 2. Deploy Your Webhook to Vercel

```bash
vercel --prod
```

After deployment, your webhook will be available at:
```
https://your-domain.vercel.app/api/stripe-webhook
```

### 3. Get Your Webhook Secret from Stripe

#### Option A: Create Webhook in Stripe Dashboard

1. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
2. Click **"Add endpoint"**
3. Enter your webhook URL:
   ```
   https://your-domain.vercel.app/api/stripe-webhook
   ```
4. Select events to listen to:
   - ✅ `checkout.session.completed`
   - ✅ `payment_intent.succeeded`
   - ✅ `invoice.payment_succeeded`
   - ✅ `customer.subscription.created`
   - ✅ `customer.subscription.updated`
   - ✅ `customer.subscription.deleted`
5. Click **"Add endpoint"**
6. Click on the newly created endpoint
7. Click **"Reveal"** under "Signing secret"
8. Copy the webhook secret (starts with `whsec_`)

#### Option B: Use Stripe CLI for Local Testing

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login to Stripe
stripe login

# Forward webhooks to local development
stripe listen --forward-to http://localhost:3000/api/stripe-webhook

# This will output a webhook secret like: whsec_xxx
```

### 4. Add Webhook Secret to Vercel

```bash
# Add to production
echo "whsec_your_webhook_secret" | vercel env add STRIPE_WEBHOOK_SECRET production

# Add to preview (optional)
echo "whsec_your_webhook_secret" | vercel env add STRIPE_WEBHOOK_SECRET preview

# Add to development (optional, use different secret from Stripe CLI)
echo "whsec_your_dev_secret" | vercel env add STRIPE_WEBHOOK_SECRET development
```

### 5. Redeploy with New Environment Variable

```bash
vercel --prod
```

## Testing the Webhook

### Test in Stripe Dashboard

1. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
2. Click on your webhook endpoint
3. Click the **"Send test webhook"** button
4. Select `checkout.session.completed`
5. Click **"Send test webhook"**
6. Check the "Response" tab to see if it succeeded (200 status)

### Test with Stripe CLI

```bash
# Trigger a test checkout.session.completed event
stripe trigger checkout.session.completed
```

### Test with Real Payment

1. Go to your site and select a product
2. Complete checkout with a test card: `4242 4242 4242 4242`
3. After payment, check:
   - Stripe Dashboard → Events (should show `checkout.session.completed`)
   - Your Supabase `orders` table (should show completed order)
   - Your Supabase `users` table (should show user record)

## Monitoring Webhooks

### View Webhook Logs in Stripe

1. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
2. Click on your endpoint
3. View the "Events" tab to see all webhook attempts
4. Click on individual events to see request/response details

### View Logs in Vercel

```bash
# View real-time logs
vercel logs --follow

# Or visit the Vercel Dashboard → Your Project → Functions → stripe-webhook
```

## Events Handled

| Event | What It Does |
|-------|-------------|
| `checkout.session.completed` | Creates/updates order, creates/updates user record |
| `payment_intent.succeeded` | Logs successful one-time payment |
| `invoice.payment_succeeded` | Logs successful subscription payment |
| `customer.subscription.created` | Updates order with subscription info |
| `customer.subscription.updated` | Updates order status based on subscription |
| `customer.subscription.deleted` | Marks order as cancelled |

## Database Updates

### Orders Table
When payment succeeds, the webhook updates:
- `status` → `'completed'`
- `stripe_session_id` → Session ID
- `stripe_customer_id` → Customer ID
- `stripe_subscription_id` → Subscription ID (if recurring)
- `stripe_payment_intent_id` → Payment Intent ID
- `amount_total` → Total amount paid
- `currency` → Currency code
- `customer_email` → Customer email
- `updated_at` → Timestamp

### Users Table
The webhook also creates or updates the user record:
- `email` → Customer email
- `product_type` → Product purchased
- `stripe_customer_id` → Stripe customer ID

## Security

### Signature Verification
Every webhook request is verified using Stripe's signature to ensure:
- The request came from Stripe
- The payload hasn't been tampered with
- The request isn't a replay attack

### Service Role Key
The webhook uses the Supabase service role key to bypass RLS policies. This is necessary because:
- Webhooks don't have a user session
- The webhook needs to create/update records on behalf of the system
- ⚠️ Keep this key secret and only use it server-side

## Troubleshooting

### "Signature verification failed"
- Check that `STRIPE_WEBHOOK_SECRET` is correct in Vercel
- Make sure you're using the correct secret for your environment (test vs. live)
- Verify the endpoint URL in Stripe matches your Vercel deployment

### "Database is not configured"
- Check that `SUPABASE_URL` is set in Vercel
- Check that `SUPABASE_SERVICE_ROLE_KEY` is set in Vercel
- Make sure you're using the service role key, not the anon key

### Orders not updating
- Check Vercel function logs for errors
- Verify the `orders` table exists in Supabase
- Check that the table structure matches the webhook code
- Verify RLS policies allow service role to insert/update

### Webhook timing out
- Vercel functions have a 10-second timeout on Hobby plan
- Check for slow database queries
- Consider making non-critical updates asynchronous

## Environment Variables Summary

| Variable | Where to Get It | Used By |
|----------|----------------|---------|
| `STRIPE_SECRET_KEY` | Stripe Dashboard → API Keys | API + Webhook |
| `STRIPE_WEBHOOK_SECRET` | Stripe Dashboard → Webhooks | Webhook only |
| `SUPABASE_URL` | Supabase Dashboard → API | API + Webhook |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard → API → service_role | Webhook only |

## Next Steps

After setting up the webhook:
1. ✅ Test with a real payment using test mode
2. ✅ Monitor webhook events in Stripe Dashboard
3. ✅ Check Supabase tables for updated records
4. ✅ When ready for production, update to live Stripe keys
5. ✅ Create a new webhook endpoint for live mode with live webhook secret

## Support Resources
- [Stripe Webhooks Documentation](https://stripe.com/docs/webhooks)
- [Stripe CLI Documentation](https://stripe.com/docs/stripe-cli)
- [Supabase Service Role Key](https://supabase.com/docs/guides/api/api-keys)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

