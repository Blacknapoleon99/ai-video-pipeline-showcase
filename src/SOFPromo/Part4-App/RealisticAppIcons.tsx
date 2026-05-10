import React from 'react';
import { Img, staticFile, useCurrentFrame } from 'remotion';
import { COLORS, IOS_APPS } from '../data';

interface AppIconProps {
  app: typeof IOS_APPS[0];
  size?: number;
  showLabel?: boolean;
  isHighlighted?: boolean;
  pulseFrame?: number;
}

// SVG icons for each app type
const IconSVG: React.FC<{ type: string; size: number }> = ({ type, size }) => {
  const iconSize = size * 0.5;
  const color = '#FFFFFF';

  switch (type) {
    case 'camera':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="13" r="4" stroke={color} strokeWidth="2" />
          <path d="M5 7h2l2-2h6l2 2h2a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2z" stroke={color} strokeWidth="2" fill="none" />
        </svg>
      );
    case 'gear':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill={color}>
          <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
        </svg>
      );
    case 'note':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill={color}>
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      );
    case 'bubble':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill={color}>
          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
        </svg>
      );
    case 'compass':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" fill={color} />
        </svg>
      );
    case 'envelope':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      );
    case 'flower':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill={color}>
          <circle cx="12" cy="12" r="3" />
          <circle cx="12" cy="5" r="2.5" fill="#FF9500" />
          <circle cx="17" cy="8" r="2.5" fill="#FF2D55" />
          <circle cx="17" cy="16" r="2.5" fill="#AF52DE" />
          <circle cx="12" cy="19" r="2.5" fill="#5AC8FA" />
          <circle cx="7" cy="16" r="2.5" fill="#34C759" />
          <circle cx="7" cy="8" r="2.5" fill="#FFCC00" />
        </svg>
      );
    default:
      return null;
  }
};

export const AppIcon: React.FC<AppIconProps> = ({
  app,
  size = 60,
  showLabel = true,
  isHighlighted = false,
  pulseFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const highlighted = app.highlighted || isHighlighted;

  // Pulse animation for highlighted app
  const pulseScale = highlighted && pulseFrame > 0
    ? 1 + Math.sin((frame - pulseFrame) * 0.3) * 0.08
    : 1;

  // Gradient background
  const gradient = app.gradient.length > 2
    ? `linear-gradient(135deg, ${app.gradient.join(', ')})`
    : `linear-gradient(135deg, ${app.gradient[0]} 0%, ${app.gradient[1]} 100%)`;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
      }}
    >
      {/* Icon container */}
      <div
        style={{
          width: size,
          height: size,
          borderRadius: size * 0.22, // iOS corner radius
          background: gradient,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transform: `scale(${pulseScale})`,
          boxShadow: highlighted
            ? `0 0 20px ${COLORS.primary}80, 0 4px 15px rgba(0,0,0,0.4)`
            : '0 2px 8px rgba(0,0,0,0.3)',
          border: highlighted ? `2px solid ${COLORS.primary}` : 'none',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Shine overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '50%',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 100%)',
            borderRadius: `${size * 0.22}px ${size * 0.22}px 0 0`,
          }}
        />

        {/* Icon content */}
        {app.icon === 'logo' ? (
          <Img
            src={staticFile('sof-assets/soflogo.png')}
            style={{
              width: size * 0.7,
              height: size * 0.7,
              objectFit: 'contain',
            }}
          />
        ) : (
          <IconSVG type={app.icon} size={size} />
        )}
      </div>

      {/* Label */}
      {showLabel && (
        <span
          style={{
            color: COLORS.text,
            fontSize: 11,
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            fontWeight: 500,
            textShadow: '0 1px 2px rgba(0,0,0,0.5)',
          }}
        >
          {app.name}
        </span>
      )}
    </div>
  );
};

// iOS Status Bar
export const IOSStatusBar: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 20px',
        color: COLORS.text,
        fontSize: 14,
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
        fontWeight: 600,
      }}
    >
      <span>9:41</span>
      <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        {/* Signal bars */}
        <div style={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
          {[4, 6, 8, 10].map((h, i) => (
            <div
              key={i}
              style={{
                width: 3,
                height: h,
                backgroundColor: COLORS.text,
                borderRadius: 1,
              }}
            />
          ))}
        </div>
        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill={COLORS.text}>
          <path d="M8 10.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          <path d="M4.5 7.5c.9-.9 2.1-1.5 3.5-1.5s2.6.6 3.5 1.5" stroke={COLORS.text} strokeWidth="1.5" fill="none" />
          <path d="M2 5c1.6-1.6 3.7-2.5 6-2.5s4.4.9 6 2.5" stroke={COLORS.text} strokeWidth="1.5" fill="none" />
        </svg>
        {/* Battery */}
        <div
          style={{
            width: 24,
            height: 11,
            border: `1px solid ${COLORS.text}`,
            borderRadius: 3,
            padding: 1,
            position: 'relative',
          }}
        >
          <div
            style={{
              width: '80%',
              height: '100%',
              backgroundColor: COLORS.iosGreen,
              borderRadius: 1,
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: -3,
              top: 3,
              width: 2,
              height: 5,
              backgroundColor: COLORS.text,
              borderRadius: '0 1px 1px 0',
            }}
          />
        </div>
      </div>
    </div>
  );
};

// iOS Dock
export const IOSDock: React.FC<{ apps: typeof IOS_APPS }> = ({ apps }) => {
  const dockApps = apps.slice(0, 4);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 20,
        left: 10,
        right: 10,
        height: 85,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(20px)',
        borderRadius: 30,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '0 10px',
      }}
    >
      {dockApps.map((app) => (
        <AppIcon key={app.id} app={app} size={52} showLabel={false} />
      ))}
    </div>
  );
};

// Full iOS Home Screen
interface IOSHomeScreenProps {
  highlightSOF?: boolean;
  pulseFrame?: number;
}

export const IOSHomeScreen: React.FC<IOSHomeScreenProps> = ({
  highlightSOF = false,
  pulseFrame = 0,
}) => {
  const mainApps = IOS_APPS;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Status bar */}
      <IOSStatusBar />

      {/* App grid */}
      <div
        style={{
          flex: 1,
          padding: '40px 20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'repeat(2, auto)',
          gap: '25px 12px',
          justifyItems: 'center',
          alignContent: 'start',
        }}
      >
        {mainApps.map((app) => (
          <AppIcon
            key={app.id}
            app={app}
            size={52}
            isHighlighted={highlightSOF && app.id === 'sof'}
            pulseFrame={highlightSOF && app.id === 'sof' ? pulseFrame : 0}
          />
        ))}
      </div>

      {/* Dock */}
      <IOSDock apps={[
        { id: 'phone', name: 'Phone', gradient: ['#34C759', '#30D158'], icon: 'bubble' },
        { id: 'safari', name: 'Safari', gradient: ['#5AC8FA', '#007AFF'], icon: 'compass' },
        { id: 'messages', name: 'Messages', gradient: ['#34C759', '#30D158'], icon: 'bubble' },
        { id: 'music', name: 'Music', gradient: ['#FC3C44', '#FB5C74'], icon: 'note' },
      ]} />

      {/* Home indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 8,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 120,
          height: 5,
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          borderRadius: 3,
        }}
      />
    </div>
  );
};
