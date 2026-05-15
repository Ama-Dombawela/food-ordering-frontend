import { Badge, Card } from "../ui";
import type { OrderDTO } from "../../types";
import { formatCurrency, formatDate } from "../../utils";

interface AdminOrderCardProps {
  order: OrderDTO;
  onChangeStatus: (id: number, status: OrderDTO["status"]) => void;
}

// Admin order row card with status management.
export default function AdminOrderCard({ order, onChangeStatus }: AdminOrderCardProps) {
  return (
    <Card className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h3 className="text-lg font-semibold text-white">Order #{order.id}</h3>
        <p className="text-sm text-teal-200/70">User ID {order.userId}</p>
        <p className="text-sm text-teal-200/70">{formatDate(order.orderDate)}</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-teal-300">{formatCurrency(order.totalAmount)}</span>
        <Badge variant={order.status === "DELIVERED" ? "green" : order.status === "PREPARING" ? "yellow" : order.status === "PLACED" ? "blue" : "red"}>{order.status}</Badge>
        <select value={order.status} onChange={(event) => onChangeStatus(order.id, event.target.value as OrderDTO["status"])} className="rounded-2xl border border-teal-700 bg-teal-950/70 px-4 py-3 text-sm text-teal-50 outline-none">
          <option value="PLACED">PLACED</option>
          <option value="PREPARING">PREPARING</option>
          <option value="DELIVERED">DELIVERED</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>
      </div>
    </Card>
  );
}
