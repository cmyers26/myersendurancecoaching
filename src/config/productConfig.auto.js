/**
 * Auto-detecting Product Configuration
 * Automatically uses test or live mode price IDs based on your Stripe key
 */

// Test mode price IDs (use with pk_test_... keys)
const testModePrices = {
  level_1: 'price_TEST_level1_replace_me',
  level_2: 'price_TEST_level2_replace_me',
  level_3: 'price_TEST_level3_replace_me',
  strength_addon: 'price_TEST_strength_replace_me',
  race_strategy_addon: 'price_TEST_race_strategy_replace_me',
  pdf_5k: 'price_TEST_pdf_5k_replace_me',
  pdf_10k: 'price_TEST_pdf_10k_replace_me',
  pdf_half: 'price_TEST_pdf_half_replace_me',
  pdf_marathon: 'price_TEST_pdf_marathon_replace_me',
};

// Live mode price IDs (use with pk_live_... keys)
const liveModePrices = {
  level_1: 'price_1Sn14bE7DJ6MCdebeEctjoMC',
  level_2: 'price_1Sn15zE7DJ6MCdebmYntiIuy',
  level_3: 'price_1Sn16LE7DJ6MCdebeahobebl',
  strength_addon: 'price_1Sn18dE7DJ6MCdeb1pJJCrOM',
  race_strategy_addon: 'price_1Sn19AE7DJ6MCdebO7yEEHfQ',
  pdf_5k: 'price_1Sn0ezE7DJ6MCdebdkYAYQLa',
  pdf_10k: 'price_1Sn11xE7DJ6MCdeb8bIQy2Cu',
  pdf_half: 'price_1Sn12sE7DJ6MCdebke0eRxFQ',
  pdf_marathon: 'price_1Sn13WE7DJ6MCdebBoSJvbY0',
};

// Detect if we're in test mode based on the Stripe publishable key
const isTestMode = () => {
  const publishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || '';
  return publishableKey.startsWith('pk_test_');
};

// Get the appropriate price IDs based on mode
const prices = isTestMode() ? testModePrices : liveModePrices;

export const productConfig = {
  level_1: {
    productType: 'level_1',
    name: 'Bronze - Essential Coaching',
    description: 'Essential coaching with customized training plan, monthly plan updates, and email support.',
    priceDisplay: '$99/month',
    billingType: 'recurring',
    stripePriceId: prices.level_1,
    intakeType: 'full',
  },
  level_2: {
    productType: 'level_2',
    name: 'Silver - Premium Coaching',
    description: 'Premium coaching with everything in Bronze, plus bi-weekly plan adjustments, weekly phone check-ins, and form analysis & feedback.',
    priceDisplay: '$179/month',
    billingType: 'recurring',
    stripePriceId: prices.level_2,
    intakeType: 'full',
  },
  level_3: {
    productType: 'level_3',
    name: 'Gold - Elite Virtual 1-on-1 Coaching',
    description: 'Elite virtual 1-on-1 coaching with everything in Silver, plus weekly 1-on-1 video calls, real-time plan adjustments, priority support, and nutrition & recovery guidance.',
    priceDisplay: '$299/month',
    billingType: 'recurring',
    stripePriceId: prices.level_3,
    intakeType: 'full',
  },
  strength_addon: {
    productType: 'strength_addon',
    name: 'Strength Training Program',
    description: 'Comprehensive strength training program designed specifically for runners. Includes exercises, progressions, and mobility work to improve power, prevent injury, and enhance running performance.',
    priceDisplay: '$49/month',
    billingType: 'recurring',
    stripePriceId: prices.strength_addon,
    intakeType: 'addon',
  },
  race_strategy_addon: {
    productType: 'race_strategy_addon',
    name: 'Race Strategy Consultation',
    description: '60-minute personalized race strategy session with Coach Chad. Get a custom race plan, pacing strategy, and nutrition recommendations tailored to your goal race.',
    priceDisplay: '$99 one-time',
    billingType: 'one_time',
    stripePriceId: prices.race_strategy_addon,
    intakeType: 'addon',
  },
  pdf_5k: {
    productType: 'pdf_5k',
    name: '5K Training Plan',
    description: '12-week structured training plan for beginner to intermediate runners. Self-paced downloadable PDF plan you can follow at your own pace.',
    priceDisplay: '$29',
    billingType: 'one_time',
    stripePriceId: prices.pdf_5k,
    intakeType: 'full',
  },
  pdf_10k: {
    productType: 'pdf_10k',
    name: '10K Training Plan',
    description: '12-week structured training plan to build endurance and speed for 10K success. Includes progressive workouts and recovery guidelines.',
    priceDisplay: '$29',
    billingType: 'one_time',
    stripePriceId: prices.pdf_10k,
    intakeType: 'full',
  },
  pdf_half: {
    productType: 'pdf_half',
    name: 'Half Marathon Training Plan',
    description: '16-week progressive training plan for half marathon success. Build your endurance systematically with structured long runs and speed work.',
    priceDisplay: '$39',
    billingType: 'one_time',
    stripePriceId: prices.pdf_half,
    intakeType: 'full',
  },
  pdf_marathon: {
    productType: 'pdf_marathon',
    name: 'Marathon Training Plan',
    description: '20-week comprehensive marathon training plan. Proven structure to get you to the finish line strong with proper periodization and taper.',
    priceDisplay: '$49',
    billingType: 'one_time',
    stripePriceId: prices.pdf_marathon,
    intakeType: 'full',
  },
};

