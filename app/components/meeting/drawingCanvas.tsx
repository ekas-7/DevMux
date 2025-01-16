import { useRef, useEffect } from "react"

export function DrawingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
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
          
          // Resize main canvas
          canvas.width = canvas.offsetWidth
          canvas.height = canvas.offsetHeight
          
          // Reset context properties (they get cleared after resize)
          setupCanvas()
          
          // Restore the drawing
          ctx.drawImage(tempCanvas, 0, 0)
        }
        
        // Initial setup
        resizeCanvas()
        setupCanvas()

        let isDrawing = false
        let lastX = 0
        let lastY = 0

        const draw = (e: MouseEvent) => {
          if (!isDrawing) return
          
          // Get correct coordinates relative to canvas
          const rect = canvas.getBoundingClientRect()
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top

          ctx.beginPath()
          ctx.moveTo(lastX, lastY)
          ctx.lineTo(x, y)
          ctx.stroke()
          ;[lastX, lastY] = [x, y]
        }

        const startDrawing = (e: MouseEvent) => {
          isDrawing = true
          const rect = canvas.getBoundingClientRect()
          lastX = e.clientX - rect.left
          lastY = e.clientY - rect.top
        }

        // Add event listeners
        canvas.addEventListener("mousedown", startDrawing)
        canvas.addEventListener("mousemove", draw)
        canvas.addEventListener("mouseup", () => (isDrawing = false))
        canvas.addEventListener("mouseout", () => (isDrawing = false))
        window.addEventListener("resize", resizeCanvas)

        // Cleanup
        return () => {
          canvas.removeEventListener("mousedown", startDrawing)
          canvas.removeEventListener("mousemove", draw)
          canvas.removeEventListener("mouseup", () => (isDrawing = false))
          canvas.removeEventListener("mouseout", () => (isDrawing = false))
          window.removeEventListener("resize", resizeCanvas)
        }
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full border border-gray-600 bg-[#1a1a1a]"
    />
  )
}

