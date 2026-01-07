# Deployment Guide

This guide covers deploying Myers Endurance Coaching to Vercel with Stripe integration.

## Prerequisites

- Vercel account
- Stripe account
- GitHub repository (optional but recommended)

## Environment Variables

Set these environment variables in your Vercel project:

### Required for Frontend (REACT_APP_ prefix)
```
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Required for API Functions
```
STRIPE_SECRET_KEY=sk_test_... (or sk_live_... for production)
```

## Setup Instructions

### 1. Install Vercel CLI (Optional)

```bash
npm install -g vercel
```

### 2. Deploy to Vercel

#### Option A: Using Vercel CLI

```bash
# Login to Vercel
vercel login

# Deploy
vercel

# Set environment variables
vercel env add STRIPE_SECRET_KEY
vercel env add REACT_APP_SUPABASE_URL
vercel env add REACT_APP_SUPABASE_ANON_KEY
```

#### Option B: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository
4. Configure project:
   - Framework Preset: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`
5. Add environment variables in Settings → Environment Variables
6. Deploy

### 3. Verify API Endpoint

After deployment, your API will be available at:
```
https://your-project.vercel.app/api/create-checkout-session
```

Test with:
```bash
curl -X POST https://your-project.vercel.app/api/create-checkout-session \
  -H "Content-Type: application/json" \
  -d '{
    "priceId": "price_1Sn14bE7DJ6MCdebeEctjoMC",
    "billingType": "recurring",
    "productType": "level_1"
  }'
```

## Project Structure

```
myersendurancecoaching/
├── api/                          # Vercel serverless functions
│   └── create-checkout-session.ts
├── src/                          # React frontend
│   ├── components/
│   ├── config/
│   │   ├── productConfig.js      # Stripe Price IDs
│   │   └── productFeatures.js
│   ├── lib/
│   │   └── productValidation.js
│   └── ...
├── vercel.json                   # Vercel configuration
├── tsconfig.json                 # TypeScript config for API
└── package.json
```

## Stripe Configuration

### Product IDs in productConfig.js

All Stripe Price IDs are centralized in `src/config/productConfig.js`:
- Level 1 (Bronze): `price_1Sn14bE7DJ6MCdebeEctjoMC`
- Level 2 (Silver): `price_1Sn15zE7DJ6MCdebmYntiIuy`
- Level 3 (Gold): `price_1Sn16LE7DJ6MCdebeahobebl`
- Strength Add-on: `price_1Sn18dE7DJ6MCdeb1pJJCrOM`
- Race Strategy: `price_1Sn19AE7DJ6MCdebO7yEEHfQ`
- PDF Plans: See productConfig.js

### Webhook Setup (Recommended)

1. In Stripe Dashboard, go to Developers → Webhooks
2. Add endpoint: `https://your-project.vercel.app/api/stripe-webhook`
3. Select events:
   - `checkout.session.completed`
   - `invoice.paid`
   - `customer.subscription.deleted`
4. Copy webhook signing secret
5. Add to Vercel environment variables: `STRIPE_WEBHOOK_SECRET`

## Testing

### Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm start

# Test API locally (requires Vercel CLI)
vercel dev
```

### Test Cards (Test Mode)

- Success: 4242 4242 4242 4242
- Decline: 4000 0000 0000 0002
- 3D Secure: 4000 0027 6000 3184

## Troubleshooting

### API Returns 500 Error
- Check `STRIPE_SECRET_KEY` is set in Vercel environment variables
- Verify Stripe Price IDs in productConfig.js match your Stripe account

### CORS Errors
- The API endpoint uses the same domain as frontend (no CORS issues)
- If using custom domain, ensure it's configured in Vercel

### Payment Not Processing
- Check Stripe Dashboard → Logs for API errors
- Verify webhook endpoints are receiving events
- Ensure test mode is enabled for test keys

## Security Checklist

- [ ] Use test keys for development/staging
- [ ] Use live keys only in production
- [ ] Never commit `.env` files to git
- [ ] Enable webhook signature verification
- [ ] Set up proper RLS policies in Supabase
- [ ] Monitor Stripe Dashboard for unusual activity

## Monitoring

- **Vercel Logs**: View function logs in Vercel dashboard
- **Stripe Dashboard**: Monitor payments, refunds, subscriptions
- **Supabase**: Check database records in Supabase dashboard

## Support

For issues:
1. Check Vercel function logs
2. Check Stripe Dashboard logs
3. Review environment variables
4. Consult README_STRIPE.md for detailed API documentation

