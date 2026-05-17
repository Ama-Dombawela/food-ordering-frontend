import { useEffect, useState } from "react";
import Navbar from "../../../components/common/Navbar";
import Footer from "../../../components/common/Footer";
import Spinner from "../../../components/common/Spinner";
import { Badge, Card } from "../../../components/ui";
import { getAllUsers } from "../../../services/userService";
import { getOrdersByUser, updateOrderStatus } from "../../../services/orderService";
import type { OrderDTO, OrderStatus, UserDTO } from "../../../types";
import { formatCurrency, formatDate, formatStatus } from "../../../utils";

// Admin order screen that aggregates orders across all users.
export default function AdminOrderList() {
  const [orders, setOrders] = useState<OrderDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load every user's orders so the admin table presents a global view.
  const load = async () => {
    setLoading(true);
    setError("");

    try {
      const users = await getAllUsers();
  // Handle status changes inline so administrators can update a row without leaving the page.
      const loadedOrders = await Promise.all(users.map((user: UserDTO) => getOrdersByUser(user.id)));
      setOrders(loadedOrders.flat().sort((left, right) => new Date(right.orderDate).getTime() - new Date(left.orderDate).getTime()));
    } catch {
      setError("Unable to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      void load();
    }, 0);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleStatusChange = async (orderId: number, status: OrderStatus) => {
    await updateOrderStatus(orderId, status);
    await load();
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent text-teal-100">
      <Navbar />
      <main className="flex-1 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.35em] text-teal-300">Admin Orders</p>
          <h1 className="mt-2 text-4xl font-semibold text-white">Manage all orders</h1>
        </div>

        {loading ? <Spinner /> : null}
        {error ? <p className="rounded-3xl border border-rose-400/20 bg-rose-400/10 p-4 text-rose-200">{error}</p> : null}

        {/* The table layout keeps order status updates compact and easy to scan. */}
        {!loading && !error ? (
          <Card className="overflow-x-auto p-0">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-teal-800 text-teal-200">
                <tr>
                  <th className="px-4 py-3">Order ID</th>
                  <th className="px-4 py-3">User ID</th>
                  <th className="px-4 py-3">Total Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Update</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-teal-900/70">
                    <td className="px-4 py-3 text-white">{order.id}</td>
                    <td className="px-4 py-3 text-teal-200/80">{order.userId}</td>
                    <td className="px-4 py-3 text-teal-200/80">{formatCurrency(order.totalAmount)}</td>
                    <td className="px-4 py-3"><Badge variant={order.status === "DELIVERED" ? "green" : order.status === "PREPARING" ? "yellow" : order.status === "PLACED" ? "blue" : "red"}>{formatStatus(order.status)}</Badge></td>
                    <td className="px-4 py-3 text-teal-200/80">{formatDate(order.orderDate)}</td>
                    <td className="px-4 py-3">
                      <select value={order.status} onChange={(event) => void handleStatusChange(order.id, event.target.value as OrderStatus)} className="rounded-2xl border border-teal-700 bg-teal-950/70 px-4 py-3 text-sm text-teal-50 outline-none">
                        <option value="PLACED">PLACED</option>
                        <option value="PREPARING">PREPARING</option>
                        <option value="DELIVERED">DELIVERED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
