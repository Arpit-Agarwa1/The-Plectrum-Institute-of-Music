import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft } from "lucide-react";
import { Container } from "../../components/Container.jsx";
import { api } from "../../services/api.js";

export function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/blog/${slug}`)
      .then((res) => setPost(res.data.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <Container className="py-24 text-center">Loading…</Container>
    );
  }

  if (error || !post) {
    return (
      <Container className="py-24 text-center">
        <p>Post not found.</p>
        <Link to="/blog" className="mt-4 inline-block text-brown">
          ← Blog
        </Link>
      </Container>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | Blog</title>
      </Helmet>
      {post.coverImage ? (
        <div className="h-56 w-full overflow-hidden md:h-72">
          <img
            src={post.coverImage}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      ) : null}
      <Container className="py-12">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-brown dark:text-sand"
        >
          <ArrowLeft className="h-4 w-4" />
          All posts
        </Link>
        <article className="mx-auto mt-8 max-w-3xl">
          <h1 className="font-display text-4xl text-brown-dark dark:text-cream">
            {post.title}
          </h1>
          <p className="text-sm text-ink/60 dark:text-sand/60">
            {post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString()
              : ""}
          </p>
          <div className="mt-8 whitespace-pre-wrap leading-relaxed text-ink/90 dark:text-sand/90">
            {post.content}
          </div>
        </article>
      </Container>
    </>
  );
}
