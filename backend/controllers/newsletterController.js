/**
 * NEWSLETTER CONTROLLER (MVC)
 */

import { validationResult } from "express-validator";
import * as newsletterService from "../services/newsletterService.js";
import * as jsonResponse from "../views/jsonResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const subscribe = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(errors.array()[0].msg);
  }

  await newsletterService.subscribeEmail(req.body.email);
  jsonResponse.jsonMessage(res, "Subscribed");
});
