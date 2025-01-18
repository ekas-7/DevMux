import React, { useRef } from "react";
import Split from "react-split";

interface LeetCodeLayoutProps {
  sidebar: React.ReactNode;
  codeEditor: React.ReactNode;
  drawingCanvas: React.ReactNode;
}

export function LeetCodeLayout({ sidebar, codeEditor, drawingCanvas }: LeetCodeLayoutProps) {
  const horizontalGutterRef = useRef<HTMLDivElement | null>(null);
  const verticalGutterRef = useRef<HTMLDivElement | null>(null);

  const handleGutter = (direction: "horizontal" | "vertical") => () => {
    const gutter = document.createElement("div");
    gutter.className = `relative flex items-center justify-center cursor-${direction === "horizontal" ? "col-resize" : "row-resize"}`;

    const resizeLine = direction === "horizontal"
      ? `<div class="absolute h-[98%] w-0.5 bg-blue-500 hidden" id="horizontal-resize-line"></div>`
      : `<div class="absolute w-[98%] h-0.5 bg-blue-500 hidden" id="vertical-resize-line"></div>`;

    gutter.innerHTML = `
      ${resizeLine}
      <div class="absolute bg-gray-300 rounded-full ${direction === "horizontal" ? "w-1 h-6" : "w-6 h-1"}"></div>
    `;
    return gutter;
  };

  const handleDragStart = (direction: "horizontal" | "vertical") => {
    // Show the respective resize line when resizing starts
    const resizeLine = direction === "horizontal"
      ? document.getElementById("horizontal-resize-line")
      : document.getElementById("vertical-resize-line");

    if (resizeLine) {
      resizeLine.classList.remove("hidden");
    }
  };

  const handleDragEnd = (direction: "horizontal" | "vertical") => {
    // Hide the respective resize line when resizing ends
    const resizeLine = direction === "horizontal"
      ? document.getElementById("horizontal-resize-line")
      : document.getElementById("vertical-resize-line");

    if (resizeLine) {
      resizeLine.classList.add("hidden");
    }
  };

  return (
    <Split
      className="h-screen flex split-parent"
      sizes={[20, 80]}
      minSize={[200, 400]}
      gutterSize={4}
      direction="horizontal"
      gutter={handleGutter("horizontal")}
      onDragStart={() => handleDragStart("horizontal")}
      onDragEnd={() => handleDragEnd("horizontal")}
    >
      <aside className="bg-black overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700">{sidebar}</aside>

      <Split
        className="flex flex-col split-parent"
        sizes={[70, 30]}
        minSize={[200, 100]}
        gutterSize={4}
        direction="vertical"
        gutter={handleGutter("vertical")}
        onDragStart={() => handleDragStart("vertical")}
        onDragEnd={() => handleDragEnd("vertical")}
      >
        <main className="p-2 overflow-y-auto scrollbar-none scrollbar-thumb-gray-500 scrollbar-track-gray-700">{codeEditor}</main>
        <div className="p-4 bg-black overflow-y-auto scrollbar-none scrollbar-thumb-gray-500 scrollbar-track-gray-700">{drawingCanvas}</div>
      </Split>
    </Split>
  );
}
