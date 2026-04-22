import { Link } from "react-router-dom";
import { Clock, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

export function CourseCard({ course, index = 0 }) {
  const slug = course.slug || course._id;
  const img =
    course.image ||
    "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80";

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group flex flex-col overflow-hidden rounded-2xl bg-cream shadow-soft ring-1 ring-sand/80 transition duration-200 ease-smooth hover:-translate-y-0.5 hover:shadow-lg focus-within:ring-2 focus-within:ring-brown dark:bg-brown-dark/35 dark:shadow-card-dark dark:ring-brown-dark/45 dark:focus-within:ring-sand dark:hover:shadow-soft-dark"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={img}
          alt={course.title ? `Course: ${course.title}` : "Course image"}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl text-brown-dark dark:text-cream">
          {course.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-ink/75 dark:text-sand/80">
          {course.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-xs text-brown dark:text-sand/90">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {course.duration}
          </span>
          <span className="inline-flex items-center gap-1">
            <BarChart3 className="h-3.5 w-3.5" />
            {course.level}
          </span>
        </div>
        <p className="mt-2 text-xs text-ink/60 dark:text-sand/60">
          Instructor: {course.instructor}
        </p>
        <Link
          to={`/courses/${slug}`}
          className="mt-4 inline-flex rounded-full bg-brown px-4 py-2 text-center text-sm font-medium text-cream transition hover:bg-brown-dark"
        >
          View course
        </Link>
      </div>
    </motion.article>
  );
}
