import { useEffect, useMemo, useState } from "react";
import GalleryGrid from "../../components/ui/GalleryGrid";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import PageHero from "../../components/common/PageHero";
import { useLanguage } from "../../context/LanguageContext";
import { localGalleryImages } from "../../data/campusImages";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { publicService } from "../../services/publicService";
import { localizeGalleryItem } from "../../utils/cmsLocalization";

export default function GalleryPage() {
  useDocumentTitle({ uz: "Galereya", en: "Gallery", ru: "Галерея" });
  const { pick, language } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState(localGalleryImages);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    publicService
      .getGallery()
      .then((items) => setImages([...localGalleryImages, ...items]))
      .catch(() => setImages(localGalleryImages))
      .finally(() => setLoading(false));
  }, []);

  const normalizedImages = useMemo(
    () =>
      images.map((item) => {
        const localizedItem = localizeGalleryItem(item, language);
        return {
          ...localizedItem,
          title: pick(localizedItem.title),
          category: pick(localizedItem.category),
          categoryLabel: pick(localizedItem.category),
          categoryKey: localizedItem.categoryKey,
        };
      }),
    [images, language, pick]
  );

  const categories = useMemo(() => {
    const map = new Map();
    normalizedImages.forEach((item) => {
      if (!map.has(item.categoryKey)) {
        map.set(item.categoryKey, item.categoryLabel);
      }
    });

    return [
      {
        key: "all",
        label: pick({ uz: "Barchasi", en: "All", ru: "Все" }),
      },
      ...Array.from(map.entries()).map(([key, label]) => ({ key, label })),
    ];
  }, [normalizedImages, pick]);

  const filtered = category === "all" ? normalizedImages : normalizedImages.filter((item) => item.categoryKey === category);

  return (
    <>
      <PageHero
        title={pick({ uz: "Galereya", en: "Gallery", ru: "Галерея" })}
        description={pick({
          uz: "Campus hayoti, dars jarayonlari va tadbirlardan lavhalar.",
          en: "Scenes from campus life, classrooms, and events.",
          ru: "Моменты из жизни кампуса, уроков и мероприятий.",
        })}
      />
      <section className="section-space">
        <div className="container-shell">
          <div className="mb-8 flex flex-wrap gap-3">
            {categories.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setCategory(item.key)}
                className={`rounded-full px-5 py-3 text-sm font-semibold ${
                  category === item.key ? "bg-brand-primary text-white" : "bg-white text-slate-600 shadow-card"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          {loading ? <LoadingSpinner /> : <GalleryGrid images={filtered} />}
        </div>
      </section>
    </>
  );
}
