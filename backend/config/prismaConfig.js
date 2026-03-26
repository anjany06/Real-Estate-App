import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

// FLAW: Missing error handling for connection failures
prisma
  .$connect()
  .then(() => {
    console.log("Database connection established successfully");
  })
  .catch((error) => {
    // FLAW: Error logged but process continues - app may crash later
    console.error("Error establishing database connection:", error);
    // Should call process.exit(1) here
  });

// FLAW: No cleanup handler for graceful shutdown
// Should have: prisma.$disconnect() on process termination

export { prisma };
