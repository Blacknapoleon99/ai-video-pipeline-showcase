#!/usr/bin/env python3
"""
Qwen3-TTS integration for hip-hop history narration pipeline.

Supports three modes:
  1. custom-voice: Use preset voices (Ryan, etc.) with emotion instructions
  2. voice-clone: Clone from a reference audio file
  3. voice-design: Design a voice from a natural language description

Usage:
  python qwen3_tts.py --text "Your text" --output out.wav --mode custom-voice --emotion warm
  python qwen3_tts.py --text "Your text" --output out.wav --mode voice-clone --voice-file ref.mp3
  python qwen3_tts.py --text "Your text" --output out.wav --mode voice-design --voice-description "deep male voice"
"""

import argparse
import os
import sys
import time

# Emotion presets map to Qwen3-TTS instruction strings
EMOTIONS = {
    "warm": "speak warmly and with a friendly, welcoming tone",
    "energetic": "speak with high energy, excitement, and a fast dynamic pace",
    "calm": "speak calmly, slowly, and with a relaxed soothing tone",
    "dramatic": "speak dramatically with intensity and powerful expression",
    "conversational": "speak naturally and casually like in a conversation",
    "authoritative": "speak with deep authority, confidence, and a commanding presence",
    "joyful": "speak joyfully with happiness and an uplifting bright tone",
    "contemplative": "speak thoughtfully and reflectively with a slow measured pace",
    "warm-joyful": "speak with warmth and joy, friendly and uplifting",
    "neutral": "speak clearly and naturally",
}

# Available preset speakers in Qwen3-TTS CustomVoice model
PRESET_SPEAKERS = ["aiden", "dylan", "eric", "ono_anna", "ryan", "serena", "sohee", "uncle_fu", "vivian"]
# Male voices: aiden, dylan, eric, ryan, uncle_fu
# Female voices: ono_anna, serena, sohee, vivian

DEFAULT_SPEAKER = "eric"
DEFAULT_MODEL_SIZE = "1.7B"


def parse_args():
    parser = argparse.ArgumentParser(description="Qwen3-TTS narration generator")
    parser.add_argument("--text", type=str, required=True, help="Text to synthesize")
    parser.add_argument("--output", type=str, required=True, help="Output WAV path")
    parser.add_argument("--mode", type=str, default="custom-voice",
                        choices=["custom-voice", "voice-clone", "voice-design"],
                        help="TTS mode")
    parser.add_argument("--emotion", type=str, default="warm",
                        help=f"Emotion preset: {', '.join(EMOTIONS.keys())}")
    parser.add_argument("--instruct", type=str, default="",
                        help="Custom instruction (overrides --emotion)")
    parser.add_argument("--speaker", type=str, default=DEFAULT_SPEAKER,
                        help=f"Preset speaker for custom-voice mode: {', '.join(PRESET_SPEAKERS)}")
    parser.add_argument("--voice-file", type=str, default="",
                        help="Reference audio file for voice-clone mode")
    parser.add_argument("--voice-ref-text", type=str, default="",
                        help="Transcript of the reference audio (improves cloning quality)")
    parser.add_argument("--voice-description", type=str, default="",
                        help="Voice description for voice-design mode")
    parser.add_argument("--model-size", type=str, default=DEFAULT_MODEL_SIZE,
                        choices=["0.6B", "1.7B"],
                        help="Model size (0.6B=faster, 1.7B=better quality)")
    parser.add_argument("--speed", type=float, default=1.0,
                        help="Post-processing speed multiplier (e.g. 1.1 = 10%% faster)")
    parser.add_argument("--list-emotions", action="store_true", help="List available emotions")
    parser.add_argument("--list-speakers", action="store_true", help="List available speakers")
    return parser.parse_args()


def get_model_name(mode, model_size):
    """Get the correct HuggingFace model name for the mode."""
    if mode == "custom-voice":
        return f"Qwen/Qwen3-TTS-12Hz-{model_size}-CustomVoice"
    elif mode == "voice-design":
        return f"Qwen/Qwen3-TTS-12Hz-{model_size}-VoiceDesign"
    else:  # voice-clone
        return f"Qwen/Qwen3-TTS-12Hz-{model_size}-Base"


def generate_speech(args):
    """Generate speech using Qwen3-TTS."""
    import torch
    import soundfile as sf
    from qwen_tts import Qwen3TTSModel

    # Determine instruction text
    if args.instruct:
        instruct = args.instruct
    elif args.emotion in EMOTIONS:
        instruct = EMOTIONS[args.emotion]
    else:
        instruct = EMOTIONS["neutral"]

    model_name = get_model_name(args.mode, args.model_size)
    print(f"Loading model: {model_name}", file=sys.stderr)
    print(f"Mode: {args.mode}", file=sys.stderr)
    print(f"Emotion: {args.emotion} -> \"{instruct}\"", file=sys.stderr)

    start = time.time()

    # Try flash_attention_2, fall back to sdpa, then eager
    attn_impl = "flash_attention_2"
    try:
        model = Qwen3TTSModel.from_pretrained(
            model_name,
            device_map="cuda:0",
            dtype=torch.bfloat16,
            attn_implementation=attn_impl,
        )
    except Exception as e:
        print(f"flash_attention_2 not available ({e}), trying sdpa...", file=sys.stderr)
        attn_impl = "sdpa"
        try:
            model = Qwen3TTSModel.from_pretrained(
                model_name,
                device_map="cuda:0",
                dtype=torch.bfloat16,
                attn_implementation=attn_impl,
            )
        except Exception as e2:
            print(f"sdpa not available ({e2}), using eager...", file=sys.stderr)
            model = Qwen3TTSModel.from_pretrained(
                model_name,
                device_map="cuda:0",
                dtype=torch.bfloat16,
                attn_implementation="eager",
            )

    load_time = time.time() - start
    print(f"Model loaded in {load_time:.1f}s (attn: {attn_impl})", file=sys.stderr)

    gen_start = time.time()

    if args.mode == "custom-voice":
        print(f"Speaker: {args.speaker}", file=sys.stderr)
        wavs, sr = model.generate_custom_voice(
            text=args.text,
            language="English",
            speaker=args.speaker,
            instruct=instruct,
        )

    elif args.mode == "voice-clone":
        if not args.voice_file:
            raise ValueError("--voice-file is required for voice-clone mode")
        if not os.path.exists(args.voice_file):
            raise FileNotFoundError(f"Voice file not found: {args.voice_file}")

        print(f"Cloning from: {args.voice_file}", file=sys.stderr)
        clone_kwargs = {
            "text": args.text,
            "language": "English",
            "ref_audio": args.voice_file,
        }
        if args.voice_ref_text:
            clone_kwargs["ref_text"] = args.voice_ref_text
        wavs, sr = model.generate_voice_clone(**clone_kwargs)

    elif args.mode == "voice-design":
        description = args.voice_description or f"A deep male voice that {instruct}"
        print(f"Voice design: {description}", file=sys.stderr)
        wavs, sr = model.generate_voice_design(
            text=args.text,
            language="English",
            instruct=description,
        )

    gen_time = time.time() - gen_start
    print(f"Generated in {gen_time:.1f}s", file=sys.stderr)

    audio_data = wavs[0]

    # Apply speed adjustment if requested
    if args.speed != 1.0 and args.speed > 0:
        import numpy as np
        original_len = len(audio_data)
        indices = np.arange(0, original_len, args.speed)
        indices = indices[indices < original_len].astype(int)
        audio_data = audio_data[indices] if hasattr(audio_data, '__getitem__') else np.array(audio_data)[indices]
        print(f"Speed adjusted: {args.speed}x ({original_len} -> {len(audio_data)} samples)", file=sys.stderr)

    # Save output
    output_path = os.path.abspath(args.output)
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    sf.write(output_path, audio_data, sr)

    # Print machine-readable output for pipeline integration
    print(f"mode={args.mode}")
    print(f"emotion={args.emotion}")
    print(f"speaker={args.speaker}")
    print(f"speed={args.speed}")
    print(f"sample_rate={sr}")
    print(f"duration={len(audio_data) / sr:.2f}")
    print(f"output={output_path}")


def main():
    args = parse_args()

    if args.list_emotions:
        print("Available Emotions:")
        for name, desc in EMOTIONS.items():
            print(f"  {name}: {desc}")
        return

    if args.list_speakers:
        print("Available Speakers:")
        for s in PRESET_SPEAKERS:
            print(f"  {s}")
        return

    generate_speech(args)


if __name__ == "__main__":
    main()
