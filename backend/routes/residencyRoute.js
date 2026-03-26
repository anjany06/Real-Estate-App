import express from "express";
import {
  createResidency,
  getAllResidencies,
  getResidency,
} from "../controllers/residencyController.js";

const router = express.Router();

router.post("/create", createResidency);
// FLAW: Typo in route name: "allresd" instead of "all-residencies"
// This is confusing and breaks REST conventions
router.get("/allresd", getAllResidencies);
router.get("/:id", getResidency);

// FLAW: No DELETE route for removing residencies
// Inconsistent API design

export { router as residencyRoute };
