#!/usr/bin/env python3
"""
Emotional TTS wrapper for text-to-speech with accent awareness.
Uses Bark (from Suno) for open-source emotional speech synthesis.
Supports emotion prompts and accent specifications for diverse voice synthesis.
"""

import argparse
import os
import random

import torch
import torchaudio
import numpy as np

# Try importing Bark, with fallback instructions
try:
    from bark import SAMPLE_RATE, generate_audio, preload_models
except ImportError:
    print("Warning: Bark not installed. Install with: pip install bark-ml")
    print("Or for best results: pip install git+https://github.com/suno-ai/bark.git")
    SAMPLE_RATE = 24000
    generate_audio = None


# Voice descriptions for African American male voices with Bark
# These descriptions guide the model toward specific voice characteristics
PRESETS = {
    "malik": {
        "voice_name": "v2/en_speaker_1",
        "description": "A warm, confident African American male narrator. Natural rhythm, clear diction, calm and authoritative.",
        "speaker_emoji": "🎤",
    },

    "andre": {
        "voice_name": "v2/en_speaker_3",
        "description": "Energetic and passionate African American male with smooth confidence. Expressive, engaging storytelling delivery.",
        "speaker_emoji": "🎬",
    },

    "khalil": {
        "voice_name": "v2/en_speaker_5",
        "description": "Deep, resonant African American male with measured delivery. Calm authority, mature wisdom, grounded articulation.",
        "speaker_emoji": "🎙️",
    },

    "marcus": {
        "voice_name": "v2/en_speaker_6",
        "description": "Modern, contemporary African American male narrator. Confident pacing, refined clarity, energetic yet polished.",
        "speaker_emoji": "📻",
    },

    "isaiah": {
        "voice_name": "v2/en_speaker_4",
        "description": "Poetic, soulful African American male with emotional depth and musicality. Expressive, rich, excellent emotional range.",
        "speaker_emoji": "✨",
    },

    "andre_emotional": {
        "voice_name": "v2/en_speaker_3",
        "description": "Warm, emotionally engaged African American male narrator with passionate delivery. Deep feeling with clarity throughout.",
        "speaker_emoji": "❤️",
    },
}

EMOTIONS = {
    "calm": "calm, steady, composed, thoughtful",
    "energetic": "energetic, passionate, enthusiastic, dynamic",
    "warm": "warm, friendly, approachable, welcoming",
    "dramatic": "dramatic, intense, expressive, powerful",
    "conversational": "conversational, natural, intimate, genuine",
    "authoritative": "authoritative, confident, commanding, professional",
    "joyful": "joyful, uplifting, positive, bright",
    "contemplative": "contemplative, reflective, introspective, measured",
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Generate emotional, accent-aware speech synthesis")
    parser.add_argument("--text", type=str, default="", help="Text to synthesize")
    parser.add_argument("--output", type=str, default="", help="Output WAV path")
    parser.add_argument("--preset", type=str, default="malik", help="Voice preset key")
    parser.add_argument("--emotion", type=str, default="warm", help="Emotion/style (calm, energetic, warm, dramatic, etc)")
    parser.add_argument("--description", type=str, default="", help="Override description prompt")
    parser.add_argument("--model", type=str, default="bark", help="Model backend: bark, gpt-sovits, xtts")
    parser.add_argument("--device", type=str, default="cuda", help="cuda or cpu")
    parser.add_argument("--seed", type=int, default=1337, help="Random seed")
    parser.add_argument("--temperature", type=float, default=0.7, help="Generation temperature")
    parser.add_argument("--list-presets", action="store_true", help="Print presets and exit")
    parser.add_argument("--list-emotions", action="store_true", help="Print emotions and exit")
    return parser.parse_args()


def build_emotion_prompt(emotion: str) -> str:
    """Build emotion descriptor from emotion key."""
    emotion_lower = emotion.strip().lower()
    if emotion_lower in EMOTIONS:
        return EMOTIONS[emotion_lower]
    return emotion  # Return as-is if not in predefined list


def generate_with_bark(text: str, preset_key: str, emotion: str, temperature: float, seed: int) -> np.ndarray:
    """Generate audio using Bark text-to-speech model."""
    if generate_audio is None:
        raise ImportError("Bark not available. Install with: pip install bark-ml")

    preset_data = PRESETS[preset_key]
    voice_name = preset_data["voice_name"]

    # Build full prompt with emotion guidance
    emotion_guide = build_emotion_prompt(emotion)
    full_text = f"[Voice: {preset_data['description']}. Emotion: {emotion_guide}.] {text}"

    torch.manual_seed(seed)
    random.seed(seed)

    try:
        # Preload models to GPU if available
        preload_models(device="cuda" if torch.cuda.is_available() else "cpu")

        # Generate audio
        audio_array = generate_audio(full_text, history_prompt=voice_name, temperature=temperature)
        return audio_array
    except Exception as e:
        print(f"Bark generation error: {e}")
        print("Make sure Bark is properly installed:")
        print("  pip install -q bark-ml")
        raise


def main() -> None:
    args = parse_args()

    if args.list_presets:
        print("Available Voice Presets (African American Male):")
        for key in sorted(PRESETS.keys()):
            preset = PRESETS[key]
            print(f"  {preset['speaker_emoji']} {key}: {preset['description']}")
        return

    if args.list_emotions:
        print("Available Emotions/Styles:")
        for key in sorted(EMOTIONS.keys()):
            print(f"  {key}: {EMOTIONS[key]}")
        return

    if not args.text.strip():
        raise ValueError("Missing --text")
    if not args.output.strip():
        raise ValueError("Missing --output")

    preset_key = args.preset.strip().lower()

    if preset_key not in PRESETS:
        raise ValueError(f"Unknown preset '{preset_key}'. Available: {', '.join(sorted(PRESETS.keys()))}")

    output_path = os.path.abspath(args.output)
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    try:
        # Generate audio using the specified backend
        if args.model.lower() == "bark":
            audio_array = generate_with_bark(
                args.text,
                preset_key,
                args.emotion,
                args.temperature,
                args.seed
            )
        else:
            raise ValueError(f"Unsupported model: {args.model}. Available: bark")

        # Save audio
        if audio_array is not None:
            torchaudio.save(output_path, torch.from_numpy(audio_array).unsqueeze(0).float(), SAMPLE_RATE)

            print(f"preset={preset_key}")
            print(f"emotion={args.emotion}")
            print(f"model={args.model}")
            print(f"output={output_path}")
        else:
            raise RuntimeError("Audio generation returned None")

    except ImportError as e:
        print(f"Missing dependency: {e}")
        print("\nInstall required packages:")
        print("  pip install bark-ml torch torchaudio")
        raise
    except Exception as e:
        print(f"Error: {e}")
        raise


if __name__ == "__main__":
    main()
