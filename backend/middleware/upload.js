/**
 * FILE UPLOAD (Multer)
 *
 * Multer reads multipart/form-data (used when a form sends a file).
 * memoryStorage keeps the file in RAM as a Buffer — we then upload that to Cloudinary.
 */

import multer from "multer";

const storage = multer.memoryStorage();

export const uploadSingleImage = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max — enough for photos
});
