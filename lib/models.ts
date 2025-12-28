import { ModelConfig } from "./types";

export const AVAILABLE_MODELS: ModelConfig[] = [
  {
    id: "tinyllama",
    name: "TinyLlama (Local)",
    provider: "ollama",
    description: "Very lightweight 1.1B model, great for low memory",
    icon: "🏠",
  },
  {
    id: "qwen2-0.5b",
    name: "Qwen2 0.5B (Local)",
    provider: "ollama",
    description: "Extremely small and fast model (350MB)",
    icon: "🏠",
  },
  {
    id: "phi3-mini",
    name: "Phi-3 Mini (Local)",
    provider: "ollama",
    description: "Microsoft Phi-3 running locally via Ollama",
    icon: "🏠",
  },
  {
    id: "claude-3-5-sonnet-20240620",
    name: "Claude 3.5 Sonnet",
    provider: "anthropic",
    description: "Anthropic's most intelligent model",
    icon: "🧠",
  },
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "openai",
    description: "OpenAI's flagship multimodal model",
    icon: "⚡",
  },
  {
    id: "llama-3-8b",
    name: "LLaMA 3 8B",
    provider: "openrouter",
    description: "Free daily tier chat model via OpenRouter",
    icon: "🦙",
  },
  {
    id: "mistral-7b",
    name: "Mistral 7B Instruct",
    provider: "huggingface",
    description: "Free open-source chat model via HuggingFace",
    icon: "🔥",
  },
];
