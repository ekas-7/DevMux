"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";

export function Tab() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <div className="text-center px-4 sm:px-8">
            <h1 className="text-3xl sm:text-4xl font-semibold text-black dark:text-white">
              The Ultimate Platform for Developers
            </h1>
            <h2 className="text-4xl sm:text-5xl md:text-[4rem] lg:text-[6rem] font-bold mt-4 leading-tight">
              <span className="bg-cosmic-drift bg-clip-text text-transparent">
                Real-Time
              </span>{" "}
              Coding &{" "}
              <span className="bg-cosmic-drift bg-clip-text text-transparent">
                Collaboration
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400">
              Code, collaborate, and innovate seamlessly with real-time updates and cutting-edge tools designed for teams.
            </p>
          </div>
        }
      >
        <Image
          src={`/thumbnail.png`}
          alt="Real-Time Coding and Collaboration"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-auto max-w-full shadow-lg"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
