import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Protects admin-only routes by checking authentication and admin role.
export const AdminRoute: React.FC = () => {
  // Read both authentication and role flag from AuthContext.
  const { isAuthenticated, isAdmin } = useAuth();

  // If not authenticated, redirect to sign-in so they can log in.
  if (!isAuthenticated) return <Navigate to="/signin" replace />;

  // If authenticated but not an admin, redirect to home — user lacks permission.
  if (!isAdmin) return <Navigate to="/home" replace />;

  // User is authenticated and an admin: render nested admin routes.
  return <Outlet />;
};

export default AdminRoute;
