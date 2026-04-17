/**
 * AUTH SERVICE (Model + rules) — register, login, load profile.
 * Controller only talks HTTP; this file talks to the User model.
 */

import { User } from "../models/User.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { signToken } from "../utils/jwt.js";
import { toPublicUser, toPublicProfile } from "../views/userView.js";
import { badRequest, notFound, unauthorized } from "../utils/httpError.js";

export async function registerUser({ name, email, password }) {
  const existing = await User.findOne({ email });
  if (existing) throw badRequest("Email already registered");

  const hashed = await hashPassword(password);
  const user = await User.create({
    name,
    email,
    password: hashed,
    role: "student",
  });

  const token = signToken(user._id.toString(), user.role);
  return { token, user: toPublicUser(user) };
}

export async function loginUser({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) throw unauthorized("Invalid email or password");

  const ok = await comparePassword(password, user.password);
  if (!ok) throw unauthorized("Invalid email or password");

  const token = signToken(user._id.toString(), user.role);
  return { token, user: toPublicUser(user) };
}

export async function getProfileById(userId) {
  const user = await User.findById(userId).select("-password").lean();
  if (!user) throw notFound("User not found");
  return toPublicProfile(user);
}
