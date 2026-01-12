# Security Guide

## 🔐 Keeping Your Secrets Safe

### ✅ What's Already Protected

Your `.gitignore` already includes:
- `.env`
- `.env.local`
- `.env.development.local`
- `.env.test.local`
- `.env.production.local`

These files will **never** be committed to GitHub.

---

## 🚨 Current Security Issues

### 1. Stripe Price IDs in Code

**Files that contain Price IDs:**
- `src/config/productConfig.js`
- `src/config/productConfig.test.js`
- `src/config/productConfig.live.js`

**Risk Level:** 🟡 Low-Medium
- Price IDs (like `price_1SnNf3E7DJ6MCdebunBqKGPV`) are **not secret keys**
- They're safe to expose publicly (they're visible in Stripe Checkout URLs)
- However, it's best practice to keep them in environment variables

**Action:** You can leave these as-is, or move them to environment variables (see below)

---

## 🔑 Secret Keys Overview

### Frontend Keys (React App)
These are **embedded in your public JavaScript bundle**:

```bash
REACT_APP_SUPABASE_URL=https://yourproject.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJ... (public key, safe to expose)
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_... (public key, safe to expose)
```

✅ **Safe to expose** - These are public keys designed for frontend use.

### Backend Keys (Vercel Serverless Functions)
These are **NEVER exposed** to the frontend:

```bash
STRIPE_SECRET_KEY=sk_test_... (SECRET! Never expose!)
STRIPE_WEBHOOK_SECRET=whsec_... (SECRET! Never expose!)
SUPABASE_SERVICE_ROLE_KEY=eyJ... (SECRET! Never expose!)
```

🔴 **NEVER COMMIT THESE** - Keep them only in Vercel environment variables.

---

## 📝 Setup Instructions

### 1. Create `.env` File Locally

```bash
cd /Users/chadmyers/Documents/myersendurancecoaching
cp .env.example .env
```

Then edit `.env` with your actual keys.

### 2. Verify `.gitignore`

Check that `.env` is in `.gitignore`:

```bash
cat .gitignore | grep .env
```

Should show:
```
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
```

### 3. Check What's Being Tracked

```bash
git status
git ls-files | grep -E '\.(env|key|pem|secret)'
```

If you see any `.env` files, **remove them immediately**:

```bash
git rm --cached .env
git commit -m "Remove .env from tracking"
```

---

## 🔍 Checking Git History for Leaked Secrets

### Scan Commit History

```bash
# Check recent commits for sensitive patterns
git log -p | grep -E '(sk_test_|sk_live_|whsec_|service_role)'
```

### If You Find Leaked Secrets

**Option 1: Remove from History (Recommended)**

```bash
# Install BFG Repo-Cleaner
brew install bfg

# Remove secret strings
bfg --replace-text secrets.txt

# Force push (WARNING: rewrites history)
git push --force
```

**Option 2: Rotate Keys**
1. Go to Stripe Dashboard → Developers → API Keys
2. Roll/regenerate compromised keys
3. Update Vercel environment variables
4. Update local `.env`

---

## 🛡️ Best Practices

### ✅ DO:
- Use environment variables for ALL secrets
- Keep `.env` in `.gitignore`
- Use different keys for test/live modes
- Rotate keys if compromised
- Use Vercel's environment variables for deployment
- Review code before committing

### ❌ DON'T:
- Commit `.env` files to git
- Hardcode secret keys in code
- Share secret keys via email/Slack
- Use production keys in development
- Push code without reviewing diffs

---

## 🚀 Vercel Deployment

All secret keys are stored in Vercel's dashboard, not in your code:

1. Go to [Vercel Dashboard](https://vercel.com)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add these keys:

**Production:**
```
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
SUPABASE_URL=https://yourproject.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

**Preview/Development:**
```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
SUPABASE_URL=https://yourproject.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

---

## 📚 Additional Resources

- [GitHub: Removing sensitive data](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)
- [Stripe: API Key Best Practices](https://stripe.com/docs/keys#safe-keys)
- [Vercel: Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Supabase: API Keys](https://supabase.com/docs/guides/api#api-keys)

---

## 🆘 If You Accidentally Commit Secrets

1. **Immediately rotate the compromised keys**
2. Remove from git history (see above)
3. Force push to GitHub
4. Update all deployment environments

**Emergency Contact:**
- Stripe Support: https://support.stripe.com
- Supabase Support: https://supabase.com/support

