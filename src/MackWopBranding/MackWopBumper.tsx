import React from "react";
import {loadFont} from "@remotion/google-fonts/BebasNeue";
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type {MackWopBumperProps} from "./schema";

const {fontFamily: headingFont} = loadFont("normal", {
  weights: ["400"],
  subsets: ["latin"],
});

const FADE_IN_END = 12;
const PORTRAIT_START = 8;
const PORTRAIT_END = 126;
const LOGO_START = 22;
const LOGO_END = 138;
const TITLE_START = 42;
const TITLE_END = 162;
const FADE_OUT_START = 156;
const TOTAL_FRAMES = 180;

type PortraitVisual = {
  opacity: number;
  scale: number;
  x: number;
  y: number;
};

const resolvePortraitVisual = (frame: number, index: number, total: number): PortraitVisual => {
  const segment = (PORTRAIT_END - PORTRAIT_START) / total;
  const start = PORTRAIT_START + segment * index;
  const end = start + segment;
  const fadeInEnd = start + segment * 0.33;
  const fadeOutStart = start + segment * 0.72;
  const opacity = interpolate(frame, [start, fadeInEnd, fadeOutStart, end], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const driftStrength = interpolate(
    frame,
    [PORTRAIT_START, PORTRAIT_END],
    [0.011, 0.04],
    {extrapolateLeft: "clamp", extrapolateRight: "clamp"},
  );
  const scale = 1 + driftStrength + Math.sin((frame + index * 33) / 86) * 0.008;
  const direction = index % 2 === 0 ? 1 : -1;
  const x = Math.sin((frame + index * 49) / 58) * 28 * direction;
  const y = Math.cos((frame + index * 41) / 72) * 20;
  return {
    opacity: Math.min(0.42, opacity * 0.42),
    scale,
    x,
    y,
  };
};

export const MackWopBumper: React.FC<MackWopBumperProps> = ({
  brandName,
  logoSrc,
  portraits,
  stingAudioSrc = null,
  backgroundMode = "transparent",
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const fadeIn = interpolate(frame, [0, FADE_IN_END], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const fadeOut = interpolate(frame, [FADE_OUT_START, TOTAL_FRAMES], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
  const masterOpacity = Math.min(fadeIn, fadeOut);
  const logoSpring = spring({
    frame: frame - LOGO_START,
    fps,
    config: {
      damping: 18,
      mass: 0.8,
      stiffness: 150,
    },
    durationInFrames: 56,
  });
  const logoScale = interpolate(logoSpring, [0, 1], [0.56, 1.02], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const logoOpacity = interpolate(frame, [LOGO_START, LOGO_START + 18, LOGO_END], [0, 1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const logoPulseEnvelope = interpolate(frame, [LOGO_START + 14, LOGO_END], [0.35, 0.11], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const logoPulse = 1 + Math.sin((frame - LOGO_START) / 5.6) * logoPulseEnvelope * 0.06;
  const titleOpacity = interpolate(frame, [TITLE_START, TITLE_START + 24, TITLE_END], [0, 1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleTranslate = interpolate(frame, [TITLE_START, TITLE_START + 24], [36, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const titleTracking = interpolate(frame, [TITLE_START, TITLE_START + 30], [34, 10], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.exp),
  });
  const softGlowShiftX = Math.sin(frame / 58) * 6;
  const softGlowShiftY = Math.cos(frame / 62) * 8;
  const grainShiftX = (frame % 9) - 4;
  const audioLevel = (audioFrame: number) => {
    const fadeInAudio = interpolate(audioFrame, [0, 8], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const fadeOutAudio = interpolate(audioFrame, [168, 180], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    return Math.min(fadeInAudio, fadeOutAudio);
  };
  const backgroundColor =
    backgroundMode === "black" ? "rgba(0,0,0,1)" : "rgba(0,0,0,0)";
  const portraitList = portraits.length > 0 ? portraits : [logoSrc];

  return (
    <AbsoluteFill style={{backgroundColor, overflow: "hidden"}}>
      {stingAudioSrc ? <Audio src={staticFile(stingAudioSrc)} volume={audioLevel} /> : null}

      <AbsoluteFill style={{opacity: masterOpacity}}>
        <AbsoluteFill
          style={{
            background:
              "radial-gradient(1300px 1150px at 50% 45%, rgba(255, 66, 66, 0.24), rgba(66, 16, 16, 0.05) 38%, rgba(0, 0, 0, 0) 72%), radial-gradient(880px 760px at 76% 26%, rgba(234, 57, 57, 0.22), rgba(0, 0, 0, 0) 64%)",
            transform: `translate(${softGlowShiftX}px, ${softGlowShiftY}px)`,
          }}
        />

        {portraitList.map((portrait, index) => {
          const visual = resolvePortraitVisual(frame, index, portraitList.length);
          return (
            <AbsoluteFill
              key={`${portrait}-${String(index)}`}
              style={{
                alignItems: "center",
                justifyContent: "center",
                opacity: visual.opacity,
                transform: `translate(${visual.x}px, ${visual.y}px) scale(${visual.scale})`,
              }}
            >
              <Img
                src={staticFile(portrait)}
                style={{
                  width: "112%",
                  height: "92%",
                  objectFit: "contain",
                  filter: "saturate(1.06) contrast(1.09) brightness(0.91)",
                }}
              />
            </AbsoluteFill>
          );
        })}

        <AbsoluteFill
          style={{
            alignItems: "center",
            justifyContent: "center",
            opacity: logoOpacity * masterOpacity,
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 640,
              height: 640,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(239, 47, 47, 0.42) 0%, rgba(184, 30, 30, 0.2) 30%, rgba(0, 0, 0, 0) 68%)",
              filter: `blur(${String(interpolate(frame, [LOGO_START, LOGO_END], [48, 28], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }))}px)`,
            }}
          />
          <Img
            src={staticFile(logoSrc)}
            style={{
              width: 620,
              height: 360,
              objectFit: "contain",
              transform: `scale(${logoScale * logoPulse})`,
              filter:
                "drop-shadow(0 0 18px rgba(255, 66, 66, 0.55)) drop-shadow(0 0 30px rgba(255, 40, 40, 0.4))",
            }}
          />
        </AbsoluteFill>

        <AbsoluteFill
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: 180,
          }}
        >
          <div
            style={{
              fontFamily: headingFont,
              fontSize: 122,
              letterSpacing: `${String(titleTracking)}px`,
              color: "#ffffff",
              textTransform: "uppercase",
              transform: `translateY(${titleTranslate}px)`,
              opacity: titleOpacity * masterOpacity,
              textShadow:
                "0 0 12px rgba(0,0,0,0.42), 0 0 26px rgba(255,45,45,0.35), 0 0 42px rgba(255, 45, 45, 0.22)",
              paddingLeft: titleTracking,
            }}
          >
            {brandName}
          </div>
        </AbsoluteFill>

        <AbsoluteFill
          style={{
            opacity: 0.08 * masterOpacity,
            mixBlendMode: "overlay",
            transform: `translateX(${grainShiftX}px)`,
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.58) 0.58px, transparent 0.58px)",
            backgroundSize: "3px 3px",
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
