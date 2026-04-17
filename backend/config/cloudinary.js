/**
 * CLOUDINARY — stores images in the cloud so we do not save big files in our database.
 * If keys are missing, upload functions should skip or return a clear error.
 */

import { v2 as cloudinary } from "cloudinary";

const name = process.env.CLOUDINARY_CLOUD_NAME;
const key = process.env.CLOUDINARY_API_KEY;
const secret = process.env.CLOUDINARY_API_SECRET;

export function isCloudinaryConfigured() {
  return Boolean(name && key && secret);
}

export function configureCloudinary() {
  if (!isCloudinaryConfigured()) {
    return;
  }
  cloudinary.config({
    cloud_name: name,
    api_key: key,
    api_secret: secret,
  });
}

/**
 * Upload a file buffer from Multer to Cloudinary folder "plectrum"
 * @param {Buffer} buffer
 * @param {string} folder
 * @returns {Promise<string>} secure URL of uploaded image
 */
export async function uploadBufferToCloudinary(buffer, folder = "plectrum") {
  configureCloudinary();
  if (!isCloudinaryConfigured()) {
    throw new Error("Cloudinary is not configured. Add keys to .env");
  }

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });
}
