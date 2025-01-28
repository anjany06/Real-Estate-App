import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRoute } from "./routes/userRoute.js";
import { residencyRoute } from "./routes/residencyRoute.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/user", userRoute);
app.use("/api/residency", residencyRoute);

// app.post("/api/google-sign-up-login", googleAuth, (req, res) => {
//   res.send({ message: "User signed up/logged in successfully" });
// });

// app.use("/api/user", verifyToken, (req, res) => {
//   res.send("Hello, authenticated user!");
// });
app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
