"use client";

import { useEffect, useRef } from "react";
import { useChatStore } from "@/lib/store";
import { sendChatMessage } from "@/lib/api";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { Loader2, AlertCircle } from "lucide-react";
import { useState } from "react";

export function ChatContainer() {
    const {
        messages,
        settings,
        isStreaming,
        addMessage,
        updateLastMessage,
        setIsStreaming,
    } = useChatStore();

    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (content: string) => {
        setError(null);

        // Add user message
        addMessage({ role: "user", content });

        // Prepare messages with system prompt
        const messagesToSend = [
            { role: "system" as const, content: settings.systemPrompt, id: "system", timestamp: Date.now() },
            ...messages,
            { role: "user" as const, content, id: "temp", timestamp: Date.now() },
        ];

        // Add placeholder for assistant message
        addMessage({ role: "assistant", content: "" });
        setIsStreaming(true);

        try {
            await sendChatMessage(
                messagesToSend,
                settings.model,
                settings.temperature,
                settings.maxTokens,
                (chunk) => {
                    updateLastMessage(chunk);
                }
            );
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : "An unknown error occurred";
            setError(errorMessage);
            // Remove the empty assistant message on error
            updateLastMessage(`Error: ${errorMessage}`);
        } finally {
            setIsStreaming(false);
        }
    };

    return (
        <div className="flex h-full flex-col">
            {/* Messages Area */}
            <div
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto scrollbar-thin"
            >
                {messages.length === 0 ? (
                    <div className="flex h-full items-center justify-center p-8">
                        <div className="text-center space-y-4 max-w-md">
                            <div className="flex justify-center">
                                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                    <Loader2 className="h-8 w-8 text-white animate-pulse-slow" />
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold">Welcome to AI Chat</h2>
                            <p className="text-muted-foreground">
                                Choose a model from the sidebar and start chatting with AI.
                                Your messages will appear here.
                            </p>
                            <div className="grid grid-cols-2 gap-2 pt-4">
                                <div className="rounded-lg border border-border bg-card p-3">
                                    <div className="text-2xl mb-2">🏠</div>
                                    <div className="text-xs font-medium">Local Phi-3</div>
                                </div>
                                <div className="rounded-lg border border-border bg-card p-3">
                                    <div className="text-2xl mb-2">🧠</div>
                                    <div className="text-xs font-medium">Claude 3.5</div>
                                </div>
                                <div className="rounded-lg border border-border bg-card p-3">
                                    <div className="text-2xl mb-2">⚡</div>
                                    <div className="text-xs font-medium">GPT-4o</div>
                                </div>
                                <div className="rounded-lg border border-border bg-card p-3">
                                    <div className="text-2xl mb-2">🎯</div>
                                    <div className="text-xs font-medium">More Soon</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        {messages.map((message) => (
                            <ChatMessage key={message.id} message={message} />
                        ))}
                        <div ref={messagesEndRef} />
                    </>
                )}

                {/* Streaming Indicator */}
                {isStreaming && (
                    <div className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>AI is thinking...</span>
                    </div>
                )}
            </div>

            {/* Error Display */}
            {error && (
                <div className="border-t border-border bg-destructive/10 px-4 py-3">
                    <div className="flex items-start gap-2 text-sm text-destructive">
                        <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                        <div className="flex-1">
                            <div className="font-semibold">Connection Error</div>
                            <div className="text-xs mt-1 whitespace-pre-wrap font-mono">
                                {error}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Input Area */}
            <div className="border-t border-border bg-card p-4">
                <ChatInput
                    onSend={handleSendMessage}
                    disabled={isStreaming}
                    isStreaming={isStreaming}
                />
            </div>
        </div>
    );
}
