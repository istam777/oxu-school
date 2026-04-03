import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { useLanguage } from "../../context/LanguageContext";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { publicService } from "../../services/publicService";
import { localizeNewsItem } from "../../utils/cmsLocalization";
import { formatDate } from "../../utils/formatters";
import { resolveMediaUrl } from "../../utils/media";

export default function NewsDetailsPage() {
  const { slug } = useParams();
  const { language, pick } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState(null);
  const localizedItem = useMemo(() => localizeNewsItem(item, language), [item, language]);

  useDocumentTitle(localizedItem?.title || { uz: "Yangilik", en: "News", ru: "Новость" });

  useEffect(() => {
    publicService.getNewsBySlug(slug).then(setItem).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <LoadingSpinner />;
  if (!localizedItem) return null;

  return (
    <section className="section-space">
      <div className="container-shell">
        <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
          <article className="min-w-0">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-secondary/60">{localizedItem.category}</p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-brand-primary sm:text-5xl lg:text-6xl">
              {localizedItem.title}
            </h1>
            <p className="mt-4 text-sm text-slate-500">{formatDate(localizedItem.publishedAt || localizedItem.createdAt, language)}</p>

            <div className="mt-8 rounded-[2rem] bg-white p-8 shadow-card">
              <p className="text-lg leading-9 text-slate-600">{localizedItem.summary}</p>
              <div className="mt-6 whitespace-pre-line border-t border-slate-100 pt-6 text-base leading-9 text-slate-700">
                {localizedItem.content}
              </div>
            </div>
          </article>

          <aside className="space-y-6">
            <img
              src={resolveMediaUrl(localizedItem.featuredImage)}
              alt={localizedItem.title}
              className="h-[420px] w-full rounded-[2rem] object-cover shadow-soft"
            />
            <div className="card-panel p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-secondary/60">
                {pick({ uz: "Maqola haqida", en: "Story Info", ru: "О материале" })}
              </p>
              <div className="mt-5 space-y-4 text-sm text-slate-600">
                <div className="rounded-2xl bg-brand-canvas px-4 py-3">
                  <span className="font-semibold text-brand-primary">{pick({ uz: "Kategoriya:", en: "Category:", ru: "Категория:" })}</span>{" "}
                  {localizedItem.category || pick({ uz: "Yangilik", en: "News", ru: "Новость" })}
                </div>
                <div className="rounded-2xl bg-brand-canvas px-4 py-3">
                  <span className="font-semibold text-brand-primary">{pick({ uz: "Sana:", en: "Date:", ru: "Дата:" })}</span>{" "}
                  {formatDate(localizedItem.publishedAt || localizedItem.createdAt, language)}
                </div>
                <div className="rounded-2xl bg-brand-canvas px-4 py-3">
                  <span className="font-semibold text-brand-primary">{pick({ uz: "Havola:", en: "Slug:", ru: "Слаг:" })}</span> {localizedItem.slug}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
