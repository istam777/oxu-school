import { Home, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import SchoolLogo from "../layout/SchoolLogo";

export default function AdminTopbar({ user, onLogout }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-5 py-4 sm:px-8">
      <div className="flex items-center gap-4">
        <Link to="/" className="inline-flex shrink-0">
          <SchoolLogo size="xs" />
        </Link>
        <div>
          <h1 className="text-2xl font-semibold text-brand-primary">Boshqaruv paneli</h1>
          <p className="text-sm text-slate-500">Kontent, arizalar va maktab ma'lumotlarini shu yerdan boshqaring.</p>
        </div>
      </div>
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="hidden rounded-2xl bg-brand-surface px-4 py-2 text-right sm:block">
          <p className="text-sm font-semibold text-brand-primary">{user?.fullName}</p>
          <p className="text-xs text-slate-500">{user?.email}</p>
        </div>
        <Link to="/" className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-brand-primary transition hover:bg-brand-surface">
          <Home className="h-4 w-4" />
          Saytga o'tish
        </Link>
        <button type="button" onClick={onLogout} className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-brand-primary transition hover:bg-brand-surface">
          <LogOut className="h-4 w-4" />
          Chiqish
        </button>
      </div>
    </div>
  );
}
