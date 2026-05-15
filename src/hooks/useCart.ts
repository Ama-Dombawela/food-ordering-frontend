import { useCallback, useEffect, useMemo, useState } from "react";
import { addToCart, clearCart, getCart, removeCartItem } from "../services/cartService";
import { getFoodById } from "../services/foodService";
import type { CartItemDTO, FoodItemDTO } from "../types";

type CartRow = {
  cartItem: CartItemDTO;
  foodItem: FoodItemDTO;
};

// Loads the user cart and exposes mutators plus totals.
export function useCart() {
  const [cartItems, setCartItems] = useState<CartRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = Number(localStorage.getItem("userId"));

  const loadCart = useCallback(async () => {
    if (!Number.isFinite(userId)) {
      setError("Unable to resolve your user id.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const cart = await getCart(userId);
      const rows = await Promise.all(
        cart.cartItems.map(async (cartItem) => ({
          cartItem,
          foodItem: await getFoodById(cartItem.foodItemId),
        })),
      );
      setCartItems(rows);
    } catch {
      setError("Unable to load cart.");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    void loadCart();
  }, [loadCart]);

  const addItem = useCallback(
    async (foodItemId: number, quantity = 1) => {
      if (!Number.isFinite(userId)) {
        return;
      }

      await addToCart(userId, foodItemId, quantity);
      await loadCart();
    },
    [loadCart, userId],
  );

  const removeItem = useCallback(
    async (cartItemId: number) => {
      if (!Number.isFinite(userId)) {
        return;
      }

      await removeCartItem(userId, cartItemId);
      await loadCart();
    },
    [loadCart, userId],
  );

  const clearAll = useCallback(async () => {
    if (!Number.isFinite(userId)) {
      return;
    }

    await clearCart(userId);
    await loadCart();
  }, [loadCart, userId]);

  const totalItems = cartItems.reduce((sum, row) => sum + row.cartItem.quantity, 0);
  const totalPrice = cartItems.reduce((sum, row) => sum + row.foodItem.price * row.cartItem.quantity, 0);

  return useMemo(
    () => ({ cartItems, loading, error, addItem, removeItem, clearCart: clearAll, totalItems, totalPrice, refresh: loadCart }),
    [cartItems, loading, error, addItem, removeItem, clearAll, totalItems, totalPrice, loadCart],
  );
}