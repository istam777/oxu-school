export default function ConfirmDialog({ open, title, description, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-primary/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-soft">
        <h3 className="text-2xl font-semibold text-brand-primary">{title}</h3>
        <p className="mt-4 text-sm leading-7 text-slate-600">{description}</p>
        <div className="mt-8 flex justify-end gap-3">
          <button type="button" onClick={onCancel} className="button-secondary">
            Bekor qilish
          </button>
          <button type="button" onClick={onConfirm} className="button-primary">
            Tasdiqlash
          </button>
        </div>
      </div>
    </div>
  );
}
