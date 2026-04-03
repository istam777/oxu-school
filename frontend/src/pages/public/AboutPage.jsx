import { useEffect, useState } from "react";
import PageHero from "../../components/common/PageHero";
import SectionTitle from "../../components/common/SectionTitle";
import TeacherCard from "../../components/ui/TeacherCard";
import { aboutShowcaseImages } from "../../data/campusImages";
import { useLanguage } from "../../context/LanguageContext";
import { aboutContent } from "../../data/siteContent";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { publicService } from "../../services/publicService";
import { resolveMediaUrl } from "../../utils/media";

export default function AboutPage() {
  useDocumentTitle({ uz: "Biz haqimizda", en: "About Us", ru: "О нас" });
  const { pick } = useLanguage();
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    publicService.getTeachers().then((items) => setTeachers(items.slice(0, 4))).catch(() => setTeachers([]));
  }, []);

  return (
    <>
      <PageHero title={pick(aboutContent.hero.title)} description={pick(aboutContent.hero.description)} />

      <section className="section-space">
        <div className="container-shell grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white p-2 shadow-card">
            <img
              src={resolveMediaUrl(aboutShowcaseImages.main)}
              alt="OSIYO school life"
              className="h-[31rem] w-full rounded-[1.6rem] object-cover"
            />
          </div>

          <div className="grid gap-6">
            <div className="card-panel p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-secondary/60">
                {pick({ uz: "Maktab hikoyasi", en: "School Story", ru: "История школы" })}
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold text-brand-primary">
                {pick({
                  uz: "Ishonch, tarbiya va zamonaviy qarashni birlashtirgan maktab",
                  en: "A school built on trust, character, and modern ambition",
                  ru: "Школа, объединяющая доверие, воспитание и современное мышление",
                })}
              </h2>
              <p className="mt-5 text-sm leading-8 text-slate-600">
                {pick({
                  uz: "OSIYO Xalqaro Maktabi akademik kuch bilan birga o'quvchining o'ziga ishonchini, muloqotini va xalqaro tayyorgarligini shakllantirishni ustuvor deb biladi.",
                  en: "OSIYO International School prioritizes not only strong academics, but also confidence, communication, and global readiness.",
                  ru: "OSIYO International School делает акцент не только на сильной академической базе, но и на уверенности, коммуникации и глобальной готовности.",
                })}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="overflow-hidden rounded-[1.8rem] border border-slate-200/70 bg-white p-2 shadow-card">
                <img
                  src={resolveMediaUrl(aboutShowcaseImages.top)}
                  alt="OSIYO classroom collaboration"
                  className="h-56 w-full rounded-[1.35rem] object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-[1.8rem] border border-slate-200/70 bg-white p-2 shadow-card">
                <img
                  src={resolveMediaUrl(aboutShowcaseImages.bottom)}
                  alt="OSIYO learner portrait"
                  className="h-56 w-full rounded-[1.35rem] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell grid gap-6 lg:grid-cols-3">
          {aboutContent.cards.map((item) => (
            <div key={pick(item.title)} className="card-panel p-8">
              <h3 className="text-2xl font-semibold text-brand-primary">{pick(item.title)}</h3>
              <p className="mt-4 text-sm leading-8 text-slate-600">{pick(item.text)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="container-shell grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionTitle
              eyebrow={pick({ uz: "Qadriyatlar", en: "Values", ru: "Ценности" })}
              title={pick({ uz: "Asosiy qadriyatlarimiz", en: "Our Core Values", ru: "Наши ценности" })}
              description={pick({
                uz: "Hurmat, intizom va mas'uliyat maktab madaniyatimizning negizidir.",
                en: "Respect, discipline, and responsibility shape our culture.",
                ru: "Уважение, дисциплина и ответственность формируют нашу культуру.",
              })}
            />
            <div className="mt-8 flex flex-wrap gap-3">
              {aboutContent.values.map((value) => (
                <span key={pick(value)} className="rounded-full bg-brand-surface px-5 py-3 text-sm font-semibold text-brand-primary">
                  {pick(value)}
                </span>
              ))}
            </div>
          </div>
          <div className="card-panel p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-secondary/60">
              {pick({ uz: "Ta'lim falsafasi", en: "Teaching Philosophy", ru: "Философия обучения" })}
            </p>
            <h3 className="mt-4 font-display text-4xl font-semibold text-brand-primary">
              {pick({ uz: "Bilim va tarbiyaning uyg'un modeli", en: "A balanced model of knowledge and character", ru: "Баланс знаний и воспитания" })}
            </h3>
            <p className="mt-5 text-sm leading-8 text-slate-600">
              {pick({
                uz: "OSIYO'da o'quvchi nafaqat fanlarni o'zlashtiradi, balki mustaqil fikrlash, muloqot, yetakchilik va jamoada ishlash ko'nikmalarini ham rivojlantiradi.",
                en: "At OSIYO, students grow not only academically, but also in communication, leadership, and collaboration.",
                ru: "В OSIYO ученики развиваются не только академически, но и в коммуникации, лидерстве и сотрудничестве.",
              })}
            </p>
            <p className="mt-4 text-sm leading-8 text-slate-600">
              {pick({
                uz: "Shuning uchun ota-onalar maktabimizni ishonchli, iliq va yuqori standartli ta'lim muhiti sifatida tanlaydi.",
                en: "Families choose the school for its trust, warmth, and high standards.",
                ru: "Семьи выбирают школу за доверие, тепло и высокие стандарты.",
              })}
            </p>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <SectionTitle
            eyebrow={pick({ uz: "Rahbariyat", en: "Leadership", ru: "Руководство" })}
            title={pick({ uz: "Rahbariyat va ustozlar", en: "Leadership & Faculty", ru: "Руководство и преподаватели" })}
            description={pick({ uz: "Tajriba va mehrni uyg'unlashtirgan jamoa.", en: "A team that combines experience with care.", ru: "Команда, объединяющая опыт и заботу." })}
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-4">
            {teachers.map((teacher) => (
              <TeacherCard key={teacher.id} teacher={teacher} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

