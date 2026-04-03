import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext(null);

const THEME_OPTIONS = ["light", "dark"];

function getInitialTheme() {
  if (typeof window === "undefined") return "light";
  const storedTheme = window.localStorage.getItem("osiyo_theme");
  if (THEME_OPTIONS.includes(storedTheme)) {
    return storedTheme;
  }
  return "light";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("theme-light", "theme-dark");
    root.classList.add(`theme-${theme}`);
    root.style.colorScheme = theme;
    window.localStorage.setItem("osiyo_theme", theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === "dark",
      setTheme: (value) => {
        if (!THEME_OPTIONS.includes(value)) return;
        setTheme(value);
      },
      toggleTheme: () => {
        setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
      },
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return context;
}
