"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center font-sans antialiased">
      <div className="flex items-center gap-6">
        {/* The status code */}
        <h1 className="text-2xl font-medium border-r border-white/20 pr-6 leading-10 text-white">
          404
        </h1>
        
        {/* The error message */}
        <div className="text-sm font-normal text-zinc-400">
          This page could not be found.
        </div>
      </div>

      {/* Navigation options */}
      <div className="mt-10 flex items-center gap-4">
        <button 
          onClick={() => router.back()}
          className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
        >
          Go Back
        </button>
        
        <span className="w-1 h-1 rounded-full bg-zinc-800" />

        <Link 
          href="/" 
          className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
        >
          Home
        </Link>
      </div>
    </div>
  );
}