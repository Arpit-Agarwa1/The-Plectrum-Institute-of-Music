/**
 * TESTIMONIAL SERVICE
 */

import { Testimonial } from "../models/Testimonial.js";
import { notFound } from "../utils/httpError.js";

export async function listPublishedTestimonials() {
  return Testimonial.find({ isPublished: true }).sort({ createdAt: -1 });
}

export async function listAllTestimonialsAdmin() {
  return Testimonial.find().sort({ createdAt: -1 });
}

export async function createTestimonial(body) {
  return Testimonial.create(body);
}

export async function deleteTestimonial(id) {
  const item = await Testimonial.findByIdAndDelete(id);
  if (!item) throw notFound("Not found");
  return item;
}
