import type { Order } from "./Order";

export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED";

export interface Payment {
    id: number;
    order: Order;
    status: PaymentStatus;
    amount: number;
    paymentDate: string;
}