import { Button, Card } from "../ui";
import type { CategoryDTO } from "../../types";

interface AdminCategoryCardProps {
  category: CategoryDTO;
  onEdit: (category: CategoryDTO) => void;
  onDelete: (id: number) => void;
}

// Category row card for admin management views.
export default function AdminCategoryCard({ category, onEdit, onDelete }: AdminCategoryCardProps) {
  return (
    <Card className="flex items-center justify-between gap-4">
      <h3 className="text-lg font-semibold text-white">{category.name}</h3>
      <div className="flex gap-3">
        <Button type="button" variant="secondary" onClick={() => onEdit(category)}>Edit</Button>
        <Button type="button" variant="danger" onClick={() => onDelete(category.id)}>Delete</Button>
      </div>
    </Card>
  );
}
