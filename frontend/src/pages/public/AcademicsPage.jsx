import PageHero from "../../components/common/PageHero";
import SectionTitle from "../../components/common/SectionTitle";
import { academicsProgramImages } from "../../data/campusImages";
import { useLanguage } from "../../context/LanguageContext";
import { academicsContent } from "../../data/siteContent";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { resolveMediaUrl } from "../../utils/media";

export default function AcademicsPage() {
  useDocumentTitle({ uz: "Akademik dasturlar", en: "Academic Programs", ru: "Академические программы" });
  const { pick } = useLanguage();

  return (
    <>
      <PageHero title={pick(academicsContent.hero.title)} description={pick(academicsContent.hero.description)} />

      <section className="section-space">
        <div className="container-shell">
          <SectionTitle
            eyebrow={pick({ uz: "Dasturlar", en: "Programs", ru: "Программы" })}
            title={pick({ uz: "Bosqichma-bosqich akademik rivojlanish", en: "A Stage-by-Stage Academic Journey", ru: "Пошаговое академическое развитие" })}
            description={pick({ uz: "Har bir bosqich uchun maqsad, yondashuv va baholash tizimi aniq ishlab chiqilgan.", en: "Each level is designed with clear goals, methodology, and assessment.", ru: "Каждый уровень имеет четкие цели, методику и оценивание." })}
          />
          <div className="mt-12 space-y-6">
            {academicsContent.programs.map((program) => (
              <div key={program.key} className="card-panel overflow-hidden p-3 sm:p-4">
                <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
                  <div className="overflow-hidden rounded-[1.8rem]">
                    <img
                      src={resolveMediaUrl(academicsProgramImages[program.key])}
                      alt={pick(program.title)}
                      className="h-full min-h-[18rem] w-full object-cover"
                    />
                  </div>
                  <div className="p-4 sm:p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-secondary/60">
                      {pick({ uz: "Dastur", en: "Program", ru: "Программа" })}
                    </p>
                    <h3 className="mt-4 font-display text-4xl font-semibold text-brand-primary">{pick(program.title)}</h3>
                    <p className="mt-4 text-sm leading-8 text-slate-600">{pick(program.overview)}</p>

                    <div className="mt-6 grid gap-5 md:grid-cols-2">
                      <div className="rounded-3xl bg-brand-canvas p-5">
                        <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-secondary/70">
                          {pick({ uz: "Fanlar", en: "Subjects", ru: "Предметы" })}
                        </h4>
                        <p className="mt-3 text-sm leading-7 text-slate-600">{program.subjects.join(", ")}</p>
                      </div>
                      <div className="rounded-3xl bg-brand-canvas p-5">
                        <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-secondary/70">
                          {pick({ uz: "Yondashuv", en: "Approach", ru: "Подход" })}
                        </h4>
                        <p className="mt-3 text-sm leading-7 text-slate-600">{pick(program.approach)}</p>
                      </div>
                      <div className="rounded-3xl bg-brand-canvas p-5">
                        <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-secondary/70">
                          {pick({ uz: "Baholash", en: "Assessment", ru: "Оценивание" })}
                        </h4>
                        <p className="mt-3 text-sm leading-7 text-slate-600">{pick(program.assessment)}</p>
                      </div>
                      <div className="rounded-3xl bg-brand-canvas p-5">
                        <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-secondary/70">
                          {pick({ uz: "Qo'shimcha faoliyat", en: "Extracurricular", ru: "Внеурочная деятельность" })}
                        </h4>
                        <p className="mt-3 text-sm leading-7 text-slate-600">{pick(program.extracurricular)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
