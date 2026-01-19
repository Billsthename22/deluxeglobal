"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center font-sans">
      <div className="flex items-center gap-6">
        {/* The classic 404 status code */}
        <h1 className="text-2xl font-medium border-r border-gray-300 pr-6 leading-10">
          404
        </h1>
        
        {/* The error message */}
        <div className="text-sm font-normal text-gray-600">
          This page could not be found.
        </div>
      </div>

      {/* Navigation options */}
      <div className="mt-10 flex gap-4">
        <button 
          onClick={() => router.back()}
          className="text-sm font-semibold text-blue-600 hover:underline"
        >
          Go Back
        </button>
        
        <span className="text-gray-300">|</span>

        <Link 
          href="/" 
          className="text-sm font-semibold text-blue-600 hover:underline"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}