"use client";

import { useState } from "react";
import FoodCard from "@/components/common/FoodCard";
import Image from "next/image";
import { FaGlassMartiniAlt, FaHamburger, FaIceCream, FaLeaf } from "react-icons/fa";
import { IoFastFoodSharp } from "react-icons/io5";
import { Food, Restaurants } from "../../prisma/src/generated/prisma";

const categories = [
  { key: "popular", name: "Popular", icon: <IoFastFoodSharp className="w-5 h-5" /> },
  { key: "fastfood", name: "Fast Food", icon: <FaHamburger className="w-5 h-5" />, filter: 1 },
  { key: "salads", name: "Salads", icon: <FaLeaf className="w-5 h-5" />, filter: 2 },
  { key: "desserts", name: "Desserts", icon: <FaIceCream className="w-5 h-5" />, filter: 3 },
  { key: "drinks", name: "Drinks", icon: <FaGlassMartiniAlt className="w-5 h-5" />, filter: 4 },
];


interface Props {
  currentShop: Restaurants;
  foods: Food[];
}

export default function ShopDetailClient({ currentShop, foods }: Props) {
  const [activeCategory, setActiveCategory] = useState("popular");


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
          {categories.map((cat) => (
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
          {foods.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {foods.map((food) => (
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
