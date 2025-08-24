"use client";

import FoodCard from "@/components/common/FoodCard";
import FoodCardSkeleton from "@/components/common/FoodCardSkeleton";
import { getAllFoods } from "@/lib/actions/foods.action";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Food, Restaurants } from "../../../../prisma/src/generated/prisma";

const categoryOptions = [
  { label: "All", value: "ALL" },
  { label: "Fast Food", value: "FAST_FOOD" },
  { label: "Desserts", value: "DESSERT" },
  { label: "Drinks", value: "DRINK" },
  { label: "Salads", value: "SALAD" },
];

const categoryMapping: Record<string, string> = {
  BURGER: "FAST_FOOD",
  PASTA: "FAST_FOOD",
  SOUSHI: "FAST_FOOD",
  PIZZA: "FAST_FOOD",
  DESSERT: "DESSERT",
  DRINK: "DRINK",
  SALAD: "SALAD",
};

export default function FoodsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

const [foods, setFoods] = useState<(Food & { shop?: Restaurants })[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [categoryFilter, setCategoryFilter] = useState(
    searchParams.get("category") || "ALL"
  );
  const lastRequestId = useRef(0);

  const fetchFoods = async () => {
    setLoading(true);
    const requestId = ++lastRequestId.current;

    try {
      const query = new URLSearchParams();
      if (search.trim() !== "") query.set("search", search.trim());

      if (categoryFilter !== "ALL" && categoryFilter !== "FAST_FOOD") {
        query.set("category", categoryFilter);
      }

      const data = await getAllFoods(query.toString());

      const filteredData = data.filter((food) => {
        if (categoryFilter === "ALL") return true;
        if (categoryFilter === "FAST_FOOD") {
          const mapped = categoryMapping[food.category.toUpperCase()];
          return mapped === "FAST_FOOD";
        }
        const mapped = categoryMapping[food.category.toUpperCase()];
        return mapped === categoryFilter;
      });

      if (requestId === lastRequestId.current) {
        setFoods(filteredData);
        setLoading(false);
      }
    } catch (err) {
      if ((err as any).name === "AbortError") return;
      console.error(err);
      if (requestId === lastRequestId.current) setLoading(false);
    }
  };


  useEffect(() => {
    fetchFoods();
  }, [search, categoryFilter]);

  const updateUrl = (newSearch: string, newCategory: string) => {
    const params = new URLSearchParams();
    if (newSearch.trim() !== "") params.set("search", newSearch.trim());
    if (newCategory && newCategory !== "ALL") params.set("category", newCategory);
    router.replace(`/foods?${params.toString()}`);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    updateUrl(value, categoryFilter);
  };

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
    updateUrl(search, value);
  };

  return (
    <div className="p-6 mx-auto md:max-w-[90%] md:p-12">
      {/* Search + Filter */}
      <div className="flex items-center gap-2 mb-6 p-2 rounded-2xl transition-all duration-300">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full h-13 px-4 py-2 bg-background-secondry rounded-xl border border-border text-lg focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-foreground/50 transition"
        />

        {/* Filter Dropdown */}
        <select
          value={categoryFilter}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="w-auto h-13 px-4 py-2 bg-background-secondry rounded-xl text-foreground border cursor-pointer border-border focus:outline-none focus:ring-2 focus:ring-primary transition"
        >
          {categoryOptions.map((option) => (
            <option className="cursor-pointer" key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Food Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 min-[1000px]:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading
          ? [...Array(8)].map((_, i) => <FoodCardSkeleton key={i} />)
          : foods.length > 0
            ? foods.map((food) => <FoodCard key={food.id} food={food} />)
            : <p className="text-center text-muted-foreground mt-8 col-span-full">
              No foods found.
            </p>
        }
      </div>

    </div>
  );
}
