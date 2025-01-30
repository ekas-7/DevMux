export interface Point {
    x: number;
    y: number;
  }
  
  export type DrawingElement = {
    offsetX: number;
    offsetY: number;
    stroke: string;
    element: string;
    path?: Point[];
    width?: number;
    height?: number;
  };
  
  export interface CanvasProps {
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
    ctx: React.MutableRefObject<CanvasRenderingContext2D | null>;
    color: string;
    setElements: React.Dispatch<React.SetStateAction<DrawingElement[]>>;
    elements: DrawingElement[];
    tool: string;
  }