import React from 'react';
import { COLORS, BROWSER } from '../data';

interface BrowserMockupProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
  borderRadius?: number;
}

export const BrowserMockup: React.FC<BrowserMockupProps> = ({
  children,
  style = {},
  width = BROWSER.width,
  height = BROWSER.height,
  borderRadius = BROWSER.borderRadius,
}) => {
  return (
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
        ...style,
      }}
    >
      {/* Browser toolbar */}
      <div
        style={{
          height: BROWSER.toolbarHeight,
          backgroundColor: COLORS.surface,
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          gap: 12,
          borderBottom: `1px solid ${COLORS.background}`,
        }}
      >
        {/* Traffic lights */}
        <div style={{ display: 'flex', gap: 8 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: '#FF5F57',
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: '#FFBD2E',
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: '#28CA41',
            }}
          />
        </div>

        {/* Address bar */}
        <div
          style={{
            flex: 1,
            maxWidth: BROWSER.addressBarWidth,
            height: 26,
            backgroundColor: COLORS.background,
            borderRadius: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 40,
          }}
        >
          <span
            style={{
              color: COLORS.textMuted,
              fontSize: 13,
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            sof-media.com
          </span>
        </div>
      </div>

      {/* Browser content area */}
      <div
        style={{
          flex: 1,
          backgroundColor: COLORS.background,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {children}
      </div>
    </div>
  );
};
