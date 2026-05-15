import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import Spinner from "../../components/common/Spinner";
import { Button, Badge, Card } from "../../components/ui";
import { useCart } from "../../hooks/useCart";
import { getFoodById } from "../../services/foodService";
import type { FoodItemDTO } from "../../types";
import { formatCurrency } from "../../utils";

// Detail page for a single menu item with quantity selection.
export default function FoodDetail() {
  const params = useParams();
  const foodId = Number(params.id);
  const { addItem } = useCart();
  const [food, setFood] = useState<FoodItemDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const load = async () => {
      if (!Number.isFinite(foodId)) {
        setError("Invalid food id.");
        setLoading(false);
        return;
      }

      try {
        setFood(await getFoodById(foodId));
      } catch {
        setError("Unable to load food details.");
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [foodId]);

  const handleAdd = async () => {
    if (!food) {
      return;
    }

    await addItem(food.id, quantity);
  };

  return (
    <div className="min-h-screen bg-transparent text-teal-100">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {loading ? <Spinner /> : null}
        {error ? <p className="rounded-3xl border border-rose-500/30 bg-rose-500/10 p-4 text-rose-200">{error}</p> : null}

        {!loading && !error && food ? (
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <Card className="overflow-hidden p-0">
              <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-teal-900 to-teal-950 text-teal-300/70">
                Food Image
              </div>
            </Card>
            <Card className="space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-teal-300">Food Detail</p>
                  <h1 className="mt-2 text-4xl font-semibold text-white">{food.name}</h1>
                </div>
                <Badge variant={food.status === "AVAILABLE" ? "green" : "red"}>{food.status}</Badge>
              </div>
              <p className="text-teal-200/80">{food.description}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <Card className="p-4">
                  <p className="text-sm text-teal-200/70">Price</p>
                  <p className="text-2xl font-semibold text-teal-300">{formatCurrency(food.price)}</p>
                </Card>
                <Card className="p-4">
                  <p className="text-sm text-teal-200/70">Category ID</p>
                  <p className="text-2xl font-semibold text-white">{food.categoryId}</p>
                </Card>
              </div>
              <div className="flex items-center gap-3">
                <Button type="button" variant="secondary" onClick={() => setQuantity((current) => Math.max(1, current - 1))}>-</Button>
                <span className="min-w-10 text-center text-lg font-semibold">{quantity}</span>
                <Button type="button" variant="secondary" onClick={() => setQuantity((current) => current + 1)}>+</Button>
              </div>
              <Button type="button" onClick={() => void handleAdd()} fullWidth disabled={food.status !== "AVAILABLE"}>
                Add to Cart
              </Button>
              <Link className="inline-block text-sm text-teal-200/80 hover:text-white" to="/home">
                Back to menu
              </Link>
            </Card>
          </div>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
