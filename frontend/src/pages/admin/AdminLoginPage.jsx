import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import SchoolLogo from "../../components/layout/SchoolLogo";
import { useAuth } from "../../context/AuthContext";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

export default function AdminLoginPage() {
  useDocumentTitle("Admin paneliga kirish");
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(form);
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Tizimga kirib bo'lmadi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-primary px-4">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-soft">
        <Link to="/" className="inline-flex">
          <SchoolLogo size="lg" />
        </Link>
        <h1 className="mt-8 font-display text-4xl font-semibold text-brand-primary">Admin paneliga kirish</h1>
        <p className="mt-3 text-sm leading-7 text-slate-500">Kontent va maktab ma'lumotlarini boshqarish uchun tizimga kiring.</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input
            value={form.username}
            onChange={(event) => setForm((current) => ({ ...current, username: event.target.value }))}
            className="input-field"
            placeholder="Login yoki email"
            required
          />
          <input
            type="password"
            value={form.password}
            onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
            className="input-field"
            placeholder="Parol"
            required
          />
          {error && <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>}
          <button type="submit" disabled={loading} className="button-primary w-full justify-center disabled:opacity-70">
            {loading ? "Kirilmoqda..." : "Kirish"}
          </button>
        </form>
        <Link to="/" className="button-secondary mt-4 w-full justify-center">
          Bosh sahifaga qaytish
        </Link>
      </div>
    </div>
  );
}
