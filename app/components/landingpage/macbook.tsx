import React from "react";
import { MacbookScroll } from "@/components/ui/macbook-scroll";

export function Macbook() {
  return (
    <div className="overflow-hidden dark:bg-[#0B0B0F] bg-white w-full">
      <MacbookScroll
        
        src={`/devmux2.png`}
        showGradient={false}
      />
    </div>
  );
}
