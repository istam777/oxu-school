import { useEffect, useMemo, useState } from "react";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import PageHero from "../../components/common/PageHero";
import SectionTitle from "../../components/common/SectionTitle";
import NewsCard from "../../components/ui/NewsCard";
import { useLanguage } from "../../context/LanguageContext";
import { globalContent } from "../../data/siteContent";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { publicService } from "../../services/publicService";
import { localizeNewsItem } from "../../utils/cmsLocalization";

export default function NewsPage() {
  useDocumentTitle({ uz: "Yangiliklar", en: "News", ru: "Новости" });
  const { pick, language } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);

  useEffect(() => {
    publicService
      .getNews(0, 12)
      .then((response) => setNews(response.content))
      .finally(() => setLoading(false));
  }, []);

  const localizedNews = useMemo(() => news.map((item) => localizeNewsItem(item, language)), [language, news]);

  return (
    <>
      <PageHero
        title={pick({ uz: "Yangiliklar", en: "News", ru: "Новости" })}
        description={pick({ uz: "Maktabimizdagi eng muhim yangiliklar va tashabbuslar.", en: "Latest updates and stories from school life.", ru: "Последние новости и истории из жизни школы." })}
      />
      <section className="section-space">
        <div className="container-shell">
          <SectionTitle
            eyebrow={pick({ uz: "Yangilanishlar", en: "Updates", ru: "Обновления" })}
            title={pick({ uz: "So'nggi e'lon va voqealar", en: "Recent announcements and stories", ru: "Последние объявления и истории" })}
            description={pick({ uz: "Akademik yutuqlar, kampus yangiliklari va hamjamiyat tadbirlari.", en: "Academic achievements, campus news, and community highlights.", ru: "Академические достижения, новости кампуса и события сообщества." })}
          />
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
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
          )}
        </div>
      </section>
    </>
  );
}

