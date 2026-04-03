import { useState } from "react";
import { publicService } from "../../services/publicService";

const initialState = {
  fullName: "",
  phone: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactForm({ labels }) {
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setFeedback(null);
    try {
      await publicService.createContactMessage(form);
      setForm(initialState);
      setFeedback({ type: "success", message: labels.success });
    } catch (error) {
      const message = error.response?.data?.message || labels.error;
      setFeedback({ type: "error", message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card-panel p-7 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="fullName" value={form.fullName} onChange={handleChange} className="input-field" placeholder={labels.fullName} required />
        <input name="phone" value={form.phone} onChange={handleChange} className="input-field" placeholder={labels.phone} required />
        <input type="email" name="email" value={form.email} onChange={handleChange} className="input-field" placeholder={labels.email} required />
        <input name="subject" value={form.subject} onChange={handleChange} className="input-field" placeholder={labels.subject} required />
      </div>
      <textarea name="message" value={form.message} onChange={handleChange} className="textarea-field mt-4" placeholder={labels.message} required />

      {feedback && (
        <div className={`mt-5 rounded-2xl px-4 py-3 text-sm ${feedback.type === "success" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
          {feedback.message}
        </div>
      )}

      <button type="submit" disabled={submitting} className="button-primary mt-6 disabled:opacity-70">
        {submitting ? labels.submitting : labels.submit}
      </button>
    </form>
  );
}
