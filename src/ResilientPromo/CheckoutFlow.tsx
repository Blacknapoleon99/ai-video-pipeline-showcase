import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img, staticFile, Easing } from 'remotion';
import { COLORS, SPRING_CONFIG, BRAND } from './data';

/**
 * Checkout Flow - Shows the real collection and checkout screenshots
 *
 * Timeline (180 frames = 6 seconds):
 * 0-60: Collection page with cursor moving to product
 * 60-80: Click on product, add to cart animation
 * 80-120: Transition to checkout screenshot
 * 120-160: Checkout visible with processing
 * 160-180: Success animation
 */
export const CheckoutFlow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Browser mockup animation
  const browserOpacity = interpolate(
    frame,
    [0, 15],
    [0, 1],
    { extrapolateRight: 'clamp' }
  );

  // Cursor movement to Green Tee (second product)
  const cursorX = interpolate(
    frame,
    [20, 50, 60, 65],
    [700, 380, 380, 390],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) }
  );

  const cursorY = interpolate(
    frame,
    [20, 50, 60, 65],
    [200, 280, 280, 285],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) }
  );

  // Click animation
  const isClicking = frame >= 55 && frame <= 65;
  const clickScale = isClicking
    ? interpolate(frame, [55, 58, 65], [1, 0.8, 1])
    : 1;

  // Add to cart popup
  const cartPopupSpring = spring({
    frame: frame - 65,
    fps,
    config: SPRING_CONFIG.snappy,
    durationInFrames: 15,
  });

  const cartPopupScale = interpolate(cartPopupSpring, [0, 1], [0.8, 1]);
  const cartPopupOpacity = frame >= 65 && frame < 85
    ? interpolate(cartPopupSpring, [0, 1], [0, 1])
    : frame >= 85
    ? interpolate(frame, [85, 95], [1, 0], { extrapolateRight: 'clamp' })
    : 0;

  // Transition to checkout
  const showCollection = frame < 90;
  const showCheckout = frame >= 80;

  const checkoutOpacity = interpolate(
    frame,
    [80, 100],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const checkoutScale = interpolate(
    frame,
    [80, 100],
    [0.95, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Processing animation (dots)
  const processingDots = Math.floor((frame - 120) / 10) % 4;

  // Success animation
  const successSpring = spring({
    frame: frame - 155,
    fps,
    config: SPRING_CONFIG.bounce,
    durationInFrames: 25,
  });

  const successScale = interpolate(successSpring, [0, 1], [0, 1]);
  const successOpacity = frame >= 155 ? interpolate(successSpring, [0, 1], [0, 1]) : 0;

  const showSuccess = frame >= 155;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Browser mockup */}
      <div
        style={{
          width: 1100,
          height: 650,
          borderRadius: 12,
          backgroundColor: COLORS.secondary,
          overflow: 'hidden',
          boxShadow: '0 25px 80px rgba(0, 0, 0, 0.15)',
          opacity: browserOpacity,
          position: 'relative',
        }}
      >
        {/* Browser toolbar */}
        <div
          style={{
            height: 36,
            backgroundColor: '#F0F0F0',
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
            gap: 8,
            borderBottom: '1px solid #E0E0E0',
          }}
        >
          {/* Traffic lights */}
          <div style={{ display: 'flex', gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#FF5F57' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#FFBD2E' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#28CA41' }} />
          </div>

          {/* Address bar */}
          <div
            style={{
              flex: 1,
              maxWidth: 400,
              height: 24,
              backgroundColor: '#FFFFFF',
              borderRadius: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 60,
              border: '1px solid #E0E0E0',
            }}
          >
            <span style={{ color: '#666', fontSize: 12, fontFamily: 'system-ui' }}>
              {showCheckout && !showCollection ? 'checkout.stripe.com' : 'stay-resilient.com/collection'}
            </span>
          </div>
        </div>

        {/* Content area */}
        <div
          style={{
            height: 'calc(100% - 36px)',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Collection page */}
          {showCollection && (
            <div
              style={{
                opacity: showCheckout ? interpolate(frame, [80, 95], [1, 0], { extrapolateRight: 'clamp' }) : 1,
                position: 'absolute',
                width: '100%',
                height: '100%',
              }}
            >
              <Img
                src={staticFile('resilient-assets/collection.png')}
                style={{
                  width: '100%',
                  height: 'auto',
                }}
              />


              {/* Add to Cart popup */}
              {cartPopupOpacity > 0 && (
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: `translate(-50%, -50%) scale(${cartPopupScale})`,
                    backgroundColor: COLORS.secondary,
                    padding: '24px 40px',
                    borderRadius: 12,
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
                    opacity: cartPopupOpacity,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      backgroundColor: '#22C55E',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13L9 17L19 7" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div style={{ fontFamily: 'system-ui', fontWeight: 600, fontSize: 18, color: COLORS.primary }}>
                    Added to Cart!
                  </div>
                  <div style={{ fontFamily: 'system-ui', fontSize: 14, color: '#666' }}>
                    Green Tee - $49.99
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Checkout page */}
          {showCheckout && !showSuccess && (
            <div
              style={{
                opacity: checkoutOpacity,
                transform: `scale(${checkoutScale})`,
                position: 'absolute',
                width: '100%',
                height: '100%',
              }}
            >
              <Img
                src={staticFile('resilient-assets/checkout.png')}
                style={{
                  width: '100%',
                  height: 'auto',
                }}
              />

              {/* Processing overlay */}
              {frame >= 130 && frame < 155 && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 20,
                  }}
                >
                  {/* Spinner */}
                  <div
                    style={{
                      width: 50,
                      height: 50,
                      border: '4px solid #E0E0E0',
                      borderTopColor: COLORS.primary,
                      borderRadius: '50%',
                      transform: `rotate(${(frame - 130) * 15}deg)`,
                    }}
                  />
                  <div style={{ fontFamily: 'system-ui', fontSize: 18, color: COLORS.primary }}>
                    Processing{'.'.repeat(processingDots)}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Success overlay */}
          {showSuccess && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: COLORS.secondary,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 24,
                transform: `scale(${successScale})`,
                opacity: successOpacity,
              }}
            >
              {/* Checkmark circle */}
              <div
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  backgroundColor: '#22C55E',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow: '0 10px 40px rgba(34, 197, 94, 0.3)',
                }}
              >
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 13L9 17L19 7"
                    stroke="#FFFFFF"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div style={{ textAlign: 'center' }}>
                <h2 style={{ margin: 0, fontSize: 32, color: COLORS.primary, fontFamily: 'system-ui' }}>
                  Order Confirmed!
                </h2>
                <p style={{ margin: '12px 0 0', color: '#666', fontSize: 16, fontFamily: 'system-ui' }}>
                  Thank you for shopping with {BRAND.name}
                </p>
                <p style={{ margin: '8px 0 0', color: '#999', fontSize: 14, fontFamily: 'system-ui' }}>
                  Green Tee • $55.98
                </p>
              </div>
            </div>
          )}

          {/* Cursor */}
          {frame >= 20 && frame < 80 && (
            <div
              style={{
                position: 'absolute',
                left: cursorX,
                top: cursorY,
                transform: `scale(${clickScale})`,
                pointerEvents: 'none',
                zIndex: 100,
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 3L19 12L12 13L9 20L5 3Z"
                  fill={COLORS.primary}
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};
