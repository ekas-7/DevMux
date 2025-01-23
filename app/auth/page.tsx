"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Code, Palette, MessageCircle } from "lucide-react";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import Image from "next/image";

export default function AuthPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  const commonButtonClasses =
    "inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-600 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 w-full";
  const words = `Experience DevMux With  One Click`;
  return (
    <HeroHighlight className="relative py-12 md:py-20 px-4 overflow-hidden">
      <div className="w-full max-w-sm md:max-w-md mx-auto space-y-6 p-6 md:p-8 bg-black/20 backdrop-blur-sm rounded-lg border border-gray-800 relative z-10">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 md:gap-5 mb-4 md:mb-6">
            <Image
              src="/devmux.svg"
              alt="DevMux Logo"
              width={60}
              height={60}
              className="rounded-lg"
            />
            <h1 className="text-2xl md:text-5xl font-bold text-white">
              DevMux
            </h1>
          </div>
          <TextGenerateEffect words={words}  />

          <div className="flex justify-center gap-3 md:gap-5 mt-6 md:mt-4">
            <div className="flex items-center text-gray-400">
              <Code className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
              <span className="text-sm md:text-base">Code</span>
            </div>
            <div className="flex items-center text-gray-400">
              <Palette className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
              <span className="text-sm md:text-base">Design</span>
            </div>
            <div className="flex items-center text-gray-400">
              <MessageCircle className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
              <span className="text-sm md:text-base">Discuss</span>
            </div>
          </div>
        </div>

        <button
          className={commonButtonClasses}
          onClick={handleGoogleSignIn}
          aria-label="Sign in with Google"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Sign in with Google
        </button>
      </div>
    </HeroHighlight>
  );
}
