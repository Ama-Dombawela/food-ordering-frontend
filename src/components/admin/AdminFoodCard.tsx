import { Button, Badge, Card } from "../ui";
import type { FoodItemDTO } from "../../types";
import { formatCurrency } from "../../utils";

interface AdminFoodCardProps {
  food: FoodItemDTO;
  onEdit: (food: FoodItemDTO) => void;
  onDelete: (id: number) => void;
}

// Admin table row card for food management screens.
export default function AdminFoodCard({ food, onEdit, onDelete }: AdminFoodCardProps) {
  return (
    <Card className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h3 className="text-lg font-semibold text-white">{food.name}</h3>
        <p className="text-sm text-teal-200/70">Category ID {food.categoryId}</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-teal-300">{formatCurrency(food.price)}</span>
        <Badge variant={food.status === "AVAILABLE" ? "green" : "red"}>{food.status}</Badge>
        <Button type="button" variant="secondary" onClick={() => onEdit(food)}>Edit</Button>
        <Button type="button" variant="danger" onClick={() => onDelete(food.id)}>Delete</Button>
      </div>
    </Card>
  );
}
