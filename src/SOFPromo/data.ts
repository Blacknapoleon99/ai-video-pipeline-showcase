// SOF Media Promo Animation Configuration v2
// Duration: 30 seconds (900 frames @ 30fps)

// Color palette
export const COLORS = {
  primary: '#E50914',      // Red accent
  primaryDark: '#8B0000',  // Dark red
  primaryGlow: '#FF2D2D',  // Bright red for glows
  background: '#0A0A0A',   // Near black
  surface: '#1A1A1A',      // Dark gray
  surfaceLight: '#2A2A2A', // Lighter gray
  text: '#FFFFFF',
  textMuted: '#888888',
  accent: '#DC143C',       // Crimson accent
  // iOS colors
  iosBlue: '#007AFF',
  iosGreen: '#34C759',
  iosOrange: '#FF9500',
  iosPink: '#FF2D55',
  iosPurple: '#AF52DE',
  iosTeal: '#5AC8FA',
};

// Timing constants (in frames at 30fps) - 30 SECOND VERSION
export const TIMING = {
  // Part 1: Intro (0-6s, 0-180 frames)
  INTRO_START: 0,
  INTRO_END: 180,
  PARTICLES_FLOAT: 0,
  PARTICLES_SWIRL: 30,
  PARTICLES_COMPRESS: 60,
  LOGO_EMERGE: 90,
  LOGO_SETTLE: 120,
  LOGO_HOLD: 180,  // Extended hold time

  // Part 2: Website (6-16s, 180-480 frames) - EXTENDED
  WEBSITE_START: 180,
  WEBSITE_END: 480,
  LOGO_SHRINK: 180,
  BROWSER_FLY_IN: 210,
  SCREENSHOT_FADE: 250,
  CONTENT_SCROLL_START: 280,
  CONTENT_SCROLL_END: 380,
  CONTENT_CARDS: 380,
  PILLS_ANIMATE: 420,
  ZOOM_PREPARE: 460,

  // Part 3: Transition (16-20s, 480-600 frames) - CINEMATIC CUT
  TRANSITION_START: 480,
  TRANSITION_END: 600,
  WEBSITE_ZOOM_BLUR: 480,
  FLASH_GLITCH: 500,
  PHONE_SLIDE_IN: 520,
  PHONE_SETTLE: 560,

  // Part 4: App (20-30s, 600-900 frames) - IMPROVED UI
  APP_START: 600,
  APP_END: 900,
  HOME_SCREEN_SHOW: 600,
  FINGER_APPEAR: 640,
  TAP_ANIMATION: 660,
  APP_OPEN: 680,
  SCROLL_FEED: 720,
  SOF_LOGO_APPEAR: 780,
  RESILIENT_APPEAR: 820,
  MEALBYMANNIE_APPEAR: 850,
  FINAL_LOCKUP: 880,
};

// Total duration
export const TOTAL_FRAMES = 900;
export const FPS = 30;
export const DURATION_SECONDS = 30;

// Content categories
export const CATEGORIES = [
  'Podcasts',
  'Gaming',
  'Livestreams',
  'Food',
  'Health',
  'Entertainment',
];

// Animation configs
export const SPRING_CONFIG = {
  logo: {
    damping: 100,
    mass: 0.5,
    stiffness: 200,
  },
  bounce: {
    damping: 12,
    mass: 1,
    stiffness: 150,
  },
  smooth: {
    damping: 200,
    mass: 1,
    stiffness: 100,
  },
  snappy: {
    damping: 20,
    mass: 0.8,
    stiffness: 300,
  },
};

// Particle configuration
export const PARTICLE_CONFIG = {
  count: 80,
  minSize: 2,
  maxSize: 6,
  minSpeed: 0.3,
  maxSpeed: 0.8,
};

// iPhone dimensions (iPhone 15 Pro style)
export const IPHONE = {
  width: 280,
  height: 580,
  borderRadius: 50,
  bezelWidth: 8,
  notchWidth: 100,
  notchHeight: 30,
  homeIndicatorWidth: 120,
  homeIndicatorHeight: 5,
  screenPadding: 12,
};

// Browser mockup dimensions
export const BROWSER = {
  width: 1200,
  height: 700,
  borderRadius: 12,
  toolbarHeight: 40,
  addressBarWidth: 400,
};

// iOS App Icon definitions for realistic look
export const IOS_APPS = [
  { id: 'sof', name: 'SOF', gradient: ['#E50914', '#8B0000'], icon: 'logo', highlighted: true },
  { id: 'camera', name: 'Camera', gradient: ['#4A4A4A', '#2C2C2C'], icon: 'camera' },
  { id: 'photos', name: 'Photos', gradient: ['#FF9500', '#FF2D55', '#AF52DE', '#5AC8FA'], icon: 'flower' },
  { id: 'settings', name: 'Settings', gradient: ['#8E8E93', '#636366'], icon: 'gear' },
  { id: 'music', name: 'Music', gradient: ['#FC3C44', '#FB5C74'], icon: 'note' },
  { id: 'messages', name: 'Messages', gradient: ['#34C759', '#30D158'], icon: 'bubble' },
  { id: 'safari', name: 'Safari', gradient: ['#5AC8FA', '#007AFF'], icon: 'compass' },
  { id: 'mail', name: 'Mail', gradient: ['#007AFF', '#5856D6'], icon: 'envelope' },
];
