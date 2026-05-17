import axiosInstance from "../api/axiosInstance";
import type { CartDTO } from "../types";

// Fetch the user's current cart with all items and totals.
export async function getCart(userId: number): Promise<CartDTO> {
  const response = await axiosInstance.get<{ message: string; data: CartDTO }>(`/api/cart/${userId}`);
  return response.data.data;
}

// Add or update an item in the user's cart.
export async function addToCart(userId: number, foodItemId: number, quantity: number): Promise<CartDTO> {
  const response = await axiosInstance.post<{ foodItemId: number; quantity: number }, { data: { data: CartDTO } }>(
    `/api/cart/${userId}/items`,
    { foodItemId, quantity },
  );
  return response.data.data;
}

// Remove a single item from the user's cart.
export async function removeCartItem(userId: number, itemId: number): Promise<void> {
  await axiosInstance.delete(`/api/cart/${userId}/items/${itemId}`);
}

// Empty the entire cart for the user.
export async function clearCart(userId: number): Promise<void> {
  await axiosInstance.delete(`/api/cart/${userId}`);
}
