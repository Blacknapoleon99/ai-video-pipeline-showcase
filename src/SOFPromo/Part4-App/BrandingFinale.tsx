import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, Img, staticFile } from 'remotion';
import { COLORS, SPRING_CONFIG } from '../data';

interface BrandingFinaleProps {
  sofLogoFrame: number;
  resilientFrame: number;
  mealbymannieFrame: number;
}

export const BrandingFinale: React.FC<BrandingFinaleProps> = ({
  sofLogoFrame,
  resilientFrame,
  mealbymannieFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // SOF Logo animation
  const sofSpring = spring({
    frame: frame - sofLogoFrame,
    fps,
    config: SPRING_CONFIG.bounce,
    durationInFrames: 25,
  });

  const sofScale = interpolate(sofSpring, [0, 1], [0, 1]);
  const sofOpacity = interpolate(sofSpring, [0, 0.3, 1], [0, 1, 1]);

  // Resilient logo animation
  const resilientSpring = spring({
    frame: frame - resilientFrame,
    fps,
    config: SPRING_CONFIG.smooth,
    durationInFrames: 20,
  });

  const resilientY = interpolate(resilientSpring, [0, 1], [30, 0]);
  const resilientOpacity = interpolate(resilientSpring, [0, 1], [0, 1]);

  // Mealbymannie logo animation
  const mealbymannieSpring = spring({
    frame: frame - mealbymannieFrame,
    fps,
    config: SPRING_CONFIG.smooth,
    durationInFrames: 20,
  });

  const mealbymannieY = interpolate(mealbymannieSpring, [0, 1], [30, 0]);
  const mealbymannieOpacity = interpolate(mealbymannieSpring, [0, 1], [0, 1]);

  // Final glow pulse
  const glowPulse = frame > mealbymannieFrame + 15
    ? Math.sin((frame - mealbymannieFrame - 15) * 0.1) * 0.3 + 0.7
    : 0;

  // Fade to black at very end (relative to mealbymannie frame)
  const fadeToBlack = interpolate(
    frame,
    [mealbymannieFrame + 40, mealbymannieFrame + 50],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <>
      {/* Main branding container */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 30,
        }}
      >
        {/* SOF Logo - Main */}
        {frame >= sofLogoFrame && (
          <div
            style={{
              transform: `scale(${sofScale})`,
              opacity: sofOpacity,
              filter: `drop-shadow(0 0 ${30 * glowPulse}px ${COLORS.primary})`,
            }}
          >
            <Img
              src={staticFile('sof-assets/soflogo.png')}
              style={{
                width: 200,
                height: 'auto',
              }}
            />
          </div>
        )}

        {/* Sub-brands container */}
        <div
          style={{
            display: 'flex',
            gap: 40,
            alignItems: 'center',
          }}
        >
          {/* Resilient Logo */}
          {frame >= resilientFrame && (
            <div
              style={{
                transform: `translateY(${resilientY}px)`,
                opacity: resilientOpacity,
              }}
            >
              <Img
                src={staticFile('sof-assets/resilientlogo.png')}
                style={{
                  width: 120,
                  height: 'auto',
                  filter: 'brightness(1.2)',
                }}
              />
            </div>
          )}

          {/* Mealbymannie Logo */}
          {frame >= mealbymannieFrame && (
            <div
              style={{
                transform: `translateY(${mealbymannieY}px)`,
                opacity: mealbymannieOpacity,
              }}
            >
              <Img
                src={staticFile('sof-assets/mealbymannie-logo.png')}
                style={{
                  width: 120,
                  height: 'auto',
                }}
              />
            </div>
          )}
        </div>

        {/* Tagline */}
        {frame >= mealbymannieFrame + 10 && (
          <div
            style={{
              color: COLORS.textMuted,
              fontSize: 16,
              fontFamily: 'system-ui, sans-serif',
              letterSpacing: 4,
              textTransform: 'uppercase',
              opacity: interpolate(
                frame,
                [mealbymannieFrame + 10, mealbymannieFrame + 20],
                [0, 1],
                { extrapolateRight: 'clamp' }
              ),
            }}
          >
            Stream • Create • Dominate
          </div>
        )}
      </div>

      {/* Fade to black overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#000',
          opacity: fadeToBlack,
          pointerEvents: 'none',
        }}
      />
    </>
  );
};
