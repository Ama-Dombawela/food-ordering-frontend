import { Button, Card } from "../ui";
import type { CartItemDTO, FoodItemDTO } from "../../types";
import { formatCurrency } from "../../utils";

interface CartItemProps {
  cartItem: CartItemDTO;
  foodItem: FoodItemDTO;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}

// Cart row component with quantity controls and totals.
export default function CartItem({ cartItem, foodItem, onIncrement, onDecrement, onRemove }: CartItemProps) {
  return (
    <Card className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h3 className="text-lg font-semibold text-white">{foodItem.name}</h3>
        <p className="text-sm text-teal-200/70">Unit price {formatCurrency(foodItem.price)}</p>
      </div>
      <div className="flex items-center gap-3">
        <Button type="button" variant="secondary" onClick={onDecrement}>-</Button>
        <span className="min-w-8 text-center text-lg font-semibold text-white">{cartItem.quantity}</span>
        <Button type="button" variant="secondary" onClick={onIncrement}>+</Button>
      </div>
      <div className="text-right">
        <p className="text-sm text-teal-200/70">Total</p>
        <p className="text-lg font-semibold text-teal-300">{formatCurrency(foodItem.price * cartItem.quantity)}</p>
      </div>
      <Button type="button" variant="danger" onClick={onRemove}>Remove</Button>
    </Card>
  );
}
