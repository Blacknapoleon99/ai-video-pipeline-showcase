import React from 'react';
import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion';
import { LogoIntro } from './LogoIntro';
import { HomepageScroll } from './HomepageScroll';
import { CheckoutFlow } from './CheckoutFlow';
import { BrandingFinale } from './BrandingFinale';
import { TIMING } from './data';

/**
 * Resilient Streetwear Promotional Animation
 *
 * A clean, minimal animation showcasing the Resilient streetwear brand.
 *
 * Duration: 22 seconds (660 frames @ 30fps)
 * Resolution: 1920x1080
 *
 * Structure:
 * - Part 1 (0-4s): Logo intro with brand reveal
 * - Part 2 (4-12s): Homepage scroll through products
 * - Part 3 (12-18s): Cart and checkout flow
 * - Part 4 (18-22s): Branding finale
 */
export const ResilientPromo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#000000' }}>
      {/* Audio tracks - uncomment after adding audio files to public/resilient-assets/ */}
      {/* <Audio src={staticFile('resilient-assets/background-music.mp3')} volume={0.3} /> */}
      {/* <Audio src={staticFile('resilient-assets/voiceover.mp3')} volume={1.0} /> */}

      {/* Part 1: Logo Intro (Frames 0-120, 0-4 seconds) */}
      <Sequence from={TIMING.INTRO_START} durationInFrames={TIMING.INTRO_END - TIMING.INTRO_START}>
        <LogoIntro />
      </Sequence>

      {/* Part 2: Homepage Scroll (Frames 120-360, 4-12 seconds) */}
      <Sequence from={TIMING.HOMEPAGE_START} durationInFrames={TIMING.HOMEPAGE_END - TIMING.HOMEPAGE_START}>
        <HomepageScroll />
      </Sequence>

      {/* Part 3: Checkout Flow (Frames 360-540, 12-18 seconds) */}
      <Sequence from={TIMING.CHECKOUT_START} durationInFrames={TIMING.CHECKOUT_END - TIMING.CHECKOUT_START}>
        <CheckoutFlow />
      </Sequence>

      {/* Part 4: Branding Finale (Frames 540-660, 18-22 seconds) */}
      <Sequence from={TIMING.FINALE_START} durationInFrames={TIMING.FINALE_END - TIMING.FINALE_START}>
        <BrandingFinale />
      </Sequence>
    </AbsoluteFill>
  );
};
