import React from "react";
import {loadFont} from "@remotion/google-fonts/BebasNeue";
import {loadFont as loadBodyFont} from "@remotion/google-fonts/Inter";
import {z} from "zod";
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  interpolate,
  OffthreadVideo,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {getSampleHistoryEpisodeById} from "./data";

const {fontFamily: headingFont} = loadFont("normal", {
  weights: ["400"],
  subsets: ["latin"],
});

const {fontFamily: bodyFont} = loadBodyFont("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

const sampleTrackSchema = z.object({
  artist: z.string().min(1),
  title: z.string().min(1),
  year: z.number(),
});

const sampleChapterSchema = z.object({
  heading: z.string().min(1),
  body: z.string().min(1),
});

const episodeMediaSchema = z.object({
  type: z.enum(["video", "image"]),
  src: z.string().min(1),
  startAtSec: z.number().min(0).optional(),
  endAtSec: z.number().min(0).optional(),
  credit: z.string().optional(),
});

const episodePayloadSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().min(1),
  sampledTrack: sampleTrackSchema,
  sourceTrack: sampleTrackSchema,
  chapters: z.array(sampleChapterSchema).min(1),
  media: z.array(episodeMediaSchema).optional(),
  legacy: z.string().min(1),
  sources: z.array(z.string().min(1)).min(1),
  palette: z.object({
    backgroundA: z.string().min(1),
    backgroundB: z.string().min(1),
    accent: z.string().min(1),
    card: z.string().min(1),
  }),
});

export const hipHopSampleHistorySchema = z.object({
  episodeId: z.string(),
  episodePayload: episodePayloadSchema.optional(),
  narrationAudioSrc: z.string().nullable().optional(),
  narrationStartOffsetSeconds: z.number().min(0).max(12).optional(),
  narrationVolume: z.number().min(0).max(2).optional(),
  backgroundMusicSrc: z.string().nullable().optional(),
  backgroundMusicVolume: z.number().min(0).max(1).optional(),
  introClipSrc: z.string().nullable().optional(),
  introClipStartSeconds: z.number().min(0).optional(),
  introClipDurationSeconds: z.number().min(0.5).max(12).optional(),
  introClipVolume: z.number().min(0).max(1).optional(),
  outroClipSrc: z.string().nullable().optional(),
  outroClipStartSeconds: z.number().min(0).optional(),
  outroClipDurationSeconds: z.number().min(0.5).max(12).optional(),
  outroClipVolume: z.number().min(0).max(1).optional(),
  brandOutroVideoSrc: z.string().nullable().optional(),
  brandOutroVideoStartSeconds: z.number().min(0).optional(),
  brandOutroVideoDurationSeconds: z.number().min(1).max(12).optional(),
  brandOutroVideoVolume: z.number().min(0).max(1).optional(),
  durationInSeconds: z.number().min(30).max(240).optional(),
  showSources: z.boolean().optional(),
});

export type HipHopSampleHistoryProps = z.infer<typeof hipHopSampleHistorySchema>;

export const HipHopSampleHistory: React.FC<HipHopSampleHistoryProps> = ({
  episodeId,
  episodePayload,
  narrationAudioSrc,
  narrationStartOffsetSeconds = 0,
  narrationVolume = 1,
  backgroundMusicSrc,
  backgroundMusicVolume = 0.14,
  introClipSrc,
  introClipStartSeconds = 0,
  introClipDurationSeconds = 3,
  introClipVolume = 0.88,
  outroClipSrc,
  outroClipStartSeconds = 0,
  outroClipDurationSeconds = 3,
  outroClipVolume = 0.84,
  brandOutroVideoSrc,
  brandOutroVideoStartSeconds = 0,
  brandOutroVideoDurationSeconds = 6,
  brandOutroVideoVolume = 0.88,
  showSources = true,
}) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const episode = episodePayload ?? getSampleHistoryEpisodeById(episodeId);
  const brandOutroSrc = brandOutroVideoSrc?.trim() || null;
  const rawBrandOutroFrames = Math.max(1, Math.round(brandOutroVideoDurationSeconds * fps));
  const brandOutroFrames = brandOutroSrc
    ? Math.min(rawBrandOutroFrames, Math.max(1, durationInFrames - 1))
    : 0;
  const contentEndFrame = Math.max(1, durationInFrames - brandOutroFrames);
  const introFrames = Math.floor(fps * 2.5);
  const outroFrames = Math.floor(fps * 3);
  const bodyFrames = Math.max(1, contentEndFrame - introFrames - outroFrames);
  const chapterFrames = Math.max(1, Math.floor(bodyFrames / episode.chapters.length));
  const bodyProgress = interpolate(
    frame,
    [introFrames, contentEndFrame - outroFrames],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    },
  );

  const bodyFrame = Math.min(bodyFrames - 1, Math.max(0, frame - introFrames));
  const chapterIndex = Math.min(
    episode.chapters.length - 1,
    Math.floor(bodyFrame / chapterFrames),
  );
  const chapter = episode.chapters[chapterIndex];
  const localChapterFrame = bodyFrame - chapterIndex * chapterFrames;
  const chapterOpacity = interpolate(
    localChapterFrame,
    [0, 12, chapterFrames - 24, chapterFrames - 6],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const titleEntrance = spring({
    frame,
    fps,
    config: {
      damping: 200,
      stiffness: 110,
      mass: 0.6,
    },
  });

  const sourcePanelOpacity = interpolate(
    frame,
    [contentEndFrame - outroFrames, contentEndFrame - Math.floor(fps * 0.5)],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const pulse = 0.5 + Math.sin(frame / 20) * 0.5;
  const backdropShift = interpolate(pulse, [0, 1], [-6, 6]);
  const narrationSrc = narrationAudioSrc?.trim() || null;
  const bedSrc = backgroundMusicSrc?.trim() || null;
  const introSrc = introClipSrc?.trim() || null;
  const outroSrc = outroClipSrc?.trim() || null;
  const introTrimStartFrames = Math.max(0, Math.round(introClipStartSeconds * fps));
  const introTrimDurationFrames = Math.max(1, Math.round(introClipDurationSeconds * fps));
  const outroTrimStartFrames = Math.max(0, Math.round(outroClipStartSeconds * fps));
  const outroTrimDurationFrames = Math.max(1, Math.round(outroClipDurationSeconds * fps));
  const outroFromFrame = Math.max(0, contentEndFrame - outroTrimDurationFrames);
  const introLevel = Math.min(1, Math.max(0, introClipVolume));
  const outroLevel = Math.min(1, Math.max(0, outroClipVolume));
  const brandOutroStartFrames = Math.max(0, Math.round(brandOutroVideoStartSeconds * fps));
  const brandOutroLevel = Math.min(1, Math.max(0, brandOutroVideoVolume));
  const narrationOffsetFrames = Math.max(
    0,
    Math.round(Math.max(0, narrationStartOffsetSeconds) * fps),
  );
  const narrationLevel = Math.min(2, Math.max(0, narrationVolume));
  const bedVolume = Math.min(1, Math.max(0, backgroundMusicVolume * 0.935));
  const bedFadeFrames = Math.max(10, Math.floor(fps * 1.2));
  const bedStartFrame = Math.max(0, narrationOffsetFrames);
  const bedFadeOutEnd = Math.max(
    bedStartFrame + 1,
    outroSrc ? outroFromFrame : contentEndFrame,
  );
  const bedFadeOutStart = Math.max(bedStartFrame, bedFadeOutEnd - bedFadeFrames);
  const bedVolumeCurve = (audioFrame: number) => {
    if (audioFrame < bedStartFrame) {
      return 0;
    }
    const fadeIn = interpolate(
      audioFrame,
      [bedStartFrame, bedStartFrame + bedFadeFrames],
      [0, bedVolume],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      },
    );
    const fadeOut = interpolate(
      audioFrame,
      [bedFadeOutStart, bedFadeOutEnd],
      [bedVolume, 0],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      },
    );
    return Math.min(fadeIn, fadeOut);
  };
  const introCueOpacity = introSrc
    ? interpolate(
        frame,
        [0, 8, Math.max(9, introTrimDurationFrames - 10), introTrimDurationFrames],
        [0, 1, 1, 0],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        },
      )
    : 0;
  const outroCueOpacity = outroSrc
    ? interpolate(
        frame,
        [
          outroFromFrame,
          outroFromFrame + 8,
          Math.max(outroFromFrame + 9, contentEndFrame - 10),
          contentEndFrame,
        ],
        [0, 1, 1, 0],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        },
      )
    : 0;
  const isIntroCueActive = Boolean(introSrc) && frame < introTrimDurationFrames;
  const isOutroCueActive = Boolean(outroSrc) && frame >= outroFromFrame && frame < contentEndFrame;
  const audioCueOpacity = Math.max(introCueOpacity, outroCueOpacity);
  const audioCueTitle = isIntroCueActive
    ? "Now Playing: Sampled Track"
    : isOutroCueActive
      ? "Now Playing: Original Source"
      : null;
  const audioCueText = isIntroCueActive
    ? `${episode.sampledTrack.artist} - ${episode.sampledTrack.title} (${episode.sampledTrack.year})`
    : isOutroCueActive
      ? `${episode.sourceTrack.artist} - ${episode.sourceTrack.title} (${episode.sourceTrack.year})`
      : "";
  const mediaItems = episode.media ?? [];
  const hasMedia = mediaItems.length > 0;
  const mediaIndex = hasMedia ? chapterIndex % mediaItems.length : -1;
  const currentMedia = mediaIndex >= 0 ? mediaItems[mediaIndex] : null;
  const previousMedia =
    hasMedia && mediaItems.length > 1 && chapterIndex > 0
      ? mediaItems[(mediaIndex - 1 + mediaItems.length) % mediaItems.length]
      : null;
  const mediaFadeFrames = Math.max(10, Math.floor(chapterFrames * 0.18));
  const mediaInOpacity =
    chapterIndex === 0
      ? 1
      : interpolate(localChapterFrame, [0, mediaFadeFrames], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
  const mediaOpacity = mediaInOpacity;
  const previousMediaOpacity = interpolate(localChapterFrame, [0, mediaFadeFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const mediaScale = 1.05 + Math.sin(frame / 90) * 0.02;
  const mediaShiftX = Math.sin((frame + chapterIndex * 30) / 70) * 20;
  const mediaShiftY = Math.cos((frame + chapterIndex * 45) / 85) * 16;
  const visibleMedia = previousMediaOpacity > mediaOpacity ? previousMedia : currentMedia;

  const renderMedia = (
    media: (typeof mediaItems)[number] | null,
    opacity: number,
    layerKey: string,
  ) => {
    if (!media || opacity <= 0) {
      return null;
    }
    const startFrom = Math.max(0, Math.floor((media.startAtSec ?? 0) * fps));
    const endAt = media.endAtSec ? Math.floor(media.endAtSec * fps) : undefined;
    const visualStyle: React.CSSProperties = {
      width: "120%",
      height: "120%",
      objectFit: "cover",
      transform: `translate(${mediaShiftX}px, ${mediaShiftY}px) scale(${mediaScale})`,
      filter: "contrast(1.1) saturate(1.12) brightness(0.66)",
    };
    return (
      <div
        key={layerKey}
        style={{
          position: "absolute",
          inset: 0,
          opacity,
        }}
      >
        {media.type === "video" ? (
          <OffthreadVideo
            muted
            src={staticFile(media.src)}
            startFrom={startFrom}
            endAt={endAt}
            style={visualStyle}
          />
        ) : (
          <Img src={staticFile(media.src)} style={visualStyle} />
        )}
      </div>
    );
  };

  return (
    <AbsoluteFill
      style={{
        backgroundColor: episode.palette.backgroundA,
        color: "#f6f7fb",
        fontFamily: bodyFont,
        overflow: "hidden",
      }}
    >
      {introSrc ? (
        <Sequence durationInFrames={introTrimDurationFrames}>
          <Audio
            src={staticFile(introSrc)}
            startFrom={introTrimStartFrames}
            endAt={introTrimStartFrames + introTrimDurationFrames}
            volume={introLevel}
          />
        </Sequence>
      ) : null}
      {bedSrc ? (
        <Audio src={staticFile(bedSrc)} volume={bedVolumeCurve} loop />
      ) : null}
      {narrationSrc ? (
        <Sequence from={narrationOffsetFrames}>
          <Audio src={staticFile(narrationSrc)} volume={narrationLevel} />
        </Sequence>
      ) : null}
      {outroSrc ? (
        <Sequence from={outroFromFrame} durationInFrames={outroTrimDurationFrames}>
          <Audio
            src={staticFile(outroSrc)}
            startFrom={outroTrimStartFrames}
            endAt={outroTrimStartFrames + outroTrimDurationFrames}
            volume={outroLevel}
          />
        </Sequence>
      ) : null}

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(145deg, ${episode.palette.backgroundA}, ${episode.palette.backgroundB})`,
          transform: `scale(1.04) translate(${backdropShift}px, ${-backdropShift}px)`,
          filter: "saturate(1.15)",
        }}
      />

      {renderMedia(previousMedia, previousMediaOpacity, "media-prev")}
      {renderMedia(currentMedia, mediaOpacity, "media-current")}

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.26) 28%, rgba(0,0,0,0.54) 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08) 0%, transparent 40%), radial-gradient(circle at 85% 75%, rgba(255,255,255,0.06) 0%, transparent 35%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 46,
          left: 64,
          right: 64,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          opacity: titleEntrance,
          transform: `translateY(${(1 - titleEntrance) * 20}px)`,
        }}
      >
        <div
          style={{
            fontFamily: headingFont,
            fontSize: 44,
            letterSpacing: 2,
            color: episode.palette.accent,
            textTransform: "uppercase",
          }}
        >
          Hip-Hop Sample History
        </div>
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 1,
            opacity: 0.9,
          }}
        >
          Episode: {episode.subtitle}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 130,
          left: 64,
          right: 64,
          borderRadius: 22,
          padding: "26px 30px",
          backgroundColor: episode.palette.card,
          border: `1px solid ${episode.palette.accent}66`,
          boxShadow: `0 20px 40px ${episode.palette.backgroundA}88`,
        }}
      >
        <div
          style={{
            fontFamily: headingFont,
            fontSize: 68,
            lineHeight: 1,
            letterSpacing: 1.3,
          }}
        >
          {episode.title}
        </div>
        <div
          style={{
            marginTop: 16,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 18,
          }}
        >
          <div
            style={{
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.2)",
              padding: "16px 18px",
              backgroundColor: "rgba(0,0,0,0.22)",
            }}
          >
            <div style={{fontSize: 18, opacity: 0.75, textTransform: "uppercase"}}>
              Sampled Track
            </div>
            <div style={{marginTop: 6, fontSize: 28, fontWeight: 700}}>
              {episode.sampledTrack.title}
            </div>
            <div style={{fontSize: 20, opacity: 0.9}}>
              {episode.sampledTrack.artist} - {episode.sampledTrack.year}
            </div>
          </div>
          <div
            style={{
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.2)",
              padding: "16px 18px",
              backgroundColor: "rgba(0,0,0,0.22)",
            }}
          >
            <div style={{fontSize: 18, opacity: 0.75, textTransform: "uppercase"}}>
              Source Record
            </div>
            <div style={{marginTop: 6, fontSize: 28, fontWeight: 700}}>
              {episode.sourceTrack.title}
            </div>
            <div style={{fontSize: 20, opacity: 0.9}}>
              {episode.sourceTrack.artist} - {episode.sourceTrack.year}
            </div>
          </div>
        </div>
      </div>

      {audioCueTitle ? (
        <div
          style={{
            position: "absolute",
            left: 64,
            right: 64,
            top: 356,
            borderRadius: 16,
            padding: "14px 18px",
            backgroundColor: "rgba(0,0,0,0.56)",
            border: `1px solid ${episode.palette.accent}88`,
            opacity: audioCueOpacity,
            transform: `translateY(${(1 - audioCueOpacity) * 12}px)`,
            zIndex: 12,
          }}
        >
          <div
            style={{
              color: episode.palette.accent,
              textTransform: "uppercase",
              letterSpacing: 1.8,
              fontWeight: 700,
              fontSize: 18,
            }}
          >
            {audioCueTitle}
          </div>
          <div
            style={{
              marginTop: 5,
              fontSize: 22,
              fontWeight: 700,
              lineHeight: 1.15,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {audioCueText}
          </div>
        </div>
      ) : null}

      <div
        style={{
          position: "absolute",
          left: 64,
          right: 64,
          top: 470,
          bottom: 160,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            borderRadius: 20,
            padding: "34px 36px",
            backgroundColor: "rgba(0, 0, 0, 0.42)",
            border: `1px solid ${episode.palette.accent}55`,
            opacity: chapterOpacity,
          }}
        >
          <div
            style={{
              color: episode.palette.accent,
              textTransform: "uppercase",
              letterSpacing: 2.2,
              fontWeight: 700,
              fontSize: 25,
            }}
          >
            {chapter.heading}
          </div>
          <div
            style={{
              marginTop: 16,
              fontSize: 40,
              lineHeight: 1.3,
              fontWeight: 600,
            }}
          >
            {chapter.body}
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 64,
          right: 64,
          bottom: 90,
          height: 18,
          borderRadius: 9,
          backgroundColor: "rgba(255,255,255,0.16)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${bodyProgress * 100}%`,
            borderRadius: 9,
            background: `linear-gradient(90deg, ${episode.palette.accent}CC, ${episode.palette.accent})`,
            boxShadow: `0 0 16px ${episode.palette.accent}`,
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          left: 64,
          right: 64,
          bottom: 26,
          display: "grid",
          gridTemplateColumns: `repeat(${episode.chapters.length}, 1fr)`,
          gap: 8,
        }}
      >
        {episode.chapters.map((chapterItem, index) => (
          <div
            key={chapterItem.heading}
            style={{
              fontSize: 20,
              fontWeight: index === chapterIndex ? 700 : 500,
              color: index === chapterIndex ? episode.palette.accent : "rgba(246,247,251,0.72)",
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            {chapterItem.heading}
          </div>
        ))}
      </div>

      {showSources ? (
        <div
          style={{
            position: "absolute",
            left: 64,
            right: 64,
            bottom: 118,
            opacity: sourcePanelOpacity,
            borderRadius: 16,
            padding: "18px 20px",
            backgroundColor: "rgba(0,0,0,0.5)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1.3,
              color: episode.palette.accent,
            }}
          >
            Context + Sources
          </div>
          <div style={{marginTop: 8, fontSize: 20, lineHeight: 1.25}}>
            {episode.legacy}
          </div>
          <div style={{marginTop: 10, fontSize: 16, opacity: 0.85}}>
            {episode.sources.join(" | ")}
          </div>
        </div>
      ) : null}

      {visibleMedia?.credit ? (
        <div
          style={{
            position: "absolute",
            left: 64,
            right: 64,
            bottom: showSources ? 258 : 132,
            opacity: 0.78,
            fontSize: 15,
            lineHeight: 1.25,
            color: "rgba(246,247,251,0.86)",
          }}
        >
          Footage: {visibleMedia.credit}
        </div>
      ) : null}

      {brandOutroSrc ? (
        <Sequence from={contentEndFrame} durationInFrames={brandOutroFrames}>
          <OffthreadVideo
            src={staticFile(brandOutroSrc)}
            startFrom={brandOutroStartFrames}
            endAt={brandOutroStartFrames + brandOutroFrames}
            volume={brandOutroLevel}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              backgroundColor: "black",
            }}
          />
        </Sequence>
      ) : null}
    </AbsoluteFill>
  );
};

export {sampleHistoryEpisodes, defaultSampleHistoryEpisodeId} from "./data";
