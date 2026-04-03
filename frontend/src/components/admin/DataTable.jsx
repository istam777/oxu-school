export default function DataTable({ columns, rows, actions }) {
  const colSpan = columns.length + (actions ? 1 : 0);

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  {column.label}
                </th>
              ))}
              {actions && <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Amallar</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={colSpan} className="px-5 py-12 text-center text-sm text-slate-500">
                  Hozircha ma'lumot mavjud emas.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="align-top">
                  {columns.map((column) => (
                    <td key={`${row.id}-${column.key}`} className="px-5 py-4 text-sm text-slate-600">
                      {column.render ? column.render(row) : row[column.key]}
                    </td>
                  ))}
                  {actions && <td className="px-5 py-4 text-right">{actions(row)}</td>}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
