/**
 * USER MODEL
 *
 * Stores people who can log in: "admin" manages the site, "student" uses the student dashboard.
 */

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true }, // always store HASHED passwords, never plain text
    role: {
      type: String,
      enum: ["admin", "student"],
      default: "student",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
