import { useEffect, useState } from "react";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import DataTable from "../../components/admin/DataTable";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { adminService } from "../../services/adminService";

const initialForm = { question: "", answer: "", category: "", sortOrder: 0, active: true };

export default function FAQManagementPage() {
  useDocumentTitle("FAQ boshqaruvi");
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [confirmId, setConfirmId] = useState(null);

  const loadFaqs = () => adminService.getFaqs().then(setItems);

  useEffect(() => {
    loadFaqs();
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    if (editingId) await adminService.updateFaq(editingId, form);
    else await adminService.createFaq(form);
    setEditingId(null);
    setForm(initialForm);
    loadFaqs();
  };

  return (
    <div className="space-y-8">
      <form onSubmit={submit} className="rounded-[2rem] bg-white p-8 shadow-card">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-secondary/60">FAQ</p>
            <h2 className="mt-3 text-2xl font-semibold text-brand-primary">FAQ boshqaruvi</h2>
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

        <input className="input-field" placeholder="Savol" value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} required />
        <textarea className="textarea-field mt-4" placeholder="Javob" value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} required />
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <input className="input-field" placeholder="Kategoriya" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          <input type="number" className="input-field" placeholder="Tartib raqami" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })} />
          <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-brand-canvas px-4 py-3 text-sm font-medium text-slate-600">
            <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} />
            Faol
          </label>
        </div>
        <button type="submit" className="button-primary mt-6">{editingId ? "Yangilash" : "Saqlash"}</button>
      </form>

      <DataTable
        columns={[
          { key: "question", label: "Savol" },
          { key: "category", label: "Kategoriya" },
          { key: "sortOrder", label: "Tartib" },
          { key: "active", label: "Holat", render: (row) => (row.active ? "Faol" : "Yashirin") },
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
                  question: row.question,
                  answer: row.answer,
                  category: row.category || "",
                  sortOrder: row.sortOrder || 0,
                  active: row.active,
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
        title="FAQni o'chirish"
        description="Ushbu FAQ yozuvi butunlay o'chiriladi."
        onCancel={() => setConfirmId(null)}
        onConfirm={async () => {
          await adminService.deleteFaq(confirmId);
          setConfirmId(null);
          loadFaqs();
        }}
      />
    </div>
  );
}
