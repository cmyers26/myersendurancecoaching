/**
 * TEST MODE Product Configuration
 * Use these price IDs with test Stripe keys (pk_test_... and sk_test_...)
 * 
 * After creating test mode products in Stripe, replace the price IDs below
 * with your actual test mode price IDs from: https://dashboard.stripe.com/test/products
 */

export const productConfig = {
  level_1: {
    productType: 'level_1',
    name: 'Bronze - Essential Coaching',
    description: 'Essential coaching with customized training plan, monthly plan updates, and email support.',
    priceDisplay: '$99/month',
    billingType: 'recurring',
    stripePriceId: 'price_1SnNf3E7DJ6MCdebunBqKGPV',
    intakeType: 'full',
  },
  level_2: {
    productType: 'level_2',
    name: 'Silver - Premium Coaching',
    description: 'Premium coaching with everything in Bronze, plus bi-weekly plan adjustments, weekly phone check-ins, and form analysis & feedback.',
    priceDisplay: '$179/month',
    billingType: 'recurring',
    stripePriceId: 'price_1SnNgGE7DJ6MCdeblEy9qC9C',
    intakeType: 'full',
  },
  level_3: {
    productType: 'level_3',
    name: 'Gold - Elite Virtual 1-on-1 Coaching',
    description: 'Elite virtual 1-on-1 coaching with everything in Silver, plus weekly 1-on-1 video calls, real-time plan adjustments, priority support, and nutrition & recovery guidance.',
    priceDisplay: '$299/month',
    billingType: 'recurring',
    stripePriceId: 'price_1SnNgeE7DJ6MCdebolU83LmN',
    intakeType: 'full',
  },
  strength_addon: {
    productType: 'strength_addon',
    name: 'Strength Training Program',
    description: 'Comprehensive strength training program designed specifically for runners.',
    priceDisplay: '$49/month',
    billingType: 'recurring',
    stripePriceId: 'price_1SnNhBE7DJ6MCdeb9eW51JdB',
    intakeType: 'addon',
  },
  race_strategy_addon: {
    productType: 'race_strategy_addon',
    name: 'Race Strategy Consultation',
    description: '60-minute personalized race strategy session.',
    priceDisplay: '$99 one-time',
    billingType: 'one_time',
    stripePriceId: 'price_1SnNhdE7DJ6MCdebDhcsTOkN',
    intakeType: 'addon',
  },
  pdf_5k: {
    productType: 'pdf_5k',
    name: '5K Training Plan',
    description: '12-week structured training plan for beginner to intermediate runners.',
    priceDisplay: '$29',
    billingType: 'one_time',
    stripePriceId: 'price_1SnNi1E7DJ6MCdeb8cuE9bMv',
    intakeType: 'full',
  },
  pdf_10k: {
    productType: 'pdf_10k',
    name: '10K Training Plan',
    description: '12-week structured training plan to build endurance and speed.',
    priceDisplay: '$29',
    billingType: 'one_time',
    stripePriceId: 'price_1SnNiWE7DJ6MCdebwAU7vGug',
    intakeType: 'full',
  },
  pdf_half: {
    productType: 'pdf_half',
    name: 'Half Marathon Training Plan',
    description: '16-week progressive training plan for half marathon success.',
    priceDisplay: '$39',
    billingType: 'one_time',
    stripePriceId: 'price_1SnNiwE7DJ6MCdebqKqLQtzo',
    intakeType: 'full',
  },
  pdf_marathon: {
    productType: 'pdf_marathon',
    name: 'Marathon Training Plan',
    description: '20-week comprehensive marathon training plan.',
    priceDisplay: '$49',
    billingType: 'one_time',
    stripePriceId: 'price_1SnNjNE7DJ6MCdeb1ALPA1MP',
    intakeType: 'full',
  },
};

