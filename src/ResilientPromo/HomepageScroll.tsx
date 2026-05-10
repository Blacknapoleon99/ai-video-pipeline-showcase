import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img, staticFile, Easing } from 'remotion';
import { COLORS, SPRING_CONFIG } from './data';

/**
 * Homepage Scroll - Shows the website scrolling through content
 *
 * Timeline (240 frames = 8 seconds):
 * 0-60: Hero section appears in browser mockup
 * 60-200: Smooth scroll through the page (hero → products → footer)
 * 200-240: Highlight products, prepare for checkout
 */
export const HomepageScroll: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Browser appears
  const browserSpring = spring({
    frame,
    fps,
    config: SPRING_CONFIG.smooth,
    durationInFrames: 40,
  });

  const browserScale = interpolate(browserSpring, [0, 1], [0.9, 1]);
  const browserOpacity = interpolate(browserSpring, [0, 1], [0, 1]);

  // Scroll animation (scroll through 3 screenshots combined)
  // Total scroll height: ~2100px (3 sections * 700px)
  const scrollY = interpolate(
    frame,
    [60, 200],
    [0, -1400],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.quad) }
  );


  // Cursor movement
  const cursorX = interpolate(
    frame,
    [180, 220, 230],
    [600, 400, 420],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const cursorY = interpolate(
    frame,
    [180, 220, 230],
    [300, 350, 350],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const cursorVisible = frame >= 180 && frame <= 240;

  // Click animation
  const clickScale = frame >= 225 && frame <= 235
    ? interpolate(frame, [225, 228, 235], [1, 0.8, 1])
    : 1;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Browser mockup */}
      <div
        style={{
          width: 1100,
          height: 650,
          borderRadius: 12,
          backgroundColor: COLORS.background,
          overflow: 'hidden',
          boxShadow: '0 25px 80px rgba(0, 0, 0, 0.15)',
          transform: `scale(${browserScale})`,
          opacity: browserOpacity,
          position: 'relative',
        }}
      >
        {/* Browser toolbar */}
        <div
          style={{
            height: 36,
            backgroundColor: '#F0F0F0',
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
            gap: 8,
            borderBottom: '1px solid #E0E0E0',
          }}
        >
          {/* Traffic lights */}
          <div style={{ display: 'flex', gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#FF5F57' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#FFBD2E' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#28CA41' }} />
          </div>

          {/* Address bar */}
          <div
            style={{
              flex: 1,
              maxWidth: 400,
              height: 24,
              backgroundColor: '#FFFFFF',
              borderRadius: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 60,
              border: '1px solid #E0E0E0',
            }}
          >
            <span style={{ color: '#666', fontSize: 12, fontFamily: 'system-ui' }}>
              stay-resilient.com
            </span>
          </div>
        </div>

        {/* Content area with scroll */}
        <div
          style={{
            height: 'calc(100% - 36px)',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div
            style={{
              transform: `translateY(${scrollY}px)`,
            }}
          >
            {/* Hero section */}
            <Img
              src={staticFile('resilient-assets/hero.png')}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />

            {/* Products middle */}
            <Img
              src={staticFile('resilient-assets/products-middle.png')}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />

            {/* Products footer */}
            <Img
              src={staticFile('resilient-assets/products-footer.png')}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
          </div>

        </div>

        {/* Cursor */}
        {cursorVisible && (
          <div
            style={{
              position: 'absolute',
              left: cursorX,
              top: cursorY,
              transform: `scale(${clickScale})`,
              pointerEvents: 'none',
              zIndex: 100,
            }}
          >
            {/* Cursor arrow */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 3L19 12L12 13L9 20L5 3Z"
                fill={COLORS.primary}
                stroke="#FFFFFF"
                strokeWidth="1"
              />
            </svg>
          </div>
        )}
      </div>

      {/* "Shop Now" text that appears */}
      {frame >= 200 && (
        <div
          style={{
            position: 'absolute',
            bottom: 80,
            left: '50%',
            transform: 'translateX(-50%)',
            color: COLORS.primary,
            fontSize: 20,
            fontWeight: 600,
            fontFamily: 'system-ui, sans-serif',
            letterSpacing: 4,
            textTransform: 'uppercase',
            opacity: interpolate(
              frame,
              [200, 220, 230, 240],
              [0, 1, 1, 0]
            ),
          }}
        >
          Select Product
        </div>
      )}
    </AbsoluteFill>
  );
};
