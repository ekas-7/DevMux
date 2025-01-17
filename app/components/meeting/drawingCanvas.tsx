import React from "react";
import Whiteboard from "./canvas/whiteBoard"; 

const DrawingCanvas: React.FC = () => {
  return (
    <div className="w-full h-full">
      <Whiteboard />
    </div>
  );
};

export default DrawingCanvas;