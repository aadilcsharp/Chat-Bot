"use client";

import { Sidebar } from "@/components/Sidebar";
import { ChatContainer } from "@/components/ChatContainer";

export default function Home() {
    return (
        <main className="flex h-screen w-full overflow-hidden bg-background">
            <Sidebar />
            <div className="flex-1">
                <ChatContainer />
            </div>
        </main>
    );
}
