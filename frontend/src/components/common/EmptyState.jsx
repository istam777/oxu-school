export default function EmptyState({ title, description }) {
  return (
    <div className="card-panel flex flex-col items-center justify-center px-6 py-14 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-brand-surface text-brand-primary">
        <span className="text-2xl">?</span>
      </div>
      <h3 className="text-xl font-semibold text-brand-primary">{title}</h3>
      <p className="mt-3 max-w-md text-sm leading-7 text-slate-500">{description}</p>
    </div>
  );
}
