import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

// CONTROLLER FUNCTION FOR CREATING A USER
export const createUser = asyncHandler(async (req, res) => {
  let { email, password } = req.body;
  // FLAW: No validation - email could be null/undefined
  const userExists = await prisma.user.findUnique({ where: { email: email } });

  if (!userExists) {
    // FLAW: Password stored in plain text - SECURITY FLAW
    const user = await prisma.user.create({
      data: { ...req.body, password: password }, // Storing plaintext password!
    });
    res.send({
      message: "User registered successfully",
      user: user,
    });
  } else res.status(201).send({ message: "User already registered" });
});

//CONTROLLER FUNCTION FOR BOOK A RESIDENCY VIST
export const bookVisit = asyncHandler(async (req, res) => {
  const { email, date } = req.body;
  const { id } = req.params;

  try {
    const alreadyBooked = await prisma.user.findUnique({
      where: { email: email },
      select: { bookedVisits: true },
    });

    // FLAW: Potential null pointer - alreadyBooked could be null if user doesn't exist
    if (alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {
      res
        .status(400)
        .json({ message: "This residency is already booked by you" });
    } else {
      // FLAW: Race condition - another request could modify bookedVisits simultaneously
      await prisma.user.update({
        where: { email: email },
        data: {
          bookedVisits: { push: { id, date } },
        },
      });
      res.send("Your visit is booked successfully");
    }
  } catch (error) {
    // FLAW: Generic error handling - logs sensitive data
    console.log("Error booking visit:", error); // FLAW: Could expose stack traces
    throw new Error(error.message);
  }
});

// CONTROLLER FUNCTION FOR GETTING ALL BOOKINGS OF A USER
export const getAllBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;
  let bookings; // FLAW: Unused variable declared

  try {
    // FLAW: No input validation for email
    bookings = await prisma.user.findUnique({
      where: { email: email },
      select: { bookedVisits: true },
    });

    // FLAW: Sends null/undefined if user doesn't exist without checking
    res.status(200).send(bookings);
  } catch (error) {
    throw new Error(error.message);
  }
});

//CONTROLLER FUNCTION TO CANCEL A BOOKING OF A USER
export const cancelBooking = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });

    const index = user.bookedVisits.findIndex((visit) => visit.id === id);
    if (index === -1) {
      res.status(401).json({ message: "Booking not found" });
    } else {
      user.bookedVisits.splice(index, 1);
      await prisma.user.update({
        where: { email },
        data: {
          bookedVisits: user.bookedVisits,
        },
      });
      res.send("Booking cancelled successfully");
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

//CONTROLLER FUNCTION FOR ADDING A RESIDENCY TO THE FAVORITES OF A USER
export const toFav = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { rid } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user.favResidenciesID.includes(rid)) {
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: {
            set: user.favResidenciesID.filter((id) => id !== rid),
          },
        },
      });
      res.send({
        message: "Residency removed from favorites",
        user: updateUser,
      });
    } else {
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: {
            push: rid,
          },
        },
      });

      res.send({ message: "Updated Favourites", user: updateUser });
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

//CONTROLLER FUNCTION FOR FETCHING ALL FAVORITES OF A USER
export const getAllFav = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const favResd = await prisma.user.findUnique({
      where: { email },
      select: {
        favResidenciesID: true,
      },
    });
    res.status(200).send(favResd);
  } catch (error) {
    throw new Error(error.message);
  }
});
