import api from "./api";

const paginationParams = (page = 0, size = 10) => ({ params: { page, size } });

export const adminService = {
  getDashboard: async () => (await api.get("/admin/dashboard")).data,
  getNews: async (page, size) => (await api.get("/admin/news", paginationParams(page, size))).data,
  createNews: async (payload) => (await api.post("/admin/news", payload)).data,
  updateNews: async (id, payload) => (await api.put(`/admin/news/${id}`, payload)).data,
  deleteNews: async (id) => (await api.delete(`/admin/news/${id}`)).data,

  getEvents: async (page, size) => (await api.get("/admin/events", paginationParams(page, size))).data,
  createEvent: async (payload) => (await api.post("/admin/events", payload)).data,
  updateEvent: async (id, payload) => (await api.put(`/admin/events/${id}`, payload)).data,
  deleteEvent: async (id) => (await api.delete(`/admin/events/${id}`)).data,

  getGallery: async () => (await api.get("/admin/gallery")).data,
  createGallery: async (payload) => (await api.post("/admin/gallery", payload)).data,
  deleteGallery: async (id) => (await api.delete(`/admin/gallery/${id}`)).data,

  getFaqs: async () => (await api.get("/admin/faqs")).data,
  createFaq: async (payload) => (await api.post("/admin/faqs", payload)).data,
  updateFaq: async (id, payload) => (await api.put(`/admin/faqs/${id}`, payload)).data,
  deleteFaq: async (id) => (await api.delete(`/admin/faqs/${id}`)).data,

  getTeachers: async () => (await api.get("/admin/teachers")).data,
  createTeacher: async (payload) => (await api.post("/admin/teachers", payload)).data,
  updateTeacher: async (id, payload) => (await api.put(`/admin/teachers/${id}`, payload)).data,
  deleteTeacher: async (id) => (await api.delete(`/admin/teachers/${id}`)).data,

  getAdmissions: async (page, size) => (await api.get("/admin/admissions", paginationParams(page, size))).data,
  getMessages: async (page, size) => (await api.get("/admin/messages", paginationParams(page, size))).data,

  getHomepageSections: async () => (await api.get("/admin/homepage/sections")).data,
  updateHomepageSection: async (id, payload) => (await api.put(`/admin/homepage/sections/${id}`, payload)).data,

  getSettings: async () => (await api.get("/admin/settings")).data,
  updateSetting: async (id, payload) => (await api.put(`/admin/settings/${id}`, payload)).data,

  getUsers: async () => (await api.get("/admin/users")).data,
  createUser: async (payload) => (await api.post("/admin/users", payload)).data,
  updateUser: async (id, payload) => (await api.put(`/admin/users/${id}`, payload)).data,
  updateUserStatus: async (id, payload) => (await api.put(`/admin/users/${id}/status`, payload)).data,
  deleteUser: async (id) => (await api.delete(`/admin/users/${id}`)).data,

  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await api.post("/admin/uploads", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },
};
