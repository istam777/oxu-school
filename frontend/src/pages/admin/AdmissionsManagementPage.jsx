import { useEffect, useState } from "react";
import DataTable from "../../components/admin/DataTable";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { adminService } from "../../services/adminService";

export default function AdmissionsManagementPage() {
  useDocumentTitle("Qabul arizalari");
  const [items, setItems] = useState([]);

  useEffect(() => {
    adminService.getAdmissions(0, 50).then((response) => setItems(response.content));
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] bg-white p-8 shadow-card">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-secondary/60">Qabul</p>
        <h2 className="mt-3 text-2xl font-semibold text-brand-primary">Qabul arizalari</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          Sayt orqali yuborilgan arizalar shu yerda jamlanadi. O'quvchi va ota-ona ma'lumotlarini ko'rib chiqib,
          keyingi aloqa bosqichini rejalashtirishingiz mumkin.
        </p>
      </div>

      <DataTable
        columns={[
          { key: "studentFirstName", label: "O'quvchi", render: (row) => `${row.studentFirstName} ${row.studentLastName}` },
          { key: "gradeApplyingFor", label: "Sinf" },
          { key: "parentFullName", label: "Ota-ona" },
          { key: "parentPhone", label: "Telefon" },
          { key: "parentEmail", label: "Email" },
        ]}
        rows={items}
      />
    </div>
  );
}
