"use client";

import {
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  useTracks,
} from "@livekit/components-react";

import "@livekit/components-styles";
import { Chat } from "@livekit/components-react";

import { useEffect, useState } from "react";
import { Track } from "livekit-client";
import { useSession } from "next-auth/react"; // Import useSession

export function VideoCallSection({ roomId }: { roomId: string }) {
  const { data: session } = useSession(); // Get session data
  const name = session?.user?.name; // Use session name or fallback
  const [token, setToken] = useState("");
  const [activeTab, setActiveTab] = useState("video"); // State for the active tab (video or chat)

  useEffect(() => {
    if (!roomId || !name) return; // Wait until roomId and name are available
    (async () => {
      try {
        const resp = await fetch(`/api/token?room=${roomId}&username=${name}`);
        const data = await resp.json();
        console.log(resp, data);
        setToken(data.token);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [roomId, name]);

  if (!roomId) {
    return <div>Loading room...</div>;
  }

  if (token === "") {
    return <div>Getting token...</div>;
  }

  return (
    <LiveKitRoom
      video={true}
      audio={true}
      token={token}
      serverUrl={"wss://devmux-l0abrbfe.livekit.cloud"}
      data-lk-theme="default"
      style={{ height: "80vh" }} // Make sure the room fills the entire viewport
    >
      {/* Tab buttons */}
      <div className="flex border-b border-gray-300 mb-4">
        <button
          onClick={() => setActiveTab("video")}
          className={`flex-1 py-2 text-center text-sm font-medium ${
            activeTab === "video"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-blue-600"
          }`}
        >
          Video Call
        </button>
        <button
          onClick={() => setActiveTab("chat")}
          className={`flex-1 py-2 text-center text-sm font-medium ${
            activeTab === "chat"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-blue-600"
          }`}
        >
          Chat
        </button>
      </div>

      {/* Conditionally render based on the active tab */}
      <div className="w-full flex">
        {activeTab === "video" && (
          <div className="w-full ">
            <MyVideoConference />
          </div>
        )}
        {activeTab === "chat" && (
          <div>
            <MyChat />
          </div>
        )}
      </div>
    </LiveKitRoom>
  );
}

function MyVideoConference() {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  );

  return (
    <GridLayout
      tracks={tracks}
      className="w-full "
      style={{
        height: "calc(90vh - var(--lk-control-bar-height))", // Adjust the height to exclude control bar
        maxHeight: "70vh", // Prevent overflow
      }}
    >
      <ParticipantTile />
    </GridLayout>
  );
}

function MyChat() {
  return (
    <div
      className="flex justify-center w-full "
      style={{
        height: "calc(100vh - var(--lk-control-bar-height))", // Adjust the height to exclude control bar
      }}
    >
      <div className="w-full max-w-md">
        <Chat />
      </div>
    </div>
  );
}
