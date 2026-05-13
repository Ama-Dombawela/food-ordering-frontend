import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Protects routes that require authentication.
// If the user is not authenticated, redirect to the sign-in page.
export const ProtectedRoute: React.FC = () => {
  // Acquire authentication status from the app's AuthContext.
  const { isAuthenticated } = useAuth();

  // If the user is not authenticated, navigate to the sign-in page.
  // `replace` prevents adding the redirect to history (user can't go back to protected URL).
  if (!isAuthenticated) return <Navigate to="/signin" replace />;

  // If authenticated, render the child route element(s).
  return <Outlet />;
};

export default ProtectedRoute;
