import { Composition, Folder } from "remotion";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { Logo, myCompSchema2 } from "./HelloWorld/Logo";
import { TDETimeline } from "./TDETimeline";
import { SOFPromo } from "./SOFPromo";
import { ResilientPromo } from "./ResilientPromo";
import {
  defaultSampleHistoryEpisodeId,
  HipHopSampleHistory,
  hipHopSampleHistorySchema,
} from "./HipHopSampleHistory";
import {MackWopBumper} from "./MackWopBranding/MackWopBumper";
import {mackWopBumperSchema} from "./MackWopBranding/schema";

const HIPHOP_FPS = 30;
const HIPHOP_MIN_SECONDS = 30;
const HIPHOP_MAX_SECONDS = 240;
const HIPHOP_DEFAULT_SECONDS = 45;

const clampHipHopDurationSeconds = (value: unknown) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return HIPHOP_DEFAULT_SECONDS;
  }
  return Math.min(HIPHOP_MAX_SECONDS, Math.max(HIPHOP_MIN_SECONDS, parsed));
};

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        // You can take the "id" to render a video:
        // npx remotion render HelloWorld
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        // You can override these props for each render:
        // https://www.remotion.dev/docs/parametrized-rendering
        schema={myCompSchema}
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
          logoColor1: "#91EAE4",
          logoColor2: "#86A8E7",
        }}
      />

      {/* Mount any React component to make it show up in the sidebar and work on it individually! */}
      <Composition
        id="OnlyLogo"
        component={Logo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema2}
        defaultProps={{
          logoColor1: "#91dAE2" as const,
          logoColor2: "#86A8E7" as const,
        }}
      />

      {/* TDE Timeline - Top Dawg Entertainment History */}
      <Folder name="TDE">
        <Composition
          id="TDETimeline"
          component={TDETimeline}
          durationInFrames={30 * 45} // 45 seconds at 30fps
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>

      {/* SOF Media Promotional Animation v2 */}
      <Folder name="SOF">
        <Composition
          id="SOFPromo"
          component={SOFPromo}
          durationInFrames={900} // 30 seconds at 30fps
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>

      {/* Resilient Streetwear Promotional Animation */}
      <Folder name="Resilient">
        <Composition
          id="ResilientPromo"
          component={ResilientPromo}
          durationInFrames={660} // 22 seconds at 30fps
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>

      {/* Hip-Hop + African American sample history stories */}
      <Folder name="HipHopHistory">
        <Composition
          id="HipHopSampleHistory"
          component={HipHopSampleHistory}
          durationInFrames={HIPHOP_FPS * HIPHOP_DEFAULT_SECONDS}
          fps={HIPHOP_FPS}
          width={1080}
          height={1920}
          schema={hipHopSampleHistorySchema}
          calculateMetadata={({props}) => {
            const durationInSeconds = clampHipHopDurationSeconds(
              (props as {durationInSeconds?: number}).durationInSeconds,
            );
            return {
              durationInFrames: Math.round(durationInSeconds * HIPHOP_FPS),
            };
          }}
          defaultProps={{
            episodeId: defaultSampleHistoryEpisodeId,
            narrationAudioSrc: null,
            narrationStartOffsetSeconds: 0,
            narrationVolume: 1,
            backgroundMusicSrc: null,
            backgroundMusicVolume: 0.14,
            introClipSrc: null,
            introClipStartSeconds: 0,
            introClipDurationSeconds: 3,
            introClipVolume: 0.88,
            outroClipSrc: null,
            outroClipStartSeconds: 0,
            outroClipDurationSeconds: 3,
            outroClipVolume: 0.84,
            brandOutroVideoSrc: null,
            brandOutroVideoStartSeconds: 0,
            brandOutroVideoDurationSeconds: 6,
            brandOutroVideoVolume: 0.88,
            durationInSeconds: HIPHOP_DEFAULT_SECONDS,
            showSources: true,
          }}
        />
      </Folder>

      <Folder name="MackWopBranding">
        <Composition
          id="MackWopBumper"
          component={MackWopBumper}
          durationInFrames={180}
          fps={30}
          width={1080}
          height={1920}
          schema={mackWopBumperSchema}
          defaultProps={{
            brandName: "MackWopTV",
            logoSrc: "branding/mackwop/logo.png",
            portraits: [
              "branding/mackwop/portraits/DSC_5188.png",
              "branding/mackwop/portraits/DSC_5195.png",
              "branding/mackwop/portraits/DSC_5308.png",
              "branding/mackwop/portraits/DSC_5310.png",
            ],
            stingAudioSrc: "branding/mackwop/audio/mackwoptv-sting-6s.wav",
            backgroundMode: "transparent",
          }}
        />
      </Folder>
    </>
  );
};
