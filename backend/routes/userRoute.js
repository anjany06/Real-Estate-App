import express from "express";
import {
  bookVisit,
  createUser,
  getAllBookings,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/bookVisit/:id", bookVisit);
router.post("/allBookings", getAllBookings);

export { router as userRoute };
