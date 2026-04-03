import api from "./api";

export const publicService = {
  getHomepageSections: async () => (await api.get("/homepage/sections")).data,
  getPublicSettings: async () => (await api.get("/settings/public")).data,
  getTeachers: async () => (await api.get("/teachers")).data,
  getFaqs: async (category) => (await api.get("/faqs", { params: { category } })).data,
  getGallery: async (category) => (await api.get("/gallery", { params: { category } })).data,
  getNews: async (page = 0, size = 6) => (await api.get("/news", { params: { page, size } })).data,
  getNewsBySlug: async (slug) => (await api.get(`/news/${slug}`)).data,
  getEvents: async (page = 0, size = 6) => (await api.get("/events", { params: { page, size } })).data,
  getEventBySlug: async (slug) => (await api.get(`/events/${slug}`)).data,
  createAdmission: async (payload) => (await api.post("/admissions", payload)).data,
  createContactMessage: async (payload) => (await api.post("/contact", payload)).data,
};
