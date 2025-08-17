import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

config();
const app = express();

// Fixed CORS configuration for production
app.use(
  cors({
    // ⚠️ NEVER use "*" with credentials: true - this is the main issue!
    origin: process.env.NODE_ENV === 'production' 
      ? [
          'https://mern-gpt-f4jp.vercel.app',           // Your production frontend URL
          'https://mern-gpt-f4jp-mayurchadokar14-1025s-projects.vercel.app',       // Alternative domain
        ]
      : ['http://localhost:3000', 'http://localhost:5173'], // Local development URLs
    
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // This requires specific origins, not "*"
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"], // Added Cookie header
  })
);

app.use(express.json());

// Make sure cookie secret is set
if (!process.env.COOKIE_SECRET) {
  console.error("⚠️ COOKIE_SECRET environment variable is not set!");
}
app.use(cookieParser(process.env.COOKIE_SECRET));

// Only use morgan in development
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan("dev"));
}

app.use("/api/v1", appRouter);

export default app;