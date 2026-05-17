import { Link } from "react-router-dom";
import { Button, Badge, Card } from "../ui";
import type { FoodItemDTO } from "../../types";
import { formatCurrency, formatStatus } from "../../utils";
import { getFoodImage } from "../../utils/foodImage";

interface FoodCardProps {
  food: FoodItemDTO;
  onAddToCart: (foodId: number) => void | Promise<void>;
}

// Visual food card for the menu grid.
export default function FoodCard({ food, onAddToCart }: FoodCardProps) {
  const statusVariant = food.status === "AVAILABLE" ? "green" : "red";
  const imageSrc = getFoodImage(food.name);

  return (
    <Card className="group flex h-full flex-col overflow-hidden p-0">
      {/* Display the food image when one is available, otherwise render a placeholder. */}
      <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-teal-900 to-teal-950">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={food.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-teal-300/70">Food Image</div>
        )}
      </div>
      {/* Present the summary content and the primary actions below the image. */}
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold text-white">{food.name}</h3>
            <p className="mt-1 text-sm leading-6 text-teal-200/70">{food.description}</p>
          </div>
          <Badge variant="blue">#{food.categoryId}</Badge>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-lg font-semibold text-teal-300">{formatCurrency(food.price)}</span>
          <Badge variant={statusVariant}>{formatStatus(food.status)}</Badge>
        </div>
        {/* Details and cart actions are arranged side by side on wider screens. */}
        <div className="grid gap-3 sm:grid-cols-2">
          <Link to={`/food/${food.id}`} className="inline-flex items-center justify-center rounded-full border border-teal-700 px-5 py-3 text-sm font-semibold text-teal-200 transition hover:border-teal-400 hover:text-white">
            View Details
          </Link>
          <Button type="button" onClick={() => void onAddToCart(food.id)} fullWidth disabled={food.status !== "AVAILABLE"}>
            Add to Cart
          </Button>
        </div>
      </div>
    </Card>
  );
}
