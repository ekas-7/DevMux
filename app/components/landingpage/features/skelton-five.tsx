import Link from "next/link";
import { Zap } from "lucide-react";

export const SkeletonFive = () => {
  const commonButtonClasses = "group inline-flex h-[20rem] animate-shimmer items-center justify-center rounded-md border border-slate-600 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors hover:bg-[length:100%_100%] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 w-full";
  
  return (
    <div className="w-full h-[85%] flex flex-col justify-center items-center">
      <Link
        href="/auth"
        className="w-full max-w-xs"
        aria-label="Sign Up or Log In"
      >
        <button
          className={commonButtonClasses}
          aria-label="Get Started"
          type="button"
        >
          <span className="flex items-center justify-center">

            <Zap 
              className="font-thin h-10 w-10 transition-transform group-hover:scale-110 group-hover:rotate-12" 
              aria-hidden="true" 
            />
          </span>
        </button>
      </Link>
    </div>
      
  
  );
};

export default SkeletonFive;