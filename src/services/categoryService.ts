import axiosInstance from "../api/axiosInstance";
import type { Category } from "../types";

// Returns every category used to organize food items.
export async function getAllCategories(): Promise<Category[]> {
  const response = await axiosInstance.get("/api/v1/categories");
  return response.data as Category[];
}

// Looks up a single category by id.
export async function getCategoryById(id: number): Promise<Category> {
  const response = await axiosInstance.get(`/api/v1/categories/${id}`);
  return response.data as Category;
}

// Admin-only create endpoint.
export async function createCategory(data: Partial<Category>): Promise<Category> {
  const response = await axiosInstance.post("/api/v1/categories", data);
  return response.data as Category;
}

// Admin-only update endpoint.
export async function updateCategory(id: number, data: Partial<Category>): Promise<Category> {
  const response = await axiosInstance.put(`/api/v1/categories/${id}`, data);
  return response.data as Category;
}

// Admin-only delete endpoint.
export async function deleteCategory(id: number): Promise<void> {
  await axiosInstance.delete(`/api/v1/categories/${id}`);
}
