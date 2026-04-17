import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "../../components/Container.jsx";
import { SectionTitle } from "../../components/SectionTitle.jsx";
import { api } from "../../services/api.js";

export function GalleryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    api
      .get("/gallery")
      .then((res) => setItems(res.data.data || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Helmet>
        <title>Gallery | The Plectrum Institute of Music</title>
      </Helmet>
      <div className="border-b border-sand/60 bg-sand/30 py-14 dark:border-brown-dark/40 dark:bg-brown-dark/15">
        <Container>
          <h1 className="font-display text-4xl font-semibold text-brown-dark dark:text-cream">
            Gallery
          </h1>
          <p className="mt-3 max-w-2xl text-ink/80 dark:text-sand/80">
            Classes, recitals, and everyday magic from our studios.
          </p>
        </Container>
      </div>
      <Container className="py-16">
        <SectionTitle title="Moments" />
        {loading ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="aspect-square animate-pulse rounded-2xl bg-sand/40 dark:bg-brown-dark/30"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {items.map((item) => (
              <button
                key={item._id}
                type="button"
                onClick={() => item.image && setLightbox(item)}
                className="group relative aspect-square overflow-hidden rounded-2xl bg-sand/30 text-left focus:outline-none focus:ring-2 focus:ring-brown"
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.caption || ""}
                    className="h-full w-full object-cover transition group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-ink/50">
                    Video / embed
                  </div>
                )}
                {item.caption ? (
                  <span className="absolute bottom-0 left-0 right-0 bg-ink/60 px-2 py-1 text-xs text-cream opacity-0 transition group-hover:opacity-100">
                    {item.caption}
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        )}
      </Container>

      <AnimatePresence>
        {lightbox ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-4"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              className="absolute right-4 top-4 rounded-full bg-cream/10 p-2 text-cream"
              onClick={() => setLightbox(null)}
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
            <motion.img
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              src={lightbox.image}
              alt={lightbox.caption || ""}
              className="max-h-[90vh] max-w-full rounded-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
