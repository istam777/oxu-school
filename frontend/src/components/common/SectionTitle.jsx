export default function SectionTitle({ eyebrow, title, description, align = "left", tone = "dark" }) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  const eyebrowClass = tone === "light" ? "text-white/65" : "text-brand-secondary/70";
  const titleClass = tone === "light" ? "text-white" : "text-brand-primary";
  const descriptionClass = tone === "light" ? "text-white/78" : "text-slate-600";

  return (
    <div className={`max-w-3xl ${alignment}`}>
      {eyebrow && (
        <p className={`mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] sm:text-sm sm:tracking-[0.24em] ${eyebrowClass}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`font-display text-[2.2rem] font-semibold leading-tight sm:text-5xl ${titleClass}`}>
        {title}
      </h2>
      {description && <p className={`mt-4 text-[0.98rem] leading-7 sm:mt-5 sm:text-lg sm:leading-8 ${descriptionClass}`}>{description}</p>}
    </div>
  );
}
