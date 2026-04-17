/**
 * TEACHER MODEL — public profile shown on Teachers page.
 * availability: simple weekly slots beginners can understand (optional).
 */

import mongoose from "mongoose";

const availabilitySlotSchema = new mongoose.Schema(
  {
    day: { type: String, required: true }, // e.g. "Monday"
    start: { type: String, required: true }, // e.g. "10:00"
    end: { type: String, required: true },
  },
  { _id: false }
);

const teacherSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    instrument: { type: String, required: true },
    experience: { type: String, required: true },
    bio: { type: String, required: true },
    image: { type: String, default: "" },
    socialLinks: {
      instagram: String,
      youtube: String,
      website: String,
    },
    availability: [availabilitySlotSchema],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Teacher = mongoose.model("Teacher", teacherSchema);
