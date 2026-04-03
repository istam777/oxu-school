const newsMediaBySlug = {
  "steam-laboratoriya-ishga-tushdi": "/school/11062b_02c751204fe74d6c88da542357f4991d~mv2.avif",
  "xalqaro-debat-turniri": "/school/63fcc8f82f140e513bd4c257_UPSHOT-Torbay-064.webp",
  "kitobxonlik-marafoni": "/school/DSC_0135.webp",
  "matematika-olimpiadasi-golib": "/school/young-students-blue-uniforms-writing-classroom-learning-sitting-desks-concept-education-classroom-students-learning-writing_918839-62569.avif",
};

const eventMediaBySlug = {
  "open-house-day": "/school/1689951010008.jpg",
  "spring-arts-festival": "/school/010.jpg",
  "stem-innovation-challenge": "/school/11062b_02c751204fe74d6c88da542357f4991d~mv2.avif",
  "parent-partnership-forum": "/school/DSC_0135.webp",
};

const homepageSectionMedia = {
  mission: "/school/smiling-school-children-classroom_488220-22550.avif",
  "admissions-banner": "/school/DBF0D9C67BF640D093F8FDF834ED3876.jpg",
  partners: "/school/DSC_0135.webp",
};

function encodeSvg(svg) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg.replace(/\s{2,}/g, " ").trim())}`;
}

function createFacultyPortrait({
  initials,
  accent,
  highlight,
  skin,
  hair,
  jacket,
  shirt,
  badgeText,
}) {
  return encodeSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1120" role="img" aria-label="${initials} faculty portrait">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#081554" />
          <stop offset="55%" stop-color="#17339b" />
          <stop offset="100%" stop-color="#2848b8" />
        </linearGradient>
        <linearGradient id="jacket" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${jacket}" />
          <stop offset="100%" stop-color="#0b195f" />
        </linearGradient>
        <radialGradient id="glow" cx="0" cy="0" r="1" gradientTransform="translate(180 180) rotate(55) scale(520 420)">
          <stop offset="0%" stop-color="rgba(255,255,255,0.22)" />
          <stop offset="100%" stop-color="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>
      <rect width="900" height="1120" rx="54" fill="url(#bg)" />
      <rect x="34" y="34" width="832" height="1052" rx="42" fill="none" stroke="rgba(255,255,255,0.12)" />
      <circle cx="210" cy="170" r="190" fill="url(#glow)" />
      <circle cx="742" cy="214" r="98" fill="rgba(255,255,255,0.1)" />
      <circle cx="728" cy="928" r="168" fill="rgba(216,181,106,0.14)" />
      <path d="M62 876c146-90 278-118 396-84s228 42 380-24v286H62Z" fill="rgba(255,255,255,0.05)" />
      <path d="M306 334c16-124 92-194 176-194 114 0 192 88 192 224-44-36-102-60-178-60-72 0-132 12-190 56Z" fill="${hair}" />
      <ellipse cx="454" cy="404" rx="142" ry="168" fill="${skin}" />
      <path d="M338 418c44-52 102-80 170-80s124 22 176 66c-10 112-94 196-220 196-92 0-160-54-126-182Z" fill="${skin}" />
      <path d="M254 1040c12-154 90-248 204-292 22 26 44 42 66 42 20 0 44-14 72-42 120 44 194 138 210 292Z" fill="url(#jacket)" />
      <path d="M382 732h150l58 88-136 176-138-176Z" fill="${shirt}" />
      <path d="M396 742c28 28 48 42 60 42 12 0 34-14 68-42" fill="none" stroke="${accent}" stroke-linecap="round" stroke-linejoin="round" stroke-width="24" />
      <path d="M316 1018c40-80 88-126 138-126 52 0 98 44 144 126" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="28" stroke-linecap="round" />
      <circle cx="690" cy="188" r="88" fill="rgba(255,255,255,0.92)" stroke="rgba(255,255,255,0.16)" stroke-width="10" />
      <text x="690" y="214" text-anchor="middle" fill="${highlight}" font-family="Manrope, Arial, sans-serif" font-size="64" font-weight="800">${initials}</text>
      <rect x="106" y="912" width="250" height="56" rx="28" fill="rgba(255,255,255,0.12)" />
      <text x="231" y="948" text-anchor="middle" fill="#ffffff" font-family="Manrope, Arial, sans-serif" font-size="24" font-weight="700" letter-spacing="3">${badgeText}</text>
      <path d="M130 220c58-26 118-40 180-40" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="8" stroke-linecap="round" />
      <path d="M126 256c76-24 142-34 214-28" fill="none" stroke="rgba(216,181,106,0.28)" stroke-width="6" stroke-linecap="round" />
    </svg>
  `);
}

const teacherMediaByName = {
  "Dilafruz Qodirova": "/school/teacher-dilafruz-qodirova.jpg",
  "James Walker": "/school/teacher-james-walker.jpg",
  "Saida Ergasheva": "/school/teacher-saida-ergasheva.jpg",
  "Anton Petrovskiy": createFacultyPortrait({
    initials: "AP",
    accent: "#93b2ff",
    highlight: "#17339b",
    skin: "#efd8c6",
    hair: "#312019",
    jacket: "#10246d",
    shirt: "#f7f8fb",
    badgeText: "OSIYO",
  }),
  "Malika Tursunova": "/school/teacher-malika-tursunova.jpg",
  "Otabek Rasulov": createFacultyPortrait({
    initials: "OR",
    accent: "#93b2ff",
    highlight: "#17339b",
    skin: "#edd1bd",
    hair: "#3a281d",
    jacket: "#0c1d60",
    shirt: "#f7f8fb",
    badgeText: "OSIYO",
  }),
};

function isPlaceholderMedia(url) {
  return !url || url.includes("/placeholders/");
}

function getMediaOrFallback(url, fallback) {
  return isPlaceholderMedia(url) ? fallback || url : url;
}

export {
  eventMediaBySlug,
  getMediaOrFallback,
  homepageSectionMedia,
  newsMediaBySlug,
  teacherMediaByName,
};
