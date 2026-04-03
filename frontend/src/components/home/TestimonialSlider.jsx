import { useEffect, useState } from "react";

export default function TestimonialSlider({ testimonials, language, pick }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!testimonials?.length) return undefined;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [testimonials]);

  if (!testimonials?.length) return null;

  const active = testimonials[activeIndex];

  return (
    <div className="card-panel relative overflow-hidden p-8 sm:p-10">
      <div className="absolute right-0 top-0 h-36 w-36 rounded-full bg-brand-gold/10 blur-2xl" />
      <div className="relative">
        <p className="font-display text-3xl font-semibold leading-relaxed text-brand-primary sm:text-4xl">
          "{pick(active.quote)}"
        </p>
        <div className="mt-8 flex items-center justify-between gap-5">
          <div>
            <p className="text-lg font-semibold text-brand-primary">{active.name}</p>
            <p className="text-sm text-slate-500">{pick(active.role)}</p>
          </div>
          <div className="flex gap-2">
            {testimonials.map((item, index) => (
              <button
                key={`${item.name}-${index}`}
                type="button"
                aria-label={`${language}-testimonial-${index + 1}`}
                onClick={() => setActiveIndex(index)}
                className={`h-3 rounded-full transition ${
                  index === activeIndex ? "w-10 bg-brand-primary" : "w-3 bg-slate-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
