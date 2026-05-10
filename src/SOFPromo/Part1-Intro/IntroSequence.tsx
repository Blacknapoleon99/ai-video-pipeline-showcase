import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { ParticleField } from './ParticleField';
import { LogoReveal } from './LogoReveal';
import { GlowEffect } from './GlowEffect';
import { COLORS, TIMING } from '../data';

export const IntroSequence: React.FC = () => {
  const frame = useCurrentFrame();

  // Central glow that builds during compression
  const centralGlowIntensity = interpolate(
    frame,
    [TIMING.PARTICLES_COMPRESS, TIMING.LOGO_EMERGE, TIMING.LOGO_EMERGE + 10],
    [0, 1, 0.3],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const centralGlowSize = interpolate(
    frame,
    [TIMING.PARTICLES_COMPRESS, TIMING.LOGO_EMERGE],
    [50, 400],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        overflow: 'hidden',
      }}
    >
      {/* Particle system */}
      <ParticleField />

      {/* Central energy glow during compression */}
      {centralGlowIntensity > 0 && (
        <GlowEffect
          intensity={centralGlowIntensity}
          size={centralGlowSize}
          color={COLORS.primary}
          pulseSpeed={0.2}
        />
      )}

      {/* Logo reveal */}
      <LogoReveal />

      {/* Flash effect at logo emergence */}
      {frame >= TIMING.LOGO_EMERGE && frame < TIMING.LOGO_EMERGE + 8 && (
        <AbsoluteFill
          style={{
            backgroundColor: COLORS.primaryGlow,
            opacity: interpolate(
              frame,
              [TIMING.LOGO_EMERGE, TIMING.LOGO_EMERGE + 8],
              [0.5, 0],
              { extrapolateRight: 'clamp' }
            ),
          }}
        />
      )}
    </AbsoluteFill>
  );
};
