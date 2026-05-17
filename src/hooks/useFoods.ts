import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getAllFoods, getFoodsByCategory } from "../services/foodService";
import type { FoodItemDTO } from "../types";

// Loads foods and supports filtering by category for the menu page.
export function useFoods() {
  const [foods, setFoods] = useState<FoodItemDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtering, setFiltering] = useState(false);
  const [error, setError] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const requestIdRef = useRef(0);

  const loadFoods = useCallback(async (categoryId: number | null, showFullLoading: boolean) => {
    const requestId = ++requestIdRef.current;

    if (showFullLoading) {
      setLoading(true);
    } else {
      setFiltering(true);
    }

    setError("");

    try {
      const nextFoods = categoryId === null ? await getAllFoods() : await getFoodsByCategory(categoryId);

      if (requestId === requestIdRef.current) {
        setFoods(nextFoods);
        setActiveCategoryId(categoryId);
      }
    } catch {
      if (requestId === requestIdRef.current) {
        setError(categoryId === null ? "Unable to load foods." : "Unable to filter foods.");
      }
    } finally {
      if (requestId === requestIdRef.current) {
        if (showFullLoading) {
          setLoading(false);
        } else {
          setFiltering(false);
        }
      }
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      void loadFoods(null, true);
    }, 0);

    return () => {
      clearTimeout(timer);
    };
  }, [loadFoods]);

  const filterByCategory = useCallback(async (categoryId: number | null) => {
    await loadFoods(categoryId, false);
  }, [loadFoods]);

  return useMemo(
    () => ({ foods, loading, filtering, error, activeCategoryId, filterByCategory }),
    [foods, loading, filtering, error, activeCategoryId, filterByCategory],
  );
}