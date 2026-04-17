/**
 * UPLOAD CONTROLLER (MVC)
 */

import * as uploadService from "../services/uploadService.js";
import * as jsonResponse from "../views/jsonResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const uploadImage = asyncHandler(async (req, res) => {
  const folder = req.body.folder || "plectrum/uploads";
  const url = await uploadService.uploadImageBuffer(req.file.buffer, folder);
  jsonResponse.jsonUrl(res, url);
});
