/**
 * UPLOAD SERVICE — send image buffer to Cloudinary
 */

import { uploadBufferToCloudinary, isCloudinaryConfigured } from "../config/cloudinary.js";
import { badRequest } from "../utils/httpError.js";

export async function uploadImageBuffer(buffer, folder) {
  if (!buffer) throw badRequest("No file uploaded");
  if (!isCloudinaryConfigured()) throw badRequest("Cloudinary not configured");
  return uploadBufferToCloudinary(buffer, folder);
}
