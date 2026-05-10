const fs = require("fs");
const path = require("path");
const {spawnSync} = require("child_process");

const PROJECT_ROOT = path.resolve(__dirname, "..");

const parseArgs = (argv) => {
  const args = {_: []};
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) {
      args._.push(token);
      continue;
    }
    const key = token.slice(2);
    const next = argv[index + 1];
    if (!next || next.startsWith("--")) {
      args[key] = true;
      continue;
    }
    args[key] = next;
    index += 1;
  }
  return args;
};

const main = () => {
  const args = parseArgs(process.argv.slice(2));
  const inputPath = args.input || args._[0];
  if (!inputPath) {
    throw new Error(
      "Missing --input <video-or-audio-file>. Example: node scripts/extract-reference-voice.js --input \"D:\\clip.mp4\"",
    );
  }

  const start = args.start || "00:00:02";
  const duration = args.duration || "00:00:12";
  const outputPath =
    args.output ||
    path.join(PROJECT_ROOT, "public", "voices", "reference", "black_male_ref.wav");
  const ffmpegPath = args.ffmpeg || process.env.FFMPEG_PATH || "ffmpeg";

  fs.mkdirSync(path.dirname(outputPath), {recursive: true});

  const ffmpegArgs = [
    "-y",
    "-ss",
    String(start),
    "-t",
    String(duration),
    "-i",
    path.resolve(inputPath),
    "-vn",
    "-ac",
    "1",
    "-ar",
    "24000",
    "-af",
    "highpass=f=80,lowpass=f=7600",
    outputPath,
  ];

  const result = spawnSync(ffmpegPath, ffmpegArgs, {
    encoding: "utf8",
    cwd: PROJECT_ROOT,
  });

  if (result.status !== 0) {
    throw new Error(`ffmpeg failed: ${result.stderr || result.stdout}`);
  }

  console.log(`reference_audio=${outputPath}`);
  console.log(`source=${path.resolve(inputPath)}`);
  console.log(`start=${start}`);
  console.log(`duration=${duration}`);
};

try {
  main();
} catch (error) {
  console.error(String(error.message || error));
  process.exit(1);
}
