import { Message } from "./types";

/**
 * LiteLLM Proxy URL
 * Uses local Ollama + cloud models via LiteLLM
 */
const LITELLM_PROXY_URL =
  process.env.NEXT_PUBLIC_LITELLM_PROXY_URL || "http://localhost:11434";

/**
 * TEMP keys (OK for testing only)
 * ❌ Do NOT do this in production
 */
const MASTER_KEY = "sk-1234"; // LiteLLM master key

/**
 * Request type (OpenAI compatible)
 */
export interface ChatCompletionRequest {
  model: string;
  messages: Array<{ role: string; content: string }>;
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

/**
 * Send chat message via LiteLLM proxy
 */
export async function sendChatMessage(
  messages: Message[],
  model: string,
  temperature: number,
  maxTokens: number,
  onChunk?: (chunk: string) => void
): Promise<string> {
  const requestBody: ChatCompletionRequest = {
    model,
    messages: messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    })),
    temperature,
    max_tokens: maxTokens,
    stream: !!onChunk,
  };

  // LiteLLM Proxy handles model-specific API keys internally via litellm-config.yaml
  // We just need the master key for the proxy itself
  const apiKey = MASTER_KEY;

  let response: Response;

  try {
    response = await fetch(`${LITELLM_PROXY_URL}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });
  } catch (error) {
    console.log("LiteLLM URL:", LITELLM_PROXY_URL);
    throw new Error(
      `Cannot connect to LiteLLM proxy at ${LITELLM_PROXY_URL}.\n` +
      `Ensure:\n` +
      `1. LiteLLM is running\n` +
      `2. Ollama is running for local models\n` +
      `3. Proxy URL is correct`
    );
  }

  if (!response.ok) {
    let errorText = "";
    try {
      errorText = await response.text();
    } catch {
      errorText = "Unable to read error response";
    }

    if (response.status === 404) {
      throw new Error(
        `Model "${model}" not found.\n` +
        `Check:\n` +
        `1. Model exists in litellm-config.yaml\n` +
        `2. Ollama model is pulled\n` +
        `3. API key is correct`
      );
    }

    if (response.status === 401 || response.status === 403) {
      throw new Error(
        `Authentication failed.\n` +
        `Check API keys and restart LiteLLM.`
      );
    }

    if (response.status === 500) {
      throw new Error(`Server error:\n${errorText}`);
    }

    throw new Error(`API Error (${response.status}): ${errorText}`);
  }

  /**
   * Streaming response
   */
  if (onChunk && response.body) {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullContent = "";

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;

          const data = line.slice(6);
          if (data === "[DONE]") continue;

          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              fullContent += content;
              onChunk(fullContent);
            }
          } catch {
            // ignore invalid chunks
          }
        }
      }
    } finally {
      reader.releaseLock();
    }

    return fullContent;
  }

  /**
   * Non-streaming response
   */
  const data = await response.json();
  return data.choices[0].message.content;
}
