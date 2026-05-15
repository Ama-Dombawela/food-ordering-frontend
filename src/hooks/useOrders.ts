import { useEffect, useState } from "react";
import { getOrdersByUser } from "../services/orderService";
import type { OrderDTO } from "../types";

// Fetches authenticated user orders using the userId stored in localStorage.
export function useOrders() {
  const [orders, setOrders] = useState<OrderDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      const userId = Number(localStorage.getItem("userId"));

      if (!Number.isFinite(userId)) {
        setError("Unable to resolve your user id.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      try {
        setOrders(await getOrdersByUser(userId));
      } catch {
        setError("Unable to load orders.");
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  return { orders, loading, error };
}