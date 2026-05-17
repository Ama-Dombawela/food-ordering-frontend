import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../../../components/common/Navbar";
import Footer from "../../../components/common/Footer";
import Spinner from "../../../components/common/Spinner";
import ConfirmModal from "../../../components/common/ConfirmModal";
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
  const [deleteTarget, setDeleteTarget] = useState<CategoryDTO | null>(null);

  // Load categories on mount and after create, update, or delete operations.
  const load = async () => {
    setLoading(true);
    setError("");

    try {
      setCategories(await getAllCategories());
  // Reuse the same form for creation and editing, based on the current selection.
    } catch {
      setError("Unable to load categories.");
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

  const handleSubmit = async (name: string) => {
    setSaving(true);
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, name);
        toast.success("Category updated.");
      } else {
        await createCategory(name);
        toast.success("Category created.");
      }
      setOpen(false);
      setEditingCategory(null);
      await load();
    } catch {
      toast.error("Unable to save category.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) {
      return;
    }

    try {
      await deleteCategory(deleteTarget.id);
      toast.success("Category deleted.");
      await load();
    } catch {
      toast.error("Unable to delete category.");
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent text-teal-100">
      <Navbar />
      <main className="flex-1 mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-teal-300">Admin Categories</p>
            <h1 className="mt-2 text-4xl font-semibold text-white">Manage categories</h1>
          </div>
          <Button type="button" onClick={() => { setEditingCategory(null); setOpen(true); }}>Add Category</Button>
        </div>

        {loading ? <Spinner /> : null}
        {error ? <p className="rounded-3xl border border-rose-400/20 bg-rose-400/10 p-4 text-rose-200">{error}</p> : null}

        {/* Keep table actions inline because category rows are short and straightforward. */}
        {!loading && !error ? (
          <Card className="overflow-x-auto p-0">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-teal-800 text-teal-200">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id} className="border-b border-teal-900/70">
                    <td className="px-4 py-3 text-white">{category.name}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex gap-2 justify-end">
                        <Button type="button" variant="secondary" onClick={() => { setEditingCategory(category); setOpen(true); }}>Edit</Button>
                        <Button type="button" variant="danger" onClick={() => setDeleteTarget(category)}>Delete</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        ) : null}

        {/* The modal form reuses the same state for both add and edit workflows. */}
        <AdminCategoryForm open={open} category={editingCategory} loading={saving} onClose={() => setOpen(false)} onSubmit={handleSubmit} />
        <ConfirmModal
          open={deleteTarget !== null}
          title="Delete Category"
          message={`Delete ${deleteTarget?.name ?? "this category"}? This action cannot be undone.`}
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
