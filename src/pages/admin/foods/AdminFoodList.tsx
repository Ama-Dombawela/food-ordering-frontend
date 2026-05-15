import { useEffect, useState } from "react";
import Navbar from "../../../components/common/Navbar";
import Footer from "../../../components/common/Footer";
import Spinner from "../../../components/common/Spinner";
import { Badge, Button, Card } from "../../../components/ui";
import AdminFoodForm from "./AdminFoodForm";
import { createFood, deleteFood, getAllFoods, updateFood } from "../../../services/foodService";
import { getAllCategories } from "../../../services/categoryService";
import type { CategoryDTO, FoodItemDTO } from "../../../types";
import { formatCurrency } from "../../../utils";

// Admin menu management screen showing all foods in a responsive table.
export default function AdminFoodList() {
  const [foods, setFoods] = useState<FoodItemDTO[]>([]);
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [editingFood, setEditingFood] = useState<FoodItemDTO | null>(null);

  const load = async () => {
    setLoading(true);
    setError("");

    try {
      const [loadedFoods, loadedCategories] = await Promise.all([getAllFoods(), getAllCategories()]);
      setFoods(loadedFoods);
      setCategories(loadedCategories);
    } catch {
      setError("Unable to load foods.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const handleSave = async (data: Omit<FoodItemDTO, "id">) => {
    setSaving(true);
    try {
      if (editingFood) {
        await updateFood(editingFood.id, data);
      } else {
        await createFood(data);
      }
      setOpen(false);
      setEditingFood(null);
      await load();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this food item?")) {
      return;
    }

    await deleteFood(id);
    await load();
  };

  return (
    <div className="min-h-screen bg-transparent text-teal-100">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-teal-300">Admin Foods</p>
            <h1 className="mt-2 text-4xl font-semibold text-white">Manage menu items</h1>
          </div>
          <Button type="button" onClick={() => { setEditingFood(null); setOpen(true); }}>Add Food</Button>
        </div>

        {loading ? <Spinner /> : null}
        {error ? <p className="rounded-3xl border border-rose-500/30 bg-rose-500/10 p-4 text-rose-200">{error}</p> : null}

        {!loading && !error ? (
          <Card className="overflow-x-auto p-0">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-teal-800 text-teal-200">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {foods.map((food) => (
                  <tr key={food.id} className="border-b border-teal-900/70">
                    <td className="px-4 py-3 text-white">{food.name}</td>
                    <td className="px-4 py-3 text-teal-200/80">{food.categoryId}</td>
                    <td className="px-4 py-3 text-teal-200/80">{formatCurrency(food.price)}</td>
                    <td className="px-4 py-3"><Badge variant={food.status === "AVAILABLE" ? "green" : "red"}>{food.status}</Badge></td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button type="button" variant="secondary" onClick={() => { setEditingFood(food); setOpen(true); }}>Edit</Button>
                        <Button type="button" variant="danger" onClick={() => void handleDelete(food.id)}>Delete</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        ) : null}

        <AdminFoodForm open={open} categories={categories} food={editingFood} loading={saving} onClose={() => setOpen(false)} onSubmit={handleSave} />
      </main>
      <Footer />
    </div>
  );
}
