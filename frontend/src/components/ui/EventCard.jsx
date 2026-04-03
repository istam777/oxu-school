import { CalendarDays, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate, formatMonthShort, formatTime, formatDayOfMonth } from "../../utils/formatters";
import { resolveMediaUrl } from "../../utils/media";

export default function EventCard({ item, language, labels }) {
  return (
    <article className="group card-panel overflow-hidden border-slate-200/70 bg-white/95">
      <div className="relative h-56 overflow-hidden bg-brand-surface sm:h-64">
        <img
          src={resolveMediaUrl(item.featuredImage)}
          alt={item.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/90 via-brand-primary/42 to-transparent" />
        <div className="absolute left-4 top-4 flex h-20 w-20 flex-col items-center justify-center rounded-[1.4rem] border border-white/16 bg-white/94 text-brand-primary shadow-xl sm:left-5 sm:top-5 sm:h-24 sm:w-24 sm:rounded-[1.7rem]">
          <span className="font-display text-3xl font-semibold leading-none sm:text-4xl">{formatDayOfMonth(item.eventDate)}</span>
          <span className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-secondary sm:text-sm sm:tracking-[0.24em]">
            {formatMonthShort(item.eventDate, language)}
          </span>
        </div>
        <div className="absolute inset-x-4 bottom-4 sm:inset-x-5 sm:bottom-5">
          <div className="inline-flex rounded-full border border-white/18 bg-white/14 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md sm:px-4 sm:text-[11px] sm:tracking-[0.22em]">
            {item.category}
          </div>
          <h3 className="mt-4 max-w-xl font-display text-2xl font-semibold leading-tight text-white line-clamp-2 sm:text-3xl">{item.title}</h3>
        </div>
      </div>
      <div className="p-5 sm:p-7">
        <p className="text-sm leading-7 text-slate-600 line-clamp-3 sm:leading-8">{item.summary}</p>
        <div className="mt-5 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-2xl bg-brand-canvas px-4 py-3">
            <CalendarDays className="h-4 w-4 shrink-0 text-brand-secondary" />
            <span className="min-w-0">
              {formatDate(item.eventDate, language)}
              {item.startTime && ` - ${formatTime(item.startTime, language)}`}
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-brand-canvas px-4 py-3">
            <MapPin className="h-4 w-4 shrink-0 text-brand-secondary" />
            <span className="min-w-0 truncate">{item.location}</span>
          </div>
        </div>
        <Link
          to={`/events/${item.slug}`}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand-primary/12 bg-brand-canvas px-4 py-3 text-sm font-semibold text-brand-primary transition-all duration-300 group-hover:gap-3 group-hover:border-brand-gold/40 group-hover:bg-white group-hover:text-brand-secondary"
        >
          {labels.learnMore}
        </Link>
      </div>
    </article>
  );
}
