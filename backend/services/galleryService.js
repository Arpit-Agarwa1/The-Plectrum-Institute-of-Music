/**
 * GALLERY SERVICE
 */

import { GalleryItem } from "../models/GalleryItem.js";
import { uploadBufferToCloudinary, isCloudinaryConfigured } from "../config/cloudinary.js";
import { notFound, badRequest } from "../utils/httpError.js";

export async function listGalleryItems() {
  return GalleryItem.find().sort({ createdAt: -1 });
}

export async function createGalleryItem(body, fileBuffer) {
  let imageUrl = body.image || "";

  if (fileBuffer) {
    if (!isCloudinaryConfigured()) {
      throw badRequest("Cloudinary not configured — add keys to .env");
    }
    imageUrl = await uploadBufferToCloudinary(fileBuffer, "plectrum/gallery");
  }

  return GalleryItem.create({
    ...body,
    image: imageUrl,
  });
}

export async function deleteGalleryItem(id) {
  const item = await GalleryItem.findByIdAndDelete(id);
  if (!item) throw notFound("Not found");
  return item;
}
