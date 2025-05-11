"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface SummaryProps {
  summary: string;
  url: string;
}

export const Summary = ({ summary, url }: SummaryProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  const embedUrl = getYouTubeEmbedUrl(url);

  return (
    <div className="w-full px-0 sm:px-2 py-6 space-y-6 mt-8">
      {embedUrl && (
        <div className="w-full max-w-4xl mx-auto aspect-video rounded-none sm:rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700">
          <iframe
            src={embedUrl}
            title="Embedded Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      )}

      {/* Original Link */}
      <div className="text-xs sm:text-sm text-center text-muted-foreground break-words px-2">
        Original video link:{" "}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 underline break-all"
        >
          {url}
        </a>
      </div>

      <Card className="w-full max-w-4xl mx-auto rounded-none sm:rounded-2xl border-0 sm:border">
        <CardHeader>
          <h2 className="text-base sm:text-lg font-semibold">AI Summary</h2>
        </CardHeader>

        <CardContent>
          <pre className="whitespace-pre-wrap text-sm sm:text-base leading-relaxed text-gray-800 dark:text-gray-100">
            {summary}
          </pre>
        </CardContent>

        <CardFooter className="justify-end">
          <Button
            onClick={handleCopy}
            variant="outline"
            size="sm"
            className="text-xs sm:text-sm"
          >
            {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
            {copied ? "Copied!" : "Copy Summary"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
