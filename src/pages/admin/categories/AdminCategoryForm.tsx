import { useEffect, useState, type FormEvent } from "react";
import Modal from "../../../components/common/Modal";
import { Button, Input } from "../../../components/ui";
import type { CategoryDTO } from "../../../types";

interface AdminCategoryFormProps {
  open: boolean;
  category: CategoryDTO | null;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (name: string) => Promise<void> | void;
}

// Modal form for creating and editing categories.
export default function AdminCategoryForm({ open, category, loading = false, onClose, onSubmit }: AdminCategoryFormProps) {
  const [name, setName] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setName(category?.name ?? "");
    }, 0);

    return () => {
      clearTimeout(timer);
    };
  }, [category, open]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim()) {
      return;
    }

    await onSubmit(name.trim());
  };

  return (
    <Modal open={open} title={category ? "Edit Category" : "Add Category"} onClose={onClose}>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input label="Name" placeholder="Category name" value={name} onChange={(event) => setName(event.target.value)} />
        <div className="flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit" loading={loading}>{category ? "Save Category" : "Add Category"}</Button>
        </div>
      </form>
    </Modal>
  );
}
