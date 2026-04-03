import { Navigate, Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminTopbar from "../components/admin/AdminTopbar";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useAuth } from "../context/AuthContext";

export default function AdminLayout() {
  const { user, loading, isAuthenticated, logout } = useAuth();

  if (loading) {
    return <LoadingSpinner label="Admin ma'lumotlari yuklanmoqda..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <AdminSidebar user={user} />
      <div className="flex min-h-screen flex-1 flex-col">
        <AdminTopbar user={user} onLogout={logout} />
        <main className="flex-1 p-5 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
