import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { globalContent, menuItems } from "../../data/siteContent";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import SchoolLogo from "./SchoolLogo";

function buildSettingsMap(settings = []) {
  return settings.reduce((acc, item) => {
    acc[item.settingKey] = item.settingValue;
    return acc;
  }, {});
}

function ThemeToggle({ isDark, onToggle, label }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`theme-toggle-button ${isDark ? "is-dark" : ""}`}
      aria-label={label}
      title={label}
    >
      <span className="theme-toggle-option sun">
        <Sun className="h-[0.85rem] w-[0.85rem]" />
      </span>
      <span className="theme-toggle-option moon">
        <Moon className="h-[0.85rem] w-[0.85rem]" />
      </span>
      <span className="sr-only">{label}</span>
    </button>
  );
}

export default function Header({ settings }) {
  const { language, setLanguage, pick } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const settingsMap = useMemo(() => buildSettingsMap(settings), [settings]);

  const announcementText =
    settingsMap.announcement_text ||
    pick({
      uz: "2026-2027 o'quv yili uchun qabul davom etmoqda. Onlayn ariza topshirish ochiq.",
      en: "Admissions for the 2026-2027 academic year are now open. Online applications are available.",
      ru: "Прием на 2026-2027 учебный год продолжается. Онлайн-заявка уже открыта.",
    });

  const themeToggleLabel = pick({
    uz: isDark ? "Yorug' rejimga o'tish" : "Qorong'i rejimga o'tish",
    en: isDark ? "Switch to light mode" : "Switch to dark mode",
    ru: isDark ? "Переключить на светлый режим" : "Переключить на тёмный режим",
  });

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = mobileOpen ? "hidden" : previousOverflow;

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  return (
    <>
      <div className="bg-brand-primary px-4 py-2 text-sm text-white">
        <div className="container-shell flex min-h-[2.75rem] items-center justify-between gap-3">
          <span className="max-w-[calc(100%-4.75rem)] text-left text-[12px] font-medium leading-5 sm:max-w-none sm:text-center sm:text-sm">
            {announcementText}
          </span>
          <div className="shrink-0">
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} label={themeToggleLabel} />
          </div>
        </div>
      </div>

      <header className="site-header sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="container-shell flex items-center justify-between gap-3 py-3 sm:gap-4 sm:py-4">
          <Link to="/" className="shrink-0">
            <SchoolLogo size="sm" animated />
          </Link>

          <nav className="hidden items-center gap-2 xl:flex">
            {menuItems.map((item) => (
              <NavLink
                key={item.key}
                to={item.path}
                className={({ isActive }) => `header-nav-link ${isActive ? "is-active" : ""}`}
              >
                {pick(globalContent.menu[item.key])}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 xl:flex">
            <div className="header-control-group">
              {["uz", "en", "ru"].map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLanguage(lang)}
                  className={`header-lang-button ${language === lang ? "is-active" : ""}`}
                >
                  {lang}
                </button>
              ))}
            </div>
            <Link to="/admissions" className="button-primary">
              {pick(globalContent.buttons.applyNow)}
            </Link>
          </div>

          <div className="hidden items-center gap-2 lg:flex xl:hidden">
            <div className="header-control-group">
              {["uz", "en", "ru"].map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLanguage(lang)}
                  className={`header-lang-button text-[11px] ${language === lang ? "is-active" : ""}`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="header-icon-button lg:hidden"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen && (
          <>
            <button
              type="button"
              aria-label="Close mobile menu"
              className="fixed inset-0 z-30 bg-brand-primary/30 backdrop-blur-[2px] lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <div className="site-mobile-panel absolute inset-x-0 top-full z-40 border-t border-slate-200 bg-white/95 shadow-soft lg:hidden">
              <div className="container-shell py-4">
                <div className="rounded-[2rem] border border-slate-200/70 bg-white/95 p-4 shadow-card backdrop-blur-xl">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {menuItems.map((item) => (
                      <NavLink
                        key={item.key}
                        to={item.path}
                        onClick={() => setMobileOpen(false)}
                        className={({ isActive }) => `header-mobile-nav-link ${isActive ? "is-active" : ""}`}
                      >
                        {pick(globalContent.menu[item.key])}
                      </NavLink>
                    ))}
                  </div>

                  <div className="mt-4 rounded-[1.6rem] border border-slate-200/70 bg-brand-surface/70 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-secondary/70">
                      {pick({
                        uz: "Tezkor amallar",
                        en: "Quick actions",
                        ru: "Быстрые действия",
                      })}
                    </p>
                    <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="header-control-group w-fit">
                        {["uz", "en", "ru"].map((lang) => (
                          <button
                            key={lang}
                            type="button"
                            onClick={() => setLanguage(lang)}
                            className={`header-lang-button ${language === lang ? "is-active" : ""}`}
                          >
                            {lang}
                          </button>
                        ))}
                      </div>
                      <Link to="/admissions" className="button-primary w-full justify-center sm:w-auto" onClick={() => setMobileOpen(false)}>
                        {pick(globalContent.buttons.applyNow)}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
}

