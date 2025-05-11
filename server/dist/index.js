"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const transcribe_1 = __importDefault(require("./routes/transcribe"));
const followupchat_1 = __importDefault(require("./routes/followupchat"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "50mb" }));
app.get("/", (rea, res) => {
    res.send("hello world");
});
app.use("/api/v1", transcribe_1.default);
app.use("/api/v1", followupchat_1.default);
app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
