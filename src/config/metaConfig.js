// SEO Meta Tags Configuration
// Update the baseUrl with your actual domain in production

const baseUrl = process.env.REACT_APP_BASE_URL || 'https://myersendurancecoaching.com';

export const metaConfig = {
  default: {
    title: 'Myers Endurance Coaching - Personalized Online Running Coaching',
    description: 'Personalized online running coaching designed to help you achieve your goals while staying healthy and injury-free. Expert training plans for all distances.',
    keywords: 'running coach, endurance coaching, online running coach, training plans, marathon training, 5K training, 10K training, half marathon training',
    ogImage: '/images/myers-endurance-coaching-logo.png',
  },
  home: {
    title: 'Myers Endurance Coaching - Personalized Online Running Coaching',
    description: 'Smart, sustainable training designed to help you achieve your goals while staying healthy and injury-free. Expert running coaching for all levels and distances.',
    keywords: 'running coach, endurance coaching, online running coach, personalized training plans',
    path: '/',
  },
  pricing: {
    title: 'Coaching Plans & Pricing | Myers Endurance Coaching',
    description: 'Choose from personalized coaching plans, PDF training plans for 5K, 10K, half marathon, and marathon distances. Flexible pricing options for every runner.',
    keywords: 'running coach pricing, training plan cost, coaching plans, marathon training plans, 5K training plans',
    path: '/pricing',
  },
  coaching: {
    title: 'Coaching Plans & Pricing | Myers Endurance Coaching',
    description: 'Choose from personalized coaching plans, PDF training plans for 5K, 10K, half marathon, and marathon distances. Flexible pricing options for every runner.',
    keywords: 'running coach pricing, training plan cost, coaching plans, marathon training plans, 5K training plans',
    path: '/coaching',
  },
  howItWorks: {
    title: 'How It Works | Myers Endurance Coaching',
    description: 'Learn how our personalized running coaching process works. From intake form to goal achievement, we guide you every step of the way.',
    keywords: 'how running coaching works, coaching process, training plan process, running coach steps',
    path: '/how-it-works',
  },
  about: {
    title: 'About | Myers Endurance Coaching',
    description: 'Learn about your certified running coach and competitive background. Expert endurance coaching with a focus on sustainable, injury-free training.',
    keywords: 'running coach bio, certified running coach, endurance coach, coach credentials, coach background',
    path: '/about',
  },
  contact: {
    title: 'Contact Us | Myers Endurance Coaching',
    description: 'Get in touch with Myers Endurance Coaching. Questions about coaching plans, training programs, or ready to get started? Contact us today.',
    keywords: 'contact running coach, coaching inquiry, training questions, coach consultation',
    path: '/contact',
  },
  intake: {
    title: 'Intake Form | Myers Endurance Coaching',
    description: 'Complete your intake form to begin your personalized coaching journey. Share your goals, experience, and schedule to get a customized training plan.',
    keywords: 'coaching intake form, training plan questionnaire, runner intake',
    path: '/intake',
  },
  checkout: {
    title: 'Checkout | Myers Endurance Coaching',
    description: 'Complete your purchase to begin your personalized coaching or training plan.',
    keywords: 'coaching checkout, training plan purchase',
    path: '/checkout',
    noindex: true, // Don't index checkout pages
  },
  checkoutSuccess: {
    title: 'Thank You | Myers Endurance Coaching',
    description: 'Thank you for your purchase. Welcome to Myers Endurance Coaching!',
    keywords: 'coaching purchase confirmation',
    path: '/checkout/success',
    noindex: true,
  },
  checkoutCancel: {
    title: 'Checkout Cancelled | Myers Endurance Coaching',
    description: 'Your checkout was cancelled. Feel free to browse our coaching plans and return when ready.',
    keywords: 'checkout cancelled',
    path: '/checkout/cancel',
    noindex: true,
  },
  dashboard: {
    title: 'Dashboard | Myers Endurance Coaching',
    description: 'Your personalized athlete dashboard with training plans, progress tracking, and coaching resources.',
    keywords: 'athlete dashboard, training dashboard, coaching dashboard',
    path: '/dashboard',
    noindex: true, // Private pages shouldn't be indexed
  },
};

// Helper function to get full URL
export const getFullUrl = (path) => {
  return `${baseUrl}${path}`;
};

// Helper function to get canonical URL
export const getCanonicalUrl = (path) => {
  return `${baseUrl}${path}`;
};

