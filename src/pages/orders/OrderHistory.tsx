import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import Spinner from "../../components/common/Spinner";
import OrderCard from "../../components/order/OrderCard";
import { useOrders } from "../../hooks/useOrders";
import { Card } from "../../components/ui";

// History page that displays the signed-in user's past orders.
export default function OrderHistory() {
  const navigate = useNavigate();
  const { orders, loading, error } = useOrders();

  return (
    <div className="min-h-screen bg-transparent text-teal-100">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.35em] text-teal-300">Orders</p>
          <h1 className="mt-2 text-4xl font-semibold text-white">Order history</h1>
        </div>
        {loading ? <Spinner /> : null}
        {error ? <p className="rounded-3xl border border-rose-500/30 bg-rose-500/10 p-4 text-rose-200">{error}</p> : null}
        {!loading && !error ? (
          orders.length === 0 ? (
            <Card>
              <p className="text-teal-200/80">No orders yet.</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} onViewDetails={(orderId) => navigate(`/orders/${orderId}`)} />
              ))}
            </div>
          )
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
