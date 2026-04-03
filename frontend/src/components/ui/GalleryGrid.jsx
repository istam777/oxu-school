import { X } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { resolveMediaUrl } from "../../utils/media";

export default function GalleryGrid({ images }) {
  const { pick } = useLanguage();
  const [active, setActive] = useState(null);

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setActive(image)}
            className="group card-panel overflow-hidden text-left"
          >
            <div className="h-64 overflow-hidden">
              <img
                src={resolveMediaUrl(image.imageUrl)}
                alt={image.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-secondary/60">{image.category}</p>
              <h3 className="mt-2 text-lg font-semibold text-brand-primary">{image.title}</h3>
              <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-primary transition-all duration-300 group-hover:gap-3 group-hover:text-brand-secondary">
                {pick({ uz: "Batafsil ko'rish", en: "View details", ru: "Подробнее" })}
              </p>
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-primary/75 p-4 backdrop-blur-sm">
          <div className="relative max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-soft">
            <button
              type="button"
              onClick={() => setActive(null)}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 text-brand-primary"
            >
              <X className="h-5 w-5" />
            </button>
            <img src={resolveMediaUrl(active.imageUrl)} alt={active.title} className="max-h-[75vh] w-full object-cover" />
            <div className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-secondary/60">{active.category}</p>
              <h3 className="mt-2 text-2xl font-semibold text-brand-primary">{active.title}</h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
