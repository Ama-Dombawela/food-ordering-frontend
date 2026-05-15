import axiosInstance from "../api/axiosInstance";
import type { CartDTO } from "../types";

export async function getCart(userId: number): Promise<CartDTO> {
  const response = await axiosInstance.get<{ message: string; data: CartDTO }>(`/api/cart/${userId}`);
  return response.data.data;
}

export async function addToCart(userId: number, foodItemId: number, quantity: number): Promise<CartDTO> {
  const response = await axiosInstance.post<{ foodItemId: number; quantity: number }, { data: { data: CartDTO } }>(
    `/api/cart/${userId}/items`,
    { foodItemId, quantity },
  );
  return response.data.data;
}

export async function removeCartItem(userId: number, itemId: number): Promise<void> {
  await axiosInstance.delete(`/api/cart/${userId}/items/${itemId}`);
}

export async function clearCart(userId: number): Promise<void> {
  await axiosInstance.delete(`/api/cart/${userId}`);
}
