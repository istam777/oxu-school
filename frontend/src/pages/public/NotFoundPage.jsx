import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

export default function NotFoundPage() {
  useDocumentTitle({ uz: "Sahifa topilmadi", en: "Page not found", ru: "Страница не найдена" });
  const { pick } = useLanguage();

  return (
    <section className="section-space">
      <div className="container-shell flex min-h-[60vh] items-center justify-center">
        <div className="card-panel max-w-2xl p-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-secondary/60">404</p>
          <h1 className="mt-4 font-display text-5xl font-semibold text-brand-primary">
            {pick({ uz: "Sahifa topilmadi", en: "Page not found", ru: "Страница не найдена" })}
          </h1>
          <p className="mt-5 text-sm leading-8 text-slate-600">
            {pick({
              uz: "Siz qidirayotgan sahifa mavjud emas yoki boshqa manzilga ko‘chirilgan.",
              en: "The page you are looking for does not exist or has been moved.",
              ru: "Страница, которую вы ищете, не существует или была перемещена.",
            })}
          </p>
          <Link to="/" className="button-primary mt-8">
            {pick({ uz: "Bosh sahifaga qaytish", en: "Return to homepage", ru: "Вернуться на главную" })}
          </Link>
        </div>
      </div>
    </section>
  );
}
