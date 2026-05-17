import axiosInstance from "../api/axiosInstance";
import type { OrderDTO, OrderStatus } from "../types";

// Create a new order from the user's cart.
export async function placeOrder(userId: number): Promise<null> {
  const response = await axiosInstance.post<{ message: string; data: null }>(`/api/orders/${userId}`);
  return response.data.data;
}

// Fetch a single order by id for detail view.
export async function getOrderById(id: number): Promise<OrderDTO> {
  const response = await axiosInstance.get<{ message: string; data: OrderDTO }>(`/api/orders/${id}`);
  return response.data.data;
}

// Fetch all orders for the authenticated user.
export async function getOrdersByUser(userId: number): Promise<OrderDTO[]> {
  const response = await axiosInstance.get<{ message: string; data: OrderDTO[] }>(`/api/orders/user/${userId}`);
  return response.data.data;
}

// Update an order's status (admin only).
export async function updateOrderStatus(id: number, status: OrderStatus): Promise<OrderDTO> {
  const response = await axiosInstance.put<{ status: OrderStatus }, { data: { data: OrderDTO } }>(`/api/orders/${id}/status`, { status });
  return response.data.data;
}

// Cancel an order (admin only).
export async function cancelOrder(id: number): Promise<void> {
  await axiosInstance.delete(`/api/orders/${id}`);
}
