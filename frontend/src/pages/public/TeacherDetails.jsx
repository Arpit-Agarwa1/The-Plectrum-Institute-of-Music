import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft } from "lucide-react";
import { Container } from "../../components/Container.jsx";
import { api } from "../../services/api.js";

export function TeacherDetailPage() {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/teachers/${id}`)
      .then((res) => setTeacher(res.data.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Container className="py-24 text-center text-ink/70">Loading…</Container>
    );
  }

  if (error || !teacher) {
    return (
      <Container className="py-24 text-center">
        <p>Teacher not found.</p>
        <Link to="/teachers" className="mt-4 inline-block text-brown">
          ← Back to faculty
        </Link>
      </Container>
    );
  }

  const img =
    teacher.image ||
    "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80";

  return (
    <>
      <Helmet>
        <title>{teacher.name} | Teachers</title>
      </Helmet>
      <Container className="py-12">
        <Link
          to="/teachers"
          className="inline-flex items-center gap-2 text-sm text-brown dark:text-sand"
        >
          <ArrowLeft className="h-4 w-4" />
          All teachers
        </Link>
        <div className="mt-8 grid gap-10 md:grid-cols-3">
          <div className="md:col-span-1">
            <div className="overflow-hidden rounded-3xl ring-1 ring-sand dark:ring-brown-dark">
              <img src={img} alt="" className="aspect-[3/4] w-full object-cover" />
            </div>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm font-medium uppercase tracking-wider text-brown">
              {teacher.instrument}
            </p>
            <h1 className="mt-2 font-display text-4xl text-brown-dark dark:text-cream">
              {teacher.name}
            </h1>
            <p className="mt-2 text-brown dark:text-sand/90">
              {teacher.experience} experience
            </p>
            <p className="mt-6 leading-relaxed text-ink/85 dark:text-sand/85">
              {teacher.bio}
            </p>
            {teacher.availability && teacher.availability.length > 0 ? (
              <div className="mt-8 rounded-2xl bg-sand/40 p-4 dark:bg-brown-dark/30">
                <p className="font-display text-lg text-brown-dark dark:text-cream">
                  Availability
                </p>
                <ul className="mt-2 space-y-1 text-sm">
                  {teacher.availability.map((slot, i) => (
                    <li key={i}>
                      {slot.day}: {slot.start} – {slot.end}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-4">
              {teacher.socialLinks?.youtube ? (
                <a
                  href={teacher.socialLinks.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-brown underline"
                >
                  YouTube
                </a>
              ) : null}
              {teacher.socialLinks?.instagram ? (
                <a
                  href={teacher.socialLinks.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-brown underline"
                >
                  Instagram
                </a>
              ) : null}
            </div>
            <Link
              to="/booking"
              className="mt-10 inline-flex rounded-full bg-brown px-8 py-3 font-medium text-cream"
            >
              Book with this teacher
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
