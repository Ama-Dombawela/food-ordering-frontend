import { Button } from "../ui";
import type { CategoryDTO } from "../../types";

interface FoodFilterProps {
  categories: CategoryDTO[];
  activeCategoryId: number | null;
  loading?: boolean;
  onChange: (categoryId: number | null) => void;
}

// Filter buttons for narrowing the menu by category.
export default function FoodFilter({ categories, activeCategoryId, loading = false, onChange }: FoodFilterProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <Button type="button" variant={activeCategoryId === null ? "primary" : "secondary"} disabled={loading} onClick={() => onChange(null)}>
        All
      </Button>
      {categories.map((category) => (
        <Button
          key={category.id}
          type="button"
          variant={activeCategoryId === category.id ? "primary" : "secondary"}
          disabled={loading}
          onClick={() => onChange(category.id)}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}
