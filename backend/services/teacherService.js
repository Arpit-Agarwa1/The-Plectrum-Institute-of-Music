/**
 * TEACHER SERVICE
 */

import { Teacher } from "../models/Teacher.js";
import { notFound } from "../utils/httpError.js";

export async function listTeachers() {
  return Teacher.find().sort({ order: 1, name: 1 });
}

export async function getTeacherById(id) {
  const teacher = await Teacher.findById(id);
  if (!teacher) throw notFound("Teacher not found");
  return teacher;
}

export async function createTeacher(body) {
  return Teacher.create(body);
}

export async function updateTeacher(id, body) {
  const teacher = await Teacher.findByIdAndUpdate(id, body, { new: true });
  if (!teacher) throw notFound("Teacher not found");
  return teacher;
}

export async function deleteTeacher(id) {
  const teacher = await Teacher.findByIdAndDelete(id);
  if (!teacher) throw notFound("Teacher not found");
  return teacher;
}
