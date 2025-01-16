import React from "react"
import Split from "react-split"

interface LeetCodeLayoutProps {
  sidebar: React.ReactNode
  codeEditor: React.ReactNode
  drawingCanvas: React.ReactNode
}

export function LeetCodeLayout({ sidebar, codeEditor, drawingCanvas }: LeetCodeLayoutProps) {
  return (
    <Split
      className="h-screen flex split-parent"
      sizes={[20, 80]}
      minSize={[200, 400]}
      gutterSize={2}
      direction="horizontal"
      gutter={() => {
        const gutter = document.createElement('div')
        gutter.className = 'bg-gray-600 hover:bg-gray-500 transition-colors cursor-col-resize'
        return gutter
      }}
    >
      <aside className="bg-black overflow-y-auto">
        {sidebar}
      </aside>
      
      <Split
        className="flex flex-col split-parent"
        sizes={[70, 30]}
        minSize={[200, 100]}
        gutterSize={2}
        direction="vertical"
        gutter={() => {
          const gutter = document.createElement('div')
          gutter.className = 'bg-gray-600 hover:bg-gray-500 transition-colors cursor-row-resize'
          return gutter
        }}
      >
        <main className="p-4 overflow-y-auto">
          {codeEditor}
        </main>
        <div className="p-4 bg-black">
          {drawingCanvas}
        </div>
      </Split>
    </Split>
  )
}
