/**
 * USER SERVICE — admin listing students
 */

import { User } from "../models/User.js";

export async function listStudents() {
  return User.find({ role: "student" }).select("-password").sort({ createdAt: -1 });
}
