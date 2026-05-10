import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img, staticFile, Easing } from 'remotion';
import { COLORS, BRAND, SPRING_CONFIG } from './data';

/**
 * Logo Intro - Clean reveal of Resilient branding
 *
 * Timeline (120 frames = 4 seconds):
 * 0-20: Black screen
 * 20-60: Logo fades in with scale
 * 60-100: Tagline reveals
 * 100-120: Fade out to white
 */
export const LogoIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo animation
  const logoSpring = spring({
    frame: frame - 20,
    fps,
    config: SPRING_CONFIG.smooth,
    durationInFrames: 40,
  });

  const logoScale = interpolate(logoSpring, [0, 1], [0.8, 1]);
  const logoOpacity = interpolate(logoSpring, [0, 1], [0, 1]);

  // Tagline reveal
  const taglineProgress = interpolate(
    frame,
    [60, 90],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) }
  );

  // Line animation (draws from center outward)
  const lineWidth = interpolate(taglineProgress, [0, 1], [0, 300]);

  // Fade out to transition
  const fadeOut = interpolate(
    frame,
    [100, 120],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.backgroundDark,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 30,
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
        }}
      >
        {/* Wing Logo */}
        <Img
          src={staticFile('resilient-assets/resilientlogo.png')}
          style={{
            width: 200,
            height: 'auto',
            filter: 'brightness(10)', // Make white on dark
          }}
        />

        {/* Brand Name */}
        <div
          style={{
            color: COLORS.textLight,
            fontSize: 72,
            fontWeight: 300,
            fontFamily: 'system-ui, sans-serif',
            letterSpacing: 20,
            textTransform: 'uppercase',
          }}
        >
          {BRAND.name}
        </div>

        {/* Animated line */}
        <div
          style={{
            width: lineWidth,
            height: 1,
            backgroundColor: COLORS.textLight,
            opacity: taglineProgress,
          }}
        />

        {/* Tagline */}
        <div
          style={{
            color: COLORS.textLight,
            fontSize: 18,
            fontWeight: 400,
            fontFamily: 'system-ui, sans-serif',
            letterSpacing: 8,
            textTransform: 'uppercase',
            opacity: taglineProgress,
          }}
        >
          {BRAND.tagline}
        </div>
      </div>

      {/* Fade to white overlay */}
      <AbsoluteFill
        style={{
          backgroundColor: COLORS.background,
          opacity: fadeOut,
        }}
      />
    </AbsoluteFill>
  );
};
