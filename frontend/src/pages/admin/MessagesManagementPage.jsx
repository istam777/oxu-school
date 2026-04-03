import { useEffect, useState } from "react";
import DataTable from "../../components/admin/DataTable";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { adminService } from "../../services/adminService";

export default function MessagesManagementPage() {
  useDocumentTitle("Xabarlar");
  const [items, setItems] = useState([]);

  useEffect(() => {
    adminService.getMessages(0, 50).then((response) => setItems(response.content));
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] bg-white p-8 shadow-card">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-secondary/60">Aloqa</p>
        <h2 className="mt-3 text-2xl font-semibold text-brand-primary">Kelgan xabarlar</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          Public saytdagi bog'lanish formasi orqali yuborilgan barcha murojaatlar shu yerda ko'rsatiladi.
        </p>
      </div>

      <DataTable
        columns={[
          { key: "fullName", label: "Ism" },
          { key: "subject", label: "Mavzu" },
          { key: "phone", label: "Telefon" },
          { key: "email", label: "Email" },
          { key: "message", label: "Xabar" },
        ]}
        rows={items}
      />
    </div>
  );
}
