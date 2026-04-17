import { Star } from "lucide-react";

export function StarRating({ value }) {
  return (
    <div className="flex gap-0.5" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`h-4 w-4 ${
            n <= value
              ? "fill-amber-400 text-amber-400"
              : "text-sand dark:text-brown-dark"
          }`}
        />
      ))}
    </div>
  );
}
