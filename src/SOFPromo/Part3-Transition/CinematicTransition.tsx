import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing, Img, staticFile } from 'remotion';
import { IPhoneMockup } from './IPhoneMockup';
import { IOSHomeScreen } from '../Part4-App/RealisticAppIcons';
import { COLORS } from '../data';

/**
 * Cinematic Transition - Replaces the ugly morph with a cool cut effect
 *
 * Timeline (120 frames = 4 seconds):
 * 0-20: Website zooms in and blurs
 * 20-40: Flash/glitch effect
 * 40-80: iPhone slides in with 3D rotation
 * 80-120: Phone settles, shows realistic home screen
 */
export const CinematicTransition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Website zoom and blur (0-20)
  const zoomProgress = interpolate(
    frame,
    [0, 20],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.cubic) }
  );

  const websiteScale = interpolate(zoomProgress, [0, 1], [1, 2.5]);
  const websiteBlur = interpolate(zoomProgress, [0, 1], [0, 20]);
  const websiteOpacity = interpolate(zoomProgress, [0, 0.7, 1], [1, 0.8, 0]);

  // Phase 2: Flash/glitch effect (20-40)
  const flashOpacity = interpolate(
    frame,
    [18, 22, 25, 30, 35, 40],
    [0, 1, 0.3, 0.8, 0.2, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Glitch displacement
  const glitchActive = frame >= 20 && frame <= 40;
  const glitchX = glitchActive ? Math.sin(frame * 5) * 30 : 0;
  const glitchY = glitchActive ? Math.cos(frame * 7) * 15 : 0;

  // Phase 3: iPhone slides in (40-80)
  const phoneSpring = spring({
    frame: frame - 40,
    fps,
    config: {
      damping: 15,
      mass: 1,
      stiffness: 100,
    },
    durationInFrames: 40,
  });

  // Phone comes from right with rotation
  const phoneX = interpolate(phoneSpring, [0, 1], [600, 0]);
  const phoneRotateY = interpolate(phoneSpring, [0, 1], [-60, 0]);
  const phoneRotateZ = interpolate(phoneSpring, [0, 1], [15, 0]);
  const phoneOpacity = interpolate(
    frame,
    [40, 50],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Subtle float after settling
  const floatY = frame > 80
    ? Math.sin((frame - 80) * 0.1) * 5
    : 0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
        perspective: 1000,
      }}
    >
      {/* Website zooming out/blurring */}
      {frame < 30 && (
        <div
          style={{
            position: 'absolute',
            transform: `scale(${websiteScale}) translate(${glitchX}px, ${glitchY}px)`,
            filter: `blur(${websiteBlur}px)`,
            opacity: websiteOpacity,
          }}
        >
          <Img
            src={staticFile('sof-assets/website-screenshot.png')}
            style={{
              width: 1000,
              height: 'auto',
              borderRadius: 12,
            }}
          />
        </div>
      )}

      {/* Flash/glitch overlay */}
      {glitchActive && (
        <>
          {/* White flash */}
          <AbsoluteFill
            style={{
              backgroundColor: '#FFFFFF',
              opacity: flashOpacity,
              mixBlendMode: 'overlay',
            }}
          />
          {/* Red accent flash */}
          <AbsoluteFill
            style={{
              backgroundColor: COLORS.primary,
              opacity: flashOpacity * 0.5,
              mixBlendMode: 'color-dodge',
            }}
          />
          {/* Scan lines effect */}
          <AbsoluteFill
            style={{
              background: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(0, 0, 0, 0.3) 2px,
                rgba(0, 0, 0, 0.3) 4px
              )`,
              opacity: flashOpacity * 0.8,
            }}
          />
          {/* Chromatic aberration simulation */}
          <div
            style={{
              position: 'absolute',
              width: 100,
              height: 100,
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) translate(${Math.sin(frame * 10) * 50}px, 0)`,
              background: `radial-gradient(circle, ${COLORS.primary}40 0%, transparent 70%)`,
              filter: 'blur(30px)',
              opacity: flashOpacity,
            }}
          />
        </>
      )}

      {/* iPhone sliding in with 3D rotation */}
      {frame >= 40 && (
        <div
          style={{
            transform: `
              translateX(${phoneX}px)
              translateY(${floatY}px)
              rotateY(${phoneRotateY}deg)
              rotateZ(${phoneRotateZ}deg)
            `,
            opacity: phoneOpacity,
            transformStyle: 'preserve-3d',
          }}
        >
          <IPhoneMockup>
            <IOSHomeScreen highlightSOF={frame > 80} pulseFrame={80} />
          </IPhoneMockup>

          {/* Phone glow effect */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 400,
              height: 700,
              transform: 'translate(-50%, -50%)',
              background: `radial-gradient(ellipse, ${COLORS.primary}20 0%, transparent 60%)`,
              filter: 'blur(40px)',
              zIndex: -1,
              opacity: interpolate(frame, [60, 90], [0, 0.8], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            }}
          />
        </div>
      )}

      {/* Ambient particles during transition */}
      {frame >= 20 && frame <= 60 && (
        <AbsoluteFill style={{ overflow: 'hidden', pointerEvents: 'none' }}>
          {Array.from({ length: 20 }).map((_, i) => {
            const particleProgress = (frame - 20) / 40;
            const x = 50 + Math.sin(i * 0.8 + frame * 0.1) * 40;
            const y = 50 + Math.cos(i * 0.6 + frame * 0.15) * 30;
            const size = 2 + Math.random() * 4;
            const opacity = interpolate(
              particleProgress,
              [0, 0.3, 0.7, 1],
              [0, 0.8, 0.8, 0]
            );

            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: `${x}%`,
                  top: `${y}%`,
                  width: size,
                  height: size,
                  borderRadius: '50%',
                  backgroundColor: i % 3 === 0 ? COLORS.primary : COLORS.text,
                  opacity,
                  boxShadow: i % 3 === 0 ? `0 0 ${size * 2}px ${COLORS.primary}` : 'none',
                }}
              />
            );
          })}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
