import { useLanguage } from "../../context/LanguageContext";

export default function PageHero({ title, description }) {
  const { pick } = useLanguage();

  return (
    <section className="relative overflow-hidden border-b border-brand-primary/10 bg-brand-primary py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(216,181,106,0.24),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.12),transparent_32%)]" />
      <div className="container-shell relative">
        <div className="max-w-4xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-white/65">
            {pick({
              uz: "OSIYO XALQARO MAKTABI",
              en: "OSIYO INTERNATIONAL SCHOOL",
              ru: "МЕЖДУНАРОДНАЯ ШКОЛА OSIYO",
            })}
          </p>
          <h1 className="font-display text-5xl font-semibold leading-tight sm:text-6xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">{description}</p>
        </div>
      </div>
    </section>
  );
}
