import { Button, Badge, Card } from "../ui";
import type { OrderDTO } from "../../types";
import { formatCurrency, formatDate, formatStatus } from "../../utils";

interface OrderCardProps {
  order: OrderDTO;
  onViewDetails: (orderId: number) => void;
}

// Summary card for order history lists.
export default function OrderCard({ order, onViewDetails }: OrderCardProps) {
  const badgeVariant =
    order.status === "DELIVERED" ? "green" : order.status === "PREPARING" ? "yellow" : order.status === "PLACED" ? "blue" : "red";

  return (
    <Card className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm text-teal-200/70">Order #{order.id}</p>
        <h3 className="text-xl font-semibold text-white">{formatDate(order.orderDate)}</h3>
        <p className="mt-1 text-sm text-teal-200/70">{formatCurrency(order.totalAmount)}</p>
      </div>
      <Badge variant={badgeVariant}>{formatStatus(order.status)}</Badge>
      <Button type="button" onClick={() => onViewDetails(order.id)}>
        View Details
      </Button>
    </Card>
  );
}
