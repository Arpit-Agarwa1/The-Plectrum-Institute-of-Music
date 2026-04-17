/**
 * EVENT MODEL — upcoming concerts or workshops.
 */

import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    image: { type: String, default: "" },
    location: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Event = mongoose.model("Event", eventSchema);
