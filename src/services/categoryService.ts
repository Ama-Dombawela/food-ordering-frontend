import axiosInstance from "../api/axiosInstance";
import type { CategoryDTO } from "../types";

export async function getAllCategories(): Promise<CategoryDTO[]> {
  const response = await axiosInstance.get<{ message: string; data: CategoryDTO[] }>("/api/categories");
  return response.data.data;
}

export async function getCategoryById(id: number): Promise<CategoryDTO> {
  const response = await axiosInstance.get<{ message: string; data: CategoryDTO }>(`/api/categories/${id}`);
  return response.data.data;
}

export async function createCategory(name: string): Promise<CategoryDTO> {
  const response = await axiosInstance.post<{ name: string }, { data: { data: CategoryDTO } }>("/api/categories", { name });
  return response.data.data;
}

export async function updateCategory(id: number, name: string): Promise<CategoryDTO> {
  const response = await axiosInstance.put<{ name: string }, { data: { data: CategoryDTO } }>(`/api/categories/${id}`, { name });
  return response.data.data;
}

export async function deleteCategory(id: number): Promise<void> {
  await axiosInstance.delete(`/api/categories/${id}`);
}
