import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img, staticFile, Easing } from 'remotion';
import { COLORS, BRAND, SPRING_CONFIG } from './data';

/**
 * Branding Finale - Final brand reveal
 *
 * Timeline (120 frames = 4 seconds):
 * 0-20: Transition from checkout
 * 20-60: Logo appears with animation
 * 60-100: Tagline and website
 * 100-120: Fade out
 */
export const BrandingFinale: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background transition
  const bgTransition = interpolate(
    frame,
    [0, 20],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) }
  );

  // Logo animation
  const logoSpring = spring({
    frame: frame - 20,
    fps,
    config: SPRING_CONFIG.bounce,
    durationInFrames: 30,
  });

  const logoScale = interpolate(logoSpring, [0, 1], [0.5, 1]);
  const logoOpacity = interpolate(logoSpring, [0, 1], [0, 1]);

  // Tagline animation
  const taglineOpacity = interpolate(
    frame,
    [60, 80],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Website URL animation
  const urlOpacity = interpolate(
    frame,
    [80, 100],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Fade out
  const fadeOut = interpolate(
    frame,
    [100, 120],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Floating particles
  const particles = Array.from({ length: 15 }, (_, i) => ({
    x: 10 + (i * 7) % 80,
    y: 20 + (i * 11) % 60,
    size: 2 + (i % 3),
    speed: 0.5 + (i % 5) * 0.2,
  }));

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.backgroundDark,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: bgTransition,
      }}
    >
      {/* Floating particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${p.x + Math.sin((frame + i * 10) * 0.02 * p.speed) * 5}%`,
            top: `${p.y + Math.cos((frame + i * 15) * 0.015 * p.speed) * 5}%`,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            backgroundColor: COLORS.textLight,
            opacity: 0.2,
          }}
        />
      ))}

      {/* Main content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 30,
        }}
      >
        {/* Logo */}
        <div
          style={{
            transform: `scale(${logoScale})`,
            opacity: logoOpacity,
          }}
        >
          <Img
            src={staticFile('resilient-assets/resilientlogo.png')}
            style={{
              width: 180,
              height: 'auto',
              filter: 'brightness(10)',
            }}
          />
        </div>

        {/* Brand name */}
        <div
          style={{
            color: COLORS.textLight,
            fontSize: 64,
            fontWeight: 300,
            fontFamily: 'system-ui, sans-serif',
            letterSpacing: 16,
            textTransform: 'uppercase',
            opacity: logoOpacity,
          }}
        >
          {BRAND.name}
        </div>

        {/* Divider line */}
        <div
          style={{
            width: interpolate(taglineOpacity, [0, 1], [0, 200]),
            height: 1,
            backgroundColor: COLORS.textLight,
            opacity: taglineOpacity,
          }}
        />

        {/* Tagline */}
        <div
          style={{
            color: COLORS.textLight,
            fontSize: 16,
            fontWeight: 400,
            fontFamily: 'system-ui, sans-serif',
            letterSpacing: 6,
            textTransform: 'uppercase',
            opacity: taglineOpacity,
          }}
        >
          {BRAND.tagline}
        </div>

        {/* Website URL */}
        <div
          style={{
            marginTop: 20,
            padding: '12px 32px',
            border: `1px solid ${COLORS.textLight}40`,
            borderRadius: 30,
            color: COLORS.textLight,
            fontSize: 14,
            fontFamily: 'system-ui, sans-serif',
            letterSpacing: 3,
            opacity: urlOpacity,
          }}
        >
          STAY-RESILIENT.COM
        </div>
      </div>

      {/* Fade to black */}
      <AbsoluteFill
        style={{
          backgroundColor: '#000000',
          opacity: fadeOut,
        }}
      />
    </AbsoluteFill>
  );
};
