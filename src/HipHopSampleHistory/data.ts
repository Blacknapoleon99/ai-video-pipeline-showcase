export type SampleTrack = {
  artist: string;
  title: string;
  year: number;
};

export type SampleChapter = {
  heading: string;
  body: string;
};

export type EpisodeMedia = {
  type: "video" | "image";
  src: string;
  startAtSec?: number;
  endAtSec?: number;
  credit?: string;
};

export type SampleHistoryEpisode = {
  id: string;
  title: string;
  subtitle: string;
  sampledTrack: SampleTrack;
  sourceTrack: SampleTrack;
  chapters: SampleChapter[];
  media?: EpisodeMedia[];
  legacy: string;
  sources: string[];
  palette: {
    backgroundA: string;
    backgroundB: string;
    accent: string;
    card: string;
  };
};

export const sampleHistoryEpisodes: SampleHistoryEpisode[] = [
  {
    id: "juicy-lineage",
    title: "The Story Behind 'Juicy'",
    subtitle: "Biggie x Mtume",
    sampledTrack: {
      artist: "The Notorious B.I.G.",
      title: "Juicy",
      year: 1994,
    },
    sourceTrack: {
      artist: "Mtume",
      title: "Juicy Fruit",
      year: 1983,
    },
    chapters: [
      {
        heading: "Original Record",
        body: "Mtume's 'Juicy Fruit' helped define early 80s R&B with warm synths and a smooth, elastic groove.",
      },
      {
        heading: "The Flip",
        body: "Poke & Tone built Biggie's 'Juicy' around that groove, turning it into a memory-lane anthem for Brooklyn hustle culture.",
      },
      {
        heading: "Why It Hit",
        body: "The contrast between celebration and struggle made it personal. Biggie's storytelling sat perfectly on a familiar soul texture.",
      },
      {
        heading: "Legacy",
        body: "It became a blueprint for introspective rap records using R&B nostalgia to deliver hard truth and hope in the same verse.",
      },
    ],
    legacy:
      "Sampling here worked like cultural memory: one era of Black music speaking directly to the next.",
    sources: [
      "Mtume - Juicy Fruit (1983)",
      "The Notorious B.I.G. - Juicy (1994)",
      "Production: Poke & Tone",
    ],
    palette: {
      backgroundA: "#0b1020",
      backgroundB: "#25113b",
      accent: "#ffd166",
      card: "rgba(10, 10, 18, 0.72)",
    },
  },
  {
    id: "cream-lineage",
    title: "How RZA Built 'C.R.E.A.M.'",
    subtitle: "Wu-Tang Clan x The Charmels",
    sampledTrack: {
      artist: "Wu-Tang Clan",
      title: "C.R.E.A.M.",
      year: 1993,
    },
    sourceTrack: {
      artist: "The Charmels",
      title: "As Long As I've Got You",
      year: 1967,
    },
    chapters: [
      {
        heading: "Original Record",
        body: "The Charmels' soul ballad carries a tender melody with emotional depth and vulnerability.",
      },
      {
        heading: "The Flip",
        body: "RZA looped and filtered the opening phrase into a cold, haunting bed for stories from Staten Island's street economy.",
      },
      {
        heading: "Why It Hit",
        body: "Ghostface and Raekwon grounded abstract pain in concrete detail, while Method Man delivered one of rap's defining hooks.",
      },
      {
        heading: "Legacy",
        body: "This sample showed that gritty realism could sit on top of vulnerable soul and still feel timeless.",
      },
    ],
    legacy:
      "The record helped codify East Coast boom-bap's emotional complexity: hard drums, soft memory, sharp writing.",
    sources: [
      "The Charmels - As Long As I've Got You (1967)",
      "Wu-Tang Clan - C.R.E.A.M. (1993)",
      "Production: RZA",
    ],
    palette: {
      backgroundA: "#120b08",
      backgroundB: "#2d1810",
      accent: "#fca311",
      card: "rgba(21, 12, 6, 0.72)",
    },
  },
  {
    id: "g-thang-lineage",
    title: "G-Funk and a Funk Classic",
    subtitle: "Dr. Dre x Leon Haywood",
    sampledTrack: {
      artist: "Dr. Dre",
      title: "Nuthin' but a 'G' Thang",
      year: 1992,
    },
    sourceTrack: {
      artist: "Leon Haywood",
      title: "I Want'a Do Something Freaky to You",
      year: 1975,
    },
    chapters: [
      {
        heading: "Original Record",
        body: "Leon Haywood's 1975 groove gave West Coast producers a rich source of rolling bass and laid-back funk tension.",
      },
      {
        heading: "The Flip",
        body: "Dr. Dre slowed and polished that texture into G-funk architecture: clean drums, synth leads, and controlled bounce.",
      },
      {
        heading: "Why It Hit",
        body: "Snoop's cadence and Dre's mix turned it into a radio staple without losing neighborhood authenticity.",
      },
      {
        heading: "Legacy",
        body: "It locked in a sonic identity for 90s West Coast rap and influenced decades of producers afterward.",
      },
    ],
    legacy:
      "The track is a direct line from 70s Black funk musicianship to 90s rap dominance.",
    sources: [
      "Leon Haywood - I Want'a Do Something Freaky to You (1975)",
      "Dr. Dre feat. Snoop Dogg - Nuthin' but a 'G' Thang (1992)",
      "Production: Dr. Dre",
    ],
    palette: {
      backgroundA: "#041016",
      backgroundB: "#0a2e2c",
      accent: "#8ac926",
      card: "rgba(2, 17, 20, 0.72)",
    },
  },
  {
    id: "through-the-wire-lineage",
    title: "Soul Vocals, New School Rap",
    subtitle: "Kanye West x Chaka Khan",
    sampledTrack: {
      artist: "Kanye West",
      title: "Through the Wire",
      year: 2003,
    },
    sourceTrack: {
      artist: "Chaka Khan",
      title: "Through the Fire",
      year: 1984,
    },
    chapters: [
      {
        heading: "Original Record",
        body: "Chaka Khan's 'Through the Fire' is a powerhouse R&B vocal performance from the mid-80s.",
      },
      {
        heading: "The Flip",
        body: "Kanye pitched and chopped the chorus to create urgency, then rapped recovery bars after his near-fatal car crash.",
      },
      {
        heading: "Why It Hit",
        body: "The song fused vulnerability, hunger, and producer precision in a way that felt new for mainstream rap.",
      },
      {
        heading: "Legacy",
        body: "It opened a lane for emotionally transparent, sample-forward rap in the 2000s.",
      },
    ],
    legacy:
      "The record reframed chipmunk-soul production from niche style to chart-level storytelling.",
    sources: [
      "Chaka Khan - Through the Fire (1984)",
      "Kanye West - Through the Wire (2003)",
      "Production: Kanye West",
    ],
    palette: {
      backgroundA: "#1a0a13",
      backgroundB: "#3b1337",
      accent: "#ff6b6b",
      card: "rgba(23, 7, 17, 0.72)",
    },
  },
  {
    id: "izzo-lineage",
    title: "Soulful Sampling on 'Izzo'",
    subtitle: "JAY-Z x Jackson 5",
    sampledTrack: {
      artist: "JAY-Z",
      title: "Izzo (H.O.V.A.)",
      year: 2001,
    },
    sourceTrack: {
      artist: "The Jackson 5",
      title: "I Want You Back",
      year: 1969,
    },
    chapters: [
      {
        heading: "Original Record",
        body: "The Jackson 5 delivered one of Motown's biggest records, driven by youthful vocals and kinetic rhythm.",
      },
      {
        heading: "The Flip",
        body: "Kanye repurposed key phrases and drums into a triumphant backdrop for JAY-Z's reflective bars.",
      },
      {
        heading: "Why It Hit",
        body: "It connected golden-era soul energy with modern rap confidence and made both audiences feel seen.",
      },
      {
        heading: "Legacy",
        body: "The song helped normalize classic soul flips as premium mainstream rap production.",
      },
    ],
    legacy:
      "It is a textbook example of cross-generational Black music conversation through sampling.",
    sources: [
      "The Jackson 5 - I Want You Back (1969)",
      "JAY-Z - Izzo (H.O.V.A.) (2001)",
      "Production: Kanye West",
    ],
    palette: {
      backgroundA: "#12090f",
      backgroundB: "#352034",
      accent: "#ff9f1c",
      card: "rgba(19, 9, 18, 0.72)",
    },
  },
  {
    id: "big-pimpin-lineage",
    title: "Inside Jay-Z's 'Big Pimpin'' Sample",
    subtitle: "JAY-Z x Abdel Halim Hafez",
    sampledTrack: {
      artist: "JAY-Z feat. UGK",
      title: "Big Pimpin'",
      year: 1999,
    },
    sourceTrack: {
      artist: "Abdel Halim Hafez",
      title: "Khosara Khosara",
      year: 1960,
    },
    chapters: [
      {
        heading: "Original Record",
        body: "Abdel Halim Hafez's 'Khosara Khosara' carries dramatic orchestration and a recognizable melodic phrase that producers gravitated toward.",
      },
      {
        heading: "The Flip",
        body: "Timbaland chopped and re-timed the phrase into a sharp, hypnotic loop, then framed it with hard drums and spacious bounce.",
      },
      {
        heading: "Why It Hit",
        body: "JAY-Z, Bun B, and Pimp C matched luxury rap imagery with a darker melodic texture, giving the record tension and swagger.",
      },
      {
        heading: "Business Impact",
        body: "The record became a global single and fueled bigger conversations around sample ownership, publishing, and international catalog rights.",
      },
      {
        heading: "Legacy",
        body: "It remains one of rap's most recognizable late-90s sample flips and a landmark for cross-regional collaboration.",
      },
    ],
    media: [
      {
        type: "image",
        src: "hiphop-history/media/artists/jay-z.jpg",
        credit: "Photo: JAY-Z",
      },
      {
        type: "image",
        src: "hiphop-history/media/artists/bun-b.jpg",
        credit: "Photo: Bun B",
      },
      {
        type: "image",
        src: "hiphop-history/media/artists/timbaland.jpg",
        credit: "Photo: Timbaland",
      },
      {
        type: "image",
        src: "hiphop-history/media/artists/abdel-halim-hafez.jpg",
        credit: "Photo: Abdel Halim Hafez",
      },
      {
        type: "video",
        src: "hiphop-history/media/jam-session-1942-clip.mp4",
        startAtSec: 0,
        endAtSec: 24,
        credit: "Public domain jazz performance footage",
      },
    ],
    legacy:
      "The track shows how hip-hop can transform a regional classic into a global rap anthem through sampling.",
    sources: [
      "JAY-Z feat. UGK - Big Pimpin' (1999)",
      "Abdel Halim Hafez - Khosara Khosara (1960)",
      "Production: Timbaland",
    ],
    palette: {
      backgroundA: "#0b0b12",
      backgroundB: "#2c1731",
      accent: "#ffd166",
      card: "rgba(8, 8, 14, 0.74)",
    },
  },
  {
    id: "world-is-yours-lineage",
    title: "Nas and the Jazz Core of 'The World Is Yours'",
    subtitle: "Nas x Ahmad Jamal",
    sampledTrack: {
      artist: "Nas",
      title: "The World Is Yours",
      year: 1994,
    },
    sourceTrack: {
      artist: "Ahmad Jamal",
      title: "I Love Music",
      year: 1970,
    },
    chapters: [
      {
        heading: "Original Record",
        body: "Ahmad Jamal's jazz composition carries elegant piano movement and harmonic space that later translated cleanly into hip-hop phrasing.",
      },
      {
        heading: "The Flip",
        body: "Pete Rock looped and filtered the piano line into a warm but focused bed, leaving room for Nas to narrate Queensbridge ambition.",
      },
      {
        heading: "Why It Hit",
        body: "The track balanced aspiration, realism, and technical writing, becoming one of the signature records on Illmatic.",
      },
      {
        heading: "Cultural Lineage",
        body: "It connected jazz musicianship directly to 90s New York storytelling, proving sample-based rap could be both raw and refined.",
      },
      {
        heading: "Legacy",
        body: "The song remains a gold-standard example of jazz rap production and one of Nas's defining sample records.",
      },
    ],
    media: [
      {
        type: "image",
        src: "hiphop-history/media/artists/nas.jpg",
        credit: "Photo: Nas",
      },
      {
        type: "image",
        src: "hiphop-history/media/artists/queensbridge-houses.jpg",
        credit: "Photo: Queensbridge Houses",
      },
      {
        type: "image",
        src: "hiphop-history/media/artists/pete-rock.jpg",
        credit: "Photo: Pete Rock",
      },
      {
        type: "image",
        src: "hiphop-history/media/artists/ahmad-jamal.jpg",
        credit: "Photo: Ahmad Jamal",
      },
      {
        type: "video",
        src: "hiphop-history/media/st-louis-blues-1929-clip.mp4",
        startAtSec: 0,
        endAtSec: 24,
        credit: "Public domain blues-era performance footage",
      },
    ],
    legacy:
      "The record demonstrates how jazz source material can power some of the most important lyric-first songs in hip-hop history.",
    sources: [
      "Nas - The World Is Yours (1994)",
      "Ahmad Jamal - I Love Music (1970)",
      "Production: Pete Rock",
    ],
    palette: {
      backgroundA: "#090f18",
      backgroundB: "#1c2840",
      accent: "#9ad1ff",
      card: "rgba(6, 13, 22, 0.74)",
    },
  },
  {
    id: "dead-presidents-lineage",
    title: "The Piano Loop Behind 'Dead Presidents II'",
    subtitle: "JAY-Z x Lonnie Liston Smith",
    sampledTrack: {
      artist: "JAY-Z",
      title: "Dead Presidents II",
      year: 1996,
    },
    sourceTrack: {
      artist: "Lonnie Liston Smith",
      title: "A Garden of Peace",
      year: 1983,
    },
    chapters: [
      {
        heading: "Original Record",
        body: "Lonnie Liston Smith recorded 'A Garden of Peace' with a meditative piano progression that carried both calm and melancholy.",
      },
      {
        heading: "The Flip",
        body: "The sample was looped into a stripped-down frame, letting JAY-Z's internal rhyme patterns and cadence drive the full record.",
      },
      {
        heading: "Why It Hit",
        body: "The beat's restraint gave every bar extra weight, turning the song into an early benchmark for lyrical precision in mainstream rap.",
      },
      {
        heading: "Producer Craft",
        body: "Minimal drums, patient sequencing, and careful loop placement made the sample feel cinematic without overcrowding the vocal.",
      },
      {
        heading: "Legacy",
        body: "It remains one of the clearest demonstrations of how a simple sample loop can anchor a timeless rap performance.",
      },
    ],
    media: [
      {
        type: "image",
        src: "hiphop-history/media/artists/jay-z.jpg",
        credit: "Photo: JAY-Z",
      },
      {
        type: "image",
        src: "hiphop-history/media/artists/lonnie-liston-smith.jpg",
        credit: "Photo: Lonnie Liston Smith",
      },
      {
        type: "image",
        src: "hiphop-history/media/artists/pete-rock.jpg",
        credit: "Photo: 90s hip-hop producer context",
      },
      {
        type: "video",
        src: "hiphop-history/media/satchmo-congo-clip.mp4",
        startAtSec: 0,
        endAtSec: 24,
        credit: "Public domain jazz documentary footage",
      },
    ],
    legacy:
      "This sample chain highlights how subtle jazz-soul source material became a core part of East Coast rap identity.",
    sources: [
      "JAY-Z - Dead Presidents II (1996)",
      "Lonnie Liston Smith - A Garden of Peace (1983)",
      "Classic New York rap sampling history",
    ],
    palette: {
      backgroundA: "#0e0b12",
      backgroundB: "#231b31",
      accent: "#b5e48c",
      card: "rgba(10, 8, 16, 0.74)",
    },
  },
  {
    id: "black-music-lineage",
    title: "Blues to Boom-Bap: The Sample Lineage",
    subtitle: "Black American Music DNA",
    sampledTrack: {
      artist: "Multiple Hip-Hop Producers",
      title: "Sample Culture",
      year: 2026,
    },
    sourceTrack: {
      artist: "Blues, Jazz, Funk, Soul & R&B Artists",
      title: "Foundational Recordings",
      year: 1920,
    },
    chapters: [
      {
        heading: "Blues Foundation",
        body: "Before sampling had a name, Black blues artists built the emotional blueprint: call-and-response, grit, and testimony. Hip-hop inherited that honesty.",
      },
      {
        heading: "Jazz Language",
        body: "Jazz expanded the vocabulary with swing, syncopation, and improvisation. Later producers chopped horns and piano phrases into new rhythmic stories.",
      },
      {
        heading: "Funk Breaks",
        body: "Funk gave rap its engine. Tight drums, bass pockets, and break sections became loop gold for DJs, beatmakers, and MCs.",
      },
      {
        heading: "Soul & R&B Memory",
        body: "Soul and R&B supplied melody and emotion. Sampling let one generation of Black musicians speak directly to the next.",
      },
      {
        heading: "Hip-Hop Rebuild",
        body: "Golden-age and modern producers recontextualized records with chopping, filtering, and sequencing, turning archival sound into contemporary identity.",
      },
      {
        heading: "Living Archive",
        body: "Sampling is not just technique. It is cultural memory: blues to jazz to funk to hip-hop, each era carrying forward innovation and lived experience.",
      },
    ],
    media: [
      {
        type: "video",
        src: "hiphop-history/media/st-louis-blues-1929-clip.mp4",
        startAtSec: 0,
        endAtSec: 26,
        credit: "Public domain film: St. Louis Blues (1929)",
      },
      {
        type: "video",
        src: "hiphop-history/media/jam-session-1942-clip.mp4",
        startAtSec: 0,
        endAtSec: 26,
        credit: "Public domain footage: Jam Session (1942)",
      },
      {
        type: "video",
        src: "hiphop-history/media/satchmo-congo-clip.mp4",
        startAtSec: 0,
        endAtSec: 24,
        credit: "Public domain footage: Satchmo Swings in Congo (1960)",
      },
      {
        type: "image",
        src: "hiphop-history/media/chicgf.jpg",
        credit: "Photo: CHIC",
      },
      {
        type: "image",
        src: "hiphop-history/media/sugarhill-gang-52790148289.jpg",
        credit: "Photo: The Sugarhill Gang",
      },
      {
        type: "image",
        src: "hiphop-history/media/grandmaster-flash-1982.jpg",
        credit: "Press photo: Grandmaster Flash and The Furious Five (1982)",
      },
    ],
    legacy:
      "From blues phrasing to jazz harmony to funk drums and soul vocals, hip-hop sampling preserves Black music history while pushing it forward.",
    sources: [
      "Public domain: St. Louis Blues (1929)",
      "Public domain: Jam Session (1942)",
      "Public domain: Satchmo Swings in Congo (1960)",
      "CHIC - Good Times (1979) / The Sugarhill Gang - Rapper's Delight (1979)",
      "Funk and soul sampling lineage across hip-hop history",
    ],
    palette: {
      backgroundA: "#09090f",
      backgroundB: "#251028",
      accent: "#f4d35e",
      card: "rgba(8, 8, 14, 0.72)",
    },
  },
  {
    id: "rappers-delight-lineage",
    title: "One of Rap's First Mainstream Bridges",
    subtitle: "Sugarhill Gang x CHIC",
    sampledTrack: {
      artist: "The Sugarhill Gang",
      title: "Rapper's Delight",
      year: 1979,
    },
    sourceTrack: {
      artist: "CHIC",
      title: "Good Times",
      year: 1979,
    },
    chapters: [
      {
        heading: "Original Record",
        body: "CHIC's 'Good Times' was disco-funk precision: tight rhythm section, iconic bassline, and dance-floor command.",
      },
      {
        heading: "The Flip",
        body: "Rapper's Delight used that groove as the backbone for one of hip-hop's earliest mainstream rap recordings.",
      },
      {
        heading: "Why It Hit",
        body: "It translated party-rhythm tradition from NYC neighborhoods to global radio and record stores.",
      },
      {
        heading: "Legacy",
        body: "The song helped open the commercial lane for rap music and accelerated the business conversation around sampling rights.",
      },
    ],
    legacy:
      "It stands at the intersection of Black dance music, street culture, and the birth of rap as a global industry.",
    sources: [
      "CHIC - Good Times (1979)",
      "The Sugarhill Gang - Rapper's Delight (1979)",
      "Early rap recording history and sampling rights context",
    ],
    palette: {
      backgroundA: "#0e0e0a",
      backgroundB: "#2a2a15",
      accent: "#ffd60a",
      card: "rgba(15, 15, 8, 0.72)",
    },
  },
];

export const defaultSampleHistoryEpisodeId = sampleHistoryEpisodes[0].id;

export const getSampleHistoryEpisodeById = (
  episodeId: string,
): SampleHistoryEpisode => {
  return (
    sampleHistoryEpisodes.find((episode) => episode.id === episodeId) ??
    sampleHistoryEpisodes[0]
  );
};
