import PageHero from "../../components/common/PageHero";
import SectionTitle from "../../components/common/SectionTitle";
import { studentLifeShowcaseImages } from "../../data/campusImages";
import { useLanguage } from "../../context/LanguageContext";
import { studentLifeContent } from "../../data/siteContent";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { resolveMediaUrl } from "../../utils/media";

export default function StudentLifePage() {
  useDocumentTitle({ uz: "O'quvchi hayoti", en: "Student Life", ru: "Жизнь учеников" });
  const { pick } = useLanguage();

  return (
    <>
      <PageHero title={pick(studentLifeContent.hero.title)} description={pick(studentLifeContent.hero.description)} />

      <section className="section-space">
        <div className="container-shell">
          <SectionTitle
            eyebrow={pick({ uz: "O'quvchi tajribasi", en: "Student Experience", ru: "Опыт учеников" })}
            title={pick({ uz: "Darsdan tashqari rivojlanish", en: "Beyond the Classroom", ru: "Развитие вне класса" })}
            description={pick({
              uz: "Klublar, sport, safarlar va farovonlik dasturlari o'quvchining to'liq rivojlanishiga xizmat qiladi.",
              en: "Clubs, sports, trips, and wellbeing programs enrich the whole student journey.",
              ru: "Клубы, спорт, поездки и wellbeing-программы обогащают развитие ученика.",
            })}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {studentLifeContent.pillars.map((item, index) => (
              <div key={pick(item.title)} className="card-panel overflow-hidden p-3">
                <img
                  src={resolveMediaUrl(studentLifeShowcaseImages[index % studentLifeShowcaseImages.length].imageUrl)}
                  alt={pick(item.title)}
                  className="h-52 w-full rounded-[1.5rem] object-cover"
                />
                <div className="p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-secondary/60">
                    {pick(studentLifeShowcaseImages[index % studentLifeShowcaseImages.length].title)}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-brand-primary">{pick(item.title)}</h3>
                  <p className="mt-4 text-sm leading-8 text-slate-600">{pick(item.text)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            {studentLifeShowcaseImages.map((image, index) => (
              <div
                key={image.id}
                className={`overflow-hidden rounded-[1.85rem] border border-slate-200/70 bg-white p-2 shadow-card ${
                  index === 0 ? "sm:row-span-2" : ""
                }`}
              >
                <img
                  src={resolveMediaUrl(image.imageUrl)}
                  alt={image.title}
                  className={`w-full rounded-[1.4rem] object-cover ${index === 0 ? "h-[27rem]" : "h-[12.5rem]"}`}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col justify-center">
            <SectionTitle
              eyebrow={pick({ uz: "Qo'llab-quvvatlash", en: "Wellbeing", ru: "Поддержка" })}
              title={pick({
                uz: "O'quvchi hayoti faqat dars bilan cheklanmaydi",
                en: "Student life goes beyond lessons",
                ru: "Школьная жизнь не ограничивается только уроками",
              })}
              description={pick({
                uz: "OSIYO'da musobaqa, kutubxona, safar, mentorlik va kampusdagi muloqot birgalikda o'quvchining o'ziga ishonchini kuchaytiradi.",
                en: "At OSIYO, competitions, library time, trips, mentorship, and campus relationships all strengthen student confidence.",
                ru: "В OSIYO соревнования, библиотека, поездки, наставничество и общение в кампусе вместе укрепляют уверенность ученика.",
              })}
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-card">
                <p className="font-display text-3xl font-semibold text-brand-primary">20+</p>
                <p className="mt-2 text-sm text-slate-600">{pick({ uz: "Faol klublar", en: "Active clubs", ru: "Активные клубы" })}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-card">
                <p className="font-display text-3xl font-semibold text-brand-primary">12+</p>
                <p className="mt-2 text-sm text-slate-600">{pick({ uz: "Yillik tadbirlar", en: "Annual events", ru: "Ежегодные события" })}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-card">
                <p className="font-display text-3xl font-semibold text-brand-primary">1:1</p>
                <p className="mt-2 text-sm text-slate-600">{pick({ uz: "Mentor qo'llovi", en: "Mentor support", ru: "Поддержка наставника" })}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

