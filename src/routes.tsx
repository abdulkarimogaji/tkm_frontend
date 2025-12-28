import { Route, Routes } from "react-router";
import { useAuthContext } from "./context/auth";
import LoginPage from "./pages/Auth/LoginPage";
import StaffSidebar from "./components/StaffSidebar";
import StaffDashboardPage from "./pages/Staff/Dashboard";
import StaffCustomersPage from "./pages/Staff/Customers";
import AdminSidebar from "./components/AdminSidebar";
import AdminDashboardPage from "./pages/Admin/Dashboard";
import AdminCustomersPage from "./pages/Admin/Customers";
import AdminTicketsPage from "./pages/Admin/Tickets";
import AdminIntegrationsPage from "./pages/Admin/Integrations";

function renderSidebar(role: string) {
  switch (role) {
    case "customer":
      return null;
    case "staff":
      return <StaffSidebar />;
    case "admin":
      return <AdminSidebar />;
    default:
      return null;
  }
}

function renderRoutes(role: string) {
  switch (role) {
    case "customer":
      return (
        <Routes>
          <Route path="*" element={null} />
        </Routes>
      );
    case "staff":
      return (
        <Routes>
          <Route path="/dashboard" element={<StaffDashboardPage />} />
          <Route path="/customers" element={<StaffCustomersPage />} />

          <Route path="*" element={null} />
        </Routes>
      );
    case "admin":
      return (
        <Routes>
          <Route path="/dashboard" element={<AdminDashboardPage />} />
          <Route path="/customers" element={<AdminCustomersPage />} />
          <Route path="/tickets" element={<AdminTicketsPage />} />

          <Route path="/integrations" element={<AdminIntegrationsPage />} />
          <Route path="*" element={null} />
        </Routes>
      );

    default:
      return (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={null} />
        </Routes>
      );
  }
}

function PageRoutes() {
  const authState = useAuthContext();

  return (
    <div className="flex">
      {authState?.isAuthenticated ? renderSidebar(authState.role) : null}
      <div className="grow">
        {!authState?.isAuthenticated
          ? renderRoutes("none")
          : renderRoutes(authState.role)}
      </div>
    </div>
  );
}

export default PageRoutes;
