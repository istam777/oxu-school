import { useEffect, useMemo, useState } from "react";
import EmptyState from "../../components/common/EmptyState";
import FAQAccordion from "../../components/ui/FAQAccordion";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import PageHero from "../../components/common/PageHero";
import { useLanguage } from "../../context/LanguageContext";
import { faqPageContent } from "../../data/siteContent";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { publicService } from "../../services/publicService";
import { localizeFaqItem } from "../../utils/cmsLocalization";

export default function FAQPage() {
  useDocumentTitle({ uz: "Ko'p so'raladigan savollar", en: "FAQ", ru: "FAQ" });
  const { pick, language } = useLanguage();
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    publicService.getFaqs().then(setFaqs).finally(() => setLoading(false));
  }, []);

  const localizedFaqs = useMemo(() => faqs.map((item) => localizeFaqItem(item, language)), [faqs, language]);

  const filtered = useMemo(() => {
    return localizedFaqs.filter((item) => `${item.question} ${item.answer}`.toLowerCase().includes(query.toLowerCase()));
  }, [localizedFaqs, query]);

  return (
    <>
      <PageHero title={pick(faqPageContent.hero.title)} description={pick(faqPageContent.hero.description)} />
      <section className="section-space">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="card-panel p-7 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-secondary/60">
              {pick({ uz: "Savollar", en: "FAQ", ru: "FAQ" })}
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold text-brand-primary">
              {pick({
                uz: "Savollaringizga tezkor javob toping",
                en: "Find answers quickly",
                ru: "Быстро найдите ответы",
              })}
            </h2>
            <p className="mt-5 text-sm leading-8 text-slate-600">
              {pick({
                uz: "Qabul, akademik dasturlar va maktab hayotiga oid eng ko'p beriladigan savollar shu yerda jamlangan.",
                en: "Browse the most common questions about admissions, academics, and school life.",
                ru: "Здесь собраны самые частые вопросы о поступлении, учебе и школьной жизни.",
              })}
            </p>
            <div className="mt-8 rounded-[1.75rem] bg-brand-canvas p-4">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="input-field border-transparent bg-white"
                placeholder={pick({ uz: "Savol bo'yicha qidirish...", en: "Search questions...", ru: "Поиск по вопросам..." })}
              />
            </div>
          </div>
          <div className="min-w-0">
            {loading ? (
              <LoadingSpinner />
            ) : filtered.length ? (
              <FAQAccordion items={filtered} />
            ) : (
              <EmptyState
                title={pick({ uz: "Savol topilmadi", en: "No questions found", ru: "Вопросы не найдены" })}
                description={pick({
                  uz: "Qidiruv so'rovingizni o'zgartirib ko'ring yoki keyinroq qayta urinib ko'ring.",
                  en: "Try a different search term or check back later.",
                  ru: "Попробуйте другой запрос или повторите попытку позже.",
                })}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
