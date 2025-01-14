'use client';

import { useSession ,SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function HomeContent() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleGetStarted = () => {
    if (session) {
      router.push('/dashboard');
    } else {
      router.push('/auth');
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen 
        p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center text-center">
        <h1 className="text-5xl font-bold">Welcome to Dev mux</h1>
        
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button 
            onClick={handleGetStarted}
            className="bg-white text-black px-6 py-3 rounded-xl text-2xl font-semibold shadow-lg 
            hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-black/10 hover:border-black/20">
            Sign In
          </button>
        </div>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <SessionProvider>
      <HomeContent />
    </SessionProvider>
  );
}


