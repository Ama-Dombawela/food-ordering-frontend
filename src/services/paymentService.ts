import axiosInstance from "../api/axiosInstance";
import type { PaymentDTO, PaymentStatus } from "../types";

// Create a payment record for an order.
export async function createPayment(orderId: number, amount: number, status: PaymentStatus = "PENDING"): Promise<PaymentDTO> {
  const response = await axiosInstance.post<{ orderId: number; amount: number; status: PaymentStatus }, { data: { data: PaymentDTO } }>(
    "/api/payments",
    {
      orderId,
      amount,
      status,
    },
  );
  return response.data.data;
}

// Fetch a payment record by id.
export async function getPaymentById(id: number): Promise<PaymentDTO> {
  const response = await axiosInstance.get<{ message: string; data: PaymentDTO }>(`/api/payments/${id}`);
  return response.data.data;
}

// Fetch the payment record for an order.
export async function getPaymentByOrderId(orderId: number): Promise<PaymentDTO> {
  const response = await axiosInstance.get<{ message: string; data: PaymentDTO }>(`/api/payments/order/${orderId}`);
  return response.data.data;
}

// Update a payment status (e.g., PENDING → COMPLETED).
export async function updatePaymentStatus(id: number, status: PaymentStatus): Promise<PaymentDTO> {
  const response = await axiosInstance.put<{ status: PaymentStatus }, { data: { data: PaymentDTO } }>(`/api/payments/${id}/status`, { status });
  return response.data.data;
}
