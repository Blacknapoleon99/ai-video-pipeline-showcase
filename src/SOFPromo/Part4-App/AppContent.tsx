import React from 'react';
import { useCurrentFrame, interpolate, Easing, Img, staticFile } from 'remotion';
import { COLORS, CATEGORIES } from '../data';

interface AppContentProps {
  scrollStartFrame: number;
}

export const AppContent: React.FC<AppContentProps> = ({ scrollStartFrame }) => {
  const frame = useCurrentFrame();

  // Scroll animation
  const scrollY = interpolate(
    frame,
    [scrollStartFrame, scrollStartFrame + 30],
    [0, -100],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) }
  );

  // Generate content cards
  const contentCards = [
    { title: 'World Championship Finals', category: 'Gaming', color: COLORS.primary },
    { title: 'The SOF Podcast', category: 'Podcasts', color: '#8B5CF6' },
    { title: 'Live Now: Esports', category: 'Livestreams', color: '#22C55E' },
    { title: 'Chef\'s Kitchen', category: 'Food', color: '#F59E0B' },
    { title: 'Wellness Hour', category: 'Health', color: '#06B6D4' },
  ];

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.background,
        overflow: 'hidden',
      }}
    >
      {/* App header */}
      <div
        style={{
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${COLORS.surface}`,
        }}
      >
        <Img
          src={staticFile('sof-assets/soflogo.png')}
          style={{ width: 36, height: 36 }}
        />
        <span
          style={{
            color: COLORS.text,
            fontSize: 18,
            fontWeight: 700,
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          SOF Media
        </span>
        <div style={{ width: 36 }} /> {/* Spacer for balance */}
      </div>

      {/* Category tabs */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          padding: '12px 16px',
          overflowX: 'hidden',
        }}
      >
        {CATEGORIES.slice(0, 4).map((cat, i) => (
          <div
            key={cat}
            style={{
              padding: '6px 12px',
              backgroundColor: i === 0 ? COLORS.primary : COLORS.surface,
              borderRadius: 16,
              fontSize: 11,
              color: COLORS.text,
              fontFamily: 'system-ui, sans-serif',
              whiteSpace: 'nowrap',
            }}
          >
            {cat}
          </div>
        ))}
      </div>

      {/* Scrolling content */}
      <div
        style={{
          transform: `translateY(${scrollY}px)`,
          padding: '0 16px',
        }}
      >
        {contentCards.map((card, i) => (
          <div
            key={i}
            style={{
              marginBottom: 12,
              borderRadius: 12,
              overflow: 'hidden',
              backgroundColor: COLORS.surface,
            }}
          >
            {/* Card image placeholder */}
            <div
              style={{
                height: 80,
                background: `linear-gradient(135deg, ${card.color}40 0%, ${COLORS.background} 100%)`,
                display: 'flex',
                alignItems: 'flex-end',
                padding: 12,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 8,
                    color: card.color,
                    fontWeight: 600,
                    marginBottom: 4,
                    fontFamily: 'system-ui, sans-serif',
                  }}
                >
                  {card.category.toUpperCase()}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: COLORS.text,
                    fontWeight: 600,
                    fontFamily: 'system-ui, sans-serif',
                  }}
                >
                  {card.title}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
