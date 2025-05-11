import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY!,
});

export const summarize = async (transcript: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-001",
    contents: `
You are a professional summarizer.

Please provide a clear and well-structured plain text summary of the following transcript.

Use:
- UPPERCASE section titles do not use not asterisks or markdown
- Dash "-" for bullet points (not asterisks or markdown)
- Line breaks between sections
- No Markdown or HTML formatting
- No asterisks (*)
- Keep it concise and easy to read

Transcript:
${transcript}

Summary:
    `,
  });
  console.log(response.candidates);
  return response;
};

export const askFollowUp = async (transcript: string, question: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-001",
    contents: `
Here's is the transcript of the video:

${transcript}

A reader asks: "${question}"
Respond with a thoughtful and informative answer. Don't give more than 6 lines of answer. Do not start with "The video transcript showcases..." Instead, start with something more natural and human. Avoid using the word "transcript."

Use:
- UPPERCASE section titles do not use not asterisks or markdown
- Dash "-" for bullet points (not asterisks or markdown)
- Line breaks between sections
- No Markdown or HTML formatting
- No asterisks (*)
- Keep it concise and easy to read
- which ever language thbe transcript is Respond back in english
    `,
  });

  return response;
};
