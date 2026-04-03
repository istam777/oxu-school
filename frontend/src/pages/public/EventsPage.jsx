import { useEffect, useMemo, useState } from "react";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import PageHero from "../../components/common/PageHero";
import SectionTitle from "../../components/common/SectionTitle";
import EventCard from "../../components/ui/EventCard";
import { useLanguage } from "../../context/LanguageContext";
import { globalContent } from "../../data/siteContent";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { publicService } from "../../services/publicService";
import { localizeEventItem } from "../../utils/cmsLocalization";

export default function EventsPage() {
  useDocumentTitle({ uz: "Tadbirlar", en: "Events", ru: "События" });
  const { pick, language } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    publicService
      .getEvents(0, 12)
      .then((response) => setEvents(response.content))
      .finally(() => setLoading(false));
  }, []);

  const localizedEvents = useMemo(() => events.map((item) => localizeEventItem(item, language)), [events, language]);

  return (
    <>
      <PageHero
        title={pick({ uz: "Tadbirlar", en: "Events", ru: "События" })}
        description={pick({ uz: "OSIYO hamjamiyati uchun rejalashtirilgan yaqin tadbirlar.", en: "Upcoming events planned for the OSIYO community.", ru: "Ближайшие события для сообщества OSIYO." })}
      />
      <section className="section-space">
        <div className="container-shell">
          <SectionTitle
            eyebrow={pick({ uz: "Taqvim", en: "Calendar", ru: "Календарь" })}
            title={pick({ uz: "Maktab taqvimi", en: "School Calendar", ru: "Школьный календарь" })}
            description={pick({ uz: "Qabul, san’at, akademik va community tadbirlari.", en: "Admissions, arts, academic, and community events.", ru: "События по приему, искусству, академике и сообществу." })}
          />
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {localizedEvents.map((item) => (
                <EventCard key={item.id} item={item} language={language} labels={{ learnMore: pick(globalContent.buttons.learnMore) }} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
