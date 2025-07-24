import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./configs/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imageRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

// Setup __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// APP config
const PORT = process.env.PORT || 4000;
const app = express();
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());

// API routes
app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);

// ✅ Serve frontend build (Vite or CRA)
app.use(express.static(path.join(__dirname, "../client/dist"))); // for Vite
// app.use(express.static(path.join(__dirname, "../client/build"))); // for CRA

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html")); // or build/index.html
});

// Start server
app.listen(PORT, () => console.log("🚀 Server running on port " + PORT));
