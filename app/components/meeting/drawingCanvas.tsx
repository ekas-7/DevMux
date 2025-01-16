import { useRef, useEffect, useState } from "react"

type Tool = 'pencil' | 'rectangle' | 'circle' | 'text' | 'eraser';

export function DrawingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const [currentTool, setCurrentTool] = useState<Tool>('pencil');
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current
    const previewCanvas = previewCanvasRef.current
    if (canvas && previewCanvas) {
      // Set canvas dimensions to match display size
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      previewCanvas.width = canvas.offsetWidth
      previewCanvas.height = canvas.offsetHeight

      const ctx = canvas.getContext("2d")
      const previewCtx = previewCanvas.getContext("2d")
      if (ctx && previewCtx) {
        const setupCanvas = () => {
          // Setup drawing properties
          ctx.lineCap = "round"
          ctx.lineJoin = "round"
          ctx.lineWidth = 2
          ctx.strokeStyle = "white"
          
          // Draw dark background
          ctx.fillStyle = "#1a1a1a"
          ctx.fillRect(0, 0, canvas.width, canvas.height)
        }

        const resizeCanvas = () => {
          // Create temporary canvas to store current drawing
          const tempCanvas = document.createElement('canvas')
          const tempCtx = tempCanvas.getContext('2d')
          tempCanvas.width = canvas.width
          tempCanvas.height = canvas.height
          tempCtx?.drawImage(canvas, 0, 0)
          
          // Get new dimensions
          const newWidth = canvas.offsetWidth
          const newHeight = canvas.offsetHeight
          
          // Resize both canvases
          canvas.width = newWidth
          canvas.height = newHeight
          previewCanvas.width = newWidth
          previewCanvas.height = newHeight
          
          // Reset context properties
          setupCanvas()
          
          // Calculate position to center the old content
          const x = Math.max(0, (newWidth - tempCanvas.width) / 2)
          const y = Math.max(0, (newHeight - tempCanvas.height) / 2)
          
          // Restore the drawing at the centered position
          ctx.drawImage(tempCanvas, x, y)
        }
        
        // Initial setup
        resizeCanvas()
        setupCanvas()

        let isDrawing = false
        let lastX = 0
        let lastY = 0

        const drawShape = (e: MouseEvent) => {
          if (!isDrawing) return;

          const rect = canvas.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          // Clear preview canvas before drawing new preview
          previewCtx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);

          switch (currentTool) {
            case 'eraser':
              ctx.save();
              ctx.globalCompositeOperation = 'destination-out'; // Better eraser implementation
              ctx.beginPath();
              ctx.arc(x, y, 10, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();
              break;
            case 'pencil':
              ctx.beginPath();
              ctx.moveTo(lastX, lastY);
              ctx.lineTo(x, y);
              ctx.stroke();
              [lastX, lastY] = [x, y];
              break;

            case 'rectangle':
              previewCtx.strokeStyle = 'white';
              previewCtx.lineWidth = 2;
              previewCtx.strokeRect(
                startX,
                startY,
                x - startX,
                y - startY
              );
              break;

            case 'circle':
              previewCtx.strokeStyle = 'white';
              previewCtx.lineWidth = 2;
              const radius = Math.sqrt(
                Math.pow(x - startX, 2) + Math.pow(y - startY, 2)
              );
              previewCtx.beginPath();
              previewCtx.arc(startX, startY, radius, 0, Math.PI * 2);
              previewCtx.stroke();
              break;

            case 'text':
              // Handle text input separately
              break;
          }
        };

        const startDrawing = (e: MouseEvent) => {
          isDrawing = true;
          const rect = canvas.getBoundingClientRect();
          lastX = e.clientX - rect.left;
          lastY = e.clientY - rect.top;
          setStartX(lastX);
          setStartY(lastY);
        };

        const stopDrawing = (e: MouseEvent) => {
          if (!isDrawing) return;
          isDrawing = false;
          
          if (currentTool === 'text') {
            const text = prompt('Enter text:');
            if (text && ctx) {
              ctx.save();
              ctx.font = '16px Arial';
              ctx.fillStyle = 'white';
              ctx.fillText(text, startX, startY);
              ctx.restore();
            }
          } else if (currentTool !== 'pencil' && currentTool !== 'eraser') {
            // Commit preview canvas to main canvas
            ctx.drawImage(previewCanvas, 0, 0);
            previewCtx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
          }
        };

        // Add event listeners
        canvas.addEventListener("mousedown", startDrawing)
        canvas.addEventListener("mousemove", drawShape)
        canvas.addEventListener("mouseup", stopDrawing)
        canvas.addEventListener("mouseout", stopDrawing)
        window.addEventListener("resize", resizeCanvas)

        // Cleanup
        return () => {
          canvas.removeEventListener("mousedown", startDrawing)
          canvas.removeEventListener("mousemove", drawShape)
          canvas.removeEventListener("mouseup", stopDrawing)
          canvas.removeEventListener("mouseout", stopDrawing)
          window.removeEventListener("resize", resizeCanvas)
        }
      }
    }
  }, [currentTool])

  return (
    <div className="relative w-full h-full">
      <div className="absolute top-4 left-4 z-10 flex gap-2 bg-gray-800 p-2 rounded-lg">
        <button
          onClick={() => setCurrentTool('pencil')}
          className={`p-2 rounded ${
            currentTool === 'pencil' ? 'bg-gray-600' : ''
          }`}
        >
          ✏️
        </button>
        <button
          onClick={() => setCurrentTool('rectangle')}
          className={`p-2 rounded ${
            currentTool === 'rectangle' ? 'bg-gray-600' : ''
          }`}
        >
          ⬜
        </button>
        <button
          onClick={() => setCurrentTool('circle')}
          className={`p-2 rounded ${
            currentTool === 'circle' ? 'bg-gray-600' : ''
          }`}
        >
          ⭕
        </button>
        <button
          onClick={() => setCurrentTool('text')}
          className={`p-2 rounded ${
            currentTool === 'text' ? 'bg-gray-600' : ''
          }`}
        >
          T
        </button>
        <button
          onClick={() => setCurrentTool('eraser')}
          className={`p-2 rounded ${
            currentTool === 'eraser' ? 'bg-gray-600' : ''
          }`}
        >
          ⌫
        </button>
      </div>
      <canvas
        ref={canvasRef}
        className="absolute w-full h-full border border-gray-600 bg-[#1a1a1a]"
      />
      <canvas
        ref={previewCanvasRef}
        className="absolute w-full h-full pointer-events-none"
      />
    </div>
  )
}

