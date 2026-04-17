import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Clock, BarChart3, User, ArrowLeft } from "lucide-react";
import { Container } from "../../components/Container.jsx";
import { api } from "../../services/api.js";

export function CourseDetailPage() {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/courses/${slug}`)
      .then((res) => setCourse(res.data.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <Container className="py-24 text-center text-ink/70 dark:text-sand/70">
        Loading…
      </Container>
    );
  }

  if (error || !course) {
    return (
      <Container className="py-24 text-center">
        <p className="text-ink/70 dark:text-sand/70">Course not found.</p>
        <Link to="/courses" className="mt-4 inline-block text-brown">
          ← Back to courses
        </Link>
      </Container>
    );
  }

  const img =
    course.image ||
    "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&q=80";

  return (
    <>
      <Helmet>
        <title>{course.title} | Courses</title>
      </Helmet>
      <div className="border-b border-sand/60 dark:border-brown-dark/40">
        <div className="h-64 w-full overflow-hidden md:h-80">
          <img src={img} alt="" className="h-full w-full object-cover" />
        </div>
      </div>
      <Container className="py-12">
        <Link
          to="/courses"
          className="inline-flex items-center gap-2 text-sm text-brown dark:text-sand"
        >
          <ArrowLeft className="h-4 w-4" />
          All courses
        </Link>
        <h1 className="mt-6 font-display text-4xl text-brown-dark dark:text-cream">
          {course.title}
        </h1>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-brown dark:text-sand/90">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {course.duration}
          </span>
          <span className="inline-flex items-center gap-1">
            <BarChart3 className="h-4 w-4" />
            {course.level}
          </span>
          <span className="inline-flex items-center gap-1">
            <User className="h-4 w-4" />
            {course.instructor}
          </span>
        </div>
        <p className="mt-8 max-w-3xl whitespace-pre-wrap leading-relaxed text-ink/85 dark:text-sand/85">
          {course.description}
        </p>
        <Link
          to="/booking"
          className="mt-10 inline-flex rounded-full bg-brown px-8 py-3 font-medium text-cream"
        >
          Book this course
        </Link>
      </Container>
    </>
  );
}
