import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

//CONTROLLER FUNCTION FOR CREATING A RESIDENCY
export const createResidency = asyncHandler(async (req, res) => {
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
  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        country,
        city,
        facilities,
        image,
        owner: { connect: { email: userEmail } },
      },
    });

    res.send({ message: "Residency created successfully", residency });
  } catch (error) {
    if (error.code === "P2002") {
      throw new Error("Already have a residency with this address");
    }
    throw new Error(error.message);
  }
});

//CONTROLLER FUNCTION TO GET ALL RESIDENCIES
export const getAllResidencies = asyncHandler(async (req, res) => {
  const residencies = await prisma.residency.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  res.send(residencies);
});

// CONTROLLER FUNCTION TO GET A RESIDENCY BY ID
export const getResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const residency = await prisma.residency.findUnique({ where: { id } });
    res.send(residency);
  } catch (error) {
    throw new Error(error.message);
  }
});
