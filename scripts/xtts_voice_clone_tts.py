#!/usr/bin/env python3
"""
Voice Cloning TTS using XTTS-v2 (from Coqui TTS).
Clones your existing voice preset with emotional variation.
Perfect for using <LOCAL_WORKSPACE>\voice-presets\ audio files.
"""

import argparse
import os
import sys
from pathlib import Path

import torch
import numpy as np

try:
    from TTS.api import TTS
except ImportError:
    print("Error: TTS package not installed")
    print("Install with: pip install -q TTS")
    sys.exit(1)


# Emotion/style guidance for voice cloning
EMOTIONS = {
    "calm": "Speak in a calm, steady, composed manner with thoughtful delivery.",
    "energetic": "Speak with energetic passion, enthusiasm, and dynamic delivery.",
    "warm": "Speak in a warm, friendly, approachable, and welcoming tone.",
    "dramatic": "Speak with dramatic intensity, expressive power, and impact.",
    "conversational": "Speak in a conversational, natural, intimate, and genuine way.",
    "authoritative": "Speak with authority, confidence, commanding presence, and professionalism.",
    "joyful": "Speak with joyful uplift, positivity, and bright energy.",
    "contemplative": "Speak in a contemplative, reflective, introspective, and measured way.",
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Clone voices from audio files with emotional variation using XTTS-v2"
    )
    parser.add_argument("--text", type=str, default="", help="Text to synthesize")
    parser.add_argument("--output", type=str, default="", help="Output WAV path")
    parser.add_argument("--voice-file", type=str, default="", help="Reference voice audio file")
    parser.add_argument("--emotion", type=str, default="warm", help="Emotion/style guidance")
    parser.add_argument("--device", type=str, default="cuda", help="cuda or cpu")
    parser.add_argument("--language", type=str, default="en", help="Language code (en, es, fr, etc)")
    parser.add_argument("--speed", type=float, default=1.0, help="Speech speed multiplier")
    parser.add_argument("--temperature", type=float, default=0.75, help="Generation temperature")
    parser.add_argument("--list-emotions", action="store_true", help="Print emotions and exit")
    return parser.parse_args()


def get_emotion_guidance(emotion: str) -> str:
    """Get emotion guidance text."""
    emotion_lower = emotion.strip().lower()
    if emotion_lower in EMOTIONS:
        return EMOTIONS[emotion_lower]
    return f"Speak with {emotion} emotion."


def clone_voice(
    text: str,
    voice_file: str,
    emotion: str = "warm",
    device: str = "cuda",
    language: str = "en",
    speed: float = 1.0,
    temperature: float = 0.75,
) -> np.ndarray:
    """Clone voice with emotional variation using XTTS-v2."""

    # Initialize XTTS-v2 model
    print("Loading XTTS-v2 model...", file=sys.stderr)
    model = TTS(model_name="tts_models/multilingual/multi-speaker/xtts_v2", gpu=(device.lower() == "cuda"))

    # Verify voice file exists
    if not os.path.exists(voice_file):
        raise FileNotFoundError(f"Voice file not found: {voice_file}")

    # Build prompt with emotion guidance
    emotion_guide = get_emotion_guidance(emotion)
    full_prompt = f"{emotion_guide} {text}".strip()

    print(f"Cloning voice from: {voice_file}", file=sys.stderr)
    print(f"Emotion: {emotion}", file=sys.stderr)
    print(f"Language: {language}", file=sys.stderr)

    # Generate speech
    output_path = "/tmp/xtts_output.wav"
    model.tts_to_file(
        text=full_prompt,
        speaker_wav=voice_file,
        language=language,
        file_path=output_path,
        temperature=temperature,
        speed=speed,
    )

    # Read and return audio
    import soundfile as sf
    audio, sr = sf.read(output_path)
    return audio, sr


def main() -> None:
    args = parse_args()

    if args.list_emotions:
        print("Available Emotions/Styles:")
        for key in sorted(EMOTIONS.keys()):
            print(f"  {key}: {EMOTIONS[key]}")
        return

    if not args.text.strip():
        raise ValueError("Missing --text")
    if not args.output.strip():
        raise ValueError("Missing --output")
    if not args.voice_file.strip():
        raise ValueError("Missing --voice-file (path to reference audio)")

    output_path = os.path.abspath(args.output)
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    try:
        # Clone voice
        audio, sr = clone_voice(
            text=args.text,
            voice_file=args.voice_file,
            emotion=args.emotion,
            device=args.device,
            language=args.language,
            speed=args.speed,
            temperature=args.temperature,
        )

        # Save output
        import soundfile as sf
        sf.write(output_path, audio, sr)

        print(f"emotion={args.emotion}")
        print(f"voice-file={os.path.basename(args.voice_file)}")
        print(f"language={args.language}")
        print(f"output={output_path}")

    except ImportError as e:
        print(f"Error: Missing dependency - {e}")
        print("\nInstall TTS package with:")
        print("  pip install -q TTS")
        print("  pip install -q soundfile")
        raise
    except Exception as e:
        print(f"Error: {e}")
        raise


if __name__ == "__main__":
    main()
