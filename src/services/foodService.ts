import axiosInstance from "../api/axiosInstance";
import type { FoodItemDTO, FoodItemStatus } from "../types";

export async function getAllFoods(): Promise<FoodItemDTO[]> {
  const response = await axiosInstance.get<{ message: string; data: FoodItemDTO[] }>("/api/foods");
  return response.data.data;
}

export async function getFoodById(id: number): Promise<FoodItemDTO> {
  const response = await axiosInstance.get<{ message: string; data: FoodItemDTO }>(`/api/foods/${id}`);
  return response.data.data;
}

export async function getFoodsByCategory(categoryId: number): Promise<FoodItemDTO[]> {
  const response = await axiosInstance.get<{ message: string; data: FoodItemDTO[] }>(`/api/foods/category/${categoryId}`);
  return response.data.data;
}

export async function getFoodsByStatus(status: FoodItemStatus): Promise<FoodItemDTO[]> {
  const response = await axiosInstance.get<{ message: string; data: FoodItemDTO[] }>(`/api/foods/status/${status}`);
  return response.data.data;
}

export async function createFood(data: Omit<FoodItemDTO, "id">): Promise<FoodItemDTO> {
  const response = await axiosInstance.post<Omit<FoodItemDTO, "id">, { data: { data: FoodItemDTO } }>("/api/foods", data);
  return response.data.data;
}

export async function updateFood(id: number, data: Omit<FoodItemDTO, "id">): Promise<FoodItemDTO> {
  const response = await axiosInstance.put<Omit<FoodItemDTO, "id">, { data: { data: FoodItemDTO } }>(`/api/foods/${id}`, data);
  return response.data.data;
}

export async function deleteFood(id: number): Promise<void> {
  await axiosInstance.delete(`/api/foods/${id}`);
}
