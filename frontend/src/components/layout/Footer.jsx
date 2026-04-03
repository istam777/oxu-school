import { Link } from "react-router-dom";
import { globalContent, menuItems } from "../../data/siteContent";
import { useLanguage } from "../../context/LanguageContext";
import SchoolLogo from "./SchoolLogo";

function mapSettings(settings = []) {
  return settings.reduce((acc, item) => {
    acc[item.settingKey] = item.settingValue;
    return acc;
  }, {});
}

export default function Footer({ settings }) {
  const { pick } = useLanguage();
  const settingsMap = mapSettings(settings);

  return (
    <footer className="mt-12 bg-brand-primary text-white sm:mt-16">
      <div className="container-shell grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <SchoolLogo light size="md" />
          <p className="mt-6 max-w-md text-sm leading-7 text-white/75 sm:leading-8">{pick(globalContent.footer.tagline)}</p>
          <div className="mt-6 space-y-2 text-sm leading-7 text-white/70">
            <p>{settingsMap.contact_phone}</p>
            <p className="break-all sm:break-normal">{settingsMap.contact_email}</p>
            <p>{settingsMap.contact_address}</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-white/55">
            {pick(globalContent.footer.sections.quickLinks)}
          </h3>
          <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 lg:grid-cols-1">
            {menuItems.slice(0, 6).map((item) => (
              <Link key={item.key} to={item.path} className="block text-sm text-white/75 hover:text-white">
                {pick(globalContent.menu[item.key])}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-white/55">
            {pick(globalContent.footer.sections.followUs)}
          </h3>
          <div className="mt-5 space-y-3 text-sm text-white/75">
            <a href={settingsMap.instagram_url || "#"} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href={settingsMap.telegram_url || "#"} target="_blank" rel="noreferrer">
              Telegram
            </a>
            <p>{settingsMap.working_hours}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5">
        <div className="container-shell text-center text-sm text-white/55 sm:text-left">
          © {new Date().getFullYear()} {pick(globalContent.schoolName)}. {pick(globalContent.footer.copyright)}
        </div>
      </div>
    </footer>
  );
}
