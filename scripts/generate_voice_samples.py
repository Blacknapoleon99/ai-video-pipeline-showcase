#!/usr/bin/env python3
"""Generate multiple Qwen3-TTS voice samples for comparison."""

import subprocess
import sys
import os
import time

SAMPLE_TEXT = (
    "In 1994, Nas dropped Illmatic and changed the game forever. "
    "Built on samples from jazz legends and soul pioneers, every beat told a story. "
    "The Queensbridge kid turned street poetry into high art, "
    "and hip-hop was never the same."
)

OUTPUT_DIR = "D:/SnapAuto/voice-samples/qwen3-test"
SCRIPT = os.path.join(os.path.dirname(__file__), "qwen3_tts.py")

# All variations to generate
VARIATIONS = [
    # --- CUSTOM VOICE: different speakers × emotions × speeds ---
    # AIDEN
    {"name": "01-aiden-warm-normal", "speaker": "aiden", "emotion": "warm", "speed": 1.0},
    {"name": "02-aiden-energetic-normal", "speaker": "aiden", "emotion": "energetic", "speed": 1.0},
    {"name": "03-aiden-authoritative-normal", "speaker": "aiden", "emotion": "authoritative", "speed": 1.0},
    {"name": "04-aiden-conversational-normal", "speaker": "aiden", "emotion": "conversational", "speed": 1.0},
    # ERIC
    {"name": "05-eric-warm-normal", "speaker": "eric", "emotion": "warm", "speed": 1.0},
    {"name": "06-eric-energetic-normal", "speaker": "eric", "emotion": "energetic", "speed": 1.0},
    {"name": "07-eric-authoritative-normal", "speaker": "eric", "emotion": "authoritative", "speed": 1.0},
    {"name": "08-eric-conversational-normal", "speaker": "eric", "emotion": "conversational", "speed": 1.0},
    # DYLAN
    {"name": "09-dylan-warm-normal", "speaker": "dylan", "emotion": "warm", "speed": 1.0},
    {"name": "10-dylan-energetic-normal", "speaker": "dylan", "emotion": "energetic", "speed": 1.0},
    {"name": "11-dylan-authoritative-normal", "speaker": "dylan", "emotion": "authoritative", "speed": 1.0},
    # RYAN
    {"name": "12-ryan-warm-normal", "speaker": "ryan", "emotion": "warm", "speed": 1.0},
    {"name": "13-ryan-energetic-normal", "speaker": "ryan", "emotion": "energetic", "speed": 1.0},
    {"name": "14-ryan-authoritative-normal", "speaker": "ryan", "emotion": "authoritative", "speed": 1.0},
    # UNCLE_FU
    {"name": "15-unclfu-warm-normal", "speaker": "uncle_fu", "emotion": "warm", "speed": 1.0},
    {"name": "16-unclfu-energetic-normal", "speaker": "uncle_fu", "emotion": "energetic", "speed": 1.0},

    # --- SPEED VARIATIONS on best speakers ---
    {"name": "17-aiden-warm-slow95", "speaker": "aiden", "emotion": "warm", "speed": 0.95},
    {"name": "18-aiden-warm-fast105", "speaker": "aiden", "emotion": "warm", "speed": 1.05},
    {"name": "19-eric-warm-slow95", "speaker": "eric", "emotion": "warm", "speed": 0.95},
    {"name": "20-eric-warm-fast105", "speaker": "eric", "emotion": "warm", "speed": 1.05},

    # --- CUSTOM INSTRUCTIONS (more natural/human) ---
    {"name": "21-aiden-hiphop-narrator", "speaker": "aiden", "instruct": "speak like a cool hip-hop documentary narrator, natural and engaging with swagger", "speed": 1.0},
    {"name": "22-eric-storyteller", "speaker": "eric", "instruct": "speak like a natural storyteller sharing an amazing true story with friends, relaxed but passionate", "speed": 1.0},
    {"name": "23-dylan-podcast-host", "speaker": "dylan", "instruct": "speak like a popular podcast host, casual and conversational but knowledgeable", "speed": 1.0},
    {"name": "24-ryan-radio-dj", "speaker": "ryan", "instruct": "speak like a smooth late-night radio DJ, deep and velvety with natural rhythm", "speed": 1.0},
    {"name": "25-aiden-news-anchor", "speaker": "aiden", "instruct": "speak clearly and professionally like a news anchor delivering an exciting cultural story", "speed": 1.0},

    # --- VOICE DESIGN (fully custom voices) ---
    {"name": "26-design-deep-baritone", "mode": "voice-design", "voice_desc": "A deep African American male voice with rich baritone, confident and warm like Morgan Freeman narrating a documentary", "speed": 1.0},
    {"name": "27-design-young-hype", "mode": "voice-design", "voice_desc": "A young energetic African American male voice, fast-talking and passionate like a hip-hop journalist on camera", "speed": 1.0},
    {"name": "28-design-smooth-radio", "mode": "voice-design", "voice_desc": "A smooth male radio host voice with deep resonance, speaking naturally and coolly about music history", "speed": 1.0},
    {"name": "29-design-street-poet", "mode": "voice-design", "voice_desc": "A male spoken word artist voice, rhythmic and poetic with natural urban cadence and soul", "speed": 1.0},
    {"name": "30-design-professor", "mode": "voice-design", "voice_desc": "An educated African American male professor voice, articulate and measured but passionate about the subject", "speed": 1.0},
]


def generate_one(var):
    output_path = os.path.join(OUTPUT_DIR, f"{var['name']}.wav")
    if os.path.exists(output_path):
        print(f"  SKIP (exists): {var['name']}")
        return True

    mode = var.get("mode", "custom-voice")
    cmd = [
        sys.executable, SCRIPT,
        "--text", SAMPLE_TEXT,
        "--output", output_path,
        "--mode", mode,
        "--emotion", var.get("emotion", "warm"),
    ]

    if mode == "custom-voice":
        cmd.extend(["--speaker", var.get("speaker", "eric")])

    if var.get("instruct"):
        cmd.extend(["--instruct", var["instruct"]])

    if var.get("voice_desc"):
        cmd.extend(["--voice-description", var["voice_desc"]])

    if var.get("speed", 1.0) != 1.0:
        cmd.extend(["--speed", str(var["speed"])])

    start = time.time()
    print(f"  Generating: {var['name']}...", end="", flush=True)
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=300)
    elapsed = time.time() - start

    if result.returncode != 0:
        print(f" FAILED ({elapsed:.0f}s)")
        # Print just the last few lines of error
        err_lines = (result.stderr or result.stdout or "").strip().split("\n")
        for line in err_lines[-3:]:
            print(f"    {line}")
        return False
    else:
        # Extract duration from stdout
        duration = ""
        for line in (result.stdout or "").split("\n"):
            if line.startswith("duration="):
                duration = line.split("=")[1]
        print(f" OK ({elapsed:.0f}s, {duration}s audio)")
        return True


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    total = len(VARIATIONS)
    ok = 0
    fail = 0

    print(f"Generating {total} voice samples to: {OUTPUT_DIR}")
    print(f"Text: \"{SAMPLE_TEXT[:80]}...\"")
    print()

    for i, var in enumerate(VARIATIONS):
        print(f"[{i+1}/{total}]", end="")
        if generate_one(var):
            ok += 1
        else:
            fail += 1

    print()
    print(f"Done! {ok} succeeded, {fail} failed")
    print(f"Samples at: {OUTPUT_DIR}")
    print()
    print("Listen to them and pick your favorite!")


if __name__ == "__main__":
    main()
