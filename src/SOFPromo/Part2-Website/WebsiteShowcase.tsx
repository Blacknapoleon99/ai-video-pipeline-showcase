import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img, staticFile, Easing } from 'remotion';
import { BrowserMockup } from './BrowserMockup';
import { WebsiteContent } from './WebsiteContent';
import { CategoryPills } from './CategoryPills';
import { COLORS, SPRING_CONFIG } from '../data';

/**
 * Website Showcase - Extended version showing more content
 *
 * Timeline (300 frames = 10 seconds):
 * 0-30: Logo shrinks to top-left with trail effect
 * 30-70: Browser mockup flies in from bottom
 * 70-100: Website screenshot fades in
 * 100-200: Extended scroll through multiple sections
 * 200-240: Show content cards/highlights
 * 240-280: Category pills animate in
 * 280-300: Zoom into website, prepare for transition
 */
export const WebsiteShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo shrinks to top-left (frames 0-30)
  const logoShrinkProgress = interpolate(
    frame,
    [0, 30],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) }
  );

  const logoScale = interpolate(logoShrinkProgress, [0, 1], [1, 0.2]);
  const logoX = interpolate(logoShrinkProgress, [0, 1], [0, -780]);
  const logoY = interpolate(logoShrinkProgress, [0, 1], [0, -420]);
  const logoOpacity = interpolate(logoShrinkProgress, [0, 0.5, 1], [1, 0.8, 0.5]);

  // Trail effect for logo movement
  const trailOpacity = interpolate(logoShrinkProgress, [0, 0.3, 1], [0, 0.3, 0]);

  // Browser flies in (frames 30-70)
  const browserSpring = spring({
    frame: frame - 30,
    fps,
    config: SPRING_CONFIG.bounce,
    durationInFrames: 40,
  });

  const browserY = interpolate(browserSpring, [0, 1], [900, 0]);
  const browserOpacity = interpolate(browserSpring, [0, 0.3, 1], [0, 1, 1]);

  // Website fade in (frames 70-100)
  const websiteOpacity = interpolate(
    frame,
    [70, 100],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Content card highlights (frames 200-240)
  const cardHighlightOpacity = interpolate(
    frame,
    [200, 220, 240, 260],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // End zoom and prepare for transition (frames 280-300)
  const endZoom = interpolate(
    frame,
    [280, 300],
    [1, 1.15],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.cubic) }
  );

  const endBlur = interpolate(
    frame,
    [290, 300],
    [0, 5],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Logo trail effect */}
      {frame < 30 && (
        <>
          {[0.2, 0.4, 0.6].map((delay, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) translate(${logoX * delay}px, ${logoY * delay}px) scale(${1 - (1 - logoScale) * delay})`,
                opacity: trailOpacity * (1 - delay),
                filter: `blur(${i * 2}px)`,
                zIndex: 10 - i,
              }}
            >
              <Img
                src={staticFile('sof-assets/soflogo.png')}
                style={{ width: 300, height: 'auto' }}
              />
            </div>
          ))}
        </>
      )}

      {/* SOF Logo (shrinks to corner) */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) translate(${logoX}px, ${logoY}px) scale(${logoScale})`,
          opacity: logoOpacity,
          zIndex: 10,
          filter: `drop-shadow(0 0 15px ${COLORS.primary})`,
        }}
      >
        <Img
          src={staticFile('sof-assets/soflogo.png')}
          style={{ width: 300, height: 'auto' }}
        />
      </div>

      {/* Browser mockup */}
      <div
        style={{
          transform: `translateY(${browserY}px) scale(${endZoom})`,
          opacity: browserOpacity,
          filter: `blur(${endBlur}px)`,
        }}
      >
        <BrowserMockup>
          <div style={{ opacity: websiteOpacity, position: 'relative' }}>
            <WebsiteContent
              scrollStartFrame={100}
              scrollEndFrame={200}
              scrollAmount={400}  // More scroll
            />

            {/* Content highlight overlay */}
            {cardHighlightOpacity > 0 && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  pointerEvents: 'none',
                }}
              >
                {/* Highlight boxes */}
                <div
                  style={{
                    position: 'absolute',
                    top: '20%',
                    left: '10%',
                    width: 200,
                    height: 120,
                    border: `2px solid ${COLORS.primary}`,
                    borderRadius: 8,
                    opacity: cardHighlightOpacity,
                    boxShadow: `0 0 20px ${COLORS.primary}60`,
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '25%',
                    right: '15%',
                    width: 180,
                    height: 100,
                    border: `2px solid ${COLORS.primary}`,
                    borderRadius: 8,
                    opacity: cardHighlightOpacity * 0.8,
                    boxShadow: `0 0 20px ${COLORS.primary}60`,
                    animationDelay: '0.1s',
                  }}
                />
              </div>
            )}
          </div>
        </BrowserMockup>

        {/* Category pills - positioned below browser */}
        <CategoryPills startFrame={240} />
      </div>

      {/* "Premium Content" text overlay during scroll */}
      {frame >= 150 && frame <= 200 && (
        <div
          style={{
            position: 'absolute',
            bottom: 120,
            left: '50%',
            transform: 'translateX(-50%)',
            color: COLORS.text,
            fontSize: 24,
            fontWeight: 700,
            fontFamily: 'system-ui, sans-serif',
            textTransform: 'uppercase',
            letterSpacing: 4,
            opacity: interpolate(
              frame,
              [150, 165, 185, 200],
              [0, 1, 1, 0]
            ),
            textShadow: `0 0 20px ${COLORS.primary}`,
          }}
        >
          Premium Streaming Content
        </div>
      )}
    </AbsoluteFill>
  );
};
