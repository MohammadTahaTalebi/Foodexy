import {
  getFoodById,
  getFromThisShop,
  getSimilarFoods,
} from "@/lib/actions/foods.action";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface FoodPageProps {
  params: {
    id: string;
  };
}

export default async function FoodDetailPage({ params }: FoodPageProps) {
  const { id } = await params;
  const food = await getFoodById(Number(id));

  if (!food) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
        <Image
          src="/empty-plate.png"
          alt="No food found"
          width={150}
          height={150}
          className="opacity-80"
        />
        <h2 className="text-2xl font-bold text-card-foreground">
          No Food Found
        </h2>
        <p className="text-muted-foreground">
          The food you’re looking for might have been removed or never existed.
        </p>
        <Link
          href="/"
          className="bg-primary text-white px-6 py-3 rounded-xl hover:opacity-90 transition"
        >
          Back to Home
        </Link>
      </div>
    );
  }
  const fromThisShop = await getFromThisShop(food.id, food.shopId);
  const similarFoods = await getSimilarFoods(food.id, food.category);
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
      {/* ===================== FOOD DETAIL ===================== */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative w-full h-96 rounded-2xl overflow-hidden border border-border">
          <Image
            src={food.image}
            alt={food.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-card-foreground">
            {food.name}
          </h1>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" />
            <span className="text-lg font-medium">{food.star}</span>
            <span className="text-muted-foreground">(120 reviews)</span>
          </div>
          <p className="text-muted-foreground">{food?.desc}</p>
          <p className="text-2xl font-bold text-primary">{food.price}$</p>

          <button className="bg-primary text-white px-6 py-3 rounded-xl hover:opacity-90 transition">
            Add to Cart
          </button>
        </div>
      </section>

      {/* ===================== FOOD COMMENTS ===================== */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        <div className="space-y-6">
          {/* Example comment */}
          <div className="bg-background-secondry border border-border p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <span className="font-medium">John Doe</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-primary" />
                <span>5</span>
              </div>
            </div>
            <p className="text-muted-foreground mt-2">
              Absolutely loved it! The flavors were spot on.
            </p>
          </div>
        </div>

        {/* Submit comment */}
        <form className="mt-6 space-y-4">
          <textarea
            placeholder="Write your review..."
            className="w-full p-3 rounded-lg border border-border bg-background"
          />
          <div className="flex items-center gap-4">
            <select className="border border-border rounded-lg p-2 bg-background">
              <option value="">Rating</option>
              <option value="5">⭐⭐⭐⭐⭐</option>
              <option value="4">⭐⭐⭐⭐</option>
              <option value="3">⭐⭐⭐</option>
              <option value="2">⭐⭐</option>
              <option value="1">⭐</option>
            </select>
            <button className="bg-primary text-white px-6 py-3 rounded-xl hover:opacity-90 transition">
              Submit Review
            </button>
          </div>
        </form>
      </section>

      {/* ===================== RELATED FOOD ===================== */}
      {similarFoods.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Similar Foods</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {similarFoods.map((food) => (
              <div
                key={food.id}
                className="bg-background-secondry border border-border rounded-xl overflow-hidden hover:shadow-lg transition"
              >
                <Image
                  src={food.image}
                  alt={food.name}
                  width={300}
                  height={200}
                  className="object-cover w-full h-40"
                />
                <div className="p-4">
                  <h3 className="font-medium">{food.name}</h3>
                  <p className="text-primary font-bold">${food.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===================== FOODS FROM THIS RESTAURANT ===================== */}
      {fromThisShop.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4">More from this Restaurant</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {fromThisShop.map((food) => (
              <div
                key={food.id}
                className="bg-background-secondry border border-border rounded-xl overflow-hidden hover:shadow-lg transition"
              >
                <Image
                  src={food.image}
                  alt={food.name}
                  unoptimized
                  width={300}
                  height={200}
                  className="object-cover w-full h-40"
                />
                <div className="p-4">
                  <h3 className="font-medium">{food.name}</h3>
                  <p className="text-primary font-bold">${food.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
