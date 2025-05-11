"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { BACKENDURL } from "@/lib/config";
import { motion } from "framer-motion";

interface ChatProps {
  transcript: string;
}

export const Chat = ({ transcript }: ChatProps) => {
  const [input, setInput] = useState("");
  const [question, setQuestion] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setLoading(true);
    setQuestion(trimmed); // Set the user's question
    setResponse(null); // Reset the previous response
    setInput(""); // Clear the input field after sending

    try {
      const res = await axios.post(`${BACKENDURL}/api/v1/followup`, {
        transcript,
        question: trimmed,
      });
      setResponse(res.data.response); // Set the AI's response
    } catch (err) {
      console.error(err);
      setResponse("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Input Area */}
      <div className="flex items-center gap-2 bg-muted rounded-xl px-4 py-2 shadow-sm">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about the video..."
          className="flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Button onClick={handleSend} variant="default" disabled={loading}>
          <Send className="w-4 h-4 mr-1" />
          Send
        </Button>
      </div>

      {/* Chat History */}
      <div className="space-y-4">
        {/* Show the question and response only if they exist */}
        {question && (
          <div className="space-y-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex justify-end"
            >
              <div className="bg-[#15b484] text-white px-4 py-2 rounded-2xl text-sm max-w-[70%] shadow">
                {question}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex justify-start"
            >
              <div className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-2xl text-sm max-w-[70%] text-gray-900 dark:text-white shadow whitespace-pre-line">
                {loading ? "Thinking..." : response}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};
