import api from "./api";
import {
  createFallbackPage,
  fallbackEventsItems,
  fallbackFaqs,
  fallbackHomepageSections,
  fallbackNewsItems,
  fallbackSettings,
  fallbackTeachers,
} from "../data/fallbackPublicData";

function matchesCategory(itemCategory, requestedCategory) {
  if (!requestedCategory) return true;
  return String(itemCategory || "").toLowerCase() === String(requestedCategory).toLowerCase();
}

async function withFallback(request, fallback) {
  try {
    return await request();
  } catch {
    return typeof fallback === "function" ? fallback() : fallback;
  }
}

export const publicService = {
  getHomepageSections: async () =>
    withFallback(async () => {
      const data = (await api.get("/homepage/sections")).data;
      if (!Array.isArray(data)) throw new Error("Invalid homepage sections payload");
      return data;
    }, fallbackHomepageSections),

  getPublicSettings: async () =>
    withFallback(async () => {
      const data = (await api.get("/settings/public")).data;
      if (!Array.isArray(data)) throw new Error("Invalid settings payload");
      return data;
    }, fallbackSettings),

  getTeachers: async () =>
    withFallback(async () => {
      const data = (await api.get("/teachers")).data;
      if (!Array.isArray(data)) throw new Error("Invalid teachers payload");
      return data;
    }, fallbackTeachers),

  getFaqs: async (category) =>
    withFallback(async () => {
      const data = (await api.get("/faqs", { params: { category } })).data;
      if (!Array.isArray(data)) throw new Error("Invalid FAQ payload");
      return data;
    }, () => fallbackFaqs.filter((item) => matchesCategory(item.category, category))),

  getGallery: async (category) =>
    withFallback(async () => {
      const data = (await api.get("/gallery", { params: { category } })).data;
      if (!Array.isArray(data)) throw new Error("Invalid gallery payload");
      return data;
    }, []),

  getNews: async (page = 0, size = 6) =>
    withFallback(async () => {
      const data = (await api.get("/news", { params: { page, size } })).data;
      if (!data || !Array.isArray(data.content)) throw new Error("Invalid news payload");
      return data;
    }, () => createFallbackPage(fallbackNewsItems, page, size)),

  getNewsBySlug: async (slug) =>
    withFallback(async () => {
      const data = (await api.get(`/news/${slug}`)).data;
      if (!data || typeof data !== "object" || Array.isArray(data)) throw new Error("Invalid news item payload");
      return data;
    }, () => fallbackNewsItems.find((item) => item.slug === slug) || null),

  getEvents: async (page = 0, size = 6) =>
    withFallback(async () => {
      const data = (await api.get("/events", { params: { page, size } })).data;
      if (!data || !Array.isArray(data.content)) throw new Error("Invalid events payload");
      return data;
    }, () => createFallbackPage(fallbackEventsItems, page, size)),

  getEventBySlug: async (slug) =>
    withFallback(async () => {
      const data = (await api.get(`/events/${slug}`)).data;
      if (!data || typeof data !== "object" || Array.isArray(data)) throw new Error("Invalid event item payload");
      return data;
    }, () => fallbackEventsItems.find((item) => item.slug === slug) || null),

  createAdmission: async (payload) => (await api.post("/admissions", payload)).data,
  createContactMessage: async (payload) => (await api.post("/contact", payload)).data,
};
