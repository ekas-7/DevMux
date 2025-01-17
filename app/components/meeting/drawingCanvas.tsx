import React from "react";
import Whiteboard from "./canvas/whiteBoard"; 

const DrawingCanvas: React.FC = () => {
  return (
    <div className="w-full h-full">
      <h2>Welcome to the Whiteboard Application</h2>
      <Whiteboard />
    </div>
  );
};

export default DrawingCanvas;