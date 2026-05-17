import { Button, Badge, Card } from "../ui";
import type { FoodItemDTO } from "../../types";
import { formatCurrency, formatStatus } from "../../utils";
import { getFoodImage } from "../../utils/foodImage";

interface AdminFoodCardProps {
  food: FoodItemDTO;
  onEdit: (food: FoodItemDTO) => void;
  onDelete: (id: number) => void;
}

// Admin table row card for food management screens.
export default function AdminFoodCard({ food, onEdit, onDelete }: AdminFoodCardProps) {
  const imageSrc = getFoodImage(food.name);

  return (
    <Card className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {/* Show the food identity and preview image in a single compact block. */}
      <div className="flex items-center gap-4">
        <div className="h-16 w-24 overflow-hidden rounded-2xl border border-black/40 bg-black/70">
          {imageSrc ? (
            <img src={imageSrc} alt={food.name} className="h-full w-full object-cover" />
          ) : null}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{food.name}</h3>
          <p className="text-sm text-teal-200/70">Category ID {food.categoryId}</p>
        </div>
      </div>
      {/* Keep administrative actions adjacent to the record they affect. */}
      <div className="flex items-center gap-3">
        <span className="text-teal-300">{formatCurrency(food.price)}</span>
        <Badge variant={food.status === "AVAILABLE" ? "green" : "red"}>{formatStatus(food.status)}</Badge>
        <Button type="button" variant="secondary" onClick={() => onEdit(food)}>Edit</Button>
        <Button type="button" variant="danger" onClick={() => onDelete(food.id)}>Delete</Button>
      </div>
    </Card>
  );
}
