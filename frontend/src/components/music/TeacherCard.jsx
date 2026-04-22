import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function TeacherCard({ teacher, index = 0 }) {
  const id = teacher._id;
  const img =
    teacher.image ||
    "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&q=80";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="rounded-2xl bg-cream p-4 text-center shadow-soft ring-1 ring-sand/80 transition duration-200 ease-smooth hover:shadow-lg dark:bg-brown-dark/30 dark:shadow-card-dark dark:ring-brown-dark/50 dark:hover:shadow-soft-dark"
    >
      <div className="mx-auto h-32 w-32 overflow-hidden rounded-full ring-2 ring-sand dark:ring-brown">
        <img
          src={img}
          alt={teacher.name ? `Portrait of ${teacher.name}` : ""}
          className="h-full w-full object-cover"
        />
      </div>
      <h3 className="mt-4 font-display text-lg text-brown-dark dark:text-cream">
        {teacher.name}
      </h3>
      <p className="text-sm font-medium text-brown">{teacher.instrument}</p>
      <p className="mt-2 line-clamp-3 text-xs text-ink/70 dark:text-sand/75">
        {teacher.bio}
      </p>
      <Link
        to={`/teachers/${id}`}
        className="mt-4 inline-block text-sm font-medium text-brown underline-offset-4 hover:underline dark:text-sand"
      >
        Profile
      </Link>
    </motion.div>
  );
}
