import { Calendar, FileQuestion, GraduationCap, Images, Mail, Newspaper, Users } from "lucide-react";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { adminService } from "../../services/adminService";

const cards = [
  { key: "newsCount", label: "Yangiliklar", icon: Newspaper },
  { key: "eventCount", label: "Tadbirlar", icon: Calendar },
  { key: "galleryCount", label: "Galereya", icon: Images },
  { key: "faqCount", label: "FAQ", icon: FileQuestion },
  { key: "teacherCount", label: "O'qituvchilar", icon: Users },
  { key: "admissionCount", label: "Arizalar", icon: GraduationCap },
  { key: "messageCount", label: "Xabarlar", icon: Mail },
];

export default function DashboardPage() {
  useDocumentTitle("Boshqaruv paneli");
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    adminService.getDashboard().then(setSummary);
  }, []);

  if (!summary) return <LoadingSpinner label="Boshqaruv paneli yuklanmoqda..." />;

  return (
    <div className="space-y-8">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.key} className="rounded-[2rem] bg-white p-6 shadow-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">{card.label}</p>
                  <h2 className="mt-3 font-display text-4xl font-semibold text-brand-primary">{summary[card.key]}</h2>
                </div>
                <div className="rounded-2xl bg-brand-surface p-4">
                  <Icon className="h-6 w-6 text-brand-secondary" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-[2rem] bg-white p-8 shadow-card">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-secondary/60">Umumiy ko'rinish</p>
        <h3 className="mt-4 font-display text-4xl font-semibold text-brand-primary">Maktab platformasi boshqaruvi</h3>
        <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-600">
          Bu panel orqali yangiliklar, tadbirlar, galereya, FAQ, o'qituvchilar, qabul arizalari va aloqa xabarlarini
          boshqarishingiz mumkin. Bosh sahifa bo'limlari va sozlamalar orqali public sayt matnlarini ham tez
          yangilash qo'llab-quvvatlanadi.
        </p>
      </div>
    </div>
  );
}
