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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const youtube_transcript_1 = require("youtube-transcript");
const services_1 = require("../controllers/services");
const router = express_1.default.Router();
router.post("/transcribe", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    try {
        const url = req.body.url;
        const videoId = extractVideoId(url);
        if (!videoId) {
            res.status(400).json({ message: "Invalid YouTube URL" });
            return;
        }
        const transcript = yield youtube_transcript_1.YoutubeTranscript.fetchTranscript(videoId);
        const fullText = transcript.map((item) => item.text).join(" ");
        const summaryResponse = yield (0, services_1.summarize)(fullText);
        const summary = (_f = (_e = (_d = (_c = (_b = (_a = summaryResponse.candidates) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.content) === null || _c === void 0 ? void 0 : _c.parts) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.text) !== null && _f !== void 0 ? _f : "No summary generated.";
        res.status(200).json({
            transcript: fullText,
            summary: summary,
        });
        return;
    }
    catch (error) {
        console.error("Transcript fetch error:", error);
        res.status(500).json({ message: "Transcript not available." });
        return;
    }
}));
function extractVideoId(url) {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/);
    return match ? match[1] : null;
}
exports.default = router;
