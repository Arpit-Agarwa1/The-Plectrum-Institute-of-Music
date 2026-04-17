/**
 * COURSE SERVICE — list, read, create, update, delete courses.
 */

import { Course } from "../models/Course.js";
import { slugify } from "../utils/slug.js";
import { notFound } from "../utils/httpError.js";

export async function listPublishedCourses() {
  return Course.find({ isPublished: true }).sort({ createdAt: -1 });
}

export async function getCourseBySlug(slug) {
  const course = await Course.findOne({ slug });
  if (!course) throw notFound("Course not found");
  return course;
}

export async function listAllCoursesAdmin() {
  return Course.find().sort({ createdAt: -1 });
}

export async function createCourse(body) {
  const slug = body.slug || slugify(body.title);
  return Course.create({ ...body, slug });
}

export async function updateCourse(id, body) {
  const course = await Course.findByIdAndUpdate(id, body, { new: true });
  if (!course) throw notFound("Course not found");
  return course;
}

export async function deleteCourse(id) {
  const course = await Course.findByIdAndDelete(id);
  if (!course) throw notFound("Course not found");
  return course;
}
