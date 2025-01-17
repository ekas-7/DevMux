"use client";

import React, { useRef, useState } from "react";
import Canvas from "./Canvas";
import { DrawingElement } from "./types";

const Whiteboard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);
  const [color, setColor] = useState<string>("#000000");
  const [elements, setElements] = useState<DrawingElement[]>([]);
  const [history, setHistory] = useState<DrawingElement[]>([]);
  const [tool, setTool] = useState<string>("pencil");

  const clearCanvas = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (context) {
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);
        setElements([]);
      }
    }
  };

  const undo = () => {
    setHistory((prevHistory) => [...prevHistory, elements[elements.length - 1]]);
    setElements((prevElements) =>
      prevElements.filter((_, index) => index !== elements.length - 1)
    );
  };

  const redo = () => {
    setElements((prevElements) => [...prevElements, history[history.length - 1]]);
    setHistory((prevHistory) =>
      prevHistory.filter((_, index) => index !== history.length - 1)
    );
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-center py-4">
          Whiteboard
        </h1>
        
        <div className="flex flex-wrap gap-4 justify-center items-center">
          <div className="flex items-center gap-2">
            <span>Color:</span>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-8 h-8"
            />
          </div>

          <div className="flex gap-4">
            {["pencil", "line", "rect"].map((toolType) => (
              <label key={toolType} className="flex items-center gap-1">
                <input
                  type="radio"
                  name="tools"
                  value={toolType}
                  checked={tool === toolType}
                  onChange={(e) => setTool(e.target.value)}
                  className="form-radio"
                />
                <span className="capitalize">{toolType}</span>
              </label>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
              disabled={elements.length === 0}
              onClick={undo}
            >
              Undo
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
              disabled={history.length < 1}
              onClick={redo}
            >
              Redo
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded"
              onClick={clearCanvas}
            >
              Clear
            </button>
          </div>
        </div>

        <Canvas
          canvasRef={canvasRef}
          ctx={ctx}
          color={color}
          setElements={setElements}
          elements={elements}
          tool={tool}
        />
      </div>
    </div>
  );
};

export default Whiteboard;