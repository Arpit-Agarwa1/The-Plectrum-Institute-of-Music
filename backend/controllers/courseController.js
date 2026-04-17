/**
 * COURSE CONTROLLER (MVC) — HTTP only; logic is in courseService.
 */

import * as courseService from "../services/courseService.js";
import * as jsonResponse from "../views/jsonResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const listCourses = asyncHandler(async (req, res) => {
  const courses = await courseService.listPublishedCourses();
  jsonResponse.jsonData(res, courses);
});

export const getCourse = asyncHandler(async (req, res) => {
  const course = await courseService.getCourseBySlug(req.params.slug);
  jsonResponse.jsonData(res, course);
});

export const adminListCourses = asyncHandler(async (req, res) => {
  const courses = await courseService.listAllCoursesAdmin();
  jsonResponse.jsonData(res, courses);
});

export const createCourse = asyncHandler(async (req, res) => {
  const course = await courseService.createCourse(req.body);
  jsonResponse.jsonData(res, course, 201);
});

export const updateCourse = asyncHandler(async (req, res) => {
  const course = await courseService.updateCourse(req.params.id, req.body);
  jsonResponse.jsonData(res, course);
});

export const deleteCourse = asyncHandler(async (req, res) => {
  await courseService.deleteCourse(req.params.id);
  jsonResponse.jsonMessage(res, "Deleted");
});
