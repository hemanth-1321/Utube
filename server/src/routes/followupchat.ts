import express from "express";
import { askFollowUp } from "../controllers/services";

const router = express.Router();

router.post("/followup", async (req, res) => {
  const { question, transcript } = req.body;

  try {
    const result = await askFollowUp(transcript, question);

    const reply =
      result?.candidates?.[0]?.content?.parts?.[0]?.text ??
      "No response generated.";

    res.status(200).json({ response: reply });
  } catch (error) {
    console.error("Error in askFollowUp:", error);
    res.status(500).json({
      error: "An error occurred while processing the request",
    });
  }
});

export default router;
