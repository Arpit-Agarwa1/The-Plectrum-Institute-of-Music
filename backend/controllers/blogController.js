/**
 * BLOG CONTROLLER (MVC)
 */

import * as blogService from "../services/blogService.js";
import * as jsonResponse from "../views/jsonResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const listPosts = asyncHandler(async (req, res) => {
  const data = await blogService.listPosts();
  jsonResponse.jsonData(res, data);
});

export const getPost = asyncHandler(async (req, res) => {
  const post = await blogService.getPostBySlug(req.params.slug);
  jsonResponse.jsonData(res, post);
});

export const createPost = asyncHandler(async (req, res) => {
  const post = await blogService.createPost(req.body);
  jsonResponse.jsonData(res, post, 201);
});

export const updatePost = asyncHandler(async (req, res) => {
  const post = await blogService.updatePost(req.params.id, req.body);
  jsonResponse.jsonData(res, post);
});

export const deletePost = asyncHandler(async (req, res) => {
  await blogService.deletePost(req.params.id);
  jsonResponse.jsonMessage(res, "Deleted");
});
