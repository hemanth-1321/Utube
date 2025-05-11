import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import transcribe from "./routes/transcribe";
import followup from "./routes/followupchat";
const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.get("/", (rea, res) => {
  res.send("hello world");
});

app.use("/api/v1", transcribe);
app.use("/api/v1", followup);
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
