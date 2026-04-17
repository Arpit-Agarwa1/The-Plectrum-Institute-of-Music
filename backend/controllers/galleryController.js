/**
 * GALLERY CONTROLLER (MVC)
 */

import * as galleryService from "../services/galleryService.js";
import * as jsonResponse from "../views/jsonResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const listGallery = asyncHandler(async (req, res) => {
  const data = await galleryService.listGalleryItems();
  jsonResponse.jsonData(res, data);
});

export const createGalleryItem = asyncHandler(async (req, res) => {
  const buffer = req.file && req.file.buffer ? req.file.buffer : null;
  const item = await galleryService.createGalleryItem(req.body, buffer);
  jsonResponse.jsonData(res, item, 201);
});

export const deleteGalleryItem = asyncHandler(async (req, res) => {
  await galleryService.deleteGalleryItem(req.params.id);
  jsonResponse.jsonMessage(res, "Deleted");
});
