import React from 'react';
import { COLORS, IPHONE } from '../data';

interface IPhoneMockupProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  showDynamicIsland?: boolean;
}

export const IPhoneMockup: React.FC<IPhoneMockupProps> = ({
  children,
  style = {},
  showDynamicIsland = true,
}) => {
  return (
    <div
      style={{
        width: IPHONE.width,
        height: IPHONE.height,
        borderRadius: IPHONE.borderRadius,
        backgroundColor: '#1C1C1E', // iPhone frame color
        padding: IPHONE.bezelWidth,
        boxShadow: `
          0 50px 100px rgba(0, 0, 0, 0.6),
          0 0 0 1px rgba(255, 255, 255, 0.1),
          inset 0 0 0 1px rgba(255, 255, 255, 0.05)
        `,
        position: 'relative',
        ...style,
      }}
    >
      {/* Screen */}
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: IPHONE.borderRadius - IPHONE.bezelWidth,
          backgroundColor: COLORS.background,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Dynamic Island */}
        {showDynamicIsland && (
          <div
            style={{
              position: 'absolute',
              top: 12,
              left: '50%',
              transform: 'translateX(-50%)',
              width: IPHONE.notchWidth,
              height: IPHONE.notchHeight,
              backgroundColor: '#000',
              borderRadius: 20,
              zIndex: 10,
            }}
          />
        )}

        {/* Content area */}
        <div
          style={{
            width: '100%',
            height: '100%',
            paddingTop: showDynamicIsland ? 50 : 0,
            paddingBottom: 30,
            overflow: 'hidden',
          }}
        >
          {children}
        </div>

        {/* Home indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: 8,
            left: '50%',
            transform: 'translateX(-50%)',
            width: IPHONE.homeIndicatorWidth,
            height: IPHONE.homeIndicatorHeight,
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            borderRadius: 3,
          }}
        />
      </div>

      {/* Side buttons (visual detail) */}
      <div
        style={{
          position: 'absolute',
          right: -3,
          top: 120,
          width: 3,
          height: 60,
          backgroundColor: '#2C2C2E',
          borderRadius: '0 2px 2px 0',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: -3,
          top: 100,
          width: 3,
          height: 30,
          backgroundColor: '#2C2C2E',
          borderRadius: '2px 0 0 2px',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: -3,
          top: 150,
          width: 3,
          height: 50,
          backgroundColor: '#2C2C2E',
          borderRadius: '2px 0 0 2px',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: -3,
          top: 210,
          width: 3,
          height: 50,
          backgroundColor: '#2C2C2E',
          borderRadius: '2px 0 0 2px',
        }}
      />
    </div>
  );
};
