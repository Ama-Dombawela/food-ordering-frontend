import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import { getOrderById } from "../../services/orderService";
import { getPaymentByOrderId } from "../../services/paymentService";
import { getFoodById } from "../../services/foodService";
import type { FoodItemDTO, OrderDTO, OrderItemDTO, PaymentDTO, OrderStatus } from "../../types";
import { formatStatus } from "../../utils";

interface DetailedOrderItem extends OrderItemDTO {
  food: FoodItemDTO;
}

const statusClasses: Record<OrderStatus, string> = {
  PLACED: "bg-teal-500/15 text-teal-200 ring-teal-500/40",
  PREPARING: "bg-teal-500/20 text-teal-100 ring-teal-400/40",
  DELIVERED: "bg-teal-500/15 text-teal-200 ring-teal-500/40",
  CANCELLED: "bg-rose-500/15 text-rose-300 ring-rose-500/30",
};

// Order detail page that merges order, payment, and line-item data.
export default function OrderDetail() {
  const params = useParams();
  const orderId = Number(params.id);
  const [order, setOrder] = useState<OrderDTO | null>(null);
  const [payment, setPayment] = useState<PaymentDTO | null>(null);
  const [items, setItems] = useState<DetailedOrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const total = useMemo(() => order?.totalAmount ?? 0, [order]);

  // Load the order, payment, and line-item data together to maintain consistency.
  useEffect(() => {
    const initialize = async () => {
      if (!Number.isFinite(orderId)) {
        setError("Invalid order id.");
        setLoading(false);
        return;
      }

      try {
        const loadedOrder = await getOrderById(orderId);
        const loadedPayment = await getPaymentByOrderId(orderId);
        const loadedItems = await Promise.all(
          loadedOrder.orderItems.map(async (item) => ({
            ...item,
            food: await getFoodById(item.foodItemId),
          })),
        );

        setOrder(loadedOrder);
        setPayment(loadedPayment);
        setItems(loadedItems);
      } catch {
        setError("Unable to load order details.");
      } finally {
        setLoading(false);
      }
    };

    void initialize();
  }, [orderId]);

  return (
    <div className="flex flex-col min-h-screen bg-transparent text-teal-100">
      <Navbar />
      <main className="flex-1 mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <p className="text-sm uppercase tracking-[0.3em] text-teal-300">Order details</p>
          <h2 className="mt-2 text-4xl font-semibold text-white">Order #{params.id}</h2>
        </div>

        {loading ? <p className="rounded-3xl border border-teal-800 bg-teal-950/70 p-6 text-teal-200">Loading order details...</p> : null}
        {error ? <p className="mb-6 rounded-3xl border border-rose-500/30 bg-rose-500/10 p-4 text-rose-200">{error}</p> : null}

        {!loading && !error && order && payment ? (
          <div className="space-y-6">
            {/* Present summary cards first, followed by the item table. */}
            <section className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-teal-800 bg-teal-950/70 p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-teal-300">Order</p>
                <div className="mt-4 space-y-3 text-sm text-teal-200/80">
                  <p>
                    <span className="text-teal-200/60">Date:</span> {new Date(order.orderDate).toLocaleString()}
                  </p>
                  <p>
                    <span className="text-teal-200/60">Status:</span>{" "}
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] ring-1 ${statusClasses[order.status]}`}>
                      {formatStatus(order.status)}
                    </span>
                  </p>
                  <p>
                    <span className="text-teal-200/60">Total:</span> ${total.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="rounded-3xl border border-teal-800 bg-teal-950/70 p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-teal-300">Payment</p>
                <div className="mt-4 space-y-3 text-sm text-teal-200/80">
                  <p>
                    <span className="text-teal-200/60">Amount:</span> ${payment.amount.toFixed(2)}
                  </p>
                  <p>
                    <span className="text-teal-200/60">Status:</span> {formatStatus(payment.status)}
                  </p>
                  <p>
                    <span className="text-teal-200/60">Date:</span> {new Date(payment.paymentDate).toLocaleString()}
                  </p>
                </div>
              </div>
            </section>

            {/* Line items remain in a table because quantities and subtotals are easiest to review there. */}
            <section className="overflow-hidden rounded-3xl border border-teal-800 bg-teal-950/70">
              <table className="min-w-full divide-y divide-teal-800 text-left text-sm">
                <thead className="bg-teal-950/80 text-teal-200">
                  <tr>
                    <th className="px-4 py-3">Food</th>
                    <th className="px-4 py-3">Quantity</th>
                    <th className="px-4 py-3">Unit Price</th>
                    <th className="px-4 py-3">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-teal-900/70">
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 py-4 text-white">{item.food.name}</td>
                      <td className="px-4 py-4 text-teal-200/80">{item.quantity}</td>
                      <td className="px-4 py-4 text-teal-200/80">${item.price.toFixed(2)}</td>
                      <td className="px-4 py-4 text-teal-200/80">${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <Link className="inline-flex rounded-full bg-teal-500 px-5 py-3 text-sm font-semibold text-teal-50" to="/orders">
              Back to Orders
            </Link>
          </div>
        ) : null}
      </main>
    </div>
  );
}