import type { FoodItem } from "./FoodItem";
import type { User } from "./User";

export interface CartItem {
	id: number;
	foodItem: FoodItem;
	quantity: number;
}

export interface Cart {
	id: number;
	user: User;
	cartItems: CartItem[];
}

export interface CartItemDTO {
	id: number;
	cartId: number;
	foodItemId: number;
	quantity: number;
}

export interface CartDTO {
	id: number;
	userId: number;
	cartItems: CartItemDTO[];
}