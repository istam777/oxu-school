import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatters";
import { resolveMediaUrl } from "../../utils/media";

export default function NewsCard({ item, language, labels }) {
  const publishedLabel =
    {
      uz: "Sana",
      en: "Published",
      ru: "Опубликовано",
    }[language] || "Published";

  return (
    <article className="group card-panel overflow-hidden border-slate-200/70 bg-white/95">
      <div className="relative h-56 overflow-hidden bg-brand-surface sm:h-64">
        <img
          src={resolveMediaUrl(item.featuredImage)}
          alt={item.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/88 via-brand-primary/38 to-transparent" />
        <div className="absolute left-4 top-4 inline-flex rounded-full border border-white/20 bg-white/14 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md sm:left-5 sm:top-5 sm:px-4 sm:text-[11px] sm:tracking-[0.22em]">
          {item.category || labels.categoryFallback}
        </div>
        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 sm:inset-x-5 sm:bottom-5">
          <h3 className="max-w-xl font-display text-2xl font-semibold leading-tight text-white line-clamp-2 sm:text-3xl">
            {item.title}
          </h3>
          <div className="hidden rounded-2xl border border-white/15 bg-white/12 px-4 py-3 text-right text-white/88 shadow-lg backdrop-blur-md sm:block">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/60">{publishedLabel}</p>
            <p className="mt-1 text-sm font-semibold">{formatDate(item.publishedAt || item.createdAt, language)}</p>
          </div>
        </div>
      </div>
      <div className="p-5 sm:p-7">
        <div className="mb-4 flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand-secondary/60 sm:hidden">
          <span>{item.category || labels.categoryFallback}</span>
          <span>{formatDate(item.publishedAt || item.createdAt, language)}</span>
        </div>
        <p className="text-sm leading-7 text-slate-600 line-clamp-3 sm:leading-8">{item.summary}</p>
        <Link
          to={`/news/${item.slug}`}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand-primary/12 bg-brand-canvas px-4 py-3 text-sm font-semibold text-brand-primary transition-all duration-300 group-hover:gap-3 group-hover:border-brand-gold/40 group-hover:bg-white group-hover:text-brand-secondary"
        >
          {labels.learnMore}
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
