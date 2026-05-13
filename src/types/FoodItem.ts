import type { Category } from "./Category";

export type FoodItemStatus = "AVAILABLE" | "OUT_OF_STOCK";

export interface FoodItem {
    id: number;
    name: string;
    description: string;
    price: number;
    status: FoodItemStatus;
    category: Category;
}