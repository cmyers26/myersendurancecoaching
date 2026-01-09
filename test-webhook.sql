-- Run this in Supabase SQL Editor to test if orders table is working

-- 1. Check if table exists
SELECT EXISTS (
  SELECT FROM pg_tables
  WHERE schemaname = 'public' AND tablename = 'orders'
) AS table_exists;

-- 2. Try to insert a test order (simulating what webhook does)
INSERT INTO public.orders (
  product_type,
  status,
  stripe_session_id,
  customer_email,
  amount_total,
  currency,
  created_at
) VALUES (
  'pdf_5k',
  'completed',
  'cs_test_manual_' || gen_random_uuid()::text,
  'test@example.com',
  2900,
  'usd',
  NOW()
);

-- 3. Check if it was inserted
SELECT * FROM public.orders ORDER BY created_at DESC LIMIT 5;

-- 4. Clean up test order
DELETE FROM public.orders WHERE customer_email = 'test@example.com';

