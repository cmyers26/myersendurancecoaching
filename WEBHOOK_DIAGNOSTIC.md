# Webhook Diagnostic Guide

## Issue: Payment successful in Stripe, but no order in Supabase

This means the webhook is either:
1. Not configured in Stripe
2. Not receiving events
3. Failing silently

## Step 1: Check if Webhook Endpoint Exists in Stripe

### Go to Stripe Dashboard
1. Visit https://dashboard.stripe.com/test/webhooks (for test mode)
2. Look for your webhook endpoint

**Should see:**
```
https://your-domain.vercel.app/api/stripe-webhook
Status: Active
Events: Multiple events listed
```

**If you DON'T see this:**
- The webhook was never created
- Follow setup steps below ⬇️

## Step 2: Check Recent Webhook Events

In Stripe Dashboard → Webhooks → Your Endpoint:

### Look for:
- `checkout.session.completed` events
- Check the "Response" column - should show `200` (success)

### If Response shows 4xx or 5xx:
- Click on the failed event
- Look at the "Response body" - will show the error
- Common errors:
  - `401/403`: Wrong webhook secret
  - `500`: Server error (check logs)
  - `404`: Webhook endpoint not deployed

## Step 3: Check Vercel Function Logs

```bash
# View real-time logs
vercel logs --follow

# Or filter for webhook function
vercel logs stripe-webhook
```

### What to look for:
- ✅ `Processing checkout session: cs_test_...`
- ✅ `Order created successfully`
- ❌ Errors about database or permissions

## Step 4: Test the Webhook Manually

### In Stripe Dashboard:
1. Go to Webhooks → Your endpoint
2. Click "Send test webhook"
3. Select `checkout.session.completed`
4. Click "Send test webhook"
5. Check the response

### Expected: 200 OK
### If failed: Look at error details

## Step 5: Check Supabase Orders Table

### Verify table exists:
1. Go to Supabase Dashboard
2. Click "Table Editor"
3. Look for `orders` table

### If table doesn't exist:
You need to create it! See DATABASE_SETUP.md or run:

```sql
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_type TEXT,
  status TEXT DEFAULT 'pending',
  stripe_session_id TEXT UNIQUE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  stripe_payment_intent_id TEXT,
  amount_total BIGINT,
  currency TEXT,
  customer_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Allow service role to do anything (for webhook)
CREATE POLICY "Service role has full access to orders"
  ON public.orders
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Allow users to read their own orders
CREATE POLICY "Users can view their own orders"
  ON public.orders
  FOR SELECT
  USING (customer_email = auth.email());
```

## Step 6: Check RLS Policies

The webhook uses the `service_role` key which bypasses RLS, but let's verify:

### In Supabase:
1. Table Editor → orders → RLS policies
2. Should see policy for `service_role`

### Test query:
```sql
-- Run this in Supabase SQL Editor
SELECT * FROM orders;
```

If it returns results, RLS is working.

## Common Issues & Fixes

### Issue: "Webhook signature verification failed"
**Fix:** Webhook secret doesn't match
```bash
# Get correct secret from Stripe, then update:
echo "whsec_YOUR_SECRET" | vercel env add STRIPE_WEBHOOK_SECRET production --force
vercel --prod
```

### Issue: "Could not find table 'orders'"
**Fix:** Table doesn't exist - run SQL above

### Issue: "RLS policy error"
**Fix:** Service role key not set or incorrect
```bash
vercel env ls  # Check if SUPABASE_SERVICE_ROLE_KEY exists
# If wrong or missing:
echo "YOUR_SERVICE_ROLE_KEY" | vercel env add SUPABASE_SERVICE_ROLE_KEY production --force
vercel --prod
```

### Issue: Webhook returns 200 but no order appears
**Fix:** Check Vercel logs for database errors:
```bash
vercel logs --follow
# Make a test payment and watch the logs
```

## Quick Test

### 1. Check if webhook endpoint is accessible:
```bash
curl https://your-domain.vercel.app/api/stripe-webhook
# Should return: {"error":"Method not allowed","message":"Only POST requests are allowed"}
```

### 2. Send test webhook from Stripe:
- Stripe Dashboard → Webhooks → Send test webhook
- Should create a test order in Supabase

### 3. Check Supabase:
```sql
SELECT * FROM orders ORDER BY created_at DESC LIMIT 5;
```

## Setup Webhook (If Not Done)

### 1. Get your Vercel URL
```bash
vercel --prod  # Note the URL
```

### 2. Create webhook in Stripe
1. https://dashboard.stripe.com/test/webhooks
2. Click "+ Add endpoint"
3. URL: `https://your-domain.vercel.app/api/stripe-webhook`
4. Events to send:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `invoice.payment_succeeded`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Click "Add endpoint"

### 3. Copy webhook secret
- Click on the new endpoint
- Click "Reveal" under "Signing secret"
- Copy the secret (starts with `whsec_`)

### 4. Add to Vercel
```bash
echo "whsec_YOUR_SECRET" | vercel env add STRIPE_WEBHOOK_SECRET production
vercel --prod
```

### 5. Test
Make a test payment and check Supabase!

## Need More Help?

Run these commands and share the output:

```bash
# 1. Check environment variables
vercel env ls

# 2. Check recent deployments
vercel list

# 3. Check function logs
vercel logs stripe-webhook --since 1h

# 4. Test webhook endpoint
curl -X POST https://your-domain.vercel.app/api/stripe-webhook
```

