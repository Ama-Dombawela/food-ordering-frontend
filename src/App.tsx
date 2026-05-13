import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

// Main application routing. Public routes are accessible to anyone;
// protected routes require authentication; admin routes require admin role.
export default function App(): JSX.Element {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/signin" element={<div>Sign In Page</div>} />
      <Route path="/signup" element={<div>Sign Up Page</div>} />

      {/* Protected routes: user must be authenticated to access these. */}
      <Route element={<ProtectedRoute />}> 
        <Route path="/home" element={<div>Home / Food List</div>} />
        <Route path="/cart" element={<div>Cart</div>} />
        <Route path="/orders" element={<div>Orders</div>} />
        <Route path="/orders/:id" element={<div>Order Details</div>} />
        <Route path="/payment/:orderId" element={<div>Payment</div>} />
        <Route path="/profile" element={<div>Profile</div>} />
      </Route>

      {/* Admin routes: require authenticated admin user. */}
      <Route element={<AdminRoute />}> 
        <Route path="/admin/foods" element={<div>Admin - Foods</div>} />
        <Route path="/admin/categories" element={<div>Admin - Categories</div>} />
        <Route path="/admin/orders" element={<div>Admin - Orders</div>} />
        <Route path="/admin/users" element={<div>Admin - Users</div>} />
      </Route>

      {/* Catch-all: redirect unknown routes to sign-in. */}
      <Route path="*" element={<Navigate to="/signin" replace />} />
    </Routes>
  );
}