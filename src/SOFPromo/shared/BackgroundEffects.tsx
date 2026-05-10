import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { COLORS } from '../data';

export const BackgroundEffects: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background: `
          radial-gradient(
            ellipse at 50% 50%,
            ${COLORS.surface} 0%,
            ${COLORS.background} 70%
          )
        `,
      }}
    >
      {/* Vignette overlay */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(
            ellipse at 50% 50%,
            transparent 40%,
            ${COLORS.background} 100%
          )`,
          opacity: 0.8,
        }}
      />

      {/* Subtle red ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 800,
          height: 800,
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(
            circle,
            ${COLORS.primary}15 0%,
            transparent 70%
          )`,
          opacity: interpolate(Math.sin(frame * 0.05), [-1, 1], [0.3, 0.6]),
        }}
      />
    </AbsoluteFill>
  );
};
