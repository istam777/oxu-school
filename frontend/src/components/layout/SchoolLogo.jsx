import { useLayoutEffect, useRef, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

const sizeMap = {
  xs: "h-12 w-12 sm:h-14 sm:w-14",
  sm: "h-16 w-16 sm:h-20 sm:w-20",
  md: "h-20 w-20 sm:h-24 sm:w-24",
  lg: "h-24 w-24 sm:h-28 sm:w-28",
};

export default function SchoolLogo({ compact = false, light = false, size = "md", animated = false }) {
  const { pick, language } = useLanguage();
  const logoSize = sizeMap[size] || sizeMap.md;
  const wordmarkRef = useRef(null);
  const [rollDistance, setRollDistance] = useState(null);

  const subtitle = pick({
    uz: "Xalqaro maktabi",
    en: "International School",
    ru: "Международная школа",
  });

  useLayoutEffect(() => {
    if (!animated || compact || !wordmarkRef.current) return undefined;

    const updateDistance = () => {
      const gap = window.innerWidth >= 640 ? 16 : 12;
      setRollDistance(wordmarkRef.current.offsetWidth + gap);
    };

    updateDistance();
    window.addEventListener("resize", updateDistance);

    return () => {
      window.removeEventListener("resize", updateDistance);
    };
  }, [animated, compact, language, size, subtitle]);

  return (
    <div
      className={`brand-logo flex items-center gap-3 sm:gap-4 ${light ? "is-light" : ""} ${animated ? "is-animated" : ""}`}
      style={rollDistance ? { "--logo-roll-distance": `${rollDistance}px` } : undefined}
    >
      <div className={`brand-logo-mark relative ${logoSize} shrink-0`}>
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
        <div ref={wordmarkRef} className="brand-logo-wordmark overflow-hidden">
          <p className={`brand-logo-title font-display text-xl font-semibold tracking-wide sm:text-2xl ${light ? "text-white" : "text-brand-primary"}`}>
            OSIYO
          </p>
          <p
            className={`brand-logo-subtitle -mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] sm:text-[11px] sm:tracking-[0.22em] ${
              light ? "text-white/60" : "text-brand-secondary/70"
            }`}
          >
            {subtitle}
          </p>
        </div>
      )}
    </div>
  );
}
