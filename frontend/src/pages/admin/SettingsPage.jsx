import { useEffect, useState } from "react";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { adminService } from "../../services/adminService";

const settingLabels = {
  school_name: "Maktab nomi",
  contact_phone: "Bog'lanish telefoni",
  contact_email: "Bog'lanish emaili",
  contact_address: "Manzil",
  announcement_text: "E'lon matni",
  working_hours: "Ish vaqti",
  instagram_url: "Instagram havolasi",
  telegram_url: "Telegram havolasi",
};

function getSettingLabel(settingKey) {
  return settingLabels[settingKey] || settingKey.replaceAll("_", " ");
}

export default function SettingsPage() {
  useDocumentTitle("Sozlamalar");
  const [settings, setSettings] = useState([]);

  useEffect(() => {
    adminService.getSettings().then(setSettings);
  }, []);

  const save = async (setting) => {
    await adminService.updateSetting(setting.id, setting);
    const refreshed = await adminService.getSettings();
    setSettings(refreshed);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] bg-white p-8 shadow-card">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-secondary/60">Sozlamalar</p>
        <h2 className="mt-3 text-2xl font-semibold text-brand-primary">Asosiy sayt sozlamalari</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          Kontakt ma'lumotlari, e'lonlar va ijtimoiy tarmoq havolalarini shu bo'limdan yangilang.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {settings.map((setting) => (
          <form
            key={setting.id}
            onSubmit={async (event) => {
              event.preventDefault();
              await save(setting);
            }}
            className="rounded-[2rem] bg-white p-8 shadow-card"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-secondary/60">{setting.settingKey}</p>
            <h3 className="mt-3 text-xl font-semibold text-brand-primary">{getSettingLabel(setting.settingKey)}</h3>
            <textarea
              className="textarea-field mt-5"
              value={setting.settingValue}
              onChange={(e) => setSettings((current) => current.map((item) => (item.id === setting.id ? { ...item, settingValue: e.target.value } : item)))}
            />
            <button type="submit" className="button-primary mt-5">Saqlash</button>
          </form>
        ))}
      </div>
    </div>
  );
}
