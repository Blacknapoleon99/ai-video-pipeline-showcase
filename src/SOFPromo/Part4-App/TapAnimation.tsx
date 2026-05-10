import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { COLORS } from '../data';

interface TapAnimationProps {
  startFrame: number;
  x: number;
  y: number;
}

export const TapAnimation: React.FC<TapAnimationProps> = ({
  startFrame,
  x,
  y,
}) => {
  const frame = useCurrentFrame();
  const tapFrame = frame - startFrame;

  if (tapFrame < 0 || tapFrame > 30) {
    return null;
  }

  // Ripple expansion
  const rippleScale = interpolate(
    tapFrame,
    [0, 20],
    [0, 3],
    { extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
  );

  // Ripple fade
  const rippleOpacity = interpolate(
    tapFrame,
    [0, 5, 20],
    [0, 0.6, 0],
    { extrapolateRight: 'clamp' }
  );

  // Inner dot
  const dotScale = interpolate(
    tapFrame,
    [0, 5, 15],
    [0, 1, 0],
    { extrapolateRight: 'clamp' }
  );

  return (
    <>
      {/* Ripple effect */}
      <div
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: 60,
          height: 60,
          borderRadius: '50%',
          border: `2px solid ${COLORS.primary}`,
          transform: `translate(-50%, -50%) scale(${rippleScale})`,
          opacity: rippleOpacity,
          pointerEvents: 'none',
        }}
      />

      {/* Center dot */}
      <div
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: 20,
          height: 20,
          borderRadius: '50%',
          backgroundColor: COLORS.primary,
          transform: `translate(-50%, -50%) scale(${dotScale})`,
          opacity: rippleOpacity * 1.5,
          boxShadow: `0 0 20px ${COLORS.primary}`,
          pointerEvents: 'none',
        }}
      />
    </>
  );
};
