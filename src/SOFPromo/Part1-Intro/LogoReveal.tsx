import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, Img, staticFile } from 'remotion';
import { COLORS, TIMING, SPRING_CONFIG } from '../data';

export const LogoReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo emerges at frame 90
  const logoFrame = frame - TIMING.LOGO_EMERGE;

  // Scale animation with spring
  const scaleSpring = spring({
    frame: logoFrame,
    fps,
    config: SPRING_CONFIG.logo,
    durationInFrames: 40,
  });

  const scale = interpolate(scaleSpring, [0, 1], [0.3, 1]);

  // Opacity fade in
  const opacity = interpolate(
    frame,
    [TIMING.LOGO_EMERGE, TIMING.LOGO_EMERGE + 15],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Rotation (starts rotated, settles to 0)
  const rotation = interpolate(
    scaleSpring,
    [0, 1],
    [180, 0]
  );

  // Glow intensity
  const glowIntensity = interpolate(
    frame,
    [TIMING.LOGO_EMERGE, TIMING.LOGO_SETTLE, TIMING.INTRO_END],
    [50, 30, 20],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Pulse effect after settling
  const pulsePhase = frame > TIMING.LOGO_SETTLE
    ? Math.sin((frame - TIMING.LOGO_SETTLE) * 0.15) * 0.03
    : 0;

  if (frame < TIMING.LOGO_EMERGE) {
    return null;
  }

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: `translate(-50%, -50%) scale(${scale + pulsePhase}) rotate(${rotation}deg)`,
        opacity,
      }}
    >
      {/* Outer glow */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 400,
          height: 400,
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(
            circle,
            ${COLORS.primary}40 0%,
            ${COLORS.primary}20 30%,
            transparent 60%
          )`,
          filter: `blur(${glowIntensity * 0.5}px)`,
        }}
      />

      {/* Logo with metallic effect */}
      <div
        style={{
          position: 'relative',
          filter: `
            drop-shadow(0 0 ${glowIntensity}px ${COLORS.primary})
            drop-shadow(0 0 ${glowIntensity * 0.5}px ${COLORS.primaryGlow})
          `,
        }}
      >
        <Img
          src={staticFile('sof-assets/soflogo.png')}
          style={{
            width: 350,
            height: 'auto',
          }}
        />
      </div>
    </div>
  );
};
