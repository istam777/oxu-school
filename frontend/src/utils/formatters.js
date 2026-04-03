export const localeMap = {
  uz: "uz-Latn-UZ",
  en: "en-US",
  ru: "ru-RU",
};

function parseDate(value) {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day, 12, 0, 0);
  }
  return new Date(value);
}

export function formatDate(value, language = "uz") {
  const date = parseDate(value);
  if (!date || Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(localeMap[language], {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function formatMonthShort(value, language = "uz") {
  const date = parseDate(value);
  if (!date || Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(localeMap[language], {
    month: "short",
  })
    .format(date)
    .replace(".", "")
    .toUpperCase();
}

export function formatDayOfMonth(value) {
  const date = parseDate(value);
  if (!date || Number.isNaN(date.getTime())) return "";
  return String(date.getDate()).padStart(2, "0");
}

export function formatTime(value, language = "uz") {
  if (!value) return "";
  const [hours = "00", minutes = "00"] = value.split(":");
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  return new Intl.DateTimeFormat(localeMap[language], {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
