import React, { useState, useEffect } from "react";
import { MessageCircle, Send, Clipboard } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

// Initialize the Google AI client
const genAI = new GoogleGenerativeAI("AIzaSyCNjcppkOu8IYk5OzoEuEeDNvpuhoa1gA8");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const formatMessage = (text: string): JSX.Element[] => {
    const elements: JSX.Element[] = [];
    const regex = /```([\s\S]*?)```/g; // Match code blocks
    let lastIndex = 0;

    // Split the text into normal text and code blocks
    let match: RegExpExecArray | null;
    while ((match = regex.exec(text)) !== null) {
      const [fullMatch, code] = match;
      const startIndex = match.index;

      // Add normal text before the code block
      if (lastIndex < startIndex) {
        elements.push(
          <p key={`text-${lastIndex}`}>{text.slice(lastIndex, startIndex)}</p>
        );
      }

      // Add the code block with a copy button
      elements.push(
        <div key={`code-${startIndex}`} className="relative mb-4">
          <SyntaxHighlighter
            language="javascript"
            style={materialDark}
            className="rounded-md border border-gray-600"
          >
            {code.trim()}
          </SyntaxHighlighter>
          <button
            className="absolute top-2 right-2 p-1 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded"
            onClick={() => navigator.clipboard.writeText(code.trim())}
            title="Copy to Clipboard"
          >
            <Clipboard size={16} />
          </button>
        </div>
      );

      lastIndex = regex.lastIndex;
    }

    // Add remaining text after the last code block
    if (lastIndex < text.length) {
      elements.push(<p key={`text-${lastIndex}`}>{text.slice(lastIndex)}</p>);
    }

    return elements;
  };

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: message,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const result = await model.generateContent(message);
      const response = await result.response;
      const botReply = await response.text();

      const botMessage: Message = {
        id: Date.now() + 1,
        text: botReply,
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: "Sorry, I encountered an error. Please try again.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input.trim());
      setInput("");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    const chatContainer = document.querySelector(".chat-container");
    if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [messages]);

  return (
    <div className="max-w-2xl h-[100%] mx-auto p-6 bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl shadow-2xl border border-gray-700">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6 p-4 bg-blue-900/50 rounded-lg shadow-md border border-blue-800/50">
        <MessageCircle className="text-blue-400" size={24} />
        <h1 className="text-xl font-semibold text-blue-100">DevDad</h1>
      </div>

      {/* Chat Container */}
      <div className="chat-container space-y-4 max-h-[calc(100vh-300px)] min-h-[400px] overflow-y-auto p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-4 rounded-2xl max-w-[80%] shadow-lg ${
                message.sender === "user"
                  ? "bg-blue-600 text-blue-50"
                  : "bg-gray-700 text-gray-100 border border-gray-600"
              }`}
            >
              {formatMessage(message.text)}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-700 text-gray-300 p-4 rounded-2xl animate-pulse border border-gray-600">
              Thinking...
            </div>
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="mt-6 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1 p-4 rounded-lg bg-gray-800 text-gray-100 border border-gray-600 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 outline-none"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          aria-label="Send Message"
          className="p-4 rounded-lg bg-blue-600 text-blue-50 hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-400 disabled:border-gray-600 transition-colors duration-200 flex items-center justify-center disabled:cursor-not-allowed border border-transparent"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
