import { useState } from "react";
import { VideoCallSection } from "./videoCall";
import Chatbot from "./aiChatSection";
import { Copy } from "lucide-react";

export function Sidebar({ roomId }: { roomId: string }) {
  const [activeTab, setActiveTab] = useState("video");
  const [showCopiedAlert, setShowCopiedAlert] = useState(false);

  const copyRoomId = async () => {
    await navigator.clipboard.writeText(roomId);
    setShowCopiedAlert(true);
    setTimeout(() => setShowCopiedAlert(false), 2000);
  };

  return (
    <div className="w-full h-full bg-[#151515] rounded-2xl flex flex-col justify-between">
      <div>
        <div className="grid w-full grid-cols-2 border-b border-gray-700">
          <button
            onClick={() => setActiveTab("video")}
            className={`p-2 text-center text-gray-300 hover:bg-gray-700 transition-colors ${
              activeTab === "video"
                ? "border-b-2 border-blue-500 text-white"
                : ""
            }`}
          >
            Room
          </button>
          <button
            onClick={() => setActiveTab("ai")}
            className={`p-2 text-center text-gray-300 hover:bg-gray-700 hover:rounded-tr-2xl transition-colors ${
              activeTab === "ai" ? "border-b-2 border-blue-500 text-white" : ""
            }`}
          >
            AI Chat
          </button>
        </div>

        <div className="bg-gray-800">
          {activeTab === "video" && <VideoCallSection roomId={roomId} />}
          {activeTab === "ai" && <Chatbot />}
        </div>
      </div>

      {/* Copy Room ID Section */}
      {activeTab === "video" && (
        <div className="p-4 bg-inherit border-t border-gray-700 flex items-center justify-between">
          {/* Room ID with text wrapping and ellipsis */}
          <span
            className="text-sm text-gray-400 truncate w-2/3"
            title={roomId} // Tooltip to show the full room ID
          >
            Room ID: {roomId}
          </span>
          <button
            onClick={copyRoomId}
            className="flex items-center gap-2 px-3 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded"
          >
            <Copy className="w-4 h-4" />
            {showCopiedAlert ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
}
