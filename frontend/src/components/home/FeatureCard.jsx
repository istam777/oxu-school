export default function FeatureCard({ title, text }) {
  return (
    <article className="group card-panel h-full p-7">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-surface text-brand-primary transition duration-500 group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-white">
        <span className="h-2 w-6 rounded-full bg-brand-gold" />
      </div>
      <h3 className="text-xl font-semibold text-brand-primary transition duration-300 group-hover:text-brand-secondary">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-600">{text}</p>
    </article>
  );
}
