// Resilient Streetwear Promo Animation Configuration
// Duration: 22 seconds (660 frames @ 30fps)

// Color palette - Clean black/white minimal streetwear
export const COLORS = {
  primary: '#000000',       // Black
  secondary: '#FFFFFF',     // White
  accent: '#E91E8C',        // Pink (from hoodies)
  gold: '#D4AF37',          // Gold (from graphic tee)
  background: '#FFFFFF',    // White background
  backgroundDark: '#0A0A0A', // Dark background
  text: '#000000',
  textLight: '#FFFFFF',
  textMuted: '#666666',
  overlay: 'rgba(0, 0, 0, 0.7)',
};

// Timing constants (in frames at 30fps) - 22 SECONDS
export const TIMING = {
  // Part 1: Logo Intro (0-4s, 0-120 frames)
  INTRO_START: 0,
  INTRO_END: 120,
  LOGO_APPEAR: 20,
  TAGLINE_APPEAR: 60,
  INTRO_FADE: 100,

  // Part 2: Homepage Scroll (4-12s, 120-360 frames)
  HOMEPAGE_START: 120,
  HOMEPAGE_END: 360,
  HERO_SHOW: 120,
  SCROLL_START: 180,
  SCROLL_END: 320,
  PRODUCTS_HIGHLIGHT: 280,

  // Part 3: Cart/Checkout Flow (12-18s, 360-540 frames)
  CHECKOUT_START: 360,
  CHECKOUT_END: 540,
  ADD_TO_CART: 380,
  CART_POPUP: 400,
  CHECKOUT_SCREEN: 440,
  PAYMENT_COMPLETE: 500,

  // Part 4: Branding Finale (18-22s, 540-660 frames)
  FINALE_START: 540,
  FINALE_END: 660,
  LOGO_FINAL: 560,
  TAGLINE_FINAL: 600,
  FADE_OUT: 640,
};

// Total duration
export const TOTAL_FRAMES = 660;
export const FPS = 30;
export const DURATION_SECONDS = 22;

// Animation configs
export const SPRING_CONFIG = {
  smooth: {
    damping: 20,
    mass: 1,
    stiffness: 100,
  },
  snappy: {
    damping: 15,
    mass: 0.8,
    stiffness: 200,
  },
  bounce: {
    damping: 10,
    mass: 1,
    stiffness: 150,
  },
};

// Product data
export const PRODUCTS = [
  { name: 'R Logo Tee', price: '$45', color: 'Black' },
  { name: 'RSLNT Gothic Tee', price: '$50', color: 'Black' },
  { name: 'Resilient World Hoodie', price: '$120', color: 'Pink' },
  { name: 'Lightning Bolt Tee', price: '$55', color: 'Black/Gold' },
];

// Brand info
export const BRAND = {
  name: 'RESILIENT',
  tagline: 'TRANSCEND THE ORDINARY',
  subtitle: 'Premium streetwear for those who dare to be different',
  shortName: 'RSLNT',
};
