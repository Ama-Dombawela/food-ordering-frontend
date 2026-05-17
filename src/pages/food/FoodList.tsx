import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import Spinner from "../../components/common/Spinner";
import { FoodCard, FoodFilter } from "../../components/food";
import { Card } from "../../components/ui";
import { ShoppingCart } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useCategories } from "../../hooks/useCategories";
import { useCart } from "../../hooks/useCart";
import { useFoods } from "../../hooks/useFoods";

// Main customer home page that shows the food catalog and category filters.
export default function FoodList() {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const { foods, loading, filtering, error, activeCategoryId, filterByCategory } = useFoods();
  const { categories } = useCategories();
  const { addItem } = useCart();
  const [addError, setAddError] = useState("");

  useEffect(() => {
    if (isAdmin) {
      navigate("/admin/foods", { replace: true });
    }
  }, [isAdmin, navigate]);

  const handleAddToCart = async (foodId: number) => {
    setAddError("");

    try {
      await addItem(foodId, 1);
    } catch {
      setAddError("Unable to add item to cart.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent text-teal-100">
      <Navbar />
      <main className="flex-1 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-teal-300">Menu</p>
            <h1 className="mt-2 text-4xl font-semibold text-white">Choose your next meal</h1>
          </div>
          <button type="button" onClick={() => navigate("/cart")} className="inline-flex items-center gap-2 text-sm text-teal-200 underline-offset-4 hover:text-white hover:underline">
            <ShoppingCart className="h-4 w-4 text-teal-200" />
            <span>Go to cart</span>
          </button>
        </div>

        <Card className={`mb-6 space-y-4 transition-opacity duration-200 ${filtering ? "opacity-80" : "opacity-100"}`}>
          <FoodFilter categories={categories} activeCategoryId={activeCategoryId} loading={filtering} onChange={filterByCategory} />
          {addError ? <p className="text-sm text-rose-300">{addError}</p> : null}
        </Card>

        {loading ? <Spinner /> : null}
        {error ? <p className="rounded-3xl border border-rose-500/30 bg-rose-500/10 p-4 text-rose-200">{error}</p> : null}

        {!error ? (
          foods.length === 0 ? (
            <Card>
              <p className="text-teal-200/80">No food items found.</p>
            </Card>
          ) : (
            <div className={`grid gap-6 transition-opacity duration-300 md:grid-cols-2 xl:grid-cols-3 ${filtering ? "opacity-80" : "opacity-100"}`}>
              {foods.map((food) => (
                <FoodCard key={food.id} food={food} onAddToCart={handleAddToCart} />
              ))}
            </div>
          )
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
