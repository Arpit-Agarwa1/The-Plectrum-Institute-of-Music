/**
 * ENTRY POINT — this is the first file that runs when you start the server.
 *
 * What happens here (in order):
 * 1) Load secret settings from .env
 * 2) Connect to MongoDB
 * 3) Create the Express "app" (web server)
 * 4) Listen on a port so browsers can send requests
 */

import "dotenv/config";
import http from "http";
import app from "./app.js";
import { connectDatabase } from "./config/db.js";

// Port number: use 5000 unless PORT is set in .env
const PORT = Number(process.env.PORT) || 5000;

async function start() {
  // Wait until we can talk to the database; if this fails, we stop (no point running API without DB)
  await connectDatabase();

  // In-memory MongoDB: demo data in the same process (Docker not required)
  if (process.env.MONGODB_URI?.trim() === "memory") {
    const { seedDemoData } = await import("./scripts/seedData.js");
    await seedDemoData();
  }

  // Create an HTTP server using our Express app
  const server = http.createServer(app);

  server.listen(PORT, () => {
    // This runs once when the server is ready
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`API docs: http://localhost:${PORT}/api-docs`);
  });
}

start().catch((err) => {
  console.error("Could not start server:", err);
  process.exit(1);
});
