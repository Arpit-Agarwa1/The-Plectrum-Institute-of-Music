/**
 * TESTIMONIAL MODEL — student reviews.
 */

import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true },
    course: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true },
    image: { type: String, default: "" },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Testimonial = mongoose.model("Testimonial", testimonialSchema);
