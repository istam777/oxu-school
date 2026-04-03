export default function StatsCounter({ value, label }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
      <div className="font-display text-4xl font-semibold text-white">{value}</div>
      <p className="mt-2 text-sm uppercase tracking-[0.18em] text-white/70">{label}</p>
    </div>
  );
}
