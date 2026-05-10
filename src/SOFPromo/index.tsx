import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { BackgroundEffects } from './shared/BackgroundEffects';
import { IntroSequence } from './Part1-Intro/IntroSequence';
import { WebsiteShowcase } from './Part2-Website/WebsiteShowcase';
import { CinematicTransition } from './Part3-Transition/CinematicTransition';
import { AppExperience } from './Part4-App/AppExperience';
import { COLORS, TIMING } from './data';

/**
 * SOF Media Promotional Animation v2
 *
 * A Netflix-style promotional video showcasing SOF Media's
 * streaming platform and mobile app.
 *
 * Duration: 30 seconds (900 frames @ 30fps)
 * Resolution: 1920x1080
 *
 * Structure:
 * - Part 1 (0-6s): Intro - Particles coalesce into SOF logo
 * - Part 2 (6-16s): Website - Extended browser showcase with more content
 * - Part 3 (16-20s): Transition - Cinematic cut with flash/glitch, iPhone slides in
 * - Part 4 (20-30s): App - Realistic iOS UI, tap animation, branding finale
 */
export const SOFPromo: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        overflow: 'hidden',
      }}
    >
      {/* Global background effects */}
      <BackgroundEffects />

      {/* Part 1: Intro Sequence (Frames 0-180, 0-6 seconds) */}
      <Sequence from={TIMING.INTRO_START} durationInFrames={TIMING.INTRO_END - TIMING.INTRO_START}>
        <IntroSequence />
      </Sequence>

      {/* Part 2: Website Showcase (Frames 180-480, 6-16 seconds) - EXTENDED */}
      <Sequence from={TIMING.WEBSITE_START} durationInFrames={TIMING.WEBSITE_END - TIMING.WEBSITE_START}>
        <WebsiteShowcase />
      </Sequence>

      {/* Part 3: Cinematic Transition (Frames 480-600, 16-20 seconds) - IMPROVED */}
      <Sequence from={TIMING.TRANSITION_START} durationInFrames={TIMING.TRANSITION_END - TIMING.TRANSITION_START}>
        <CinematicTransition />
      </Sequence>

      {/* Part 4: App Experience (Frames 600-900, 20-30 seconds) - REALISTIC UI */}
      <Sequence from={TIMING.APP_START} durationInFrames={TIMING.APP_END - TIMING.APP_START}>
        <AppExperience />
      </Sequence>

      {/* Audio track - uncomment when audio file is added */}
      {/* <Audio src={staticFile('sof-assets/background-music.mp3')} volume={0.5} /> */}
    </AbsoluteFill>
  );
};
