const sampleHistoryEpisodes = [
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
    keyPoints: [
      "Mtume's original record helped shape 80s R&B with bright synth melodies and groove-heavy rhythm.",
      "Poke and Tone used that DNA to frame Biggie's rise-from-nothing storytelling.",
      "The contrast between nostalgia and ambition made the record emotionally direct.",
      "This became a blueprint for soulful rap records that feel both personal and cinematic.",
    ],
    legacy:
      "A classic example of one generation of Black music speaking to the next through sampling.",
    sources: [
      "Mtume - Juicy Fruit (1983)",
      "The Notorious B.I.G. - Juicy (1994)",
      "Production credits: Poke & Tone",
    ],
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
    keyPoints: [
      "The Charmels delivered a vulnerable soul performance in the 60s that carried emotional weight.",
      "RZA filtered and looped the opening phrase to create cold atmosphere and tension.",
      "The verses grounded the music in lived realities while keeping poetic detail.",
      "The record proved gritty rap could sit on top of delicate soul without losing impact.",
    ],
    legacy:
      "A landmark in East Coast sampling aesthetics and narrative-driven street rap.",
    sources: [
      "The Charmels - As Long As I've Got You (1967)",
      "Wu-Tang Clan - C.R.E.A.M. (1993)",
      "Production credits: RZA",
    ],
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
    keyPoints: [
      "Leon Haywood's 70s funk groove offered a bass-driven pocket that producers kept returning to.",
      "Dr. Dre slowed and polished the feel into a cleaner, West Coast G-funk texture.",
      "Snoop and Dre gave it neighborhood authenticity with crossover radio appeal.",
      "The track defined a sonic era and influenced hip-hop, pop, and R&B production for years.",
    ],
    legacy:
      "One of the clearest bridges from 70s funk musicianship to 90s rap dominance.",
    sources: [
      "Leon Haywood - I Want'a Do Something Freaky to You (1975)",
      "Dr. Dre feat. Snoop Dogg - Nuthin' but a 'G' Thang (1992)",
      "Production credits: Dr. Dre",
    ],
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
    keyPoints: [
      "Chaka Khan's original vocal is a benchmark of 80s R&B power and control.",
      "Kanye pitched and chopped the sample while writing around his own recovery story.",
      "The emotional urgency made the record feel raw, focused, and human.",
      "It helped push sample-forward, introspective rap into the center of the 2000s mainstream.",
    ],
    legacy:
      "A major turning point for emotional openness in modern rap production and writing.",
    sources: [
      "Chaka Khan - Through the Fire (1984)",
      "Kanye West - Through the Wire (2003)",
      "Production credits: Kanye West",
    ],
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
    keyPoints: [
      "The Jackson 5 original came from the Motown system of elite songwriting and arrangement.",
      "Kanye reframed familiar hooks and drums into a triumphant, modern rap backdrop.",
      "JAY-Z delivered reflective bars with confidence, making old and new audiences connect at once.",
      "The song normalized classic soul flips as premium mainstream rap production.",
    ],
    legacy:
      "A strong example of cross-generational Black music conversation through sampling.",
    sources: [
      "The Jackson 5 - I Want You Back (1969)",
      "JAY-Z - Izzo (H.O.V.A.) (2001)",
      "Production credits: Kanye West",
    ],
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
    keyPoints: [
      "Abdel Halim Hafez's original recording carried a dramatic melodic phrase that later became central to this rap classic.",
      "Timbaland chopped and re-timed the phrase into a hypnotic loop with hard drums and open space.",
      "JAY-Z, Bun B, and Pimp C turned the track into a major mainstream and regional crossover moment.",
      "The record also became part of the broader legal and business conversation around sample rights.",
    ],
    legacy:
      "One of the most recognizable international sample flips in late-90s hip-hop.",
    sources: [
      "JAY-Z feat. UGK - Big Pimpin' (1999)",
      "Abdel Halim Hafez - Khosara Khosara (1960)",
      "Production credits: Timbaland",
    ],
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
    keyPoints: [
      "Ahmad Jamal's jazz phrasing provided melodic space that translated naturally into a rap loop.",
      "Pete Rock's production framed Nas with warmth and clarity while preserving gritty New York energy.",
      "The song balanced aspiration with street realism and became a defining moment on Illmatic.",
      "It remains a core example of jazz-to-hip-hop lineage done with precision and restraint.",
    ],
    legacy:
      "A benchmark record for lyrical storytelling over jazz-rooted sample production.",
    sources: [
      "Nas - The World Is Yours (1994)",
      "Ahmad Jamal - I Love Music (1970)",
      "Production credits: Pete Rock",
    ],
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
    keyPoints: [
      "Lonnie Liston Smith's original piano recording brought meditative harmony and emotional depth.",
      "The loop was left intentionally sparse, letting cadence and internal rhyme carry the track.",
      "The restraint in the beat gave every lyric extra weight and cinematic tension.",
      "The result is still one of the cleanest examples of how minimal sampling can create timeless rap records.",
    ],
    legacy:
      "A foundational sample loop in East Coast lyric-first production history.",
    sources: [
      "JAY-Z - Dead Presidents II (1996)",
      "Lonnie Liston Smith - A Garden of Peace (1983)",
      "Classic New York rap production lineage",
    ],
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
    keyPoints: [
      "Blues created the emotional grammar that hip-hop later amplified: raw storytelling, tension, and release.",
      "Jazz expanded rhythmic and harmonic language, giving producers decades of improvisational phrases to reinterpret.",
      "Funk delivered hard drum pockets and bass motion that became foundational for loops and break culture.",
      "Soul and R&B gave rap records warmth, hooks, and intergenerational memory through sampling.",
      "From DJs to modern beatmakers, sampling turned archives into new narratives without erasing the original creators.",
      "The result is a living lineage: Black music traditions continuously remixing themselves across eras.",
    ],
    legacy:
      "Sampling operates as cultural memory, preserving Black musical innovation while creating new forms.",
    sources: [
      "Public domain: St. Louis Blues (1929)",
      "Public domain: Jam Session (1942)",
      "Public domain: Satchmo Swings in Congo (1960)",
      "CHIC - Good Times (1979) / The Sugarhill Gang - Rapper's Delight (1979)",
    ],
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
    keyPoints: [
      "CHIC delivered one of disco's defining grooves with precise rhythm and iconic bass movement.",
      "Rapper's Delight used that groove to carry one of rap's first mainstream recordings.",
      "It moved party-driven rap tradition from local scenes into global commercial channels.",
      "It also accelerated industry debate around credit, replay, and sampling rights.",
    ],
    legacy:
      "A historic bridge between Black dance music, early rap culture, and global music business.",
    sources: [
      "CHIC - Good Times (1979)",
      "The Sugarhill Gang - Rapper's Delight (1979)",
      "Early commercial rap and rights-clearance context",
    ],
  },
];

const episodeMap = Object.fromEntries(
  sampleHistoryEpisodes.map((episode) => [episode.id, episode]),
);

module.exports = {
  sampleHistoryEpisodes,
  episodeMap,
};
