import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { MapPin } from "lucide-react";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { useLanguage } from "../../context/LanguageContext";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { publicService } from "../../services/publicService";
import { localizeEventItem } from "../../utils/cmsLocalization";
import { formatDate, formatTime } from "../../utils/formatters";
import { resolveMediaUrl } from "../../utils/media";

export default function EventDetailsPage() {
  const { slug } = useParams();
  const { language, pick } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState(null);
  const localizedItem = useMemo(() => localizeEventItem(item, language), [item, language]);

  useDocumentTitle(localizedItem?.title || { uz: "Tadbir", en: "Event", ru: "Событие" });

  useEffect(() => {
    publicService.getEventBySlug(slug).then(setItem).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <LoadingSpinner />;
  if (!localizedItem) return null;

  return (
    <section className="section-space">
      <div className="container-shell">
        <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
          <article className="min-w-0">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-secondary/60">{localizedItem.category}</p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-brand-primary sm:text-5xl lg:text-6xl">
              {localizedItem.title}
            </h1>
            <div className="mt-4 flex flex-wrap gap-6 text-sm text-slate-500">
              <span>{formatDate(localizedItem.eventDate, language)}</span>
              <span>
                {localizedItem.startTime ? `${formatTime(localizedItem.startTime, language)} - ${formatTime(localizedItem.endTime, language)}` : ""}
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand-secondary" />
                {localizedItem.location}
              </span>
            </div>

            <div className="mt-8 rounded-[2rem] bg-white p-8 shadow-card">
              <p className="text-lg leading-9 text-slate-600">{localizedItem.summary}</p>
              <div className="mt-6 whitespace-pre-line border-t border-slate-100 pt-6 text-base leading-9 text-slate-700">
                {localizedItem.description}
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
                {pick({ uz: "Tadbir haqida", en: "Event Info", ru: "О событии" })}
              </p>
              <div className="mt-5 space-y-4 text-sm text-slate-600">
                <div className="rounded-2xl bg-brand-canvas px-4 py-3">
                  <span className="font-semibold text-brand-primary">{pick({ uz: "Sana:", en: "Date:", ru: "Дата:" })}</span> {formatDate(localizedItem.eventDate, language)}
                </div>
                <div className="rounded-2xl bg-brand-canvas px-4 py-3">
                  <span className="font-semibold text-brand-primary">{pick({ uz: "Vaqt:", en: "Time:", ru: "Время:" })}</span>{" "}
                  {localizedItem.startTime
                    ? `${formatTime(localizedItem.startTime, language)} - ${formatTime(localizedItem.endTime, language)}`
                    : pick({ uz: "Aniqlanadi", en: "TBA", ru: "Уточняется" })}
                </div>
                <div className="rounded-2xl bg-brand-canvas px-4 py-3">
                  <span className="font-semibold text-brand-primary">{pick({ uz: "Manzil:", en: "Location:", ru: "Место:" })}</span>{" "}
                  {localizedItem.location || pick({ uz: "OSIYO kampusi", en: "OSIYO campus", ru: "кампус OSIYO" })}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
