"use client";

import FoodCard from "@/components/common/FoodCard";
import { IceCream, Martini, Pizza, Salad } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { FaHamburger } from "react-icons/fa";
import { FaBowlRice } from "react-icons/fa6";
import { GiNoodles } from "react-icons/gi";
import { IoFastFoodSharp } from "react-icons/io5";
import { Food, Restaurants } from "../../prisma/src/generated/prisma";

export const categories = [
  { key: "popular", name: "Popular", icon: <IoFastFoodSharp className="w-5 h-5" /> },
  { key: "pizza", name: "Pizza", icon: <Pizza className="w-5 h-5" />, filter: "PIZZA" },
  { key: "pasta", name: "Pasta", icon: <GiNoodles className="w-5 h-5" />, filter: "PASTA" },
  { key: "sushi", name: "Sushi", icon: <FaBowlRice className="w-5 h-5" />, filter: "SOUSHI" },
  { key: "burger", name: "Burger", icon: <FaHamburger className="w-5 h-5" />, filter: "BURGER" },
  { key: "salads", name: "Salads", icon: <Salad className="w-5 h-5" />, filter: "SALAD" },
  { key: "desserts", name: "Desserts", icon: <IceCream className="w-5 h-5" />, filter: "DESSERT" },
  { key: "drinks", name: "Drinks", icon: <Martini className="w-5 h-5" />, filter: "DRINK" },
];

interface Props {
  currentShop: Restaurants;
  foods: Food[];
}

export default function ShopDetailClient({ currentShop, foods }: Props) {
  const [activeCategory, setActiveCategory] = useState("popular");

  const availableCategories = categories.filter(cat => {
    if (cat.key === "popular") return foods.length > 0;
    return foods.some(f => f.category === cat.filter);
  });

  const filteredFoods =
    activeCategory === "popular"
      ? [...foods]
        .sort((a, b) => b.star - a.star)
        .slice(0, 5)
      : foods.filter((f) => f.category === categories.find((c) => c.key === activeCategory)?.filter);

  return (
    <div className="bg-background min-h-screen py-10 px-4 md:px-20">
      {/* Shop info */}
      <div className="max-w-7xl mx-auto bg-background-secondry rounded-2xl shadow-lg border border-border p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="relative w-28 h-28 shrink-0">
          <Image
            src={currentShop.image}
            alt={currentShop.name}
            fill
            className="object-cover rounded-full border-4 border-background shadow-md"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-extrabold text-card-foreground">{currentShop.name}</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Serving the best flavors made with love and fresh ingredients.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground mt-3">
            <span>
              Joined{" "}
              {new Date(currentShop.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
            <span>{foods.length} food items</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto mt-10">
        <div className="flex flex-wrap gap-3 border-b border-border pb-4">
          {availableCategories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`flex cursor-pointer items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 
                ${activeCategory === cat.key ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:bg-muted-foreground/10"}
              `}
            >
              {cat.icon}
              {cat.name}
            </button>
          ))}
        </div>

        {/* Foods */}
        <div className="mt-8">
          {filteredFoods.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFoods.map((food) => (
                <FoodCard key={food.id} food={{ ...food, shop: currentShop }} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-10">
              No foods found in this category.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
