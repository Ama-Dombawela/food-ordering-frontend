import axiosInstance from "../api/axiosInstance";
import type { CategoryDTO } from "../types";

// Fetch all food categories for the menu.
export async function getAllCategories(): Promise<CategoryDTO[]> {
  const response = await axiosInstance.get<{ message: string; data: CategoryDTO[] }>("/api/categories");
  return response.data.data;
}

// Fetch a single category by id.
export async function getCategoryById(id: number): Promise<CategoryDTO> {
  const response = await axiosInstance.get<{ message: string; data: CategoryDTO }>(`/api/categories/${id}`);
  return response.data.data;
}

// Create a new food category (admin only).
export async function createCategory(name: string): Promise<CategoryDTO> {
  const response = await axiosInstance.post<{ name: string }, { data: { data: CategoryDTO } }>("/api/categories", { name });
  return response.data.data;
}

// Update a category name (admin only).
export async function updateCategory(id: number, name: string): Promise<CategoryDTO> {
  const response = await axiosInstance.put<{ name: string }, { data: { data: CategoryDTO } }>(`/api/categories/${id}`, { name });
  return response.data.data;
}

// Delete a category (admin only).
export async function deleteCategory(id: number): Promise<void> {
  await axiosInstance.delete(`/api/categories/${id}`);
}
