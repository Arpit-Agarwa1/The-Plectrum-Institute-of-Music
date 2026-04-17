/**
 * DATABASE CONNECTION
 *
 * Mongoose is a tool that lets us use MongoDB with simple JavaScript objects.
 * We connect once when the server starts, then every model uses that connection.
 *
 * Options:
 * - Set MONGODB_URI in .env (Docker, Atlas, or local mongod)
 * - Or set MONGODB_URI=memory (dev only; new DB each process — use Docker for seed + API)
 */

import mongoose from "mongoose";

/** @type {import("mongodb-memory-server").MongoMemoryServer | null} */
let memoryServer = null;

/**
 * Connect to MongoDB using the URI from .env
 * @returns {Promise<void>}
 */
export async function connectDatabase() {
  let uri = process.env.MONGODB_URI?.trim();

  // Dev-only: in-memory MongoDB (each process gets its own DB — prefer Docker Compose)
  if (uri === "memory" || uri === "in-memory") {
    if (process.env.NODE_ENV === "production") {
      throw new Error("MONGODB_URI=memory is not allowed in production");
    }
    const { MongoMemoryServer } = await import("mongodb-memory-server");
    memoryServer = await MongoMemoryServer.create();
    uri = memoryServer.getUri();
    console.log(
      "Using in-memory MongoDB (dev only). For seed + API together, use Docker (docker compose up -d)."
    );
  }

  if (!uri) {
    throw new Error(
      "Missing MONGODB_URI in .env. Run: docker compose up -d   or set an Atlas connection string."
    );
  }

  mongoose.set("strictQuery", true);
  await mongoose.connect(uri);
  console.log("Connected to MongoDB");
}
