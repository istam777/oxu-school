import { useLanguage } from "../../context/LanguageContext";

export default function LoadingSpinner({ label }) {
  const { pick } = useLanguage();
  const resolvedLabel =
    label ||
    pick({
      uz: "Yuklanmoqda...",
      en: "Loading...",
      ru: "Загрузка...",
    });

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-secondary/15 border-t-brand-secondary" />
      <p className="text-sm font-medium text-slate-500">{resolvedLabel}</p>
    </div>
  );
}
