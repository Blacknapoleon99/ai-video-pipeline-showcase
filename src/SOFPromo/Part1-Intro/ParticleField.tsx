import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';
import { COLORS, PARTICLE_CONFIG, TIMING } from '../data';

interface Particle {
  id: number;
  initialX: number;
  initialY: number;
  size: number;
  speed: number;
  angle: number;
  delay: number;
  color: string;
}

export const ParticleField: React.FC = () => {
  const frame = useCurrentFrame();

  // Generate particles once
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: PARTICLE_CONFIG.count }, (_, i) => ({
      id: i,
      initialX: Math.random() * 100,
      initialY: Math.random() * 100,
      size: PARTICLE_CONFIG.minSize + Math.random() * (PARTICLE_CONFIG.maxSize - PARTICLE_CONFIG.minSize),
      speed: PARTICLE_CONFIG.minSpeed + Math.random() * (PARTICLE_CONFIG.maxSpeed - PARTICLE_CONFIG.minSpeed),
      angle: (i / PARTICLE_CONFIG.count) * Math.PI * 2,
      delay: Math.random() * 20,
      color: Math.random() > 0.7 ? COLORS.primary : COLORS.text,
    }));
  }, []);

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      {particles.map((particle) => {
        // Phase 1: Floating (frames 0-30)
        const floatX = Math.sin((frame + particle.delay) * particle.speed * 0.05) * 30;
        const floatY = Math.cos((frame + particle.delay) * particle.speed * 0.03) * 20;

        // Phase 2: Swirling toward center (frames 30-60)
        const swirlProgress = interpolate(
          frame,
          [TIMING.PARTICLES_SWIRL, TIMING.PARTICLES_COMPRESS],
          [0, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.quad) }
        );

        // Phase 3: Compress into center (frames 60-90)
        const compressProgress = interpolate(
          frame,
          [TIMING.PARTICLES_COMPRESS, TIMING.LOGO_EMERGE],
          [0, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.cubic) }
        );

        // Phase 4: Explode outward (frames 90-120)
        const explodeProgress = interpolate(
          frame,
          [TIMING.LOGO_EMERGE, TIMING.LOGO_SETTLE],
          [0, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
        );

        // Calculate swirl position (spiral inward)
        const swirlRadius = interpolate(swirlProgress, [0, 1], [50, 20]);
        const swirlAngle = particle.angle + swirlProgress * Math.PI * 4;
        const swirlX = 50 + Math.cos(swirlAngle) * swirlRadius;
        const swirlY = 50 + Math.sin(swirlAngle) * swirlRadius;

        // Blend between floating and swirling
        const preCompressX = interpolate(swirlProgress, [0, 1], [particle.initialX + floatX * 0.1, swirlX]);
        const preCompressY = interpolate(swirlProgress, [0, 1], [particle.initialY + floatY * 0.1, swirlY]);

        // Compress to center
        const compressedX = interpolate(compressProgress, [0, 1], [preCompressX, 50]);
        const compressedY = interpolate(compressProgress, [0, 1], [preCompressY, 50]);

        // Explode outward
        const explodeAngle = particle.angle + Math.random() * 0.5;
        const explodeDistance = 60 + Math.random() * 40;
        const finalX = interpolate(explodeProgress, [0, 1], [compressedX, 50 + Math.cos(explodeAngle) * explodeDistance]);
        const finalY = interpolate(explodeProgress, [0, 1], [compressedY, 50 + Math.sin(explodeAngle) * explodeDistance]);

        // Opacity: fade out after explosion
        const opacity = interpolate(
          frame,
          [0, TIMING.LOGO_EMERGE, TIMING.LOGO_SETTLE, TIMING.INTRO_END],
          [0.8, 1, 0.6, 0],
          { extrapolateRight: 'clamp' }
        );

        // Scale up during compression, then shrink during explosion
        const scale = interpolate(
          frame,
          [TIMING.PARTICLES_COMPRESS, TIMING.LOGO_EMERGE, TIMING.LOGO_SETTLE],
          [1, 2, 0.5],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        return (
          <div
            key={particle.id}
            style={{
              position: 'absolute',
              left: `${finalX}%`,
              top: `${finalY}%`,
              width: particle.size * scale,
              height: particle.size * scale,
              borderRadius: '50%',
              backgroundColor: particle.color,
              opacity,
              boxShadow: particle.color === COLORS.primary
                ? `0 0 ${particle.size * 2}px ${particle.color}`
                : 'none',
              transform: 'translate(-50%, -50%)',
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
