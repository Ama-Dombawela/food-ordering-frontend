import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import { useAuth } from "../../context/AuthContext";
import { addToCart, clearCart, getCart, removeCartItem } from "../../services/cartService";
import { getFoodById } from "../../services/foodService";
import { getOrdersByUser, placeOrder } from "../../services/orderService";
import type { CartItemDTO, FoodItemDTO } from "../../types";

interface EnrichedCartItem {
  cartItem: CartItemDTO;
  food: FoodItemDTO;
}

export default function Cart() {
  const navigate = useNavigate();
  const { userId } = useAuth();
  const [items, setItems] = useState<EnrichedCartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyItemId, setBusyItemId] = useState<number | null>(null);

  const total = useMemo(
    () => items.reduce((sum, entry) => sum + entry.food.price * entry.cartItem.quantity, 0),
    [items],
  );

  const loadCart = async () => {
    if (!userId) {
      setError("Unable to resolve your account id.");
      setLoading(false);
      return;
    }

    const loadedCart = await getCart(userId);
    const resolvedItems = await Promise.all(
      loadedCart.cartItems.map(async (cartItem) => ({
        cartItem,
        food: await getFoodById(cartItem.foodItemId),
      })),
    );

    setItems(resolvedItems);
  };

  useEffect(() => {
    const initialize = async () => {
      setLoading(true);
      setError("");

      try {
        await loadCart();
      } catch {
        setError("Unable to load cart.");
      } finally {
        setLoading(false);
      }
    };

    void initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const updateQuantity = async (cartItem: CartItemDTO, nextQuantity: number) => {
    if (!userId) {
      return;
    }

    setBusyItemId(cartItem.id);

    try {
      await removeCartItem(userId, cartItem.id);

      if (nextQuantity > 0) {
        await addToCart(userId, cartItem.foodItemId, nextQuantity);
      }

      await loadCart();
    } finally {
      setBusyItemId(null);
    }
  };

  const handleClearCart = async () => {
    if (!userId || !window.confirm("Clear your cart?")) {
      return;
    }

    await clearCart(userId);
    await loadCart();
  };

  const handlePlaceOrder = async () => {
    if (!userId) {
      return;
    }

    await placeOrder(userId);
    const orders = await getOrdersByUser(userId);
    const latestOrder = [...orders].sort((left, right) => new Date(right.orderDate).getTime() - new Date(left.orderDate).getTime())[0];

    if (latestOrder) {
      navigate(`/payment/${latestOrder.id}`);
    }
  };
  return (
    <div className="min-h-screen bg-transparent text-teal-100">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-teal-300">Cart</p>
            <h2 className="mt-2 text-4xl font-semibold text-white">Your cart</h2>
          </div>
          {items.length > 0 ? (
            <button
              type="button"
              onClick={() => void handleClearCart()}
              className="rounded-full border border-rose-500/40 px-5 py-3 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/10"
            >
              Clear Cart
            </button>
          ) : null}
        </div>

        {loading ? <p className="rounded-3xl border border-teal-800 bg-teal-950/70 p-6 text-teal-200">Loading cart...</p> : null}
        {error ? <p className="mb-6 rounded-3xl border border-rose-500/30 bg-rose-500/10 p-4 text-rose-200">{error}</p> : null}

        {!loading && !error ? (
          items.length === 0 ? (
            <div className="rounded-3xl border border-teal-800 bg-teal-950/70 p-10 text-center text-teal-200">
              <p>Your cart is empty.</p>
              <Link className="mt-4 inline-flex rounded-full bg-teal-500 px-5 py-3 text-sm font-semibold text-teal-50" to="/foods">
                Browse foods
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="space-y-4">
                {items.map(({ cartItem, food }) => (
                  <article key={cartItem.id} className="rounded-3xl border border-teal-800 bg-teal-950/70 p-5">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{food.name}</h3>
                        <p className="mt-1 text-sm text-teal-200/70">Unit price ${food.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button type="button" className="rounded-full border border-teal-700 px-3 py-2" onClick={() => void updateQuantity(cartItem, cartItem.quantity - 1)} disabled={busyItemId === cartItem.id}>
                          -
                        </button>
                        <span className="min-w-10 text-center text-lg font-semibold">{cartItem.quantity}</span>
                        <button type="button" className="rounded-full border border-teal-700 px-3 py-2" onClick={() => void updateQuantity(cartItem, cartItem.quantity + 1)} disabled={busyItemId === cartItem.id}>
                          +
                        </button>
                        <button
                          type="button"
                          onClick={async () => {
                            if (!userId) {
                              return;
                            }

                            setBusyItemId(cartItem.id);
                            try {
                              await removeCartItem(userId, cartItem.id);
                              await loadCart();
                            } finally {
                              setBusyItemId(null);
                            }
                          }}
                          className="rounded-full border border-rose-500/40 px-4 py-2 text-sm font-medium text-rose-200"
                          disabled={busyItemId === cartItem.id}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <p className="mt-4 text-right text-sm text-teal-200/80">Subtotal ${ (food.price * cartItem.quantity).toFixed(2) }</p>
                  </article>
                ))}
              </div>

              <aside className="h-fit rounded-3xl border border-teal-800 bg-teal-950/70 p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-teal-300">Summary</p>
                <div className="mt-6 space-y-3 text-sm text-teal-200/80">
                  <div className="flex justify-between">
                    <span>Items</span>
                    <span>{items.length}</span>
                  </div>
                  <div className="flex justify-between border-t border-teal-800 pt-3 text-lg font-semibold text-white">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => void handlePlaceOrder()}
                  className="mt-6 w-full rounded-full bg-teal-500 px-5 py-3 text-sm font-semibold text-teal-50 transition hover:bg-teal-400"
                >
                  Place Order
                </button>
              </aside>
            </div>
          )
        ) : null}
      </main>
    </div>
  );
}