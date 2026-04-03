import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import SectionTitle from "../../components/common/SectionTitle";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import FeatureCard from "../../components/home/FeatureCard";
import HeroSection from "../../components/home/HeroSection";
import TestimonialSlider from "../../components/home/TestimonialSlider";
import EventCard from "../../components/ui/EventCard";
import NewsCard from "../../components/ui/NewsCard";
import TeacherCard from "../../components/ui/TeacherCard";
import { useLanguage } from "../../context/LanguageContext";
import { campusImageSet, homeShowcaseImages } from "../../data/campusImages";
import { getMediaOrFallback, homepageSectionMedia } from "../../data/contentMedia";
import { globalContent, homeContent } from "../../data/siteContent";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { publicService } from "../../services/publicService";
import { localizeEventItem, localizeNewsItem } from "../../utils/cmsLocalization";
import { resolveMediaUrl } from "../../utils/media";

function getSection(sections, key) {
  return sections.find((item) => item.sectionKey === key);
}

export default function HomePage() {
  useDocumentTitle({ uz: "Bosh sahifa", en: "Home", ru: "Главная" });
  const { pick, language } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [payload, setPayload] = useState({
    sections: [],
    news: [],
    events: [],
    teachers: [],
  });

  useEffect(() => {
    Promise.all([
      publicService.getHomepageSections(),
      publicService.getNews(0, 3),
      publicService.getEvents(0, 3),
      publicService.getTeachers(),
    ])
      .then(([sections, news, events, teachers]) => {
        setPayload({
          sections,
          news: news.content,
          events: events.content,
          teachers: teachers.slice(0, 3),
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const mission = useMemo(() => getSection(payload.sections, "mission"), [payload.sections]);
  const principal = useMemo(() => getSection(payload.sections, "principal-message"), [payload.sections]);
  const admissionsBanner = useMemo(() => getSection(payload.sections, "admissions-banner"), [payload.sections]);
  const partners = useMemo(() => getSection(payload.sections, "partners"), [payload.sections]);
  const localizedNews = useMemo(() => payload.news.map((item) => localizeNewsItem(item, language)), [language, payload.news]);
  const localizedEvents = useMemo(() => payload.events.map((item) => localizeEventItem(item, language)), [language, payload.events]);

  if (loading) {
    return <LoadingSpinner label={pick({ uz: "Bosh sahifa yuklanmoqda...", en: "Loading homepage...", ru: "Загрузка главной страницы..." })} />;
  }

  return (
    <>
      <HeroSection
        eyebrow={pick(homeContent.hero.eyebrow)}
        title={pick(homeContent.hero.title)}
        subtitle={pick(homeContent.hero.subtitle)}
        stats={homeContent.hero.stats.map((item) => ({ value: item.value, label: pick(item.label) }))}
        buttons={{
          applyNow: pick(globalContent.buttons.applyNow),
          exploreAcademics: pick(globalContent.buttons.exploreAcademics),
        }}
      />

      <section className="section-space">
        <div className="container-shell grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
          <div className="card-panel overflow-hidden">
            <div className="relative h-full min-h-[20rem] overflow-hidden rounded-[1.65rem] sm:min-h-[22rem]">
              <img
                src={resolveMediaUrl(getMediaOrFallback(mission?.imageUrl, homepageSectionMedia.mission || campusImageSet.mission))}
                alt="Mission"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/68 via-brand-primary/24 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 rounded-[1.35rem] border border-white/15 bg-white/10 p-4 text-white backdrop-blur-xl sm:bottom-6 sm:left-6 sm:right-6 sm:rounded-[1.6rem] sm:p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70 sm:text-xs sm:tracking-[0.24em]">
                  {pick({ uz: "Ta'lim muhiti", en: "Learning Environment", ru: "Образовательная среда" })}
                </p>
                <p className="mt-2 max-w-lg text-base font-semibold leading-6 sm:text-lg sm:leading-8">
                  {pick({
                    uz: "Har bir bolaga ishonch, intizom va rivojlanish uchun ilhom beruvchi makon.",
                    en: "A space that gives every learner confidence, structure, and room to grow.",
                    ru: "Пространство, которое дает каждому ученику уверенность, структуру и возможности для роста.",
                  })}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <SectionTitle
              eyebrow={pick({ uz: "Missiya", en: "Mission", ru: "Миссия" })}
              title={mission ? pick({ uz: mission.titleUz, en: mission.titleEn, ru: mission.titleRu }) : pick({ uz: "Bizning missiyamiz", en: "Our mission", ru: "Наша миссия" })}
              description={mission ? pick({ uz: mission.contentUz, en: mission.contentEn, ru: mission.contentRu }) : ""}
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {homeContent.whyChooseUs.map((item) => (
                <div key={pick(item.title)} className="reveal-card rounded-3xl border border-slate-200 bg-white p-5 shadow-card sm:p-6">
                  <h3 className="text-lg font-semibold text-brand-primary">{pick(item.title)}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600 sm:leading-7">{pick(item.text)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          <div>
            <SectionTitle
              eyebrow={pick({ uz: "Kampus lahzalari", en: "Campus Moments", ru: "Моменты кампуса" })}
              title={pick({
                uz: "Har kuni ilhom beradigan maktab muhiti",
                en: "A school environment that inspires every day",
                ru: "Школьная среда, вдохновляющая каждый день",
              })}
              description={pick({
                uz: "Dars, muloqot, ijod va texnologiya uyg'unlashgan zamonaviy kampus muhitida o'quvchilar o'zini ishonch bilan namoyon etadi.",
                en: "Students thrive in a modern campus where learning, connection, creativity, and technology come together.",
                ru: "Ученики раскрываются в современном кампусе, где объединяются обучение, общение, творчество и технологии.",
              })}
            />
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {[
                { value: "1:10", label: pick({ uz: "Mentor e'tibori", en: "Mentor support", ru: "Поддержка наставника" }) },
                { value: "4", label: pick({ uz: "Til muhiti", en: "Language pathways", ru: "Языковые направления" }) },
                { value: "20+", label: pick({ uz: "Klub va loyiha", en: "Clubs & projects", ru: "Клубы и проекты" }) },
              ].map((item) => (
                <div key={item.label} className="reveal-card rounded-3xl border border-slate-200 bg-white p-5 shadow-card">
                  <p className="font-display text-3xl font-semibold text-brand-primary">{item.value}</p>
                  <p className="mt-2 text-sm font-medium text-slate-600">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {homeShowcaseImages.map((image, index) => (
              <div
                key={image.id}
                className={`group reveal-card relative overflow-hidden rounded-[1.9rem] border border-slate-200/70 bg-white p-2 shadow-card ${
                  index === 0 ? "sm:row-span-2" : ""
                }`}
              >
                <img
                  src={resolveMediaUrl(image.imageUrl)}
                  alt={pick(image.label)}
                  className={`w-full rounded-[1.45rem] object-cover transition duration-500 group-hover:scale-105 ${
                    index === 0 ? "h-[20rem] sm:h-[28rem]" : "h-[12rem] sm:h-[13.25rem]"
                  }`}
                />
                <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-brand-primary/78 px-4 py-3 text-white backdrop-blur sm:inset-x-6 sm:bottom-6">
                  <p className="text-sm font-semibold">{pick(image.label)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="container-shell">
          <SectionTitle
            eyebrow={pick({ uz: "Afzalliklar", en: "Highlights", ru: "Преимущества" })}
            title={pick({ uz: "Maktab afzalliklari", en: "School Highlights", ru: "Преимущества школы" })}
            description={pick({ uz: "OSIYO ishonch, tartib va xalqaro ta'limni uyg'unlashtiradi.", en: "OSIYO brings together trust, structure, and global education.", ru: "OSIYO объединяет доверие, порядок и глобальное образование." })}
            align="center"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {homeContent.features.map((item) => (
              <FeatureCard key={pick(item.title)} title={pick(item.title)} text={pick(item.text)} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell grid gap-8 rounded-[2rem] bg-brand-primary p-6 text-white shadow-soft sm:p-8 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionTitle
            eyebrow={pick({ uz: "Rahbariyat", en: "Leadership", ru: "Руководство" })}
            title={principal ? pick({ uz: principal.titleUz, en: principal.titleEn, ru: principal.titleRu }) : pick({ uz: "Direktor murojaati", en: "Principal message", ru: "Обращение директора" })}
            description={principal ? pick({ uz: principal.contentUz, en: principal.contentEn, ru: principal.contentRu }) : ""}
            tone="light"
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {homeContent.programs.map((item) => (
              <div key={pick(item.title)} className="reveal-card rounded-3xl border border-white/10 bg-white/10 p-5 sm:p-6">
                <h3 className="text-xl font-semibold">{pick(item.title)}</h3>
                <p className="mt-3 text-sm leading-7 text-white/80">{pick(item.text)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="container-shell grid gap-8 lg:grid-cols-2">
          <div>
            <SectionTitle
              eyebrow={pick({ uz: "Yangiliklar", en: "News", ru: "Новости" })}
              title={pick({ uz: "So'nggi yangiliklar", en: "Latest News", ru: "Последние новости" })}
              description={pick({ uz: "Maktab hayoti, yutuqlar va tashabbuslar.", en: "School life, achievements, and initiatives.", ru: "Школьная жизнь, достижения и инициативы." })}
            />
            <div className="mt-8 space-y-6">
              {localizedNews.map((item) => (
                <NewsCard
                  key={item.id}
                  item={item}
                  language={language}
                  labels={{
                    learnMore: pick(globalContent.buttons.learnMore),
                    categoryFallback: pick({ uz: "Yangilik", en: "News", ru: "Новость" }),
                  }}
                />
              ))}
            </div>
          </div>
          <div>
            <SectionTitle
              eyebrow={pick({ uz: "Tadbirlar", en: "Events", ru: "События" })}
              title={pick({ uz: "Yaqin tadbirlar", en: "Upcoming Events", ru: "Ближайшие события" })}
              description={pick({ uz: "Hamjamiyat va akademik faoliyatni boyituvchi tadbirlar.", en: "Events enriching the academic and community experience.", ru: "События, обогащающие академическую и общественную жизнь." })}
            />
            <div className="mt-8 space-y-6">
              {localizedEvents.map((item) => (
                <EventCard key={item.id} item={item} language={language} labels={{ learnMore: pick(globalContent.buttons.learnMore) }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <SectionTitle
              eyebrow={pick({ uz: "Jamoa", en: "Faculty", ru: "Команда" })}
              title={pick({ uz: "Ustozlar va maktab hayoti", en: "Faculty and Student Life", ru: "Преподаватели и школьная жизнь" })}
              description={pick({ uz: "Professional jamoa va faol maktab muhiti.", en: "A professional team and active school culture.", ru: "Профессиональная команда и активная школьная культура." })}
            />
            <Link to="/student-life" className="button-secondary">
              {pick(globalContent.buttons.viewAll)}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {payload.teachers.map((teacher) => (
              <TeacherCard key={teacher.id} teacher={teacher} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="container-shell">
          <SectionTitle
            eyebrow={pick({ uz: "Fikrlar", en: "Testimonials", ru: "Отзывы" })}
            title={pick({ uz: "Ota-onalar fikri", en: "What Parents Say", ru: "Отзывы родителей" })}
            description={pick({ uz: "Ishonch, sifat va iliqlik haqidagi fikrlar.", en: "Feedback about trust, quality, and warmth.", ru: "Отзывы о доверии, качестве и заботе." })}
            align="center"
          />
          <div className="mt-12">
            <TestimonialSlider testimonials={homeContent.testimonials} language={language} pick={pick} />
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell grid gap-8 rounded-[2rem] bg-brand-gradient p-6 text-white shadow-soft sm:p-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/65 sm:text-sm sm:tracking-[0.24em]">
              {pick({ uz: "Qabul", en: "Admissions", ru: "Поступление" })}
            </p>
            <h2 className="mt-4 font-display text-[2.2rem] font-semibold sm:text-5xl">
              {admissionsBanner ? pick({ uz: admissionsBanner.titleUz, en: admissionsBanner.titleEn, ru: admissionsBanner.titleRu }) : pick({ uz: "Qabul ochiq", en: "Admissions open", ru: "Прием открыт" })}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 sm:leading-8">
              {admissionsBanner ? pick({ uz: admissionsBanner.contentUz, en: admissionsBanner.contentEn, ru: admissionsBanner.contentRu }) : ""}
            </p>
            <Link to="/admissions" className="button-primary-light mt-8 w-full justify-center sm:w-auto">
              {pick(globalContent.buttons.applyNow)}
            </Link>
          </div>
          <div className="card-panel overflow-hidden border-white/10 bg-white/10 backdrop-blur">
            <img
              src={resolveMediaUrl(getMediaOrFallback(admissionsBanner?.imageUrl, homepageSectionMedia["admissions-banner"] || campusImageSet.admissions))}
              alt="Admissions"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell grid gap-8 lg:grid-cols-[1fr_1fr]">
          <SectionTitle
            eyebrow={pick({ uz: "Hamkorlar", en: "Partners", ru: "Партнеры" })}
            title={partners ? pick({ uz: partners.titleUz, en: partners.titleEn, ru: partners.titleRu }) : pick({ uz: "Hamkorlar", en: "Partners", ru: "Партнеры" })}
            description={partners ? pick({ uz: partners.contentUz, en: partners.contentEn, ru: partners.contentRu }) : ""}
          />
          <div className="card-panel overflow-hidden">
            <img
              src={resolveMediaUrl(getMediaOrFallback(partners?.imageUrl, homepageSectionMedia.partners || campusImageSet.partners))}
              alt="Partners"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}

