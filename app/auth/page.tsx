'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Code, Palette, MessageCircle } from 'lucide-react';

export default function AuthPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [session, router]);

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/dashboard' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 animate-gradient bg-[length:400%_400%] bg-gradient-to-br from-purple-900 via-black to-gray-900" 
          style={{
            animation: 'gradient 10s ease infinite',
            backgroundSize: '400% 400%',
          }}
        />
      </div>
      
      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <div className="max-w-md w-full space-y-8 p-8 bg-black/20 backdrop-blur-sm rounded-xl border border-gray-800 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-6">DevMux</h1>
          <div className="flex justify-center gap-4 mb-8">
            <div className="flex items-center text-gray-400">
              <Code className="w-5 h-5 mr-1" />
              <span>Code</span>
            </div>
            <div className="flex items-center text-gray-400">
              <Palette className="w-5 h-5 mr-1" />
              <span>Design</span>
            </div>
            <div className="flex items-center text-gray-400">
              <MessageCircle className="w-5 h-5 mr-1" />
              <span>Discuss</span>
            </div>
          </div>
        </div>
        
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-gray-900 font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
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
    </div>
  );
}