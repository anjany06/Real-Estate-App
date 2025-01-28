import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({
  url: process.env.DATABASE_URL,
});

export { prisma };
