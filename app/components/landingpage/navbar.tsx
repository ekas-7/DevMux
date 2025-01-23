"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  const [blurred, setBlurred] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Set blurred state based on a specific scroll height threshold
      setBlurred(scrollY > 580); // Change 500 to the desired height in pixels
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 border-border transition-all duration-300 ${
        blurred ? "backdrop-blur-md  bg-black/50" : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-14 px-4 mx-auto max-w-7xl">
        <div className="flex items-center gap-2">
          <Image
            src="/devmux.svg"
            alt="DevMux Logo"
            width={44}
            height={44}
            className="rounded-lg"
          />
          <span className="text-lg font-semibold">DevMux</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/pricing"
            className="text-muted-foreground hover:text-foreground"
            aria-label="View Pricing"
          >
            Pricing
          </Link>
          <Link
            href="/about"
            className="text-muted-foreground hover:text-foreground"
            aria-label="Explore Features"
          >
            Features
          </Link>
          <Link
            href="/auth"
            className="text-muted-foreground hover:text-foreground"
            aria-label="Sign Up or Log In"
          >
            <button className="relative inline-flex h-10 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                Get Started
              </span>
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
