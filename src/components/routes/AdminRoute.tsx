import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Route guard that redirects non-admin users away from admin screens.
export default function AdminRoute() {
  const { isAuthenticated, authUser } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (authUser?.role !== "ADMIN") {
    return <Navigate to="/foods" replace />;
  }

  return <Outlet />;
}
