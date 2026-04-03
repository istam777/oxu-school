import { Calendar, FileQuestion, GraduationCap, Home, Images, LayoutDashboard, Mail, Newspaper, Settings, ShieldCheck, Users } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import SchoolLogo from "../layout/SchoolLogo";

const navItems = [
  { to: "/admin", label: "Boshqaruv paneli", icon: LayoutDashboard },
  { to: "/admin/news", label: "Yangiliklar", icon: Newspaper },
  { to: "/admin/events", label: "Tadbirlar", icon: Calendar },
  { to: "/admin/gallery", label: "Galereya", icon: Images },
  { to: "/admin/faqs", label: "FAQ", icon: FileQuestion },
  { to: "/admin/teachers", label: "O'qituvchilar", icon: Users },
  { to: "/admin/admissions", label: "Qabul arizalari", icon: GraduationCap },
  { to: "/admin/messages", label: "Xabarlar", icon: Mail },
  { to: "/admin/homepage", label: "Bosh sahifa kontenti", icon: LayoutDashboard },
  { to: "/admin/settings", label: "Sozlamalar", icon: Settings },
];

export default function AdminSidebar({ user }) {
  const isSuperAdmin = user?.roles?.includes("ROLE_SUPER_ADMIN");
  const visibleItems = isSuperAdmin
    ? [...navItems, { to: "/admin/users", label: "Foydalanuvchilar", icon: ShieldCheck }]
    : navItems;

  return (
    <aside className="hidden w-80 shrink-0 border-r border-white/10 bg-brand-primary px-6 py-8 text-white lg:block">
      <Link to="/" className="mb-10 block rounded-[2rem] border border-white/10 bg-white/10 p-5 transition hover:bg-white/15">
        <div className="flex items-center justify-between gap-4">
          <SchoolLogo light size="sm" />
          <div className="rounded-2xl bg-white/10 p-3 text-white">
            <Home className="h-5 w-5" />
          </div>
        </div>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-white/60">Admin paneli</p>
        <p className="mt-2 text-sm leading-7 text-white/80">Logoni bossangiz public bosh sahifaga o'tasiz.</p>
      </Link>

      <nav className="space-y-2">
        {visibleItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                  isActive ? "bg-white text-brand-primary" : "text-white/75 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
