import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, Img, staticFile } from 'remotion';
import { IPhoneMockup } from './IPhoneMockup';
import { COLORS, BROWSER, IPHONE } from '../data';

export const MorphTransition: React.FC = () => {
  const frame = useCurrentFrame();

  // Phase 1: Browser shrinks and rounds (frames 0-30)
  const shrinkProgress = interpolate(
    frame,
    [0, 30],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic) }
  );

  // Phase 2: Aspect ratio morphs (frames 30-60)
  const morphProgress = interpolate(
    frame,
    [30, 60],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic) }
  );

  // Phase 3: Phone settles (frames 60-90)
  const settleProgress = interpolate(
    frame,
    [60, 90],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) }
  );

  // Interpolate dimensions
  const width = interpolate(
    shrinkProgress + morphProgress,
    [0, 1, 2],
    [BROWSER.width, BROWSER.width * 0.6, IPHONE.width]
  );

  const height = interpolate(
    shrinkProgress + morphProgress,
    [0, 1, 2],
    [BROWSER.height, BROWSER.height * 0.7, IPHONE.height]
  );

  const borderRadius = interpolate(
    shrinkProgress + morphProgress,
    [0, 1, 2],
    [BROWSER.borderRadius, 30, IPHONE.borderRadius]
  );

  // Show phone details after morph
  const showPhoneDetails = morphProgress > 0.8;

  // Content opacity
  const browserContentOpacity = interpolate(
    shrinkProgress,
    [0, 0.5, 1],
    [1, 0.5, 0],
    { extrapolateRight: 'clamp' }
  );

  const phoneContentOpacity = interpolate(
    morphProgress,
    [0.5, 1],
    [0, 1],
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
      {/* Morphing container */}
      {!showPhoneDetails ? (
        <div
          style={{
            width,
            height,
            borderRadius,
            backgroundColor: COLORS.surfaceLight,
            overflow: 'hidden',
            boxShadow: `
              0 25px 50px rgba(0, 0, 0, 0.5),
              0 0 0 1px rgba(255, 255, 255, 0.1)
            `,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Simplified browser content fading out */}
          <div
            style={{
              flex: 1,
              backgroundColor: COLORS.background,
              opacity: browserContentOpacity,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Img
              src={staticFile('sof-assets/soflogo.png')}
              style={{
                width: 150,
                height: 'auto',
                opacity: 0.5,
              }}
            />
          </div>
        </div>
      ) : (
        // iPhone appears
        <div
          style={{
            opacity: phoneContentOpacity,
            transform: `scale(${interpolate(settleProgress, [0, 1], [0.9, 1])})`,
          }}
        >
          <IPhoneMockup>
            {/* App grid */}
            <div
              style={{
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
              }}
            >
              {/* Time display */}
              <div
                style={{
                  textAlign: 'center',
                  color: COLORS.text,
                  fontSize: 48,
                  fontWeight: 300,
                  fontFamily: 'system-ui, sans-serif',
                  marginTop: 20,
                }}
              >
                9:41
              </div>

              {/* App icons grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 16,
                  marginTop: 40,
                }}
              >
                {/* SOF App - highlighted */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 12,
                      backgroundColor: COLORS.surface,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      overflow: 'hidden',
                      boxShadow: `0 0 20px ${COLORS.primary}40`,
                      border: `2px solid ${COLORS.primary}`,
                    }}
                  >
                    <Img
                      src={staticFile('sof-assets/soflogo.png')}
                      style={{ width: 40, height: 40, objectFit: 'contain' }}
                    />
                  </div>
                  <span
                    style={{
                      color: COLORS.text,
                      fontSize: 10,
                      fontFamily: 'system-ui, sans-serif',
                    }}
                  >
                    SOF
                  </span>
                </div>

                {/* Placeholder apps */}
                {Array.from({ length: 7 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: 12,
                        backgroundColor: `hsl(${i * 40}, 50%, 30%)`,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </IPhoneMockup>
        </div>
      )}

      {/* Ambient glow during transition */}
      <div
        style={{
          position: 'absolute',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.primary}20 0%, transparent 70%)`,
          filter: 'blur(40px)',
          opacity: interpolate(frame, [20, 50, 70], [0, 0.6, 0]),
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
