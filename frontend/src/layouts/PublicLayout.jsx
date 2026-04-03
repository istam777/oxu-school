import { Outlet, useLocation, useOutletContext } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { useLanguage } from "../context/LanguageContext";
import { publicService } from "../services/publicService";
import { localizeSettingEntry } from "../utils/cmsLocalization";

export default function PublicLayout() {
  const { language } = useLanguage();
  const location = useLocation();
  const mainRef = useRef(null);
  const [settings, setSettings] = useState([]);

  useEffect(() => {
    publicService.getPublicSettings().then(setSettings).catch(() => setSettings([]));
  }, []);

  const localizedSettings = useMemo(
    () => settings.map((item) => localizeSettingEntry(item, language)),
    [language, settings]
  );

  useEffect(() => {
    const root = mainRef.current;
    if (!root) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let revealIndex = 0;
    const revealTimers = new Set();

    const intersectionObserver = reduceMotion
      ? null
      : new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("reveal-visible");
                intersectionObserver.unobserve(entry.target);
              }
            });
          },
          {
            threshold: 0.08,
            rootMargin: "0px 0px -5% 0px",
          }
        );

    const registerCards = () => {
      const cards = root.querySelectorAll(".card-panel:not([data-reveal-static='true']), .reveal-card:not([data-reveal-static='true'])");

      cards.forEach((card) => {
        if (card.dataset.revealBound === "true") return;

        card.dataset.revealBound = "true";
        card.style.setProperty("--reveal-delay", `${50 + Math.min((revealIndex % 8) * 40, 240)}ms`);
        revealIndex += 1;

        if (reduceMotion) {
          card.classList.add("reveal-visible");
        } else {
          const timerId = window.setTimeout(() => {
            revealTimers.delete(timerId);
            intersectionObserver.observe(card);
          }, 40);

          revealTimers.add(timerId);
        }
      });
    };

    registerCards();

    const mutationObserver = new MutationObserver(() => {
      registerCards();
    });

    mutationObserver.observe(root, {
      childList: true,
      subtree: true,
    });

    return () => {
      mutationObserver.disconnect();
      intersectionObserver?.disconnect();
      revealTimers.forEach((timerId) => window.clearTimeout(timerId));
      revealTimers.clear();
      root.querySelectorAll(".card-panel, .reveal-card").forEach((card) => {
        card.classList.remove("reveal-visible");
        card.removeAttribute("data-reveal-bound");
        card.style.removeProperty("--reveal-delay");
      });
    };
  }, [location.pathname]);

  return (
    <div className="site-background cards-reveal-active min-h-screen">
      <Header settings={localizedSettings} />
      <main ref={mainRef}>
        <Outlet context={{ settings: localizedSettings }} />
      </main>
      <Footer settings={localizedSettings} />
    </div>
  );
}

export function usePublicLayoutContext() {
  return useOutletContext();
}
