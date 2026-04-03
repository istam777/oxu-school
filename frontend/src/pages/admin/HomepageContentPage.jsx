import { useEffect, useState } from "react";
import ImageUploadField from "../../components/admin/ImageUploadField";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { adminService } from "../../services/adminService";

export default function HomepageContentPage() {
  useDocumentTitle("Bosh sahifa kontenti");
  const [sections, setSections] = useState([]);

  useEffect(() => {
    adminService.getHomepageSections().then(setSections);
  }, []);

  const updateSection = async (section) => {
    await adminService.updateHomepageSection(section.id, section);
    const refreshed = await adminService.getHomepageSections();
    setSections(refreshed);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] bg-white p-8 shadow-card">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-secondary/60">Bosh sahifa</p>
        <h2 className="mt-3 text-2xl font-semibold text-brand-primary">Bosh sahifa kontenti</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          Bosh sahifadagi ko'p tilli sarlavha, matn va rasm bloklarini shu yerda yangilashingiz mumkin.
        </p>
      </div>

      {sections.map((section) => (
        <form
          key={section.id}
          onSubmit={async (event) => {
            event.preventDefault();
            await updateSection(section);
          }}
          className="rounded-[2rem] bg-white p-8 shadow-card"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-secondary/60">{section.sectionKey}</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <input
              className="input-field"
              value={section.sectionKey}
              onChange={(e) => setSections((current) => current.map((item) => (item.id === section.id ? { ...item, sectionKey: e.target.value } : item)))}
              placeholder="Kalit"
            />
            <input
              className="input-field"
              value={section.titleUz}
              onChange={(e) => setSections((current) => current.map((item) => (item.id === section.id ? { ...item, titleUz: e.target.value } : item)))}
              placeholder="Sarlavha UZ"
            />
            <input
              className="input-field"
              value={section.titleEn}
              onChange={(e) => setSections((current) => current.map((item) => (item.id === section.id ? { ...item, titleEn: e.target.value } : item)))}
              placeholder="Sarlavha EN"
            />
          </div>
          <input
            className="input-field mt-4"
            value={section.titleRu}
            onChange={(e) => setSections((current) => current.map((item) => (item.id === section.id ? { ...item, titleRu: e.target.value } : item)))}
            placeholder="Sarlavha RU"
          />
          <textarea
            className="textarea-field mt-4"
            value={section.contentUz}
            onChange={(e) => setSections((current) => current.map((item) => (item.id === section.id ? { ...item, contentUz: e.target.value } : item)))}
            placeholder="Matn UZ"
          />
          <textarea
            className="textarea-field mt-4"
            value={section.contentEn}
            onChange={(e) => setSections((current) => current.map((item) => (item.id === section.id ? { ...item, contentEn: e.target.value } : item)))}
            placeholder="Matn EN"
          />
          <textarea
            className="textarea-field mt-4"
            value={section.contentRu}
            onChange={(e) => setSections((current) => current.map((item) => (item.id === section.id ? { ...item, contentRu: e.target.value } : item)))}
            placeholder="Matn RU"
          />
          <div className="mt-4">
            <ImageUploadField
              label="Bo'lim rasmi"
              value={section.imageUrl}
              onChange={(value) => setSections((current) => current.map((item) => (item.id === section.id ? { ...item, imageUrl: value } : item)))}
            />
          </div>
          <label className="mt-4 flex items-center gap-3 text-sm font-medium text-slate-600">
            <input
              type="checkbox"
              checked={section.active}
              onChange={(e) => setSections((current) => current.map((item) => (item.id === section.id ? { ...item, active: e.target.checked } : item)))}
            />
            Faol
          </label>
          <button type="submit" className="button-primary mt-6">Saqlash</button>
        </form>
      ))}
    </div>
  );
}
