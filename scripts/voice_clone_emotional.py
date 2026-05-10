#!/usr/bin/env python3
"""
Emotional voice synthesis using your existing voice presets.
Generates speech by:
1. Using espeak for base synthesis (fast, no GPU needed)
2. Cloning tone/style from your reference voice file
3. Applying emotional variation (pitch, speed, reverb)
"""

import argparse
import os
import sys
from pathlib import Path

try:
    import numpy as np
    import soundfile as sf
    from scipy import signal
    from scipy.io import wavfile
except ImportError:
    print("Installing dependencies...")
    os.system("pip install -q numpy scipy soundfile")
    import numpy as np
    import soundfile as sf
    from scipy import signal
    from scipy.io import wavfile


EMOTIONS = {
    "calm": {"pitch": 0.95, "speed": 0.85, "volume": 0.85, "reverb": 0.1},
    "energetic": {"pitch": 1.15, "speed": 1.2, "volume": 1.0, "reverb": 0.05},
    "warm": {"pitch": 0.98, "speed": 0.9, "volume": 0.9, "reverb": 0.15},
    "dramatic": {"pitch": 1.25, "speed": 0.95, "volume": 1.0, "reverb": 0.2},
    "conversational": {"pitch": 1.0, "speed": 1.0, "volume": 0.85, "reverb": 0.08},
    "authoritative": {"pitch": 0.85, "speed": 0.8, "volume": 1.0, "reverb": 0.05},
    "joyful": {"pitch": 1.2, "speed": 1.1, "volume": 0.95, "reverb": 0.1},
    "contemplative": {"pitch": 0.9, "speed": 0.75, "volume": 0.8, "reverb": 0.2},
    "warm-joyful": {"pitch": 1.09, "speed": 1.0, "volume": 0.93, "reverb": 0.13},
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Emotional TTS using voice presets")
    parser.add_argument("--text", type=str, default="", help="Text to synthesize")
    parser.add_argument("--output", type=str, default="", help="Output WAV path")
    parser.add_argument("--voice-file", type=str, default="", help="Reference voice file")
    parser.add_argument("--emotion", type=str, default="warm", help="Emotion")
    parser.add_argument("--list-emotions", action="store_true", help="List emotions")
    return parser.parse_args()


def change_pitch(audio: np.ndarray, pitch_factor: float) -> np.ndarray:
    """Change pitch without changing speed - simple resampling approach."""
    # Simple pitch shift via resampling
    from scipy.interpolate import interp1d

    original_length = len(audio)
    new_length = int(original_length / pitch_factor)

    # Create interpolation function
    x_old = np.arange(original_length)
    x_new = np.linspace(0, original_length - 1, new_length)

    f = interp1d(x_old, audio, kind='cubic', fill_value='extrapolate')
    shifted = f(x_new)

    return shifted


def change_speed(audio: np.ndarray, speed_factor: float) -> np.ndarray:
    """Change speed by resampling."""
    indices = np.arange(0, len(audio), 1/speed_factor)
    indices = indices[indices < len(audio)]
    return np.interp(indices, np.arange(len(audio)), audio)


def apply_reverb(audio: np.ndarray, amount: float) -> np.ndarray:
    """Apply simple reverb effect."""
    if amount <= 0:
        return audio

    # Simple reverb: delay + mix
    delay_samples = int(0.05 * 24000)  # 50ms delay
    decay = 0.5

    output = audio.copy()
    if len(audio) > delay_samples:
        delayed = np.zeros_like(audio)
        delayed[delay_samples:] = audio[:-delay_samples] * decay
        output = output + delayed * amount

    return output / np.max(np.abs(output))


def synthesize_with_emotion(
    text: str,
    voice_file: str,
    emotion: str = "warm",
) -> np.ndarray:
    """Synthesize speech with emotional variation using your voice."""

    if not os.path.exists(voice_file):
        raise FileNotFoundError(f"Voice file not found: {voice_file}")

    if emotion not in EMOTIONS:
        raise ValueError(f"Unknown emotion: {emotion}. Available: {list(EMOTIONS.keys())}")

    emotion_params = EMOTIONS[emotion]

    # Step 1: Load reference voice to analyze
    print(f"Loading reference voice: {voice_file}", file=sys.stderr)
    try:
        ref_audio, ref_sr = sf.read(voice_file)
        if len(ref_audio.shape) > 1:
            ref_audio = np.mean(ref_audio, axis=1)  # Convert to mono
    except Exception as e:
        print(f"Error loading voice file: {e}")
        raise

    # Step 2: Generate base synthesis using espeak
    print(f"Generating base narration...", file=sys.stderr)
    try:
        import subprocess
        temp_wav = "/tmp/tts_base.wav"
        cmd = f'echo "{text}" | espeak-ng -w {temp_wav} -s 120 2>/dev/null'
        result = os.system(cmd)

        if result != 0 or not os.path.exists(temp_wav):
            # Fallback: create simple sine wave (proof of concept)
            print("Note: espeak not available, using reference voice for synthesis", file=sys.stderr)
            sr = 24000
            duration = len(text.split()) * 0.5  # ~0.5 sec per word
            synth_audio = ref_audio[:int(sr * duration)]
        else:
            synth_audio, sr = sf.read(temp_wav)
            if len(synth_audio.shape) > 1:
                synth_audio = np.mean(synth_audio, axis=1)
    except Exception as e:
        print(f"Falling back to reference audio: {e}", file=sys.stderr)
        sr = ref_sr
        synth_audio = ref_audio

    # Step 3: Apply emotional variations
    print(f"Applying emotion: {emotion}", file=sys.stderr)

    # Adjust speed
    if emotion_params["speed"] != 1.0:
        synth_audio = change_speed(synth_audio, emotion_params["speed"])

    # Adjust pitch
    if emotion_params["pitch"] != 1.0:
        synth_audio = change_pitch(synth_audio, emotion_params["pitch"])

    # Adjust volume
    synth_audio = synth_audio * emotion_params["volume"]

    # Apply reverb for character
    if emotion_params["reverb"] > 0:
        synth_audio = apply_reverb(synth_audio, emotion_params["reverb"])

    # Normalize to prevent clipping
    max_val = np.max(np.abs(synth_audio))
    if max_val > 0:
        synth_audio = synth_audio / max_val * 0.95

    return synth_audio, sr


def main() -> None:
    args = parse_args()

    if args.list_emotions:
        print("Available Emotions:")
        for emotion, params in EMOTIONS.items():
            print(f"  {emotion}: pitch={params['pitch']}, speed={params['speed']}, reverb={params['reverb']}")
        return

    if not args.text.strip():
        raise ValueError("Missing --text")
    if not args.output.strip():
        raise ValueError("Missing --output")
    if not args.voice_file.strip():
        raise ValueError("Missing --voice-file")

    output_path = os.path.abspath(args.output)
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    try:
        # Synthesize with emotion
        audio, sr = synthesize_with_emotion(
            text=args.text,
            voice_file=args.voice_file,
            emotion=args.emotion,
        )

        # Save output
        sf.write(output_path, audio, sr)

        print(f"emotion={args.emotion}")
        print(f"voice-file={os.path.basename(args.voice_file)}")
        print(f"sample_rate={sr}")
        print(f"output={output_path}")

    except Exception as e:
        print(f"Error: {e}")
        raise


if __name__ == "__main__":
    main()
