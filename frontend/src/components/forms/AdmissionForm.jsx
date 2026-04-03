import { useState } from "react";
import { publicService } from "../../services/publicService";

const initialState = {
  studentFirstName: "",
  studentLastName: "",
  dateOfBirth: "",
  gradeApplyingFor: "",
  parentFullName: "",
  parentPhone: "",
  parentEmail: "",
  address: "",
  previousSchool: "",
  notes: "",
};

export default function AdmissionForm({ labels }) {
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
      await publicService.createAdmission(form);
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
        <input name="studentFirstName" value={form.studentFirstName} onChange={handleChange} className="input-field" placeholder={labels.studentFirstName} required />
        <input name="studentLastName" value={form.studentLastName} onChange={handleChange} className="input-field" placeholder={labels.studentLastName} required />
        <input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} className="input-field" required />
        <input name="gradeApplyingFor" value={form.gradeApplyingFor} onChange={handleChange} className="input-field" placeholder={labels.gradeApplyingFor} required />
        <input name="parentFullName" value={form.parentFullName} onChange={handleChange} className="input-field" placeholder={labels.parentFullName} required />
        <input name="parentPhone" value={form.parentPhone} onChange={handleChange} className="input-field" placeholder={labels.parentPhone} required />
        <input type="email" name="parentEmail" value={form.parentEmail} onChange={handleChange} className="input-field" placeholder={labels.parentEmail} required />
        <input name="previousSchool" value={form.previousSchool} onChange={handleChange} className="input-field" placeholder={labels.previousSchool} />
      </div>
      <div className="mt-4 space-y-4">
        <input name="address" value={form.address} onChange={handleChange} className="input-field" placeholder={labels.address} required />
        <textarea name="notes" value={form.notes} onChange={handleChange} className="textarea-field" placeholder={labels.notes} />
      </div>

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
