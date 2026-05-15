import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import Spinner from "../../components/common/Spinner";
import PaymentSummary from "../../components/payment/PaymentSummary";
import { getOrderById } from "../../services/orderService";
import { createPayment } from "../../services/paymentService";
import type { OrderDTO } from "../../types";

// Payment page that settles a single order and returns the user to order history.
export default function Payment() {
  const params = useParams();
  const navigate = useNavigate();
  const orderId = Number(params.orderId);
  const [order, setOrder] = useState<OrderDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      if (!Number.isFinite(orderId)) {
        setError("Invalid order id.");
        setLoading(false);
        return;
      }

      try {
        setOrder(await getOrderById(orderId));
      } catch {
        setError("Unable to load payment summary.");
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [orderId]);

  const handlePayNow = async () => {
    if (!order) {
      return;
    }

    setPaying(true);
    setMessage("");
    setError("");

    try {
      await createPayment(order.id, order.totalAmount, "COMPLETED");
      setMessage("Payment completed successfully. Redirecting to orders...");
      window.setTimeout(() => navigate("/orders"), 2000);
    } catch {
      setError("Unable to process payment.");
    } finally {
      setPaying(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-teal-100">
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.35em] text-teal-300">Payment</p>
          <h1 className="mt-2 text-4xl font-semibold text-white">Complete payment</h1>
        </div>

        {loading ? <Spinner /> : null}
        {error ? <p className="rounded-3xl border border-rose-500/30 bg-rose-500/10 p-4 text-rose-200">{error}</p> : null}
        {message ? <p className="mb-4 rounded-3xl border border-teal-500/30 bg-teal-500/10 p-4 text-teal-200">{message}</p> : null}

        {!loading && !error && order ? <PaymentSummary order={order} onPayNow={handlePayNow} loading={paying} /> : null}
      </main>
      <Footer />
    </div>
  );
}
