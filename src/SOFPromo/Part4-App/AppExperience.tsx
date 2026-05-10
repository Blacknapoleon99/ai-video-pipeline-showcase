import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { IPhoneMockup } from '../Part3-Transition/IPhoneMockup';
import { TapAnimation } from './TapAnimation';
import { AppContent } from './AppContent';
import { BrandingFinale } from './BrandingFinale';
import { IOSHomeScreen } from './RealisticAppIcons';
import { COLORS, SPRING_CONFIG } from '../data';

/**
 * App Experience - Improved with realistic iOS UI
 *
 * Timeline (300 frames = 10 seconds):
 * 0-40: Realistic iOS home screen (SOF app highlighted)
 * 40-60: Finger tap indicator appears
 * 60-80: Tap animation with ripple
 * 80-120: App opens with iOS-style zoom
 * 120-180: App content with scrolling feed
 * 180-300: Branding finale (SOF, Resilient, Mealbymannie)
 */
export const AppExperience: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase detection
  const showHomeScreen = frame < 80;
  const showAppOpening = frame >= 80 && frame < 180;
  const showBranding = frame >= 180;

  // Home screen SOF app pulse (frames 0-60)
  const sofPulseActive = frame < 60;

  // Finger indicator (frames 40-60)
  const fingerOpacity = interpolate(
    frame,
    [40, 50, 55, 65],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // App open animation (frames 80-120)
  const appOpenSpring = spring({
    frame: frame - 80,
    fps,
    config: SPRING_CONFIG.snappy,
    durationInFrames: 40,
  });

  const appOpenScale = interpolate(appOpenSpring, [0, 1], [0, 1]);
  const appOpenOpacity = interpolate(appOpenSpring, [0, 0.3, 1], [0, 1, 1]);

  // Phone fades out as branding appears
  const phoneOpacity = interpolate(
    frame,
    [170, 185],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Phone subtle float
  const phoneFloat = Math.sin(frame * 0.05) * 3;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Phone with realistic iOS UI */}
      {!showBranding && (
        <div
          style={{
            opacity: phoneOpacity,
            transform: `translateY(${phoneFloat}px)`,
          }}
        >
          <IPhoneMockup>
            {showHomeScreen ? (
              // Realistic iOS home screen
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <IOSHomeScreen
                  highlightSOF={sofPulseActive}
                  pulseFrame={0}
                />

                {/* Finger indicator */}
                {fingerOpacity > 0 && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 155, // Position over SOF app
                      left: 35,
                      opacity: fingerOpacity,
                    }}
                  >
                    {/* Finger/hand indicator */}
                    <div
                      style={{
                        width: 30,
                        height: 40,
                        background: 'linear-gradient(135deg, #FFE4C4 0%, #DEB887 100%)',
                        borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                        transform: 'rotate(-20deg)',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                      }}
                    />
                  </div>
                )}

                {/* Tap animation */}
                <TapAnimation
                  startFrame={60}
                  x={56}  // Center of SOF app icon
                  y={145}
                />
              </div>
            ) : showAppOpening ? (
              // App content opening with iOS zoom effect
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  transform: `scale(${appOpenScale})`,
                  opacity: appOpenOpacity,
                  transformOrigin: 'top left',
                  borderRadius: 40,
                  overflow: 'hidden',
                }}
              >
                <AppContent scrollStartFrame={120 - 80} />
              </div>
            ) : null}
          </IPhoneMockup>

          {/* Phone ambient glow */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 350,
              height: 650,
              transform: 'translate(-50%, -50%)',
              background: `radial-gradient(ellipse, ${COLORS.primary}20 0%, transparent 60%)`,
              filter: 'blur(50px)',
              zIndex: -1,
              opacity: 0.6,
            }}
          />
        </div>
      )}

      {/* Branding finale */}
      {showBranding && (
        <BrandingFinale
          sofLogoFrame={180}
          resilientFrame={220}
          mealbymannieFrame={250}
        />
      )}

      {/* Ambient background glow */}
      <div
        style={{
          position: 'absolute',
          width: 800,
          height: 800,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.primary}10 0%, transparent 50%)`,
          filter: 'blur(80px)',
          opacity: interpolate(
            Math.sin(frame * 0.03),
            [-1, 1],
            [0.2, 0.5]
          ),
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
