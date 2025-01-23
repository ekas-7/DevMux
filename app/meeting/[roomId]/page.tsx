"use client";

import { LeetCodeLayout } from "@/app/components/meeting/code-layout";
import { Sidebar } from "@/app/components/meeting/sideBar";
import { CodeEditor } from "@/app/components/meeting/vscode";
import DrawingCanvas from "@/app/components/meeting/drawingCanvas";
import { use } from "react";

export default function Home({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {

  const { roomId } = use(params); // Unwrap the promise using React's `use()`

  return (
    <LeetCodeLayout
      sidebar={<Sidebar roomId={roomId}  />}
      codeEditor={<CodeEditor />}
      drawingCanvas={<DrawingCanvas />}
    />
  );
}
