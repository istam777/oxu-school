import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("osiyo_admin_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    const contentType = response.headers?.["content-type"] || "";
    const isHtmlString =
      typeof response.data === "string" && /<!doctype html|<html/i.test(response.data);

    if (isHtmlString || contentType.includes("text/html")) {
      return Promise.reject(new Error("Invalid API response: HTML received instead of JSON"));
    }

    return response;
  },
  (error) => Promise.reject(error)
);

export default api;
