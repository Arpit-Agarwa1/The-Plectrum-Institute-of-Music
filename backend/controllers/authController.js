/**
 * AUTH CONTROLLER (MVC)
 *
 * Role: read HTTP input → call Service → send View (JSON).
 * No database code here — that lives in services + models.
 */

import { validationResult } from "express-validator";
import * as authService from "../services/authService.js";
import * as jsonResponse from "../views/jsonResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const register = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(errors.array()[0].msg);
  }

  const { name, email, password } = req.body;
  const { token, user } = await authService.registerUser({
    name,
    email,
    password,
  });
  jsonResponse.jsonAuth(res, token, user, 201);
});

export const login = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(errors.array()[0].msg);
  }

  const { email, password } = req.body;
  const { token, user } = await authService.loginUser({ email, password });
  jsonResponse.jsonAuth(res, token, user);
});

export const me = asyncHandler(async (req, res) => {
  const user = await authService.getProfileById(req.user.id);
  jsonResponse.jsonUser(res, user);
});
