import React from "react";
import Whiteboard from "./canvas/whiteBoard"; 

const DrawingCanvas: React.FC = () => {
  return (
    <div className="w-full h-20">
      <Whiteboard />
    </div>
  );
};

export default DrawingCanvas;