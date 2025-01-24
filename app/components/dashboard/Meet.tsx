"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Video, Users, Copy } from "lucide-react";

export default function Meet() {
  const router = useRouter();
  const [roomId, setRoomId] = useState("");
  const [inputRoomId, setInputRoomId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCopiedAlert, setShowCopiedAlert] = useState(false);

  const createMeeting = async () => {
    try {
      setIsLoading(true);
      const newRoomId = Math.random().toString(36).substring(7);

      const response = await fetch("/api/meetings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roomId: newRoomId }),
      });

      if (!response.ok) throw new Error("Failed to create meeting");

      const meeting = await response.json();
      setRoomId(meeting.roomId || newRoomId);
    } catch (error) {
      console.error("Error creating meeting:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const joinMeeting = (id: string) => {
    router.push(`/meeting/${id}`);
  };

  const copyRoomId = async () => {
    await navigator.clipboard.writeText(roomId);
    setShowCopiedAlert(true);
    setTimeout(() => setShowCopiedAlert(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {showCopiedAlert && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow">
          Room ID copied to clipboard!
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Create Meeting Card */}
        <div className="border-2 border-gray-800 rounded-lg p-6 shadow">
          <div className="flex items-center space-x-2 mb-4">
            <Video className="w-6 h-6 text-blue-500" />
            <h2 className="text-lg font-semibold">Start a New Meeting</h2>
          </div>
          <div className="space-y-4">
            <button
              onClick={createMeeting}
              className={`w-full px-4 py-2 text-white font-medium rounded ${
                isLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-1 border-gray-800 border-t-transparent rounded-full animate-spin" />
                  <span>Creating...</span>
                </div>
              ) : (
                "Create Meeting"
              )}
            </button>

            {roomId && (
              <div className="mt-4 space-y-4">
                <div className="flex items-center space-x-2 p-3 bg-blue-100 rounded-lg">
                  <code className="text-blue-500 flex-1">{roomId}</code>
                  <button
                    onClick={copyRoomId}
                    className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <button
                  onClick={() => joinMeeting(roomId)}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Join Now
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Join Meeting Card */}
        <div className="border-2 border-gray-800 rounded-lg p-6 shadow">
          <div className="flex items-center space-x-2 mb-4">
            <Users className="w-6 h-6 text-purple-500" />
            <h2 className="text-lg font-semibold">Join an Existing Meeting</h2>
          </div>
          <div className="space-y-4">
            <input
              type="text"
              value={inputRoomId}
              onChange={(e) => setInputRoomId(e.target.value)}
              placeholder="Enter Room ID"
              className="w-full px-4 py-2 border-2 rounded ring-gray-800 focus:ring-white bg-inherit"
            />
            <button
              onClick={() => joinMeeting(inputRoomId)}
              disabled={!inputRoomId.trim()}
              className={`w-full px-4 py-2 text-white font-medium rounded ${
                inputRoomId.trim()
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "bg-gray-400"
              }`}
            >
              Join Meeting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
