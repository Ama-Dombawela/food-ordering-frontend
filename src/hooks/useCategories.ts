import { useEffect, useState } from "react";
import { getAllCategories } from "../services/categoryService";
import type { CategoryDTO } from "../types";

// Fetches all categories once and exposes loading/error state.
export function useCategories() {
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
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

    void load();
  }, []);

  return { categories, loading, error };
}