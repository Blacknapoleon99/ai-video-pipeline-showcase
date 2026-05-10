import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';
import { loadFont } from '@remotion/google-fonts/Inter';
import { TDEEvent, getEventColor } from './data';

const { fontFamily } = loadFont('normal', {
  weights: ['400', '700', '900'],
  subsets: ['latin'],
});

type EventCardProps = {
  event: TDEEvent;
  index: number;
  isActive: boolean;
};

export const EventCard: React.FC<EventCardProps> = ({ event, index, isActive }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = index * 3;

  const entranceProgress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
  });

  const scale = interpolate(entranceProgress, [0, 1], [0.8, 1]);
  const opacity = interpolate(entranceProgress, [0, 1], [0, 1]);
  const translateY = interpolate(entranceProgress, [0, 1], [50, 0]);

  const glowIntensity = isActive
    ? interpolate(
        Math.sin(frame * 0.1),
        [-1, 1],
        [10, 25]
      )
    : 0;

  const eventColor = getEventColor(event.type);

  return (
    <div
      style={{
        width: 320,
        minHeight: 200,
        backgroundColor: 'rgba(20, 0, 0, 0.9)',
        borderRadius: 16,
        padding: 24,
        border: `2px solid ${eventColor}`,
        boxShadow: isActive
          ? `0 0 ${glowIntensity}px ${eventColor}, 0 0 ${glowIntensity * 2}px ${eventColor}40`
          : `0 4px 20px rgba(0, 0, 0, 0.5)`,
        transform: `scale(${scale}) translateY(${translateY}px)`,
        opacity,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        fontFamily,
        flexShrink: 0,
      }}
    >
      {/* Year Badge */}
      <div
        style={{
          backgroundColor: eventColor,
          color: '#FFFFFF',
          padding: '8px 16px',
          borderRadius: 8,
          fontSize: 28,
          fontWeight: 900,
          alignSelf: 'flex-start',
          letterSpacing: 2,
        }}
      >
        {event.year}
      </div>

      {/* Event Type Tag */}
      <div
        style={{
          color: eventColor,
          fontSize: 12,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: 3,
        }}
      >
        {event.type}
      </div>

      {/* Title */}
      <div
        style={{
          color: '#FFFFFF',
          fontSize: 22,
          fontWeight: 700,
          lineHeight: 1.2,
        }}
      >
        {event.title}
      </div>

      {/* Description */}
      <div
        style={{
          color: '#AAAAAA',
          fontSize: 14,
          lineHeight: 1.5,
        }}
      >
        {event.description}
      </div>

      {/* Decorative line */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          width: 2,
          height: 40,
          backgroundColor: eventColor,
          transform: 'translateX(-50%) translateY(100%)',
        }}
      />
    </div>
  );
};
