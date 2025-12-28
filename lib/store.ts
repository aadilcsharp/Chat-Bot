import { create } from "zustand";
import { ChatState, Message } from "./types";

export const useChatStore = create<ChatState>((set) => ({
    messages: [],
    settings: {
        model: "tinyllama",
        temperature: 0.7,
        maxTokens: 2048,
        systemPrompt: "You are a helpful AI assistant.",
    },
    isStreaming: false,

    addMessage: (message) =>
        set((state) => ({
            messages: [
                ...state.messages,
                {
                    ...message,
                    id: Math.random().toString(36).substring(7),
                    timestamp: Date.now(),
                },
            ],
        })),

    updateLastMessage: (content) =>
        set((state) => {
            const messages = [...state.messages];
            if (messages.length > 0) {
                messages[messages.length - 1] = {
                    ...messages[messages.length - 1],
                    content,
                };
            }
            return { messages };
        }),

    clearMessages: () => set({ messages: [] }),

    setSettings: (newSettings) =>
        set((state) => ({
            settings: { ...state.settings, ...newSettings },
        })),

    setIsStreaming: (isStreaming) => set({ isStreaming }),
}));
