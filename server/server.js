import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./configs/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imageRoutes.js";

import path from "path";

//APP config
const PORT = process.env.PORT || 4000;
const app = express();
connectDB();

const __dirname = path.resolve();

//Initialize Middlewares
app.use(express.json());
app.use(cors());

//API routes
app.get("/healthz", (req, res) => res.send("OK"));

app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client","dist","index.html"));
  });
}

app.listen(PORT, () => console.log("Server Running on Port " + PORT));
