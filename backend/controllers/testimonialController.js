/**
 * TESTIMONIAL CONTROLLER (MVC)
 */

import * as testimonialService from "../services/testimonialService.js";
import * as jsonResponse from "../views/jsonResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const listTestimonials = asyncHandler(async (req, res) => {
  const data = await testimonialService.listPublishedTestimonials();
  jsonResponse.jsonData(res, data);
});

export const adminList = asyncHandler(async (req, res) => {
  const data = await testimonialService.listAllTestimonialsAdmin();
  jsonResponse.jsonData(res, data);
});

export const createTestimonial = asyncHandler(async (req, res) => {
  const item = await testimonialService.createTestimonial(req.body);
  jsonResponse.jsonData(res, item, 201);
});

export const deleteTestimonial = asyncHandler(async (req, res) => {
  await testimonialService.deleteTestimonial(req.params.id);
  jsonResponse.jsonMessage(res, "Deleted");
});
