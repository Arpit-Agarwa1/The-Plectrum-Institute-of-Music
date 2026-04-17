/**
 * USER CONTROLLER (MVC) — admin lists students
 */

import * as userService from "../services/userService.js";
import * as jsonResponse from "../views/jsonResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const listStudents = asyncHandler(async (req, res) => {
  const students = await userService.listStudents();
  jsonResponse.jsonData(res, students);
});
