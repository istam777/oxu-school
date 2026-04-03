import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import DataTable from "../../components/admin/DataTable";
import { useAuth } from "../../context/AuthContext";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { adminService } from "../../services/adminService";

const initialForm = {
  fullName: "",
  username: "",
  email: "",
  password: "",
  role: "ROLE_ADMIN",
};

const roleLabels = {
  ROLE_SUPER_ADMIN: "Super admin",
  ROLE_ADMIN: "Admin",
  ROLE_EDITOR: "Editor",
};

function formatDate(value) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("uz-UZ", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export default function UsersManagementPage() {
  useDocumentTitle("Foydalanuvchilar");
  const { user, hasRole } = useAuth();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [createdCredentials, setCreatedCredentials] = useState(null);

  const isSuperAdmin = hasRole("ROLE_SUPER_ADMIN");

  const loadUsers = () => {
    adminService.getUsers().then(setItems);
  };

  useEffect(() => {
    if (isSuperAdmin) {
      loadUsers();
    }
  }, [isSuperAdmin]);

  if (!isSuperAdmin) {
    return <Navigate to="/admin" replace />;
  }

  const resetForm = () => {
    setEditingId(null);
    setForm(initialForm);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      if (editingId) {
        await adminService.updateUser(editingId, {
          ...form,
          password: form.password || null,
        });
        setCreatedCredentials(null);
      } else {
        await adminService.createUser(form);
        setCreatedCredentials({
          username: form.username,
          password: form.password,
          role: form.role,
        });
      }
      resetForm();
      loadUsers();
    } catch (err) {
      setError(err.response?.data?.message || "Foydalanuvchini saqlab bo'lmadi");
    }
  };

  const handleEdit = (row) => {
    if (row.roles.includes("ROLE_SUPER_ADMIN")) return;
    setCreatedCredentials(null);
    setError("");
    setEditingId(row.id);
    setForm({
      fullName: row.fullName,
      username: row.username,
      email: row.email,
      password: "",
      role: row.roles.includes("ROLE_EDITOR") ? "ROLE_EDITOR" : "ROLE_ADMIN",
    });
  };

  const handleToggleStatus = async (row) => {
    if (row.roles.includes("ROLE_SUPER_ADMIN")) return;
    setError("");
    try {
      await adminService.updateUserStatus(row.id, { enabled: !row.enabled });
      loadUsers();
    } catch (err) {
      setError(err.response?.data?.message || "Foydalanuvchi holatini o'zgartirib bo'lmadi");
    }
  };

  const handleDelete = async () => {
    try {
      await adminService.deleteUser(confirmDeleteId);
      setConfirmDeleteId(null);
      if (editingId === confirmDeleteId) {
        resetForm();
      }
      loadUsers();
    } catch (err) {
      setError(err.response?.data?.message || "Foydalanuvchini o'chirib bo'lmadi");
    }
  };

  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] bg-white p-8 shadow-card">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-secondary/60">Super admin</p>
        <h2 className="mt-3 text-2xl font-semibold text-brand-primary">Foydalanuvchilar boshqaruvi</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          Bu bo'lim faqat super admin uchun ochiq. Bu yerdan admin va editor loginlarini yaratishingiz, tahrirlashingiz,
          bloklashingiz va o'chirishingiz mumkin.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-brand-surface px-4 py-3 text-sm font-medium text-brand-primary">
            Joriy foydalanuvchi: {user?.fullName}
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-800">
            Mavjud parollar tizimda ochiq ko'rinmaydi. Xavfsizlik uchun faqat yangi parol o'rnatish yoki reset qilish mumkin.
          </div>
        </div>
      </div>

      {createdCredentials && (
        <div className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-6 shadow-card">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Login ma'lumotlari</p>
          <p className="mt-3 text-sm text-emerald-900">Yangi foydalanuvchi yaratildi. Quyidagi ma'lumotlarni saqlab qo'ying:</p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl bg-white px-4 py-3 text-sm">
              <span className="font-semibold text-brand-primary">Username:</span> {createdCredentials.username}
            </div>
            <div className="rounded-2xl bg-white px-4 py-3 text-sm">
              <span className="font-semibold text-brand-primary">Parol:</span> {createdCredentials.password}
            </div>
            <div className="rounded-2xl bg-white px-4 py-3 text-sm">
              <span className="font-semibold text-brand-primary">Rol:</span> {roleLabels[createdCredentials.role]}
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="rounded-[2rem] bg-white p-8 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-secondary/60">
              {editingId ? "Foydalanuvchini tahrirlash" : "Yangi foydalanuvchi"}
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-brand-primary">
              {editingId ? "Admin yoki editorni yangilash" : "Admin yoki editor yaratish"}
            </h3>
          </div>
          {editingId && (
            <button type="button" className="button-secondary" onClick={resetForm}>
              Bekor qilish
            </button>
          )}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <input className="input-field" placeholder="To'liq ism" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
          <input className="input-field" placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
          <input className="input-field" placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <input
            className="input-field"
            placeholder={editingId ? "Yangi parol (o'zgartirmasangiz bo'sh qoldiring)" : "Parol"}
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required={!editingId}
          />
          <label className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-brand-canvas px-4 py-3 text-sm font-medium text-slate-600">
            Rol
            <select className="bg-transparent text-sm font-semibold text-brand-primary outline-none" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
              <option value="ROLE_ADMIN">Admin</option>
              <option value="ROLE_EDITOR">Editor</option>
            </select>
          </label>
        </div>

        {error && <div className="mt-4 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>}

        <button type="submit" className="button-primary mt-6">
          {editingId ? "O'zgarishlarni saqlash" : "Foydalanuvchini yaratish"}
        </button>
      </form>

      <DataTable
        columns={[
          { key: "fullName", label: "Ism" },
          { key: "username", label: "Username" },
          { key: "email", label: "Email" },
          { key: "roles", label: "Rol", render: (row) => row.roles.map((role) => roleLabels[role] || role).join(", ") },
          { key: "enabled", label: "Holat", render: (row) => (row.enabled ? "Faol" : "Bloklangan") },
          { key: "createdAt", label: "Yaratilgan sana", render: (row) => formatDate(row.createdAt) },
        ]}
        rows={items}
        actions={(row) => {
          const protectedUser = row.roles.includes("ROLE_SUPER_ADMIN");
          if (protectedUser) {
            return <span className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-500">Himoyalangan</span>;
          }

          return (
            <div className="flex flex-wrap justify-end gap-2">
              <button type="button" className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-brand-primary" onClick={() => handleEdit(row)}>
                Tahrirlash
              </button>
              <button
                type="button"
                className={`rounded-xl px-3 py-2 text-xs font-semibold ${row.enabled ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}
                onClick={() => handleToggleStatus(row)}
              >
                {row.enabled ? "Bloklash" : "Faollashtirish"}
              </button>
              <button type="button" className="rounded-xl bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700" onClick={() => setConfirmDeleteId(row.id)}>
                O'chirish
              </button>
            </div>
          );
        }}
      />

      <ConfirmDialog
        open={Boolean(confirmDeleteId)}
        title="Foydalanuvchini o'chirish"
        description="Ushbu login tizimdan butunlay o'chiriladi. Bu amalni ortga qaytarib bo'lmaydi."
        onCancel={() => setConfirmDeleteId(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
