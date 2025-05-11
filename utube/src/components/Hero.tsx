"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export function Hero() {
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const router = useRouter();

  const isValidYouTubeUrl = (url: string) => {
    const pattern =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w\-]+/;
    return pattern.test(url);
  };

  const handleSubmit = () => {
    const trimmed = input.trim();

    if (!trimmed) {
      toast.warning("Please input a URL");
      return;
    }

    if (!session) {
      toast.error("Please login");
      return;
    }

    if (!isValidYouTubeUrl(trimmed)) {
      toast.error("Please enter a valid YouTube URL");
      return;
    }

    const encodedUrl = encodeURIComponent(trimmed);
    router.push(`/dashboard?url=${encodedUrl}`);
  };

  return (
    <div className="relative flex flex-col h-[50rem] w-full items-center justify-center px-4 text-center bg-white dark:bg-black">
      <div
        className={cn(
          "absolute inset-0 animate-fade-in",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
        )}
      />
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)] dark:bg-black" />

      <h1 className="z-10 text-2xl sm:text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white max-w-2xl sm:max-w-3xl leading-snug sm:leading-tight mb-4 sm:mb-6">
  Drop a YouTube URL — get a smart summary and AI-generated follow-up questions.
</h1>
<p className="z-10 text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-md sm:max-w-xl mb-6 sm:mb-8">
  No more messy notes or missed insights. Just drop a link and let AI do the heavy lifting.
</p>


      <div className="z-10 w-full max-w-lg flex flex-col sm:flex-row sm:items-center gap-3">
        <input
          type="text"
          placeholder="Paste a YouTube URL..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-900 dark:text-white"
        />
        <button
          onClick={handleSubmit}
          className="w-full sm:w-auto px-5 py-3 bg-[#15b484] text-white font-semibold rounded-lg transition"
        >
          Summarize
        </button>
      </div>
    </div>
  );
}
