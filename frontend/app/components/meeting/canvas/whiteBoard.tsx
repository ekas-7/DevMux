"use client";

import React, { useRef, useState } from "react";
import Canvas from "./Canvas";
import { DrawingElement } from "./types";
import { 
  Pencil, 
  LineChart, 
  Square, 
  Palette, 
  Undo2, 
  Redo2, 
  Trash,
  Download
} from "lucide-react";

const Whiteboard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);
  const [color, setColor] = useState<string>("#ffffff");
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

  const saveCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'whiteboard.png';
      link.click();
    }
  };

  const tools = [
    { name: 'pencil', icon: Pencil },
    { name: 'line', icon: LineChart },
    { name: 'rect', icon: Square },
  ];

  return (
    <div className="relative w-full max-h-full bg-[#151515] rounded-2xl overflow-hidden">
      {/* Floating Navigation Bar */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 w-auto">
        <div className="bg-gray-700/80 backdrop-blur-sm p-1.5 rounded-xl shadow-lg">
          <div className="flex items-center gap-5">
            {/* Tools Group */}
            <div className="flex items-center space-x-3 bg-gray-600/50 p-1 rounded-lg">
              {tools.map(({ name, icon: Icon }) => (
                <button
                  key={name}
                  onClick={() => setTool(name)}
                  className={`p-1 rounded-lg transition-all ${
                    tool === name 
                      ? 'bg-blue-500 text-white shadow-lg' 
                      : 'text-gray-300 hover:bg-gray-500/80'
                  }`}
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>

            {/* Color Picker */}
            <div className="flex items-center space-x-3 bg-gray-600/50 p-1 rounded-lg">
              <Palette size={16} className="text-gray-300" />
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-8 h-8 rounded border-0 bg-transparent cursor-pointer"
              />
            </div>

            {/* Divider */}
            <div className="h-8 w-px bg-gray-500"></div>

            {/* Actions Group */}
            <div className="flex items-center space-x-2">
              <button
                onClick={undo}
                disabled={elements.length === 0}
                className="p-1 text-gray-300 hover:bg-gray-600/50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Undo2 size={16} />
              </button>
              <button
                onClick={redo}
                disabled={history.length < 1}
                className="p-1 text-gray-300 hover:bg-gray-600/50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Redo2 size={16} />
              </button>
              <button
                onClick={clearCanvas}
                className="p-1 text-red-400 hover:bg-gray-600/50 rounded-lg transition-colors"
              >
                <Trash size={16} />
              </button>
              <button
                onClick={saveCanvas}
                className="p-1 text-green-400 hover:bg-gray-600/50 rounded-lg transition-colors"
              >
                <Download size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <Canvas
        canvasRef={canvasRef}
        ctx={ctx}
        color={color}
        setElements={setElements}
        elements={elements}
        tool={tool}
      />
    </div>
  );
};

export default Whiteboard;