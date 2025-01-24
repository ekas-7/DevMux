"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { SkeletonOne } from "./features/skelton-one"
import { SkeletonTwo } from "./features/skelton-two"
import { SkeletonThree } from "./features/skelton-three"
import { SkeletonFour } from "./features/skelton-four"
import { SkeletonFive } from "./features/skelton-five"
import { SkeletonSix } from "./features/skelton-six"
import MatrixGridBackground from "./Matrix"


export default function FeaturesSectionDemo() {
  const features = [
    {
      title: "Track issues effectively",
      description: "Track and manage your project issues with ease using our intuitive interface.",
      skeleton: <SkeletonOne />,
      className: "col-span-1 lg:col-span-4 border-b lg:border-r dark:border-neutral-800",
    },
    {
      title: "Capture pictures with AI",
      description: "Capture stunning photos effortlessly using our advanced AI technology.",
      skeleton: <SkeletonTwo />,
      className: "border-b col-span-1 lg:col-span-2 dark:border-neutral-800",
    },
    {
      title: "Watch our AI on YouTube",
      description: "Whether it's you or Tyler Durden, you can get to know about our product on YouTube",
      skeleton: <SkeletonThree />,
      className: "col-span-1 lg:col-span-3 lg:border-r dark:border-neutral-800",
    },
    {
      title: "Deploy in seconds",
      description:
        "With our blazing fast, state of the art, cutting edge, we are so back cloud services (read AWS) - you can deploy your model in seconds.",
      skeleton: <SkeletonFour />,
      className: "col-span-1 lg:col-span-3 border-b lg:border-none",
    },
    {
      title: "Collaborate in real-time",
      description: "Work together seamlessly with your team using our real-time collaboration features.",
      skeleton: <SkeletonFive />,
      className: "col-span-1 lg:col-span-3 lg:border-r dark:border-neutral-800",
    },
    {
      title: "Analyze with precision",
      description: "Gain deep insights into your data with our advanced analytics tools.",
      skeleton: <SkeletonSix />,
      className: "col-span-1 lg:col-span-3",
    },
  ]

  return (
    <MatrixGridBackground className="min-h-screen p-24">
    <div className="relative z-20 py-10 lg:py-40 max-w-6xl mx-auto ">
      {/* Grid background with dense, subtle grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-white/5 dark:bg-grid-black/10 bg-[size:20px_20px] opacity-50 z-[-1]" />
        <div className="absolute inset-0 bg-grid-neutral-200/20 dark:bg-grid-neutral-800/20 bg-[size:40px_40px] opacity-30 z-[-1]" />
      </div>

      <div className="absolute inset-0 bg-gradient-radial from-transparent via-white/80 to-white dark:via-black/80 dark:to-black z-[-1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white dark:from-black dark:via-black/80 dark:to-black z-[-1]" />

      <div className="px-8">
        <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white">
          Packed with thousands of features
        </h4>

        <p className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
          From Image generation to video generation, Everything AI has APIs for literally everything. It can even create
          this website copy for you.
        </p>
      </div>

      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-6 mt-12 xl:border rounded-md dark:border-neutral-800">
          {features.map((feature) => (
            <FeatureCard key={feature.title} className={feature.className}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className="h-full w-full">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </div>
    </MatrixGridBackground> 
  )
}

const FeatureCard = ({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) => {
  return <div className={cn(`p-4 sm:p-8 relative overflow-hidden`, className)}>{children}</div>
}

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className="max-w-5xl mx-auto text-left tracking-tight text-black dark:text-white text-xl md:text-2xl md:leading-snug">
      {children}
    </p>
  )
}

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p
      className={cn(
        "text-sm md:text-base max-w-4xl text-left mx-auto",
        "text-neutral-500 text-center font-normal dark:text-neutral-300",
        "text-left max-w-sm mx-0 md:text-sm my-2",
      )}
    >
      {children}
    </p>
  )
}










