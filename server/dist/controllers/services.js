"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.askFollowUp = exports.summarize = void 0;
const genai_1 = require("@google/genai");
const ai = new genai_1.GoogleGenAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});
const summarize = (transcript) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield ai.models.generateContent({
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
});
exports.summarize = summarize;
const askFollowUp = (transcript, question) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield ai.models.generateContent({
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
});
exports.askFollowUp = askFollowUp;
