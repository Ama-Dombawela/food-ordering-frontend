import axiosInstance from "../api/axiosInstance";
import type { Order } from "../types";

// Places the current cart as a new order.
export async function placeOrder(): Promise<Order> {
  const response = await axiosInstance.post("/api/v1/orders");
  return response.data as Order;
}

// Retrieves the signed-in user's order history.
export async function getUserOrders(): Promise<Order[]> {
  const response = await axiosInstance.get("/api/v1/orders");
  return response.data as Order[];
}

// Loads a single order by id.
export async function getOrderById(id: number): Promise<Order> {
  const response = await axiosInstance.get(`/api/v1/orders/${id}`);
  return response.data as Order;
}

// Admin-only endpoint to fetch every order in the system.
export async function getAllOrders(): Promise<Order[]> {
  const response = await axiosInstance.get("/api/v1/orders/all");
  return response.data as Order[];
}

// Admin-only status update for order processing.
export async function updateOrderStatus(id: number, status: string): Promise<Order> {
  const response = await axiosInstance.put(`/api/v1/orders/${id}/status`, { status });
  return response.data as Order;
}
