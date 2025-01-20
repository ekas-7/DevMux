"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Meet() {
  const router = useRouter();
  const [roomId, setRoomId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const createMeeting = async () => {
    try {
      setIsLoading(true);
      const newRoomId = Math.random().toString(36).substring(7); // Generate a random room ID

      const response = await fetch("/api/meetings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roomId: newRoomId }),
      });

      if (!response.ok) throw new Error("Failed to create meeting");

      const meeting = await response.json();
      setRoomId(meeting.roomId || newRoomId); // Use the roomId from the API response or fallback to newRoomId
    } catch (error) {
      console.error("Error creating meeting:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const joinMeeting = () => {
    router.push(`/meeting/${roomId}`); // Navigate to the meeting page with the roomId in the URL
  };

  return (
    <div className="space-y-6">
      <div className=" rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Start a New Meeting</h2>
        {isLoading ? (
          // Skeleton Loader for the button
          <div className="w-36 h-12 bg-gray-700 rounded-lg animate-pulse"></div>
        ) : (
          <button
            onClick={createMeeting}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Create Meeting
          </button>
        )}
        {roomId && (
          <div className="mt-4">
            <p className="text-gray-300">Room ID: {roomId}</p>
            <button
              onClick={joinMeeting}
              className="mt-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
            >
              Join Meeting
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
