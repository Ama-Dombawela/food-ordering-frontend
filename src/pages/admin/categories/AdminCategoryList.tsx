import { useEffect, useState } from "react";
import Navbar from "../../../components/common/Navbar";
import Footer from "../../../components/common/Footer";
import Spinner from "../../../components/common/Spinner";
import { Button, Card } from "../../../components/ui";
import AdminCategoryForm from "./AdminCategoryForm";
import { createCategory, deleteCategory, getAllCategories, updateCategory } from "../../../services/categoryService";
import type { CategoryDTO } from "../../../types";

// Admin category management screen.
export default function AdminCategoryList() {
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryDTO | null>(null);

  const load = async () => {
    setLoading(true);
    setError("");

    try {
      setCategories(await getAllCategories());
    } catch {
      setError("Unable to load categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const handleSubmit = async (name: string) => {
    setSaving(true);
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, name);
      } else {
        await createCategory(name);
      }
      setOpen(false);
      setEditingCategory(null);
      await load();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this category?")) {
      return;
    }

    await deleteCategory(id);
    await load();
  };

  return (
    <div className="min-h-screen bg-transparent text-teal-100">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-teal-300">Admin Categories</p>
            <h1 className="mt-2 text-4xl font-semibold text-white">Manage categories</h1>
          </div>
          <Button type="button" onClick={() => { setEditingCategory(null); setOpen(true); }}>Add Category</Button>
        </div>

        {loading ? <Spinner /> : null}
        {error ? <p className="rounded-3xl border border-rose-500/30 bg-rose-500/10 p-4 text-rose-200">{error}</p> : null}

        {!loading && !error ? (
          <Card className="overflow-x-auto p-0">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-teal-800 text-teal-200">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id} className="border-b border-teal-900/70">
                    <td className="px-4 py-3 text-white">{category.name}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button type="button" variant="secondary" onClick={() => { setEditingCategory(category); setOpen(true); }}>Edit</Button>
                        <Button type="button" variant="danger" onClick={() => void handleDelete(category.id)}>Delete</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        ) : null}

        <AdminCategoryForm open={open} category={editingCategory} loading={saving} onClose={() => setOpen(false)} onSubmit={handleSubmit} />
      </main>
      <Footer />
    </div>
  );
}
