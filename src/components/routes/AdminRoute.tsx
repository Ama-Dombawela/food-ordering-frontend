import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

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
