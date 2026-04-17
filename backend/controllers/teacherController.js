/**
 * TEACHER CONTROLLER (MVC)
 */

import * as teacherService from "../services/teacherService.js";
import * as jsonResponse from "../views/jsonResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const listTeachers = asyncHandler(async (req, res) => {
  const teachers = await teacherService.listTeachers();
  jsonResponse.jsonData(res, teachers);
});

export const getTeacher = asyncHandler(async (req, res) => {
  const teacher = await teacherService.getTeacherById(req.params.id);
  jsonResponse.jsonData(res, teacher);
});

export const createTeacher = asyncHandler(async (req, res) => {
  const teacher = await teacherService.createTeacher(req.body);
  jsonResponse.jsonData(res, teacher, 201);
});

export const updateTeacher = asyncHandler(async (req, res) => {
  const teacher = await teacherService.updateTeacher(req.params.id, req.body);
  jsonResponse.jsonData(res, teacher);
});

export const deleteTeacher = asyncHandler(async (req, res) => {
  await teacherService.deleteTeacher(req.params.id);
  jsonResponse.jsonMessage(res, "Deleted");
});
