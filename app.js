// app.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./api/routes/userRoutes.js";
import authRoutes from "./api/routes/authRoutes.js";
import uploadRoutes from "./api/routes/uploadRoutes.js";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import path, { dirname } from "path";
import dotenv from "dotenv";
import menuRoutes from "./api/routes/menuRoutes.js";
import paymentRoutes from "./api/routes/paymentRoutes.js";
import fileUpload from 'express-fileupload';

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const __dirname = dirname(fileURLToPath(import.meta.url));

// Enable CORS
app.use(
  cors({
    credentials: true,
    origin: "https://food-delight-frontend.vercel.app",
  })
);

app.use(cookieParser());
app.use(fileUpload({
  useTempFiles: true,
}));

app.use("/api/users", userRoutes); // User routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/menu", menuRoutes);
app.use("/api/uploads", uploadRoutes); // Upload routes
app.use("/api/payments", paymentRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Serve static assets (only needed for local development or if necessary)
app.use(express.static(path.join(__dirname, 'public')));

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.get('*', (req, res, next) => {
  res.status(200).json({
    message: 'bad request'
  });
});

export default app;
