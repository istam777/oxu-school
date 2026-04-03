const MEDIA_PLACEHOLDER = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#0d1b6f" />
        <stop offset="100%" stop-color="#17339b" />
      </linearGradient>
      <radialGradient id="glow" cx="0" cy="0" r="1" gradientTransform="translate(260 220) rotate(40) scale(460 340)">
        <stop offset="0%" stop-color="rgba(255,255,255,0.22)" />
        <stop offset="100%" stop-color="rgba(255,255,255,0)" />
      </radialGradient>
    </defs>
    <rect width="1600" height="900" fill="url(#bg)" />
    <circle cx="1290" cy="180" r="150" fill="rgba(216,181,106,0.18)" />
    <circle cx="260" cy="720" r="210" fill="rgba(255,255,255,0.08)" />
    <circle cx="320" cy="240" r="220" fill="url(#glow)" />
    <rect x="148" y="176" width="652" height="420" rx="36" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.12)" />
    <rect x="228" y="268" width="260" height="236" rx="28" fill="rgba(255,255,255,0.84)" />
    <rect x="568" y="250" width="146" height="146" rx="34" fill="rgba(255,255,255,0.86)" />
    <rect x="568" y="448" width="178" height="18" rx="9" fill="rgba(255,255,255,0.72)" />
    <rect x="568" y="488" width="132" height="18" rx="9" fill="rgba(216,181,106,0.84)" />
  </svg>
`)}`;

export function resolveMediaUrl(url) {
  if (!url) return MEDIA_PLACEHOLDER;
  if (url.startsWith("data:")) return url;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/school/")) return url;
  const backend = import.meta.env.VITE_BACKEND_URL;
  if (!backend) return url;
  return `${backend}${url}`;
}
