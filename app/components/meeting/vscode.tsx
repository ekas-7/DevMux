import { useState } from "react"

export function CodeEditor() {
  const [code, setCode] = useState("")

  const handleRunCode = () => {
    console.log("Running code:", code)
    // Implement code execution logic here
  }

  return (
    <div className="h-full flex flex-col bg-gray-900">
      <textarea
        className="flex-grow mb-4 font-mono p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none
        bg-gray-800 text-gray-100 border-gray-700"
        placeholder="Write your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button 
        onClick={handleRunCode}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
      >
        Run Code
      </button>
    </div>
  )
}

