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
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export default function FeaturesSectionDemo() {
  const words = `We provide a wide range of features to help you build your project.`;
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
      skeleton: <SkeletonSix />,
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
      skeleton: <SkeletonFour />,
      className: "col-span-1 lg:col-span-3",
    },
  ]

  return (
    
    <MatrixGridBackground className="min-h-screen p-24">
      <div className="text-center px-4 sm:px-0 max-w-7xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-semibold text-black dark:text-white">
              What Exactly is DevMux ?
            </h1>
            <h2 className="text-4xl sm:text-5xl md:text-[4rem] lg:text-[6rem] font-bold mt-4 leading-tight mb-4">
              <span className="bg-cosmic-drift bg-clip-text text-transparent">
                Features &
              </span>{" "}
              Demo{" "}
              
            </h2>
            
          </div>
          <TextGenerateEffect words={words}  />
    <div className="relative z-20  lg:py-40 max-w-7xl mx-auto ">
      {/* Grid background with dense, subtle grid */}
    
  {/* Grid background with dense, subtle grid */}




      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-6 -mt-8 xl:border rounded-lg dark:border-neutral-800 bg-black/65">
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










