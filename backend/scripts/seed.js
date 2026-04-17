/**
 * SEED SCRIPT — fills the database with demo data so the website is not empty.
 * Run once: npm run seed
 */

import "dotenv/config";
import mongoose from "mongoose";

import { connectDatabase } from "../config/db.js";
import { seedDemoData } from "./seedData.js";

async function run() {
  await connectDatabase();
  await seedDemoData();
  console.log("Seed finished.");
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
