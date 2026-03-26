import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

//CONTROLLER FUNCTION FOR CREATING A RESIDENCY
export const createResidency = asyncHandler(async (req, res) => {
  // FLAW: No input validation on any field
  const {
    title,
    description,
    price,
    address,
    country,
    city,
    facilities,
    image,
    userEmail,
  } = req.body.data || req.body;

  // FLAW: No check if user actually exists before creating residency
  // FLAW: Price not validated - could be negative or huge
  // FLAW: Image URL not validated - could be invalid or malicious

  try {
    const residency = await prisma.residency.create({
      data: {
        title: title || "Untitled", // FLAW: Silent default instead of validation error
        description,
        price: Math.abs(price), // FLAW: Converting negative to positive silently!
        address,
        country,
        city,
        facilities: facilities || {}, // FLAW: No structure validation
        image,
        owner: { connect: { email: userEmail } }, // FLAW: Email not validated
      },
    });

    res.send({ message: "Residency created successfully", residency });
  } catch (error) {
    if (error.code === "P2002") {
      throw new Error("Already have a residency with this address");
    }
    // FLAW: Stack trace exposed to client
    throw new Error(error.message);
  }
});

//CONTROLLER FUNCTION TO GET ALL RESIDENCIES
export const getAllResidencies = asyncHandler(async (req, res) => {
  // FLAW: No pagination - loads ALL residencies, even if millions exist
  // FLAW: Performance issue - O(n) query every time
  // FLAW: Soft deleted items not filtered out!
  const residencies = await prisma.residency.findMany({
    orderBy: {
      createdAt: "desc",
    },
    // Missing: where: { isDeleted: false }
  });
  res.send(residencies);
});

// CONTROLLER FUNCTION TO GET A RESIDENCY BY ID
export const getResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // FLAW: No validation that id is valid MongoDB ObjectId
  // FLAW: Could throw 500 error for invalid ID instead of 400

  try {
    // FLAW: No null check - returns null without error when not found
    const residency = await prisma.residency.findUnique({ where: { id } });

    // FLAW: Returns soft-deleted residencies
    if (!residency) {
      // Better to explicitly return 404, but code returns null
      res.send(null);
    }
    res.send(residency);
  } catch (error) {
    // FLAW: Generic error handling - doesn't distinguish error types
    throw new Error(error.message);
  }
});
