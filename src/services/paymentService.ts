import axiosInstance from "../api/axiosInstance";
import type { Payment } from "../types";

// Starts payment for a given order.
export async function makePayment(orderId: number): Promise<Payment> {
  const response = await axiosInstance.post(`/api/v1/payments/${orderId}`);
  return response.data as Payment;
}

// Gets payment status/details for a specific order.
export async function getPaymentByOrderId(orderId: number): Promise<Payment> {
  const response = await axiosInstance.get(`/api/v1/payments/order/${orderId}`);
  return response.data as Payment;
}
