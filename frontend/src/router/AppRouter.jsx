import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import AdminLayout from "../layouts/AdminLayout";
import HomePage from "../pages/public/HomePage";
import AboutPage from "../pages/public/AboutPage";
import AdmissionsPage from "../pages/public/AdmissionsPage";
import AcademicsPage from "../pages/public/AcademicsPage";
import StudentLifePage from "../pages/public/StudentLifePage";
import NewsPage from "../pages/public/NewsPage";
import NewsDetailsPage from "../pages/public/NewsDetailsPage";
import EventsPage from "../pages/public/EventsPage";
import EventDetailsPage from "../pages/public/EventDetailsPage";
import GalleryPage from "../pages/public/GalleryPage";
import FAQPage from "../pages/public/FAQPage";
import ContactPage from "../pages/public/ContactPage";
import NotFoundPage from "../pages/public/NotFoundPage";
import AdminLoginPage from "../pages/admin/AdminLoginPage";
import DashboardPage from "../pages/admin/DashboardPage";
import NewsManagementPage from "../pages/admin/NewsManagementPage";
import EventsManagementPage from "../pages/admin/EventsManagementPage";
import GalleryManagementPage from "../pages/admin/GalleryManagementPage";
import FAQManagementPage from "../pages/admin/FAQManagementPage";
import TeacherManagementPage from "../pages/admin/TeacherManagementPage";
import AdmissionsManagementPage from "../pages/admin/AdmissionsManagementPage";
import MessagesManagementPage from "../pages/admin/MessagesManagementPage";
import HomepageContentPage from "../pages/admin/HomepageContentPage";
import SettingsPage from "../pages/admin/SettingsPage";
import UsersManagementPage from "../pages/admin/UsersManagementPage";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return null;
}

export default function AppRouter() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="admissions" element={<AdmissionsPage />} />
          <Route path="academics" element={<AcademicsPage />} />
          <Route path="student-life" element={<StudentLifePage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="news/:slug" element={<NewsDetailsPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="events/:slug" element={<EventDetailsPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>

        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="news" element={<NewsManagementPage />} />
          <Route path="events" element={<EventsManagementPage />} />
          <Route path="gallery" element={<GalleryManagementPage />} />
          <Route path="faqs" element={<FAQManagementPage />} />
          <Route path="teachers" element={<TeacherManagementPage />} />
          <Route path="admissions" element={<AdmissionsManagementPage />} />
          <Route path="messages" element={<MessagesManagementPage />} />
          <Route path="homepage" element={<HomepageContentPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="users" element={<UsersManagementPage />} />
        </Route>

        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
