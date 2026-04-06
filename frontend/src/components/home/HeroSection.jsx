import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { campusImageSet } from "../../data/campusImages";
import { useLanguage } from "../../context/LanguageContext";
import { resolveMediaUrl } from "../../utils/media";
import SchoolLogo from "../layout/SchoolLogo";

export default function HeroSection({ eyebrow, title, subtitle, stats, buttons }) {
  const { pick } = useLanguage();
  const trustPoints = [
    {
      uz: "Xalqaro akademik muhit",
      en: "International academic environment",
      ru: "Международная академическая среда",
    },
    {
      uz: "Malakali pedagoglar jamoasi",
      en: "Highly qualified teaching team",
      ru: "Команда квалифицированных педагогов",
    },
    {
      uz: "Xavfsiz va tartibli kampus",
      en: "Safe and well-structured campus",
      ru: "Безопасный и организованный кампус",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-brand-primary pb-14 pt-10 text-white sm:pb-24 sm:pt-12 lg:pb-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(216,181,106,0.22),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.14),transparent_32%)]" />
      <div className="container-shell relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs backdrop-blur sm:mb-8 sm:text-sm">
              <SchoolLogo compact light size="xs" animated trailingText={eyebrow} />
            </div>

            <h1 className="font-display text-[2.7rem] font-semibold leading-[1.04] sm:text-6xl lg:max-w-5xl lg:text-7xl">
              {title}
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-7 text-white/80 sm:mt-6 sm:text-lg sm:leading-8">{subtitle}</p>

            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
              <Link to="/admissions" className="button-primary-light w-full justify-center sm:w-auto">
                {buttons.applyNow}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link to="/academics" className="button-ghost-light w-full justify-center sm:w-auto">
                {buttons.exploreAcademics}
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:mt-12 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((item) => (
                <div key={item.label} className="reveal-card rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur sm:p-5">
                  <p className="font-display text-3xl font-semibold text-white sm:text-4xl">{item.value}</p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.12em] text-white/70 sm:text-sm sm:tracking-[0.16em]">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-10 top-0 h-40 w-40 rounded-full bg-brand-gold/20 blur-3xl" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.08fr_0.92fr]">
              <div className="reveal-card relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/10 p-2 shadow-soft backdrop-blur sm:row-span-2 lg:row-span-1">
                <img
                  src={resolveMediaUrl(campusImageSet.heroMain)}
                  alt="OSIYO campus students"
                  className="h-[21rem] w-full rounded-[1.6rem] object-cover sm:h-[26rem] lg:h-[530px]"
                />
                <div className="absolute inset-x-4 bottom-4 rounded-[1.5rem] border border-white/10 bg-brand-primary/75 p-4 backdrop-blur-xl sm:inset-x-6 sm:bottom-6 sm:rounded-[1.75rem] sm:p-5">
                  <div className="flex items-start gap-3">
                    <SchoolLogo compact light size="sm" />
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60 sm:text-xs sm:tracking-[0.24em]">
                        {pick({
                          uz: "Nufuzli maktab tajribasi",
                          en: "Premium school experience",
                          ru: "Премиальный школьный опыт",
                        })}
                      </p>
                      <p className="mt-1 text-base font-semibold leading-6 text-white sm:text-lg">
                        {pick({
                          uz: "Global qarash, intizomli madaniyat va iliq muhit",
                          en: "Global outlook, disciplined culture, and a warm environment",
                          ru: "Глобальный взгляд, дисциплинированная культура и теплая среда",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid content-start gap-4 sm:col-span-1 sm:grid-cols-1 lg:grid-cols-1">
                <div className="reveal-card overflow-hidden rounded-[1.8rem] border border-white/12 bg-white/10 p-2 shadow-soft backdrop-blur">
                  <img
                    src={resolveMediaUrl(campusImageSet.heroTop)}
                    alt="Interactive classroom"
                    className="h-48 w-full rounded-[1.4rem] object-cover sm:h-56"
                  />
                </div>

                <div className="reveal-card overflow-hidden rounded-[1.8rem] border border-white/12 bg-white/10 p-2 shadow-soft backdrop-blur">
                  <img
                    src={resolveMediaUrl(campusImageSet.heroBottom)}
                    alt="Happy learner"
                    className="h-44 w-full rounded-[1.4rem] object-cover sm:h-48"
                  />
                </div>

                <div className="reveal-card rounded-[1.8rem] border border-white/12 bg-white px-5 py-5 text-brand-primary shadow-soft sm:px-6 sm:py-6">
                  <div className="flex items-start gap-3">
                    <SchoolLogo compact size="sm" />
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-secondary/60 sm:text-xs sm:tracking-[0.24em]">
                        {pick({
                          uz: "Nega oilalar bizni tanlaydi",
                          en: "Why families choose us",
                          ru: "Почему семьи выбирают нас",
                        })}
                      </p>
                      <p className="mt-1 text-sm font-semibold leading-6 sm:text-base">
                        {pick({
                          uz: "Akademik kuch va ko'rinadigan o'quvchi ishonchi",
                          en: "Academic strength with visible student confidence",
                          ru: "Академическая сила и заметная уверенность учеников",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3">
                    {trustPoints.map((point) => (
                      <div key={pick(point)} className="flex items-start gap-3 rounded-2xl bg-brand-surface px-4 py-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-secondary" />
                        <span className="text-sm font-medium leading-6 text-slate-700">{pick(point)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
