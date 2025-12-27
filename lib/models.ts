import { ModelConfig } from "./types";

export const AVAILABLE_MODELS: ModelConfig[] = [
    {
        id: "ollama/phi3:mini",
        name: "Phi-3 Mini (Local)",
        provider: "ollama",
        description: "Microsoft Phi-3 running locally via Ollama",
        icon: "🏠",
    },
    {
        id: "ollama/phi3:medium",
        name: "Phi-3 Medium (Local)",
        provider: "ollama",
        description: "Larger Phi-3 model for better performance",
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
    id: "flan-t5-small",
    name: "FLAN-T5 Small",
    provider: "huggingface",
    description: "Free open-source text model",
    icon: "🤗",
  },
  {
    id: "mistralai/Mistral-7B-Instruct-v0.2",
    name: "Mistral 7B Instruct",
    provider: "huggingface",
    description: "Free open-source chat model",
    icon: "🔥",
  },
  {
    id: "openrouter/meta-llama/llama-3-8b-instruct",
    name: "LLaMA 3 8B",
    provider: "openrouter",
    description: "Free daily tier chat model",
    icon: "🦙",
  },
];
