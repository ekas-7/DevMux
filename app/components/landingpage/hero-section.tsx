"use client";

import { ArrowRight, Zap } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import { useEffect } from "react";
import Link from "next/link";
export function HeroSection() {

  const textControls = useAnimation();
  const buttonControls = useAnimation();

  const textVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { delay: i * 0.2, type: "spring", stiffness: 100, damping: 10 },
    }),
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  const buttonVariants = {
    initial: { opacity: 0, y: 50, rotate: -10 },
    animate: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { type: "spring", stiffness: 120, delay: 0.6 },
    },
    hover: {
      scale: 1.1,
      rotate: [0, -5, 5, 0],
      transition: { type: "tween", duration: 0.4 },
    },
  };

  useEffect(() => {
    const animateSequence = async () => {
      await textControls.start("visible");
      await buttonControls.start("animate");
    };
    animateSequence();
  }, [textControls, buttonControls]);

  const words = ["Design", "Code", "Discuss"];
  const commonButtonClasses = "inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-600 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 mx-4";

  return (
    <HeroHighlight className="relative pt-32 pb-16 px-4 overflow-hidden">
      <div className="relative text-center mx-auto max-w-4xl">
        <div className="absolute inset-0 bg-gradient-to-tr from-cosmic-drift/10 to-background opacity-50"></div>

        <motion.div className="relative z-10">
          <div className="mb-2">
            {words.map((word, index) => (
              <motion.h2
                key={word}
                custom={index}
                variants={textVariants}
                initial="hidden"
                animate={textControls}
                whileHover="hover"
                className="text-5xl md:text-7xl font-bold tracking-tight inline-block mx-2"
              >
                {word}
              </motion.h2>
            ))}
          </div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1, transition: { delay: 0.6, type: "spring" } }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-4 leading-tight"
          >
            <span className="bg-cosmic-drift bg-clip-text text-7xl md:text-9xl text-transparent">
              DevMux
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.8, type: "spring" },
            }}
            className="text-muted-foreground hidden md:block text-2xl mb-8 max-w-2xl mx-auto"
          >
            Revolutionize your development workflow with an AI-powered platform
            that seamlessly integrates system design, coding, and team
            communication.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.div variants={buttonVariants} initial="initial" animate={buttonControls}>
            <Link
            href="/auth"
            className="text-muted-foreground hover:text-foreground"
            aria-label="Sign Up or Log In"
          >
              <button
                className={commonButtonClasses}
                aria-label="Get Started"
               
              >
                Get Started
                <Zap className="ml-2 h-5 w-5 group-hover:animate-pulse" />
              </button>
              </Link>
            </motion.div>

            <motion.div variants={buttonVariants} initial="initial" animate={buttonControls}>
              
              <button
                className={commonButtonClasses}
                aria-label="Explore Pricing"

              >
                Explore Pricing
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </HeroHighlight>
  );
}
