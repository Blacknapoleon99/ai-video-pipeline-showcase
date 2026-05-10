import React from 'react';
import { Img, staticFile, useCurrentFrame, interpolate } from 'remotion';
import { COLORS } from '../data';

interface AnimatedLogoProps {
  scale?: number;
  opacity?: number;
  glowIntensity?: number;
  style?: React.CSSProperties;
}

export const AnimatedLogo: React.FC<AnimatedLogoProps> = ({
  scale = 1,
  opacity = 1,
  glowIntensity = 0,
  style = {},
}) => {
  const frame = useCurrentFrame();

  // Subtle pulse effect
  const pulseScale = 1 + Math.sin(frame * 0.08) * 0.02;

  // Dynamic glow
  const glowSize = glowIntensity > 0
    ? interpolate(Math.sin(frame * 0.1), [-1, 1], [glowIntensity * 0.5, glowIntensity])
    : 0;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: `scale(${scale * pulseScale})`,
        opacity,
        filter: glowSize > 0
          ? `drop-shadow(0 0 ${glowSize}px ${COLORS.primary}) drop-shadow(0 0 ${glowSize * 2}px ${COLORS.primaryDark})`
          : 'none',
        ...style,
      }}
    >
      <Img
        src={staticFile('sof-assets/soflogo.png')}
        style={{
          width: 300,
          height: 'auto',
          objectFit: 'contain',
        }}
      />
    </div>
  );
};
