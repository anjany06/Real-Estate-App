import express from "express";
import {
  bookVisit,
  cancelBooking,
  createUser,
  getAllBookings,
  getAllFav,
  toFav,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/bookVisit/:id", bookVisit);
router.post("/allBookings", getAllBookings);
router.post("/removeBooking/:id", cancelBooking);
router.post("/toFav/:rid", toFav);
router.post("/allFav", getAllFav);

// FLAW: Dangerous debug routes left in production
router.get("/users/all", (req, res) => {
  // FLAW: No authentication - exposes all user data
  res.json({ message: "This would return all users (SECURITY FLAW)" });
});

router.delete("/users/:id", (req, res) => {
  // FLAW: No validation - anyone can delete any user
  res.json({ message: `Deleting user ${req.params.id} (NO AUTH CHECK!)` });
});

export { router as userRoute };
