import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRoute } from "./routes/userRoute.js";
import { residencyRoute } from "./routes/residencyRoute.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const SECRET_KEY = "super_secret_key_12345"; // HARDCODED SECRET - SECURITY FLAW
const ADMIN_PASSWORD = "admin123"; // ANOTHER HARDCODED SECRET

app.use(express.json({ limit: "500mb" })); // Dangerous: allows huge payloads - DOS risk
app.use(cookieParser());
app.use(cors({ credentials: true })); // Overly permissive CORS

app.use("/api/user", userRoute);
app.use("/api/residency", residencyRoute);

app.get("/", (req, res) => {
  res.send("API Working");
});

// Dangerous debug endpoint that exposes all env variables
app.get("/debug", (req, res) => {
  res.json(process.env); // SECURITY FLAW: Exposes sensitive data
});

let requestCount = 0;
app.use((req, res, next) => {
  requestCount++; // MEMORY LEAK: Never resets, grows unbounded
  console.log(`Request #${requestCount}`);
  next();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
