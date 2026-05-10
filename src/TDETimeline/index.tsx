import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
  Sequence,
} from 'remotion';
import { loadFont } from '@remotion/google-fonts/Oswald';
import { loadFont as loadInterFont } from '@remotion/google-fonts/Inter';
import { EventCard } from './EventCard';
import { TimelineLine } from './TimelineLine';
import { tdeEvents } from './data';

const { fontFamily: titleFont } = loadFont('normal', {
  weights: ['700'],
  subsets: ['latin'],
});

const { fontFamily: bodyFont } = loadInterFont('normal', {
  weights: ['400', '700'],
  subsets: ['latin'],
});

const CARD_WIDTH = 320;
const CARD_GAP = 60;
const CARD_SECTION_START = 500; // Where cards start appearing
const TOTAL_CARDS = tdeEvents.length;
const TOTAL_WIDTH = CARD_SECTION_START + (CARD_WIDTH + CARD_GAP) * TOTAL_CARDS + 400;

export const TDETimeline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  // Title animation (first 3 seconds)
  const titleOpacity = interpolate(frame, [0, fps], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const titleScale = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  // Title exit (starts at 2.5s)
  const titleExit = interpolate(frame, [2.5 * fps, 3.5 * fps], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.quad),
  });

  const titleY = interpolate(titleExit, [0, 1], [0, -200]);
  const titleFinalOpacity = interpolate(titleExit, [0, 1], [1, 0]);

  // Scrolling animation (starts after title, from 3s onwards)
  const scrollStartFrame = 3 * fps;
  const scrollEndFrame = durationInFrames - 2 * fps;

  const scrollProgress = interpolate(
    frame,
    [scrollStartFrame, scrollEndFrame],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.inOut(Easing.quad),
    }
  );

  const scrollX = interpolate(scrollProgress, [0, 1], [0, -(TOTAL_WIDTH - width)]);

  // Calculate which card is currently in focus
  const activeCardIndex = Math.floor(
    interpolate(scrollProgress, [0, 1], [0, TOTAL_CARDS - 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  // Background particles
  const particles = Array.from({ length: 30 }, (_, i) => ({
    x: (i * 137.508) % 100,
    y: (i * 73.254) % 100,
    size: 2 + (i % 4),
    speed: 0.5 + (i % 3) * 0.3,
    delay: i * 10,
  }));

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0A0000',
        overflow: 'hidden',
      }}
    >
      {/* Animated background gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(139, 0, 0, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 50%, rgba(220, 20, 60, 0.2) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 100%, rgba(255, 0, 0, 0.15) 0%, transparent 40%)
          `,
        }}
      />

      {/* Floating particles */}
      {particles.map((particle, i) => {
        const particleY = interpolate(
          (frame + particle.delay) * particle.speed,
          [0, 500],
          [100 + particle.y, -10],
          { extrapolateRight: 'wrap' as const }
        );

        const particleOpacity = interpolate(
          frame,
          [particle.delay, particle.delay + fps],
          [0, 0.5],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${particle.x}%`,
              top: `${particleY}%`,
              width: particle.size,
              height: particle.size,
              borderRadius: '50%',
              backgroundColor: '#FF000040',
              opacity: particleOpacity,
              boxShadow: '0 0 10px #FF0000',
            }}
          />
        );
      })}

      {/* Title Section */}
      <div
        style={{
          position: 'absolute',
          top: 80,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
          opacity: titleOpacity * titleFinalOpacity,
          transform: `scale(${titleScale}) translateY(${titleY}px)`,
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontFamily: titleFont,
            fontSize: 120,
            color: '#FFFFFF',
            letterSpacing: 15,
            textShadow: '0 0 30px #FF0000, 0 0 60px #FF000080',
          }}
        >
          TDE
        </div>
        <div
          style={{
            fontFamily: bodyFont,
            fontSize: 28,
            color: '#DC143C',
            letterSpacing: 8,
            textTransform: 'uppercase',
            fontWeight: 700,
          }}
        >
          Top Dawg Entertainment
        </div>
        <div
          style={{
            fontFamily: bodyFont,
            fontSize: 18,
            color: '#888888',
            letterSpacing: 4,
          }}
        >
          A Legacy in Hip-Hop • 2004 - Present
        </div>
      </div>

      {/* Scrolling Timeline Container */}
      <Sequence from={Math.floor(2 * fps)} premountFor={fps}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: TOTAL_WIDTH,
            height: '100%',
            transform: `translateX(${scrollX}px)`,
          }}
        >
          {/* Timeline Line */}
          <TimelineLine scrollProgress={scrollProgress} totalWidth={TOTAL_WIDTH} />

          {/* Event Cards */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: CARD_SECTION_START,
              display: 'flex',
              gap: CARD_GAP,
              transform: 'translateY(-50%)',
              paddingTop: 60,
            }}
          >
            {tdeEvents.map((event, index) => (
              <div
                key={index}
                style={{
                  position: 'relative',
                  marginTop: index % 2 === 0 ? -150 : 150,
                }}
              >
                <EventCard
                  event={event}
                  index={index}
                  isActive={index === activeCardIndex}
                />
              </div>
            ))}
          </div>
        </div>
      </Sequence>

      {/* Progress indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          left: 60,
          right: 60,
          height: 4,
          backgroundColor: '#1A0000',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${scrollProgress * 100}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #8B0000, #FF0000)',
            boxShadow: '0 0 10px #FF0000',
            borderRadius: 2,
          }}
        />
      </div>

      {/* Year indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 60,
          right: 60,
          fontFamily: titleFont,
          fontSize: 48,
          color: '#FF0000',
          textShadow: '0 0 20px #FF0000',
          opacity: scrollProgress > 0 ? 1 : 0,
        }}
      >
        {tdeEvents[activeCardIndex]?.year || ''}
      </div>

      {/* Vignette overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.6) 100%)',
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
