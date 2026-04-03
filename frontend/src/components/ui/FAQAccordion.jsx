import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function FAQAccordion({ items }) {
  const [openId, setOpenId] = useState(items?.[0]?.id || null);

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="card-panel overflow-hidden">
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="text-base font-semibold text-brand-primary">{item.question}</span>
              <ChevronDown className={`h-5 w-5 text-brand-secondary transition ${isOpen ? "rotate-180" : ""}`} />
            </button>
            {isOpen && <div className="border-t border-slate-100 px-6 py-5 text-sm leading-7 text-slate-600">{item.answer}</div>}
          </div>
        );
      })}
    </div>
  );
}
