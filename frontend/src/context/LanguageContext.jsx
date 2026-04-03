import { createContext, useContext, useEffect, useMemo, useState } from "react";

const LanguageContext = createContext(null);

const LANGUAGE_OPTIONS = ["uz", "en", "ru"];

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem("osiyo_language") || "uz");

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const updateLanguage = (value) => {
    if (!LANGUAGE_OPTIONS.includes(value)) return;
    localStorage.setItem("osiyo_language", value);
    document.documentElement.lang = value;
    setLanguage(value);
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage: updateLanguage,
      pick: (localized) => {
        if (typeof localized === "string") return localized;
        return localized?.[language] ?? localized?.uz ?? "";
      },
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}
