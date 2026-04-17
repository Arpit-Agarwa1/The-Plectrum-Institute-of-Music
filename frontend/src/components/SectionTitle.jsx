/**
 * SECTION TITLE — shared heading style for page sections
 * @param {object} props
 * @param {string} props.title — main heading
 * @param {string} [props.subtitle] — supporting line under the title
 * @param {string} [props.eyebrow] — small uppercase label above the title
 */
import { motion } from "framer-motion";

export function SectionTitle({ title, subtitle, eyebrow }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-12 text-center md:mb-14"
    >
      {eyebrow ? (
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-eyebrow text-brown dark:text-sand/90">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-3xl font-semibold tracking-display-tight text-brown-dark dark:text-sand md:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-ink/75 dark:text-sand/80">
          {subtitle}
        </p>
      ) : null}
    </motion.div>
  );
}
