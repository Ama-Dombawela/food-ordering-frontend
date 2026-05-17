import { useEffect, useState, type FormEvent } from "react";
import Modal from "../../../components/common/Modal";
import { Button, Input } from "../../../components/ui";
import type { CategoryDTO, FoodItemDTO, FoodItemStatus } from "../../../types";

interface AdminFoodFormProps {
  open: boolean;
  categories: CategoryDTO[];
  food: FoodItemDTO | null;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<FoodItemDTO, "id">) => Promise<void> | void;
}

const emptyState = {
  name: "",
  description: "",
  price: "",
  categoryId: "",
  status: "AVAILABLE" as FoodItemStatus,
};

// Modal form for creating and editing foods in the admin area.
export default function AdminFoodForm({ open, categories, food, loading = false, onClose, onSubmit }: AdminFoodFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [status, setStatus] = useState<FoodItemStatus>("AVAILABLE");
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (food) {
        setName(food.name);
        setDescription(food.description);
        setPrice(String(food.price));
        setCategoryId(String(food.categoryId));
        setStatus(food.status);
      } else {
        setName(emptyState.name);
        setDescription(emptyState.description);
        setPrice(emptyState.price);
        setCategoryId(emptyState.categoryId);
        setStatus(emptyState.status);
      }
    }, 0);

    return () => {
      clearTimeout(timer);
    };
  }, [food, open]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!name.trim() || !description.trim() || !price.trim() || !categoryId.trim()) {
      setError("All fields are required.");
      return;
    }

    await onSubmit({
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      categoryId: Number(categoryId),
      status,
    });
  };

  return (
    <Modal open={open} title={food ? "Edit Food" : "Add Food"} onClose={onClose}>
      <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
        <Input label="Name" placeholder="Food name" value={name} onChange={(event) => setName(event.target.value)} />
        <Input label="Price" type="number" placeholder="0.00" value={price} onChange={(event) => setPrice(event.target.value)} />
        <div className="md:col-span-2">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-teal-200">Description</span>
            <textarea value={description} onChange={(event) => setDescription(event.target.value)} className="min-h-28 w-full rounded-2xl border border-teal-700 bg-teal-950/60 px-4 py-3 text-teal-50 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20" placeholder="Food description" />
          </label>
        </div>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-teal-200">Category</span>
          <select value={categoryId} onChange={(event) => setCategoryId(event.target.value)} className="w-full rounded-2xl border border-teal-700 bg-teal-950/60 px-4 py-3 text-teal-50 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20">
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-teal-200">Status</span>
          <select value={status} onChange={(event) => setStatus(event.target.value as FoodItemStatus)} className="w-full rounded-2xl border border-teal-700 bg-teal-950/60 px-4 py-3 text-teal-50 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20">
            <option value="AVAILABLE">AVAILABLE</option>
            <option value="OUT_OF_STOCK">OUT OF STOCK</option>
          </select>
        </label>
        {error ? <p className="md:col-span-2 text-sm text-rose-200">{error}</p> : null}
        <div className="md:col-span-2 flex items-center justify-end gap-3">
          <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit" loading={loading}>{food ? "Save Food" : "Add Food"}</Button>
        </div>
      </form>
    </Modal>
  );
}
