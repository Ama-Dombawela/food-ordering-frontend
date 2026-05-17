import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../../../components/common/Navbar";
import Footer from "../../../components/common/Footer";
import Spinner from "../../../components/common/Spinner";
import ConfirmModal from "../../../components/common/ConfirmModal";
import { Badge, Button, Card } from "../../../components/ui";
import AdminFoodForm from "./AdminFoodForm";
import { createFood, deleteFood, getAllFoods, updateFood } from "../../../services/foodService";
import { getAllCategories } from "../../../services/categoryService";
import type { CategoryDTO, FoodItemDTO } from "../../../types";
import { formatCurrency, formatStatus } from "../../../utils";
import { getFoodImage } from "../../../utils/foodImage";

// Admin menu management screen showing all foods in a responsive table.
export default function AdminFoodList() {
  const [foods, setFoods] = useState<FoodItemDTO[]>([]);
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [editingFood, setEditingFood] = useState<FoodItemDTO | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<FoodItemDTO | null>(null);

  // Load foods and categories together because the table requires both data sets.
  const load = async () => {
    setLoading(true);
    setError("");

    try {
      const [loadedFoods, loadedCategories] = await Promise.all([getAllFoods(), getAllCategories()]);
  // The same modal handles both creation and editing, so the submit path branches here.
      setFoods(loadedFoods);
      setCategories(loadedCategories);
    } catch {
      setError("Unable to load foods.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      void load();
    }, 0);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleSave = async (data: Omit<FoodItemDTO, "id">) => {
    setSaving(true);
    try {
      if (editingFood) {
        await updateFood(editingFood.id, data);
        toast.success("Food item updated.");
      } else {
        await createFood(data);
        toast.success("Food item created.");
      }
      setOpen(false);
      setEditingFood(null);
      await load();
    } catch {
      toast.error("Unable to save food item.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) {
      return;
    }

    try {
      await deleteFood(deleteTarget.id);
      toast.success("Food item deleted.");
      await load();
    } catch {
      toast.error("Unable to delete food item.");
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent text-teal-100">
      <Navbar />
      <main className="flex-1 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-teal-300">Admin Foods</p>
            <h1 className="mt-2 text-4xl font-semibold text-white">Manage menu items</h1>
          </div>
          <Button type="button" onClick={() => { setEditingFood(null); setOpen(true); }}>Add Food</Button>
        </div>

        {loading ? <Spinner /> : null}
        {error ? <p className="rounded-3xl border border-rose-400/20 bg-rose-400/10 p-4 text-rose-200">{error}</p> : null}

        {/* Keep the food table dense because administrators must review many fields at once. */}
        {!loading && !error ? (
          <Card className="overflow-x-auto p-0">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-teal-800 text-teal-200">
                <tr>
                  <th className="px-4 py-3">Image</th>
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
                    <td className="px-4 py-3">
                      <div className="h-14 w-20 overflow-hidden rounded-xl border border-black/40 bg-black/70">
                        {getFoodImage(food.name) ? <img src={getFoodImage(food.name)} alt={food.name} className="h-full w-full object-cover" /> : null}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-white">{food.name}</td>
                    <td className="px-4 py-3 text-teal-200/80">{food.categoryId}</td>
                    <td className="px-4 py-3 text-teal-200/80">{formatCurrency(food.price)}</td>
                    <td className="px-4 py-3"><Badge variant={food.status === "AVAILABLE" ? "green" : "red"}>{formatStatus(food.status)}</Badge></td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button type="button" variant="secondary" onClick={() => { setEditingFood(food); setOpen(true); }}>Edit</Button>
                        <Button type="button" variant="danger" onClick={() => setDeleteTarget(food)}>Delete</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        ) : null}

        {/* Use a separate modal to keep the create and edit form focused and reusable. */}
        <AdminFoodForm open={open} categories={categories} food={editingFood} loading={saving} onClose={() => setOpen(false)} onSubmit={handleSave} />
        <ConfirmModal
          open={deleteTarget !== null}
          title="Delete Food Item"
          message={`Delete ${deleteTarget?.name ?? "this food item"}? This action cannot be undone.`}
          confirmText="Delete"
          loading={false}
          onConfirm={() => void handleDelete()}
          onCancel={() => setDeleteTarget(null)}
        />
      </main>
      <Footer />
    </div>
  );
}
