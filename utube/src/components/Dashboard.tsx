"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKENDURL } from "@/lib/config";
import { Summary } from "@/components/Summery";
import { Skeleton } from "@/components/ui/skeleton";
import { Chat } from "@/components/Chat";
import { toast } from "sonner";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const urlParam = searchParams.get("url");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      toast.loading("Processing, please wait...", { id: "loading-toast" });
    } else {
      toast.dismiss("loading-toast");
    }
  }, [loading]);

  useEffect(() => {
    const fetchSummary = async () => {
      if (!urlParam) return;

      try {
        const decodedUrl = decodeURIComponent(urlParam);
        const response = await axios.post(`${BACKENDURL}/api/v1/Transcribe`, {
          url: decodedUrl,
        });
        console.log(response.data.summary)
        setSummary(response.data.summary);
        setTranscript(response.data.transcript
        );
      } catch (err) {
        console.error(err);
        setError("Failed to fetch summary.");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [urlParam]);

  if (error) return <div className="p-10 text-red-500">{error}</div>;

  return (
    <div className="p-10">
      {loading ? (
        <div className="space-y-6 max-w-6xl mx-auto">
          <Skeleton className="w-full aspect-video rounded-lg bg-gray-500" />
          <Skeleton className="w-48 h-4 mx-auto bg-gray-500" />
          <Skeleton className="w-full h-[300px] rounded-2xl bg-gray-500" />
        </div>
      ) : (
        <>
          <Summary summary={summary} url={urlParam || ""} />
          <Chat transcript={transcript} />
        </>
      )}
    </div>
  );
}
