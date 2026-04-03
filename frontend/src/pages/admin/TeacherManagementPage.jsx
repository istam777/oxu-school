import { useEffect, useState } from "react";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import DataTable from "../../components/admin/DataTable";
import ImageUploadField from "../../components/admin/ImageUploadField";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { adminService } from "../../services/adminService";

const initialForm = { fullName: "", role: "", bio: "", photoUrl: "", email: "", phone: "" };

export default function TeacherManagementPage() {
  useDocumentTitle("O'qituvchilar boshqaruvi");
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [confirmId, setConfirmId] = useState(null);

  const loadTeachers = () => adminService.getTeachers().then(setItems);

  useEffect(() => {
    loadTeachers();
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    if (editingId) await adminService.updateTeacher(editingId, form);
    else await adminService.createTeacher(form);
    setEditingId(null);
    setForm(initialForm);
    loadTeachers();
  };

  return (
    <div className="space-y-8">
      <form onSubmit={submit} className="rounded-[2rem] bg-white p-8 shadow-card">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-secondary/60">O'qituvchilar</p>
            <h2 className="mt-3 text-2xl font-semibold text-brand-primary">O'qituvchilar boshqaruvi</h2>
          </div>
          {editingId && (
            <button
              type="button"
              className="button-secondary"
              onClick={() => {
                setEditingId(null);
                setForm(initialForm);
              }}
            >
              Bekor qilish
            </button>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <input className="input-field" placeholder="To'liq ism" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
          <input className="input-field" placeholder="Lavozim" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required />
          <input className="input-field" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input className="input-field" placeholder="Telefon" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </div>
        <textarea className="textarea-field mt-4" placeholder="Qisqa bio" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} required />
        <div className="mt-4">
          <ImageUploadField label="O'qituvchi rasmi" value={form.photoUrl} onChange={(value) => setForm({ ...form, photoUrl: value })} />
        </div>
        <button type="submit" className="button-primary mt-6">{editingId ? "Yangilash" : "Saqlash"}</button>
      </form>

      <DataTable
        columns={[
          { key: "fullName", label: "Ism" },
          { key: "role", label: "Lavozim" },
          { key: "email", label: "Email" },
          { key: "phone", label: "Telefon" },
        ]}
        rows={items}
        actions={(row) => (
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-brand-primary"
              onClick={() => {
                setEditingId(row.id);
                setForm({
                  fullName: row.fullName,
                  role: row.role,
                  bio: row.bio,
                  photoUrl: row.photoUrl || "",
                  email: row.email || "",
                  phone: row.phone || "",
                });
              }}
            >
              Tahrirlash
            </button>
            <button type="button" className="rounded-xl bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700" onClick={() => setConfirmId(row.id)}>
              O'chirish
            </button>
          </div>
        )}
      />

      <ConfirmDialog
        open={Boolean(confirmId)}
        title="O'qituvchini o'chirish"
        description="Ushbu o'qituvchi yozuvi o'chiriladi."
        onCancel={() => setConfirmId(null)}
        onConfirm={async () => {
          await adminService.deleteTeacher(confirmId);
          setConfirmId(null);
          loadTeachers();
        }}
      />
    </div>
  );
}
