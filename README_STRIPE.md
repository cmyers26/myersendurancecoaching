# Stripe Integration Setup

This document explains how to set up and use the Stripe integration for Myers Endurance Coaching.

## Prerequisites

- Stripe account (test or live)
- Vercel account for deployment
- Node.js and npm installed

## Installation

Dependencies are already installed:
- `stripe` - Stripe Node.js SDK
- `@vercel/node` - Vercel serverless function types

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here

# Supabase Configuration (already configured)
REACT_APP_SUPABASE_URL=your_supabase_url_here
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### For Vercel Deployment

Add the `STRIPE_SECRET_KEY` environment variable in your Vercel project settings:

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add `STRIPE_SECRET_KEY` with your Stripe secret key
4. Select the appropriate environments (Production, Preview, Development)

## API Endpoint

### POST `/api/create-checkout-session`

Creates a Stripe Checkout Session for processing payments.

#### Request Body

```json
{
  "priceId": "price_1Sn14bE7DJ6MCdebeEctjoMC",
  "billingType": "recurring",
  "productType": "level_1",
  "customerEmail": "customer@example.com",
  "successUrl": "https://yourdomain.com/intake?product=level1",
  "cancelUrl": "https://yourdomain.com/checkout?product=level1"
}
```

#### Parameters

- `priceId` (required): Stripe Price ID from productConfig
- `billingType` (required): Either "recurring" or "one_time"
- `productType` (optional): Product type for metadata
- `customerEmail` (optional): Pre-fill customer email
- `successUrl` (optional): URL to redirect after successful payment
- `cancelUrl` (optional): URL to redirect if payment is cancelled

#### Response

Success (200):
```json
{
  "sessionId": "cs_test_...",
  "url": "https://checkout.stripe.com/..."
}
```

Error (400/500):
```json
{
  "error": "Error type",
  "message": "Error description"
}
```

## Testing

### Test Mode

Use Stripe test keys (starting with `sk_test_`) and test cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`

### Testing the Endpoint Locally

1. Install Vercel CLI: `npm install -g vercel`
2. Run locally: `vercel dev`
3. Test the endpoint at `http://localhost:3000/api/create-checkout-session`

## Webhook Setup (Future)

To handle payment confirmations, set up a Stripe webhook:

1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://yourdomain.com/api/stripe-webhook`
3. Select events: `checkout.session.completed`, `invoice.paid`, `customer.subscription.deleted`
4. Add webhook secret to environment variables

## Security Notes

- Never commit `.env` files to git
- Use test keys for development
- Rotate keys if compromised
- Validate all inputs server-side
- Use HTTPS in production

## Product Configuration

All Stripe Price IDs are centralized in `src/config/productConfig.js`. Update price IDs there when creating or modifying products in Stripe.

