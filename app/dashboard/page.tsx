'use client';

import { useSession } from "next-auth/react";
import { WebSocketClient } from "../components/WebSocketClient";
import { redirect } from "next/navigation";

export default function Dashboard() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin');
    },
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span>{session.user?.email}</span>
            <img 
              src={session.user?.image ?? ''} 
              alt="Profile" 
              className="w-10 h-10 rounded-full"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/5 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">WebSocket Chat</h2>
            <WebSocketClient />
          </div>
        </div>
      </div>
    </div>
  );
} 