export interface Message {
    id: string;
    role: "user" | "assistant" | "system";
    content: string;
    timestamp: number;
}

export interface ModelConfig {
    id: string;
    name: string;
    provider: "ollama" | "anthropic" | "openai" | "openrouter" | "huggingface";
    description: string;
    icon: string;
}

export interface ChatSettings {
    model: string;
    temperature: number;
    maxTokens: number;
    systemPrompt: string;
}

export interface ChatState {
    messages: Message[];
    settings: ChatSettings;
    isStreaming: boolean;
    addMessage: (message: Omit<Message, "id" | "timestamp">) => void;
    updateLastMessage: (content: string) => void;
    clearMessages: () => void;
    setSettings: (settings: Partial<ChatSettings>) => void;
    setIsStreaming: (isStreaming: boolean) => void;
}
