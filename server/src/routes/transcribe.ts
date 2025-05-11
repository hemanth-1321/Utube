import express from "express";
import { YoutubeTranscript } from "youtube-transcript";
import { summarize } from "../controllers/services";

const router = express.Router();

router.post("/transcribe", async (req, res) => {
  try {
    const url = req.body.url;

    const videoId = extractVideoId(url);

    if (!videoId) {
      res.status(400).json({ message: "Invalid YouTube URL" });
      return;
    }

    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    const fullText = transcript.map((item) => item.text).join(" ");
    const summaryResponse = await summarize(fullText);
    const summary =
      summaryResponse.candidates?.[0]?.content?.parts?.[0]?.text ??
      "No summary generated.";
    res.status(200).json({
      transcript: fullText,
      summary: summary,
    });
    return;
  } catch (error) {
    console.error("Transcript fetch error:", error);
    res.status(500).json({ message: "Transcript not available." });
    return;
  }
});

function extractVideoId(url: string) {
  const match = url.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/
  );
  return match ? match[1] : null;
}

export default router;
