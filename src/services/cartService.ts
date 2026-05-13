import axiosInstance from "../api/axiosInstance";
import type { Cart } from "../types";

// Gets the authenticated user's current cart.
export async function getCart(): Promise<Cart> {
  const response = await axiosInstance.get("/api/v1/cart");
  return response.data as Cart;
}

// Adds a food item to the cart with the chosen quantity.
export async function addToCart(foodItemId: number, quantity: number): Promise<Cart> {
  const response = await axiosInstance.post("/api/v1/cart/items", { foodItemId, quantity });
  return response.data as Cart;
}

// Updates the quantity for an existing cart item.
export async function updateCartItem(cartItemId: number, quantity: number): Promise<Cart> {
  const response = await axiosInstance.put(`/api/v1/cart/items/${cartItemId}`, { quantity });
  return response.data as Cart;
}

// Removes one cart item.
export async function removeCartItem(cartItemId: number): Promise<void> {
  await axiosInstance.delete(`/api/v1/cart/items/${cartItemId}`);
}

// Clears the cart completely.
export async function clearCart(): Promise<void> {
  await axiosInstance.delete("/api/v1/cart");
}
