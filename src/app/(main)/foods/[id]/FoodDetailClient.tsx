"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CommentForm from "@/components/CommentForm";
import MiniFoodCard from "@/components/common/miniFoodCard";
import { createOrBumpCartItem, findCartItem, getOrCreateCartByUserId } from "@/lib/actions/shoppingCard.action";
import { createClient } from "@/lib/supabase/client";

interface FoodDetailClientProps {
  food: any;
  fromThisShop: any[];
  similarFoods: any[];
  comments: any[];
}

export default function FoodDetailClient({
  food,
  fromThisShop,
  similarFoods,
  comments,
}: FoodDetailClientProps) {
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData?.user) {
        toast.error("You must be logged in to add items to your cart.");
        return;
      }
      const userId = userData.user.id;
      const cart = await getOrCreateCartByUserId(userId);
      const existingItem = await findCartItem(userId, food.id);
      if (existingItem) {
        toast.info(`${food.name} is already in your cart.`);
        return;
      }
      await createOrBumpCartItem(cart.id, food.id, 1);
      toast.success(`${food.name} added to your cart`);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
      {/* FOOD DETAIL */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative w-full h-96 rounded-2xl overflow-hidden border border-border">
          <Image src={food.image} alt={food.name} fill className="object-cover" />
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-card-foreground">{food.name}</h1>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" />
            <span className="text-lg font-medium">{food.star}</span>
            <span className="text-muted-foreground">(120 reviews)</span>
          </div>
          <p className="text-muted-foreground">{food.desc}</p>
          <p className="text-2xl font-bold text-primary">${food.price}</p>
          <button
            onClick={handleAddToCart}
            disabled={loading}
            className="bg-primary text-white px-6 py-3 rounded-xl hover:opacity-90 transition"
          >
            {loading ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </section>

      {/* COMMENTS */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        <div className="space-y-6">
          {comments.map((item) => (
            <div key={item.id} className="bg-background-secondry border border-border p-4 rounded-xl">
              <div className="flex items-center justify-between">
                <span className="font-medium">{item.user.email}</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-primary" />
                  <span>{item.rating}</span>
                </div>
              </div>
              <p className="text-muted-foreground mt-2">{item.msg}</p>
            </div>
          ))}
        </div>
        <CommentForm foodId={food.id} />
      </section>

      {/* SIMILAR FOODS */}
      {similarFoods.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Similar Foods</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {similarFoods.map((f) => (
              <MiniFoodCard key={f.id} food={f} />
            ))}
          </div>
        </section>
      )}

      {/* MORE FROM THIS SHOP */}
      {fromThisShop.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4">More from this Restaurant</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {fromThisShop.map((f) => (
              <MiniFoodCard key={f.id} food={f} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
