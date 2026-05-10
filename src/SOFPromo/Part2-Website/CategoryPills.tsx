import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { COLORS, CATEGORIES, SPRING_CONFIG } from '../data';

interface CategoryPillsProps {
  startFrame: number;
}

export const CategoryPills: React.FC<CategoryPillsProps> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 80,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 12,
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: 800,
      }}
    >
      {CATEGORIES.map((category, index) => {
        const delay = index * 4; // 4 frames between each
        const pillFrame = frame - startFrame - delay;

        const scaleSpring = spring({
          frame: pillFrame,
          fps,
          config: SPRING_CONFIG.bounce,
          durationInFrames: 20,
        });

        const scale = interpolate(scaleSpring, [0, 1], [0, 1]);
        const opacity = interpolate(scaleSpring, [0, 0.5, 1], [0, 1, 1]);

        // Slight float animation after appearing
        const floatY = pillFrame > 20
          ? Math.sin((pillFrame - 20 + index * 10) * 0.08) * 3
          : 0;

        return (
          <div
            key={category}
            style={{
              padding: '10px 24px',
              backgroundColor: index === 1 ? COLORS.primary : COLORS.surfaceLight,
              borderRadius: 25,
              color: COLORS.text,
              fontSize: 16,
              fontWeight: 600,
              fontFamily: 'system-ui, sans-serif',
              transform: `scale(${scale}) translateY(${floatY}px)`,
              opacity,
              boxShadow: index === 1
                ? `0 0 20px ${COLORS.primary}60`
                : '0 4px 12px rgba(0, 0, 0, 0.3)',
              border: `1px solid ${index === 1 ? COLORS.primary : COLORS.surface}`,
            }}
          >
            {category}
          </div>
        );
      })}
    </div>
  );
};
