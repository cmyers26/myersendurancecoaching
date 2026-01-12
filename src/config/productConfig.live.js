/**
 * Product configuration for all coaching plans and add-ons
 * @typedef {Object} ProductConfig
 * @property {string} productType
 * @property {string} name
 * @property {string} description
 * @property {string} priceDisplay
 * @property {'recurring'|'one_time'} billingType
 * @property {string} stripePriceId
 * @property {'full'|'addon'} intakeType
 */

export const productConfig = {
  level_1: {
    productType: 'level_1',
    name: 'Bronze - Essential Coaching',
    description: 'Essential coaching with customized training plan, monthly plan updates, and email support.',
    priceDisplay: '$99/month',
    billingType: 'recurring',
    stripePriceId: 'price_1Sn14bE7DJ6MCdebeEctjoMC',
    intakeType: 'full',
  },
  level_2: {
    productType: 'level_2',
    name: 'Silver - Premium Coaching',
    description: 'Premium coaching with everything in Bronze, plus bi-weekly plan adjustments, weekly phone check-ins, and form analysis & feedback.',
    priceDisplay: '$179/month',
    billingType: 'recurring',
    stripePriceId: 'price_1Sn15zE7DJ6MCdebmYntiIuy',
    intakeType: 'full',
  },
  level_3: {
    productType: 'level_3',
    name: 'Gold - Elite Virtual 1-on-1 Coaching',
    description: 'Elite virtual 1-on-1 coaching with everything in Silver, plus weekly 1-on-1 video calls, real-time plan adjustments, priority support, and nutrition & recovery guidance.',
    priceDisplay: '$299/month',
    billingType: 'recurring',
    stripePriceId: 'price_1Sn16LE7DJ6MCdebeahobebl',
    intakeType: 'full',
  },
  strength_addon: {
    productType: 'strength_addon',
    name: 'Strength Training Program',
    description: 'Comprehensive strength training program designed specifically for runners. Includes exercises, progressions, and mobility work to improve power, prevent injury, and enhance running performance.',
    priceDisplay: '$49/month',
    billingType: 'recurring',
    stripePriceId: 'price_1Sn18dE7DJ6MCdeb1pJJCrOM',
    intakeType: 'addon',
  },
  race_strategy_addon: {
    productType: 'race_strategy_addon',
    name: 'Race Strategy Consultation',
    description: 'One-on-one race strategy session to develop a personalized race plan. Includes pacing strategy, nutrition plan, mental preparation, and course-specific tactics for your target race.',
    priceDisplay: '$99/session',
    billingType: 'one_time',
    stripePriceId: 'price_1Sn19AE7DJ6MCdebO7yEEHfQ',
    intakeType: 'addon',
  },
  pdf_5k: {
    productType: 'pdf_5k',
    name: '5K Training Plan',
    description: '12-week structured training plan for beginner to intermediate runners. Self-paced downloadable PDF plan you can follow at your own pace.',
    priceDisplay: '$29',
    billingType: 'one_time',
    stripePriceId: 'price_1Sn0ezE7DJ6MCdebdkYAYQLa',
    intakeType: 'full',
  },
  pdf_10k: {
    productType: 'pdf_10k',
    name: '10K Training Plan',
    description: '12-week structured training plan for beginner to intermediate runners. Self-paced downloadable PDF plan you can follow at your own pace.',
    priceDisplay: '$35',
    billingType: 'one_time',
    stripePriceId: 'price_1Sn11xE7DJ6MCdeb8bIQy2Cu',
    intakeType: 'full',
  },
  pdf_half: {
    productType: 'pdf_half',
    name: 'Half Marathon Plan',
    description: '16-week structured training plan for intermediate to advanced runners. Self-paced downloadable PDF plan you can follow at your own pace.',
    priceDisplay: '$49',
    billingType: 'one_time',
    stripePriceId: 'price_1Sn12sE7DJ6MCdebke0eRxFQ',
    intakeType: 'full',
  },
  pdf_marathon: {
    productType: 'pdf_marathon',
    name: 'Marathon Plan',
    description: '20-week structured training plan for intermediate to advanced runners. Self-paced downloadable PDF plan you can follow at your own pace.',
    priceDisplay: '$69',
    billingType: 'one_time',
    stripePriceId: 'price_1Sn13WE7DJ6MCdebBoSJvbY0',
    intakeType: 'full',
  },
};

