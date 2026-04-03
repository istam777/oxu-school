import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "../../components/forms/ContactForm";
import PageHero from "../../components/common/PageHero";
import SectionTitle from "../../components/common/SectionTitle";
import { useLanguage } from "../../context/LanguageContext";
import { contactPageContent } from "../../data/siteContent";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { usePublicLayoutContext } from "../../layouts/PublicLayout";

function mapSettings(settings = []) {
  return settings.reduce((acc, item) => {
    acc[item.settingKey] = item.settingValue;
    return acc;
  }, {});
}

export default function ContactPage() {
  useDocumentTitle({ uz: "Bog'lanish", en: "Contact", ru: "Контакты" });
  const { pick } = useLanguage();
  const { settings } = usePublicLayoutContext();
  const settingsMap = mapSettings(settings);

  return (
    <>
      <PageHero title={pick(contactPageContent.hero.title)} description={pick(contactPageContent.hero.description)} />

      <section className="section-space">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionTitle
              eyebrow={pick({ uz: "Aloqa", en: "Contact", ru: "Контакты" })}
              title={pick({ uz: "Maktab bilan bog'laning", en: "Get in touch with the school", ru: "Свяжитесь со школой" })}
              description={pick({
                uz: "Qabul, maktabga tashrif yoki hamkorlik bo'yicha murojaatlaringizni yuboring.",
                en: "Send us your questions about admissions, visits, or partnerships.",
                ru: "Отправьте вопросы о поступлении, визите или сотрудничестве.",
              })}
            />
            <div className="mt-8 space-y-4">
              <div className="card-panel flex items-start gap-4 p-6">
                <Phone className="mt-1 h-5 w-5 text-brand-secondary" />
                <div>
                  <p className="text-sm font-semibold text-brand-primary">{pick({ uz: "Telefon", en: "Phone", ru: "Телефон" })}</p>
                  <p className="mt-2 text-sm text-slate-600">{settingsMap.contact_phone}</p>
                </div>
              </div>
              <div className="card-panel flex items-start gap-4 p-6">
                <Mail className="mt-1 h-5 w-5 text-brand-secondary" />
                <div>
                  <p className="text-sm font-semibold text-brand-primary">{pick({ uz: "Email", en: "Email", ru: "Эл. почта" })}</p>
                  <p className="mt-2 text-sm text-slate-600">{settingsMap.contact_email}</p>
                </div>
              </div>
              <div className="card-panel flex items-start gap-4 p-6">
                <MapPin className="mt-1 h-5 w-5 text-brand-secondary" />
                <div>
                  <p className="text-sm font-semibold text-brand-primary">{pick({ uz: "Manzil", en: "Address", ru: "Адрес" })}</p>
                  <p className="mt-2 text-sm text-slate-600">{settingsMap.contact_address}</p>
                </div>
              </div>
              <div className="card-panel flex min-h-64 items-center justify-center bg-brand-surface text-center text-brand-primary">
                <div>
                  <p className="font-display text-3xl font-semibold">{pick(contactPageContent.mapPlaceholder)}</p>
                  <p className="mt-3 text-sm text-slate-500">{settingsMap.contact_address}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <SectionTitle
              eyebrow={pick({ uz: "Xabar", en: "Message", ru: "Сообщение" })}
              title={pick({ uz: "Bizga yozing", en: "Send us a message", ru: "Напишите нам" })}
              description={pick({
                uz: "Formani to'ldiring va jamoamiz siz bilan tez orada bog'lanadi.",
                en: "Fill out the form and our team will get back to you soon.",
                ru: "Заполните форму, и наша команда скоро свяжется с вами.",
              })}
            />
            <div className="mt-8">
              <ContactForm
                labels={{
                  fullName: pick({ uz: "F.I.Sh.", en: "Full name", ru: "Ф.И.О." }),
                  phone: pick({ uz: "Telefon", en: "Phone", ru: "Телефон" }),
                  email: pick({ uz: "Email", en: "Email", ru: "Email" }),
                  subject: pick({ uz: "Mavzu", en: "Subject", ru: "Тема" }),
                  message: pick({ uz: "Xabaringiz", en: "Your message", ru: "Ваше сообщение" }),
                  submit: pick({ uz: "Yuborish", en: "Send", ru: "Отправить" }),
                  submitting: pick({ uz: "Yuborilmoqda...", en: "Sending...", ru: "Отправка..." }),
                  success: pick({ uz: "Xabaringiz qabul qilindi.", en: "Your message has been received.", ru: "Ваше сообщение принято." }),
                  error: pick({ uz: "Xabarni yuborib bo'lmadi.", en: "Could not send the message.", ru: "Не удалось отправить сообщение." }),
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

