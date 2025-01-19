"use client";

import {
  ControlBar,
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
} from "@livekit/components-react";

import "@livekit/components-styles";

import { useEffect, useState } from "react";
import { Track } from "livekit-client";
import { useSession } from "next-auth/react"; // Import useSession

export function VideoCallSection({ roomId }: { roomId: string }) {
  const { data: session } = useSession(); // Get session data
  const name = session?.user?.name || "guest-user"; // Use session name or fallback
  const [token, setToken] = useState("");

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
      style={{ height: "100dvh" }}
    >
      <MyVideoConference />
      <RoomAudioRenderer />
      <ControlBar />
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
      style={{ height: "calc(100vh - var(--lk-control-bar-height))" }}
    >
      <ParticipantTile />
    </GridLayout>
  );
}
