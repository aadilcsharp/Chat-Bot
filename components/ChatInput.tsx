"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
    onSend: (message: string) => void;
    disabled?: boolean;
    isStreaming?: boolean;
}

export function ChatInput({ onSend, disabled, isStreaming }: ChatInputProps) {
    const [input, setInput] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() && !disabled) {
            onSend(input.trim());
            setInput("");
            if (textareaRef.current) {
                textareaRef.current.style.height = "auto";
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [input]);

    return (
        <form onSubmit={handleSubmit} className="relative">
            <div className="relative flex items-end gap-2">
                <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message... (Shift+Enter for new line)"
                    disabled={disabled}
                    rows={1}
                    className={cn(
                        "flex-1 resize-none rounded-xl border border-input bg-background px-4 py-3 pr-12 text-sm",
                        "placeholder:text-muted-foreground",
                        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        "max-h-32 overflow-y-auto scrollbar-thin",
                        "transition-all duration-200"
                    )}
                />
                <button
                    type="submit"
                    disabled={disabled || !input.trim()}
                    className={cn(
                        "absolute right-2 bottom-2 flex h-9 w-9 items-center justify-center rounded-lg",
                        "bg-primary text-primary-foreground",
                        "hover:bg-primary/90 active:scale-95",
                        "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-primary",
                        "transition-all duration-200"
                    )}
                >
                    {isStreaming ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Send className="h-4 w-4" />
                    )}
                </button>
            </div>
        </form>
    );
}
