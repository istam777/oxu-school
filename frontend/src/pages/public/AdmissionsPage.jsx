import { useEffect, useState } from "react";
import AdmissionForm from "../../components/forms/AdmissionForm";
import PageHero from "../../components/common/PageHero";
import SectionTitle from "../../components/common/SectionTitle";
import FAQAccordion from "../../components/ui/FAQAccordion";
import { useLanguage } from "../../context/LanguageContext";
import { admissionsContent } from "../../data/siteContent";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { publicService } from "../../services/publicService";

export default function AdmissionsPage() {
  useDocumentTitle({ uz: "Qabul", en: "Admissions", ru: "Поступление" });
  const { pick } = useLanguage();
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    publicService.getFaqs().then(setFaqs).catch(() => setFaqs([]));
  }, []);

  return (
    <>
      <PageHero title={pick(admissionsContent.hero.title)} description={pick(admissionsContent.hero.description)} />

      <section className="section-space">
        <div className="container-shell">
          <SectionTitle
            eyebrow={pick({ uz: "Qabul yo'li", en: "Admissions Journey", ru: "Путь поступления" })}
            title={pick({ uz: "Qabul bosqichlari", en: "Admissions Steps", ru: "Этапы поступления" })}
            description={pick({ uz: "Qulay va tushunarli qabul tajribasi uchun har bir bosqich aniq belgilangan.", en: "Each stage is clear and designed to support families.", ru: "Каждый этап ясен и удобен для семьи." })}
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-4">
            {admissionsContent.steps.map((item) => (
              <div key={item.step} className="card-panel p-7">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-secondary/60">{item.step}</p>
                <h3 className="mt-4 text-xl font-semibold text-brand-primary">{pick(item.title)}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{pick(item.text)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="container-shell grid gap-8 lg:grid-cols-3">
          <div className="card-panel p-7">
            <h3 className="text-2xl font-semibold text-brand-primary">{pick(admissionsContent.requirements.title)}</h3>
            <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-600">
              {admissionsContent.requirements.items.map((item) => (
                <li key={pick(item)} className="rounded-2xl bg-brand-canvas px-4 py-3">{pick(item)}</li>
              ))}
            </ul>
          </div>
          <div className="card-panel p-7">
            <h3 className="text-2xl font-semibold text-brand-primary">{pick(admissionsContent.documents.title)}</h3>
            <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-600">
              {admissionsContent.documents.items.map((item) => (
                <li key={pick(item)} className="rounded-2xl bg-brand-canvas px-4 py-3">{pick(item)}</li>
              ))}
            </ul>
          </div>
          <div className="card-panel p-7">
            <h3 className="text-2xl font-semibold text-brand-primary">{pick(admissionsContent.fees.title)}</h3>
            <p className="mt-6 text-sm leading-8 text-slate-600">{pick(admissionsContent.fees.text)}</p>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <SectionTitle
              eyebrow={pick({ uz: "Ariza", en: "Apply", ru: "Заявка" })}
              title={pick({ uz: "Onlayn ariza", en: "Online Application", ru: "Онлайн-заявка" })}
              description={pick({ uz: "Quyidagi formani to‘ldiring va qabul bo‘limi siz bilan tez orada bog‘lanadi.", en: "Complete the form and our admissions office will contact you shortly.", ru: "Заполните форму, и отдел приема скоро свяжется с вами." })}
            />
            <div className="mt-8">
              <AdmissionForm
                labels={{
                  studentFirstName: pick({ uz: "O‘quvchi ismi", en: "Student first name", ru: "Имя ученика" }),
                  studentLastName: pick({ uz: "O‘quvchi familiyasi", en: "Student last name", ru: "Фамилия ученика" }),
                  gradeApplyingFor: pick({ uz: "Qaysi sinf uchun", en: "Grade applying for", ru: "Класс поступления" }),
                  parentFullName: pick({ uz: "Ota-ona F.I.Sh.", en: "Parent full name", ru: "Ф.И.О. родителя" }),
                  parentPhone: pick({ uz: "Telefon", en: "Phone", ru: "Телефон" }),
                  parentEmail: pick({ uz: "Email", en: "Email", ru: "Email" }),
                  address: pick({ uz: "Manzil", en: "Address", ru: "Адрес" }),
                  previousSchool: pick({ uz: "Oldingi maktab", en: "Previous school", ru: "Предыдущая школа" }),
                  notes: pick({ uz: "Qo‘shimcha izoh", en: "Additional notes", ru: "Дополнительные заметки" }),
                  submit: pick({ uz: "Ariza yuborish", en: "Submit application", ru: "Отправить заявку" }),
                  submitting: pick({ uz: "Yuborilmoqda...", en: "Submitting...", ru: "Отправка..." }),
                  success: pick({ uz: "Ariza muvaffaqiyatli yuborildi.", en: "Application submitted successfully.", ru: "Заявка успешно отправлена." }),
                  error: pick({ uz: "Arizani yuborib bo‘lmadi.", en: "Could not submit the application.", ru: "Не удалось отправить заявку." }),
                }}
              />
            </div>
          </div>
          <div>
            <SectionTitle
              eyebrow={pick({ uz: "Savollar", en: "FAQ", ru: "Вопросы" })}
              title={pick({ uz: "Qabul bo‘yicha savollar", en: "Admissions FAQ", ru: "FAQ по поступлению" })}
              description={pick({ uz: "Eng ko‘p so‘raladigan savollar va javoblar.", en: "The most common questions and answers.", ru: "Самые частые вопросы и ответы." })}
            />
            <div className="mt-8">
              <FAQAccordion items={faqs.slice(0, 4)} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
