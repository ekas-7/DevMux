import React from "react";
import Split from "react-split";

interface LeetCodeLayoutProps {
  sidebar: React.ReactNode;
  codeEditor: React.ReactNode;
  drawingCanvas: React.ReactNode;
}

export function LeetCodeLayout({
  sidebar,
  codeEditor,
  drawingCanvas,
}: LeetCodeLayoutProps) {
  const handleGutter = (direction: "horizontal" | "vertical") => () => {
    const gutter = document.createElement("div");
    gutter.className = `relative flex items-center justify-center cursor-${
      direction === "horizontal" ? "col-resize" : "row-resize"
    }`;

    const resizeLine =
      direction === "horizontal"
        ? `<div class="absolute h-[100%] w-0.5 bg-blue-500 hidden align-middle" id="horizontal-resize-line"></div>`
        : `<div class="absolute w-[98%] h-0.5 bg-blue-500 hidden" id="vertical-resize-line"></div>`;

    gutter.innerHTML = `
      ${resizeLine}
      <div class="absolute bg-gray-300 rounded-full ${
        direction === "horizontal" ? "w-0.5 h-6" : "w-6 h-0.5"
      }"></div>
    `;
    return gutter;
  };

  const handleDragStart = (direction: "horizontal" | "vertical") => {
    const resizeLine =
      direction === "horizontal"
        ? document.getElementById("horizontal-resize-line")
        : document.getElementById("vertical-resize-line");

    if (resizeLine) {
      resizeLine.classList.remove("hidden");
    }
  };

  const handleDragEnd = (direction: "horizontal" | "vertical") => {
    const resizeLine =
      direction === "horizontal"
        ? document.getElementById("horizontal-resize-line")
        : document.getElementById("vertical-resize-line");

    if (resizeLine) {
      resizeLine.classList.add("hidden");
    }
  };

  return (
    <Split
      className="h-screen flex split-parent bg-black"
      sizes={[30, 70]}
      minSize={[200, 400]}
      gutterSize={4}
      direction="horizontal"
      gutter={handleGutter("horizontal")}
      onDragStart={() => handleDragStart("horizontal")}
      onDragEnd={() => handleDragEnd("horizontal")}
    >
      <aside className="bg-black overflow-y-auto p-3 pr-1 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700">
        {/* Sidebar content with styles to prevent overflow */}
        <div className="break-words w-full max-w-full text-gray-300">
          {sidebar}
        </div>
      </aside>

      <Split
        className="flex flex-col split-parent bg-black h-full" // Ensures the vertical split container fills the parent height
        sizes={[70, 30]} // Adjust as needed
        minSize={[200, 100]}
        gutterSize={4}
        direction="vertical"
        gutter={handleGutter("vertical")}
        onDragStart={() => handleDragStart("vertical")}
        onDragEnd={() => handleDragEnd("vertical")}
      >
        <main className="bg-black p-3 pl-1 pb-1 overflow-y-auto scrollbar-none scrollbar-thumb-gray-500 scrollbar-track-gray-700 ">
          {codeEditor}
        </main>

        {/* Adjusted container for drawingCanvas with max height limitation */}
        <div className="bg-black p-3 pl-1 pt-1 overflow-y-auto scrollbar-none scrollbar-thumb-gray-500 scrollbar-track-gray-700">
          {drawingCanvas}
        </div>
      </Split>
    </Split>
  );
}
