import React from "react";
import Whiteboard from "./canvas/whiteBoard"; 

const DrawingCanvas: React.FC = () => {
  return (
    <div className=" flex flex-col h-full rounded-2xl">
      <div className="flex-grow">
        <Whiteboard />
      </div>
    </div>
  );
};

export default DrawingCanvas;
