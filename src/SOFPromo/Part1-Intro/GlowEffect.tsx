import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS } from '../data';

interface GlowEffectProps {
  intensity?: number;
  size?: number;
  color?: string;
  pulseSpeed?: number;
}

export const GlowEffect: React.FC<GlowEffectProps> = ({
  intensity = 1,
  size = 200,
  color = COLORS.primary,
  pulseSpeed = 0.1,
}) => {
  const frame = useCurrentFrame();

  const pulse = interpolate(
    Math.sin(frame * pulseSpeed),
    [-1, 1],
    [0.6, 1]
  );

  return (
    <div
      style={{
        position: 'absolute',
        width: size * pulse,
        height: size * pulse,
        borderRadius: '50%',
        background: `radial-gradient(
          circle,
          ${color}${Math.round(intensity * 80).toString(16).padStart(2, '0')} 0%,
          ${color}${Math.round(intensity * 40).toString(16).padStart(2, '0')} 30%,
          transparent 70%
        )`,
        filter: `blur(${size * 0.1}px)`,
        transform: 'translate(-50%, -50%)',
        left: '50%',
        top: '50%',
      }}
    />
  );
};
