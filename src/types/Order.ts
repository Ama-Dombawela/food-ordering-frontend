import type { FoodItem } from "./FoodItem";
import type { User } from "./User";

export type OrderStatus = "PLACED" | "PREPARING" | "DELIVERED" | "CANCELLED";

export interface OrderItem {
    id: number;
    foodItem: FoodItem;
    quantity: number;
    price: number;
}

export interface Order {
    id: number;
    user: User;
    status: OrderStatus;
    totalAmount: number;
    orderDate: string;
    orderItems: OrderItem[];
}