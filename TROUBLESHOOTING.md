# Troubleshooting Guide

## "Failed to create checkout session" Error

This error occurs when the Stripe Checkout Session cannot be created. Follow these steps to diagnose and fix:

### Step 1: Check if API Endpoint Exists

The error is likely because the API endpoint `/api/create-checkout-session` doesn't exist in your local development environment.

**Quick Check:**
```bash
# Check if the api folder exists
ls -la api/
```

If you see the `create-checkout-session.ts` file, the endpoint exists but isn't being served locally.

### Step 2: Choose Your Development Approach

You have two options:

#### Option A: Deploy to Vercel (Recommended)

The API endpoint is a serverless function that only works on Vercel. Deploy your app:

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts to deploy
```

After deploying, test the checkout on your Vercel URL.

#### Option B: Mock the API for Local Development

For local testing without deploying, update the checkout to skip Stripe temporarily:

1. Open `src/components/Checkout.js`
2. Find the `handleCompletePurchase` function
3. Add a local development check

### Step 3: Check Browser Console

Open your browser's Developer Tools (F12) and check the Console and Network tabs:

**Console Tab:**
- Look for error messages
- Check if the fetch request is being made

**Network Tab:**
- Look for a POST request to `/api/create-checkout-session`
- Check the status code (404 means endpoint not found)
- View the response body for error details

### Step 4: Verify Environment Variables (for Vercel)

If you've deployed to Vercel, ensure environment variables are set:

1. Go to your Vercel project dashboard
2. Click Settings → Environment Variables
3. Verify `STRIPE_SECRET_KEY` is set
4. Redeploy if you just added it

## Common Issues and Solutions

### Issue: 404 Not Found

**Problem:** API endpoint doesn't exist or isn't accessible

**Solution:**
- Deploy to Vercel (the API only works on Vercel, not locally with `npm start`)
- OR use Vercel CLI locally: `vercel dev` instead of `npm start`

### Issue: 500 Internal Server Error

**Problem:** API exists but crashed

**Solutions:**
1. Check `STRIPE_SECRET_KEY` is set in Vercel
2. Check Stripe Price IDs in `productConfig.js` are correct
3. Check Vercel function logs for detailed error

### Issue: CORS Error

**Problem:** Cross-origin request blocked

**Solution:** 
- Should not happen if using same domain
- Ensure you're testing on the deployed Vercel URL, not mixing localhost with Vercel API

### Issue: Network Error / Failed to Fetch

**Problem:** Cannot reach the API endpoint

**Solutions:**
1. Check internet connection
2. Verify URL is correct
3. Check if Vercel deployment is working

## Testing Locally with Vercel Dev

To test the API locally:

```bash
# Install Vercel CLI globally
npm install -g vercel

# Run local Vercel development server
vercel dev

# This will:
# - Start your React app
# - Serve API functions at /api/*
# - Simulate Vercel environment
```

Then open `http://localhost:3000` and test checkout.

## Quick Fix: Add Development Mode

Update `src/components/Checkout.js` to handle local development:

```javascript
const handleCompletePurchase = async () => {
  if (!isValidProduct || !product) {
    setSubmitError(validationError || 'Invalid product. Please select a valid product to continue.');
    return;
  }
  
  setIsSubmitting(true);
  setSubmitError('');

  try {
    // Check if running locally (development mode)
    const isDevelopment = window.location.hostname === 'localhost';
    
    if (isDevelopment && !window.location.port === '3000') {
      // In local development without Vercel, skip Stripe and go straight to intake
      console.warn('Skipping Stripe in local development mode');
      setIsAuthenticated(true);
      const productType = productTypeParam || selectedPlan;
      navigate(`/intake?product=${productType}`);
      return;
    }

    // Get Stripe price ID and billing type from productConfig
    const stripePriceId = product.stripePriceId;
    const billingType = product.billingType;

    if (!stripePriceId) {
      throw new Error('Stripe price ID not found for this product. Please contact support.');
    }

    // ... rest of existing code
  } catch (error) {
    console.error('Error submitting checkout:', error);
    setSubmitError(
      error.message || 'An error occurred while processing your order. Please try again.'
    );
    setIsSubmitting(false);
  }
};
```

## Debugging Checklist

- [ ] API file exists at `api/create-checkout-session.ts`
- [ ] Using Vercel (deployed or `vercel dev`) not just `npm start`
- [ ] Environment variable `STRIPE_SECRET_KEY` is set in Vercel
- [ ] Browser console shows no CORS errors
- [ ] Network tab shows the API request
- [ ] Stripe Price IDs in productConfig match your Stripe account
- [ ] Using correct Stripe mode (test keys for testing)

## Getting More Information

To see the exact error, update `Checkout.js` to log more details:

```javascript
} catch (error) {
  console.error('Error submitting checkout:', error);
  console.error('Error details:', {
    message: error.message,
    stack: error.stack,
    response: error.response,
  });
  setSubmitError(
    error.message || 'An error occurred while processing your order. Please try again.'
  );
  setIsSubmitting(false);
}
```

Then check the browser console for detailed error information.

## Still Having Issues?

If none of these solutions work:

1. Check the browser console for the exact error message
2. Check Vercel function logs (if deployed)
3. Verify Stripe Dashboard → Developers → API Keys
4. Test the API endpoint directly with curl or Postman

