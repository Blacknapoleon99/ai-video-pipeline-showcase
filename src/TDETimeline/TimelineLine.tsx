import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from 'remotion';
import { tdeEvents, getEventColor } from './data';

type TimelineLineProps = {
  scrollProgress: number;
  totalWidth: number;
};

export const TimelineLine: React.FC<TimelineLineProps> = ({
  scrollProgress,
  totalWidth,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animate the line drawing
  const lineProgress = interpolate(frame, [0, 2 * fps], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: 0,
        width: totalWidth,
        height: 4,
        transform: 'translateY(-50%)',
      }}
    >
      {/* Main timeline line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: `${lineProgress * 100}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #8B0000 0%, #FF0000 50%, #DC143C 100%)',
          boxShadow: '0 0 20px #FF000080, 0 0 40px #FF000040',
          borderRadius: 2,
        }}
      />

      {/* Year markers */}
      {tdeEvents.map((event, index) => {
        const markerPosition = (index / (tdeEvents.length - 1)) * 100;
        const eventColor = getEventColor(event.type);

        const markerDelay = index * 5;
        const markerOpacity = interpolate(
          frame - markerDelay,
          [0, fps * 0.5],
          [0, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        const pulseScale = interpolate(
          Math.sin(frame * 0.08 + index),
          [-1, 1],
          [0.9, 1.1]
        );

        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: `${markerPosition}%`,
              top: '50%',
              transform: `translate(-50%, -50%) scale(${pulseScale})`,
              opacity: markerOpacity,
            }}
          >
            {/* Outer glow */}
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                backgroundColor: `${eventColor}40`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 0 15px ${eventColor}`,
              }}
            >
              {/* Inner dot */}
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: eventColor,
                  boxShadow: `0 0 10px ${eventColor}`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
