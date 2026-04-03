import { Mail, Phone } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { resolveMediaUrl } from "../../utils/media";
import { localizeTeacherItem } from "../../utils/cmsLocalization";

export default function TeacherCard({ teacher }) {
  const { language, pick } = useLanguage();
  const localizedTeacher = localizeTeacherItem(teacher, language);

  return (
    <article className="group card-panel overflow-hidden border-slate-200/70 bg-white/95">
      <div className="relative h-[20rem] overflow-hidden bg-brand-primary sm:h-[23rem]">
        <img
          src={resolveMediaUrl(localizedTeacher.photoUrl)}
          alt={localizedTeacher.fullName}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-brand-primary/18 to-transparent" />
        <div className="absolute left-4 top-4 inline-flex rounded-full border border-white/18 bg-white/14 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md sm:left-5 sm:top-5 sm:px-4 sm:text-[11px] sm:tracking-[0.22em]">
          {pick({ uz: "Ustozlar", en: "Faculty", ru: "Преподаватели" })}
        </div>
        <div className="absolute inset-x-4 bottom-4 sm:inset-x-5 sm:bottom-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/65 sm:text-sm sm:tracking-[0.22em]">{localizedTeacher.role}</p>
          <h3 className="mt-2 font-display text-2xl font-semibold leading-tight text-white sm:text-3xl">{localizedTeacher.fullName}</h3>
        </div>
      </div>
      <div className="p-5 sm:p-7">
        <p className="text-sm leading-7 text-slate-600 line-clamp-4 sm:leading-8">{localizedTeacher.bio}</p>
        <div className="mt-5 grid gap-3 text-sm text-slate-600">
          {localizedTeacher.email && (
            <p className="flex items-center gap-3 rounded-2xl bg-brand-canvas px-4 py-3">
              <Mail className="h-4 w-4 shrink-0 text-brand-secondary" />
              <span className="min-w-0 truncate">{localizedTeacher.email}</span>
            </p>
          )}
          {localizedTeacher.phone && (
            <p className="flex items-center gap-3 rounded-2xl bg-brand-canvas px-4 py-3">
              <Phone className="h-4 w-4 shrink-0 text-brand-secondary" />
              <span>{localizedTeacher.phone}</span>
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
