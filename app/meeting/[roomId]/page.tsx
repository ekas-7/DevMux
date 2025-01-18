"use client"

import { LeetCodeLayout } from "@/app/components/meeting/code-layout"
import { Sidebar } from "@/app/components/meeting/sideBar"
import { CodeEditor } from "@/app/components/meeting/vscode"
import DrawingCanvas from "@/app/components/meeting/drawingCanvas"
import Whiteboard from "@/app/components/meeting/canvas/whiteBoard"

export default function Home() {
  return (
    <LeetCodeLayout
      sidebar={<Sidebar />}
      codeEditor={<CodeEditor />}
      drawingCanvas={<DrawingCanvas />}
    />
  )
}

