import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

prisma
  .$connect()
  .then(() => {
    console.log("Database connection established successfully");
  })
  .catch((error) => {
    console.error("Error establishing database connection:", error);
  });

export { prisma };
