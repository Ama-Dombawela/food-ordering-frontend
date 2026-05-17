import { Button, Card, Badge } from "../ui";
import type { OrderDTO } from "../../types";
import { formatCurrency, formatDate, formatStatus } from "../../utils";

interface PaymentSummaryProps {
  order: OrderDTO;
  onPayNow: () => void | Promise<void>;
  loading?: boolean;
}

// Payment summary card used on the payment page.
export default function PaymentSummary({ order, onPayNow, loading = false }: PaymentSummaryProps) {
  return (
    <Card className="space-y-4">
      {/* Present the order identity and status before the payment total. */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-teal-200/70">Order #{order.id}</p>
          <h3 className="text-xl font-semibold text-white">{formatDate(order.orderDate)}</h3>
        </div>
        <Badge variant={order.status === "DELIVERED" ? "green" : order.status === "PREPARING" ? "yellow" : order.status === "PLACED" ? "blue" : "red"}>
          {formatStatus(order.status)}
        </Badge>
      </div>
      {/* Highlight the amount due so the payment action remains unambiguous. */}
      <div className="rounded-2xl border border-teal-800 bg-teal-950/70 p-4">
        <p className="text-sm text-teal-200/70">Total Amount</p>
        <p className="mt-1 text-3xl font-semibold text-teal-300">{formatCurrency(order.totalAmount)}</p>
      </div>
      <Button type="button" onClick={() => void onPayNow()} loading={loading} fullWidth>
        Pay Now
      </Button>
    </Card>
  );
}
