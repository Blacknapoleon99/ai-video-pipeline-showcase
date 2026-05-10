import argparse
import os
import random

import soundfile as sf
import torch
from parler_tts import ParlerTTSForConditionalGeneration
from transformers import AutoTokenizer


PRESETS = {
    "marcus": "Marcus delivers a confident, warm, modern American male narration voice with clear diction, steady pacing, and natural studio-quality tone.",
    "michael": "Michael has a deep, articulate American male narration voice with calm authority, smooth cadence, and professional broadcast clarity.",
    "tyler": "Tyler speaks with an energetic yet controlled American male storytelling voice, expressive and engaging with crisp pronunciation.",
    "victor": "Victor has a mature, resonant male narration voice with rich low end, measured timing, and clean intelligibility.",
    "thabo": "Thabo speaks in a grounded, polished male narration style with warm tone, clear delivery, and subtle South African character.",
    "raphael": "Raphael has a rich contemporary male narration voice, balanced and expressive, with confident pacing and clear consonants.",
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Generate speech with ParlerVoice presets")
    parser.add_argument("--text", type=str, default="", help="Text to synthesize")
    parser.add_argument("--output", type=str, default="", help="Output WAV path")
    parser.add_argument("--preset", type=str, default="marcus", help="Voice preset key")
    parser.add_argument("--description", type=str, default="", help="Override description prompt")
    parser.add_argument("--model", type=str, default="voicing-ai/ParlerVoice", help="Hugging Face model")
    parser.add_argument("--device", type=str, default="cuda", help="cuda or cpu")
    parser.add_argument("--seed", type=int, default=1337, help="Random seed")
    parser.add_argument("--list-presets", action="store_true", help="Print presets and exit")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    if args.list_presets:
        for key in sorted(PRESETS.keys()):
            print(f"{key}: {PRESETS[key]}")
        return

    if not args.text.strip():
        raise ValueError("Missing --text")
    if not args.output.strip():
        raise ValueError("Missing --output")

    preset_key = args.preset.strip().lower()
    if args.description.strip():
        description = args.description.strip()
    else:
        if preset_key not in PRESETS:
            raise ValueError(f"Unknown preset '{preset_key}'. Available: {', '.join(sorted(PRESETS.keys()))}")
        description = PRESETS[preset_key]

    torch.manual_seed(args.seed)
    random.seed(args.seed)

    use_cuda = args.device.lower().startswith("cuda") and torch.cuda.is_available()
    device = "cuda:0" if use_cuda else "cpu"
    model_dtype = torch.float16 if use_cuda else torch.float32

    model = ParlerTTSForConditionalGeneration.from_pretrained(
        args.model, torch_dtype=model_dtype
    ).to(device)
    prompt_tokenizer = AutoTokenizer.from_pretrained(args.model)
    description_tokenizer = AutoTokenizer.from_pretrained(model.config.text_encoder._name_or_path)

    desc_inputs = description_tokenizer(description, return_tensors="pt").to(device)
    prompt_inputs = prompt_tokenizer(args.text.strip(), return_tensors="pt").to(device)

    with torch.inference_mode():
        generation = model.generate(
            input_ids=desc_inputs.input_ids,
            attention_mask=desc_inputs.attention_mask,
            prompt_input_ids=prompt_inputs.input_ids,
            prompt_attention_mask=prompt_inputs.attention_mask,
            do_sample=True,
            temperature=0.85,
            top_p=0.95,
        )

    audio = generation.cpu().float().numpy().squeeze()
    output_path = os.path.abspath(args.output)
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    sf.write(output_path, audio, model.config.sampling_rate)

    print(f"preset={preset_key}")
    print(f"device={device}")
    print(f"model={args.model}")
    print(f"output={output_path}")


if __name__ == "__main__":
    main()
