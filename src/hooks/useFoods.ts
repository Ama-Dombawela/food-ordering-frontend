import { useEffect, useMemo, useState } from "react";
import { getAllFoods, getFoodsByCategory } from "../services/foodService";
import type { FoodItemDTO } from "../types";

// Loads foods and supports filtering by category for the menu page.
export function useFoods() {
  const [foods, setFoods] = useState<FoodItemDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");

      try {
        setFoods(await getAllFoods());
      } catch {
        setError("Unable to load foods.");
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  const filterByCategory = async (categoryId: number | null) => {
    setActiveCategoryId(categoryId);
    setLoading(true);
    setError("");

    try {
      setFoods(categoryId === null ? await getAllFoods() : await getFoodsByCategory(categoryId));
    } catch {
      setError("Unable to filter foods.");
    } finally {
      setLoading(false);
    }
  };

  return useMemo(
    () => ({ foods, loading, error, activeCategoryId, filterByCategory }),
    [foods, loading, error, activeCategoryId],
  );
}