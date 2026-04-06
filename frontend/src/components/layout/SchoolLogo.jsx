import { useLanguage } from "../../context/LanguageContext";

const sizeMap = {
  xs: "h-12 w-12 sm:h-14 sm:w-14",
  sm: "h-16 w-16 sm:h-20 sm:w-20",
  md: "h-20 w-20 sm:h-24 sm:w-24",
  lg: "h-24 w-24 sm:h-28 sm:w-28",
};

export default function SchoolLogo({ compact = false, light = false, size = "md" }) {
  const { pick } = useLanguage();
  const logoSize = sizeMap[size] || sizeMap.md;

  return (
    <div className={`brand-logo flex items-center gap-3 sm:gap-4 ${light ? "is-light" : ""}`}>
      <div className={`brand-logo-mark relative ${logoSize} shrink-0`}>
        <span className="brand-logo-aura" aria-hidden="true" />
        <span className="brand-logo-ring" aria-hidden="true" />
        <img
          src="/logo_circle_centered_v4.png"
          alt={pick({
            uz: "OSIYO XALQARO MAKTABI logotipi",
            en: "OSIYO INTERNATIONAL SCHOOL logo",
            ru: "Логотип школы OSIYO",
          })}
          className="brand-logo-image h-full w-full scale-[1.12] object-contain object-center"
        />
      </div>

      {!compact && (
        <div className="brand-logo-wordmark">
          <p className={`font-display text-xl font-semibold tracking-wide sm:text-2xl ${light ? "text-white" : "text-brand-primary"}`}>
            OSIYO
          </p>
          <p
            className={`-mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] sm:text-[11px] sm:tracking-[0.22em] ${
              light ? "text-white/60" : "text-brand-secondary/70"
            }`}
          >
            {pick({
              uz: "Xalqaro maktabi",
              en: "International School",
              ru: "Международная школа",
            })}
          </p>
        </div>
      )}
    </div>
  );
}
