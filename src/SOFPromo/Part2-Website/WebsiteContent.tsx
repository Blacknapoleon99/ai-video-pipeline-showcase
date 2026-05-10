import React from 'react';
import { Img, staticFile, useCurrentFrame, interpolate, Easing } from 'remotion';

interface WebsiteContentProps {
  scrollStartFrame: number;
  scrollEndFrame: number;
  scrollAmount?: number;
}

export const WebsiteContent: React.FC<WebsiteContentProps> = ({
  scrollStartFrame,
  scrollEndFrame,
  scrollAmount = 150,
}) => {
  const frame = useCurrentFrame();

  // Scroll animation
  const scrollY = interpolate(
    frame,
    [scrollStartFrame, scrollEndFrame],
    [0, -scrollAmount],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.inOut(Easing.quad),
    }
  );

  // Fade in the content
  const opacity = interpolate(
    frame,
    [0, 15],
    [0, 1],
    { extrapolateRight: 'clamp' }
  );

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          transform: `translateY(${scrollY}px)`,
          opacity,
        }}
      >
        <Img
          src={staticFile('sof-assets/website-screenshot.png')}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
          }}
        />
      </div>

      {/* Gradient overlay at bottom for scroll effect */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 100,
          background: 'linear-gradient(transparent, rgba(10, 10, 10, 0.9))',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};
