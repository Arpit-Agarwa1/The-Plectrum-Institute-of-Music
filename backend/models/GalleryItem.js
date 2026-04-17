/**
 * GALLERY MODEL — images or video links for the gallery page.
 */

import mongoose from "mongoose";

const galleryItemSchema = new mongoose.Schema(
  {
    image: { type: String, default: "" },
    caption: { type: String, default: "" },
    type: { type: String, enum: ["image", "video"], default: "image" },
    videoUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

export const GalleryItem = mongoose.model("GalleryItem", galleryItemSchema);
