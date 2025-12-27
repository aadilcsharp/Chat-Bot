"use client";

import { Message } from "@/lib/types";
import { cn, formatTimestamp } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { User, Bot } from "lucide-react";

interface ChatMessageProps {
    message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
    const isUser = message.role === "user";

    return (
        <div
            className={cn(
                "flex gap-4 p-4 animate-fade-in",
                isUser ? "bg-background" : "bg-muted/30"
            )}
        >
            <div
                className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                    isUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-gradient-to-br from-purple-500 to-pink-500 text-white"
                )}
            >
                {isUser ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
            </div>

            <div className="flex-1 space-y-2 overflow-hidden">
                <div className="flex items-center gap-2">
                    <span className="font-semibold">
                        {isUser ? "You" : "Assistant"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                        {formatTimestamp(message.timestamp)}
                    </span>
                </div>

                <div className="markdown-content prose prose-invert max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {message.content}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
}
