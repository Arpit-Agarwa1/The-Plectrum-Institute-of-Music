/**
 * BLOG SERVICE
 */

import { BlogPost } from "../models/BlogPost.js";
import { slugify } from "../utils/slug.js";
import { notFound } from "../utils/httpError.js";

export async function listPosts() {
  return BlogPost.find().sort({ publishedAt: -1 });
}

export async function getPostBySlug(slug) {
  const post = await BlogPost.findOne({ slug });
  if (!post) throw notFound("Post not found");
  return post;
}

export async function createPost(body) {
  const slug = body.slug || slugify(body.title);
  return BlogPost.create({ ...body, slug });
}

export async function updatePost(id, body) {
  const post = await BlogPost.findByIdAndUpdate(id, body, { new: true });
  if (!post) throw notFound("Not found");
  return post;
}

export async function deletePost(id) {
  const post = await BlogPost.findByIdAndDelete(id);
  if (!post) throw notFound("Not found");
  return post;
}
