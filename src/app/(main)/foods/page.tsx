"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaHamburger, FaLeaf, FaIceCream, FaGlassMartiniAlt } from "react-icons/fa";
import FoodCard from "@/components/common/FoodCard";

const categoryMap = {
  1: { name: "Fast Food", icon: <FaHamburger className="w-4 h-4" /> },
  2: { name: "Salads", icon: <FaLeaf className="w-4 h-4" /> },
  3: { name: "Desserts", icon: <FaIceCream className="w-4 h-4" /> },
  4: { name: "Drinks", icon: <FaGlassMartiniAlt className="w-4 h-4" /> },
};

const foods = [
  {
    name: "Caesar Salad",
    desc: "Fresh romaine lettuce with Caesar dressing and parmesan.",
    Star: 4,
    Price: 6.5,
    createdAt: "2025-08-09",
    category: 2,
    image: "https://images.getrecipekit.com/20220427155305-caesar-salad.jpg?aspect_ratio=16:9&quality=90&",
    shop: { name: "Ope", picture: "https://epls.b-cdn.net/wp-content/uploads/2018/10/IMG_3155.jpg" }
  },
  {
    name: "Pepperoni Pizza",
    desc: "Delicious pepperoni pizza with mozzarella cheese.",
    Star: 5,
    Price: 8.99,
    createdAt: "2025-08-10",
    category: 1,
    image: "https://png.pngtree.com/png-vector/20250124/ourmid/pngtree-mouth-watering-pepperoni-pizza-slice-png-image_15317290.png",
    shop: { name: "PizzaHub", picture: "https://i.imgur.com/abc123.jpg" }
  }
];

export default function FoodsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | "">("");

  useEffect(() => {
    const search = searchParams.get("search") || "";
    const filter = searchParams.get("filter") || "";
    setSearchInput(search);
    setSearchQuery(search);
    setSelectedCategory(filter !== "" ? Number(filter) : "");
  }, [searchParams]);

  const updateURL = (search: string, filter: number | "") => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (filter !== "") params.set("filter", String(filter));
    router.push(`/foods?${params.toString()}`);
  };

  const handleSearch = () => {
    setSearchQuery(searchInput);
    updateURL(searchInput, selectedCategory);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value !== "" ? Number(e.target.value) : "";
    setSelectedCategory(val);
    updateURL(searchQuery, val);
  };

  const filteredFoods = useMemo(() => {
    return foods.filter((food) => {
      const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "" ? true : food.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="p-6 md:p-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex gap-2 w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search food..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="px-4 py-2 border rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition"
          >
            Search
          </button>
        </div>

        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">All Categories</option>
          {Object.entries(categoryMap).map(([key, cat]) => (
            <option key={key} value={key}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {filteredFoods.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFoods.map((food) => (
            <FoodCard key={food.name} food={food} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No foods found.</p>
      )}
    </div>
  );
}
