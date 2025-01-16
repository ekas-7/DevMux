import { useState } from "react"
import { ChatSection } from "./chat-section"
import { VideoCallSection } from "./videoCall"
import { AIChatSection } from "./aiChatSection"

export function Sidebar() {
  const [activeTab, setActiveTab] = useState("chat")

  return (
    <div className="w-full h-full bg-gray-800 ">
      <div className="grid w-full grid-cols-3 border-b border-gray-700 ">
        <button
          onClick={() => setActiveTab("chat")}
          className={`p-2 text-center text-gray-300 hover:bg-gray-700 transition-colors ${
            activeTab === "chat" ? "border-b-2 border-blue-500 text-white" : ""
          }`}
        >
          Chat
        </button>
        <button
          onClick={() => setActiveTab("video")}
          className={`p-2 text-center text-gray-300 hover:bg-gray-700 transition-colors ${
            activeTab === "video" ? "border-b-2 border-blue-500 text-white" : ""
          }`}
        >
          Video Call
        </button>
        <button
          onClick={() => setActiveTab("ai")}
          className={`p-2 text-center text-gray-300 hover:bg-gray-700 transition-colors ${
            activeTab === "ai" ? "border-b-2 border-blue-500 text-white" : ""
          }`}
        >
          AI Chat
        </button>
      </div>
      
      <div className="bg-gray-800">
        {activeTab === "chat" && <ChatSection />}
        {activeTab === "video" && <VideoCallSection />}
        {activeTab === "ai" && <AIChatSection />}
      </div>
    </div>
  )
}

