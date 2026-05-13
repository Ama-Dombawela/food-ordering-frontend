import axiosInstance from "../api/axiosInstance";
import type { FoodItem } from "../types";

// Reads the public food catalog.
export async function getAllFoods(): Promise<FoodItem[]> {
  const response = await axiosInstance.get("/api/v1/food-items");
  return response.data as FoodItem[];
}

// Loads a single food item for the detail view.
export async function getFoodById(id: number): Promise<FoodItem> {
  const response = await axiosInstance.get(`/api/v1/food-items/${id}`);
  return response.data as FoodItem;
}

// Filters foods by category.
export async function getFoodsByCategory(categoryId: number): Promise<FoodItem[]> {
  const response = await axiosInstance.get(`/api/v1/food-items/category/${categoryId}`);
  return response.data as FoodItem[];
}

// Admin-only create endpoint.
export async function createFood(data: Partial<FoodItem>): Promise<FoodItem> {
  const response = await axiosInstance.post("/api/v1/food-items", data);
  return response.data as FoodItem;
}

// Admin-only update endpoint.
export async function updateFood(id: number, data: Partial<FoodItem>): Promise<FoodItem> {
  const response = await axiosInstance.put(`/api/v1/food-items/${id}`, data);
  return response.data as FoodItem;
}

// Admin-only delete endpoint.
export async function deleteFood(id: number): Promise<void> {
  await axiosInstance.delete(`/api/v1/food-items/${id}`);
}
