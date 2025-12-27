"use client";

import { useChatStore } from "@/lib/store";
import { AVAILABLE_MODELS } from "@/lib/models";
import { cn } from "@/lib/utils";
import { Trash2, Settings, MessageSquare } from "lucide-react";

export function Sidebar() {
    const { settings, setSettings, clearMessages, messages } = useChatStore();

    return (
        <div className="flex h-full w-80 flex-col border-r border-border bg-card">
            {/* Header */}
            <div className="border-b border-border p-6">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                        <MessageSquare className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold">AI Chat</h1>
                        <p className="text-xs text-muted-foreground">Multi-Provider</p>
                    </div>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto scrollbar-thin p-6 space-y-6">
                {/* Model Selection */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                        <Settings className="h-4 w-4" />
                        <span>Model Selection</span>
                    </div>
                    <div className="space-y-2">
                        {AVAILABLE_MODELS.map((model) => (
                            <button
                                key={model.id}
                                onClick={() => setSettings({ model: model.id })}
                                className={cn(
                                    "w-full rounded-lg border p-3 text-left transition-all duration-200",
                                    "hover:border-primary/50 hover:bg-accent/50",
                                    settings.model === model.id
                                        ? "border-primary bg-accent"
                                        : "border-border bg-background"
                                )}
                            >
                                <div className="flex items-start gap-2">
                                    <span className="text-xl">{model.icon}</span>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-medium text-sm truncate">
                                            {model.name}
                                        </div>
                                        <div className="text-xs text-muted-foreground mt-1">
                                            {model.description}
                                        </div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* System Prompt */}
                <div className="space-y-3">
                    <label className="text-sm font-semibold">System Prompt</label>
                    <textarea
                        value={settings.systemPrompt}
                        onChange={(e) => setSettings({ systemPrompt: e.target.value })}
                        className={cn(
                            "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm",
                            "placeholder:text-muted-foreground",
                            "focus:outline-none focus:ring-2 focus:ring-ring",
                            "resize-none scrollbar-thin"
                        )}
                        rows={3}
                        placeholder="Enter system prompt..."
                    />
                </div>

                {/* Temperature */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-semibold">Temperature</label>
                        <span className="text-sm text-muted-foreground">
                            {settings.temperature.toFixed(2)}
                        </span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="2"
                        step="0.1"
                        value={settings.temperature}
                        onChange={(e) =>
                            setSettings({ temperature: parseFloat(e.target.value) })
                        }
                        className="w-full accent-primary"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Precise</span>
                        <span>Creative</span>
                    </div>
                </div>

                {/* Max Tokens */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-semibold">Max Tokens</label>
                        <span className="text-sm text-muted-foreground">
                            {settings.maxTokens}
                        </span>
                    </div>
                    <input
                        type="range"
                        min="256"
                        max="4096"
                        step="256"
                        value={settings.maxTokens}
                        onChange={(e) =>
                            setSettings({ maxTokens: parseInt(e.target.value) })
                        }
                        className="w-full accent-primary"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>256</span>
                        <span>4096</span>
                    </div>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="border-t border-border p-4">
                <button
                    onClick={clearMessages}
                    disabled={messages.length === 0}
                    className={cn(
                        "w-full flex items-center justify-center gap-2 rounded-lg px-4 py-2.5",
                        "bg-destructive/10 text-destructive hover:bg-destructive/20",
                        "disabled:opacity-50 disabled:cursor-not-allowed",
                        "transition-all duration-200 active:scale-95"
                    )}
                >
                    <Trash2 className="h-4 w-4" />
                    <span className="font-medium">Clear Chat</span>
                </button>
            </div>
        </div>
    );
}
