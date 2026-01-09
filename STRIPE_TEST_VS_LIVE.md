# Stripe Test vs Live Mode Guide

## The Problem You're Seeing

```
No such price: 'price_1Sn11xE7DJ6MCdeb8bIQy2Cu'; 
a similar object exists in live mode, but a test mode key was used to make this request.
```

This means:
- ❌ You're using **test mode Stripe keys** (`pk_test_...` / `sk_test_...`)
- ❌ But your `productConfig.js` has **live mode price IDs**

**Stripe keeps test and live data completely separate!**

## Two Solutions

### Option 1: Keep Using Test Mode (Recommended for Testing)

Use this if you want to test with test credit cards in production.

#### Step 1: Create Test Mode Products in Stripe

1. Go to https://dashboard.stripe.com/test/products
2. Toggle **"Test mode"** ON (top-right corner)
3. Create all your products and prices:

**Coaching Plans (Recurring):**
- Bronze - Essential Coaching: $99/month
- Silver - Premium Coaching: $179/month
- Gold - Elite Virtual 1-on-1: $299/month

**Add-ons:**
- Strength Training Program: $49/month (recurring)
- Race Strategy Consultation: $99 (one-time)

**PDF Plans (One-time):**
- 5K Training Plan: $29
- 10K Training Plan: $29
- Half Marathon Plan: $39
- Marathon Plan: $49

#### Step 2: Copy Test Mode Price IDs

After creating each product, click on it and copy the **Price ID** (starts with `price_`).

Example:
```
Test Mode Price ID: price_1AbcDefGHIJ...
```

#### Step 3A: Manual Update (Simple)

Replace the price IDs in your current `src/config/productConfig.js`:

```javascript
export const productConfig = {
  level_1: {
    // ...
    stripePriceId: 'price_YOUR_TEST_PRICE_ID_HERE', // ← Replace
  },
  // ... do this for all products
};
```

#### Step 3B: Auto-Detect (Advanced)

Or use the auto-detecting config I created:

1. Update test mode price IDs in `src/config/productConfig.auto.js`
2. Rename files:
   ```bash
   mv src/config/productConfig.js src/config/productConfig.live.js
   mv src/config/productConfig.auto.js src/config/productConfig.js
   ```
3. Update the test price IDs in the new file

This will automatically use test prices when you use `pk_test_` keys!

#### Step 4: Test with Test Cards

Now you can use test credit cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Any future expiry, any CVC

### Option 2: Switch to Live Mode

Use this if you're ready to accept real payments.

⚠️ **WARNING:** You cannot use test credit cards in live mode!

#### Step 1: Get Live Mode Stripe Keys

1. Go to https://dashboard.stripe.com
2. Toggle **"Test mode"** OFF (top-right)
3. Go to Developers → API keys
4. Copy:
   - **Publishable key** (starts with `pk_live_...`)
   - **Secret key** (starts with `sk_live_...`)

#### Step 2: Update Vercel Environment Variables

```bash
# Update publishable key for production
echo "pk_live_YOUR_KEY" | vercel env add REACT_APP_STRIPE_PUBLISHABLE_KEY production --force

# Update secret key for production
echo "sk_live_YOUR_KEY" | vercel env add STRIPE_SECRET_KEY production --force
```

#### Step 3: Get Live Webhook Secret

1. Go to https://dashboard.stripe.com/webhooks (live mode)
2. Add endpoint: `https://your-domain.vercel.app/api/stripe-webhook`
3. Select events
4. Copy the webhook secret (`whsec_...`)

```bash
# Update webhook secret
echo "whsec_YOUR_LIVE_SECRET" | vercel env add STRIPE_WEBHOOK_SECRET production --force
```

#### Step 4: Deploy

```bash
vercel --prod
```

Your live mode price IDs (already in `productConfig.js`) will now work!

## Recommended Approach

**For Development & Testing:**
```
Environment: Development/Staging
Stripe Keys: pk_test_... / sk_test_...
Price IDs: Test mode prices
Credit Cards: Test cards (4242...)
```

**For Production:**
```
Environment: Production
Stripe Keys: pk_live_... / sk_live_...
Price IDs: Live mode prices
Credit Cards: Real credit cards only
```

## Quick Fix Right Now

If you just want to test right now with test cards:

1. Create ONE test product in Stripe test mode
2. Copy its price ID
3. Temporarily update ONE product in `productConfig.js`:
   ```javascript
   pdf_5k: {
     // ...
     stripePriceId: 'price_YOUR_TEST_PRICE_ID',
   },
   ```
4. Test checkout with that product
5. Use test card: `4242 4242 4242 4242`

## Environment Variables Checklist

### Test Mode Setup
```bash
# Local (.env.local)
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Vercel
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_...  (production)
STRIPE_SECRET_KEY=sk_test_...                  (production)
STRIPE_WEBHOOK_SECRET=whsec_test_...           (production)
```

### Live Mode Setup
```bash
# Local (.env.local) - keep test mode for local dev
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Vercel Production - use live mode
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_live_...  (production)
STRIPE_SECRET_KEY=sk_live_...                  (production)
STRIPE_WEBHOOK_SECRET=whsec_live_...           (production)
```

## Testing Checklist

### Before Going Live
- [ ] Create all test mode products and prices
- [ ] Update productConfig with test price IDs
- [ ] Test complete checkout flow with test card
- [ ] Verify webhook updates Supabase correctly
- [ ] Test both one-time and recurring payments
- [ ] Test subscription cancellation
- [ ] Verify email notifications work

### When Ready for Real Payments
- [ ] Get live mode Stripe keys
- [ ] Update Vercel environment variables
- [ ] Create live mode webhook endpoint
- [ ] Update productConfig with live price IDs
- [ ] Test with a small real payment
- [ ] Monitor Stripe dashboard and logs

## Need Help?

If you're still seeing errors:
1. Check which Stripe keys you're using in Vercel
2. Verify the price IDs exist in the same mode (test or live)
3. Check Vercel logs: `vercel logs --follow`
4. Check Stripe Dashboard → Events for details

