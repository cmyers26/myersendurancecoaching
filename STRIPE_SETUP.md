# Stripe Checkout Setup Guide

## Overview
The checkout flow now uses Stripe.js for secure client-side redirection to Stripe Checkout.

## Prerequisites
1. Stripe account with publishable and secret keys
2. Vercel account for deploying the API endpoint
3. Products and prices created in Stripe dashboard

## Local Development Setup

### 1. Add Stripe Publishable Key
Create a `.env.local` file in your project root:

```bash
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
```

**Important:** Use your **test** publishable key for development (starts with `pk_test_`)

### 2. Install Dependencies
The required packages are already installed:
- `@stripe/stripe-js` (client-side)
- `stripe` (server-side for API)

### 3. Test Locally with Vercel Dev
To test the full integration locally:

```bash
# Install Vercel CLI (if not already installed)
npm install -g vercel

# Run development server with API functions
vercel dev
```

This will run both your React app and the `/api/create-checkout-session` endpoint.

## Production Deployment

### 1. Deploy to Vercel
```bash
vercel
```

### 2. Set Environment Variables in Vercel

**For the Frontend (React App):**
```bash
vercel env add REACT_APP_STRIPE_PUBLISHABLE_KEY
# Paste your PRODUCTION publishable key (starts with pk_live_)
```

**For the Backend (API):**
```bash
vercel env add STRIPE_SECRET_KEY
# Paste your PRODUCTION secret key (starts with sk_live_)
```

### 3. Redeploy
After adding environment variables, redeploy:
```bash
vercel --prod
```

## How It Works

### Client-Side Flow (Checkout.js)
1. User clicks "Complete Purchase"
2. Validates product and gets `stripePriceId` from `productConfig`
3. Retrieves user email from Supabase auth (if logged in)
4. Calls `/api/create-checkout-session` with:
   - `priceId`
   - `productType`
   - `customerEmail`
   - `billingType`
5. Receives `sessionId` from API
6. Loads Stripe.js library
7. Redirects to Stripe Checkout using `stripe.redirectToCheckout({ sessionId })`
8. Shows loading state during redirect
9. Handles any errors from API or Stripe

### Server-Side Flow (API Endpoint)
1. Receives request with product details
2. Validates required parameters
3. Creates Stripe Checkout Session with appropriate mode (`subscription` or `payment`)
4. Returns `sessionId` and `url` to client

## Testing

### Test Cards
Use these test cards in Stripe's test mode:
- **Success:** `4242 4242 4242 4242`
- **Decline:** `4000 0000 0000 0002`
- Use any future expiry date and any 3-digit CVC

### Test Flow
1. Navigate to pricing page
2. Select a product
3. Click "Get Started" or "Purchase"
4. On checkout page, click "Complete Purchase"
5. Should redirect to Stripe Checkout
6. Enter test card details
7. Complete payment
8. Should redirect back to your success URL

## Error Handling

The checkout handler handles these error scenarios:
- Invalid product type
- Missing Stripe price ID
- API request failures
- Network errors
- Stripe.js loading failures
- Stripe redirect errors

All errors show user-friendly messages in an alert box.

## Security Notes

1. **Never commit `.env` or `.env.local` files**
2. Use test keys for development (`pk_test_`, `sk_test_`)
3. Use live keys only in production (`pk_live_`, `sk_live_`)
4. Keep secret keys secure and never expose them in client-side code
5. The publishable key is safe to expose (it's in your frontend bundle)

## Troubleshooting

### "Stripe failed to load"
- Check that `REACT_APP_STRIPE_PUBLISHABLE_KEY` is set correctly
- Verify you're using the correct key format (`pk_test_` or `pk_live_`)
- Check browser console for network errors

### "Failed to create checkout session"
- Ensure Vercel API endpoint is deployed
- Check `STRIPE_SECRET_KEY` is set in Vercel environment variables
- Check Vercel function logs for detailed errors
- Verify the `priceId` exists in your Stripe dashboard

### "No session ID returned"
- Check API response in Network tab
- Verify API is returning `sessionId` field
- Check for CORS issues (should not occur with Vercel)

### Local development not working
- Use `vercel dev` instead of `npm start` to test full integration
- API functions only work with Vercel CLI or when deployed

## Support Resources
- [Stripe Checkout Documentation](https://stripe.com/docs/payments/checkout)
- [Stripe.js Reference](https://stripe.com/docs/js)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

