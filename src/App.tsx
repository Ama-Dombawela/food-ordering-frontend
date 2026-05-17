import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import AdminRoute from "./components/routes/AdminRoute";
import Landing from "./pages/Landing";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import FoodList from "./pages/food/FoodList";
import FoodDetail from "./pages/food/FoodDetail";
import Cart from "./pages/cart/Cart";
import OrderHistory from "./pages/orders/OrderHistory";
import OrderDetail from "./pages/orders/OrderDetail";
import Payment from "./pages/payment/Payment";
import UserProfile from "./pages/user/UserProfile";
import AdminFoodList from "./pages/admin/foods/AdminFoodList";
import AdminCategoryList from "./pages/admin/categories/AdminCategoryList";
import AdminOrderList from "./pages/admin/orders/AdminOrderList";
import AdminUserList from "./pages/admin/users/AdminUserList";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/menu" element={<FoodList />} />
        <Route path="/foods" element={<FoodList />} />
        <Route path="/food/:id" element={<FoodDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/orders/:id" element={<OrderDetail />} />
        <Route path="/payment/:orderId" element={<Payment />} />
        <Route path="/profile" element={<UserProfile />} />
      </Route>

      <Route element={<AdminRoute />}>
        <Route path="/admin/foods" element={<AdminFoodList />} />
        <Route path="/admin/categories" element={<AdminCategoryList />} />
        <Route path="/admin/orders" element={<AdminOrderList />} />
        <Route path="/admin/users" element={<AdminUserList />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}