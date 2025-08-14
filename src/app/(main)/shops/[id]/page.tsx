"use client";
import FoodCard from "@/components/common/FoodCard";
import Image from "next/image";
import { useState } from "react";
import { FaGlassMartiniAlt, FaHamburger, FaIceCream, FaLeaf } from "react-icons/fa";
import { IoFastFoodSharp } from "react-icons/io5";

interface FoodType {
    id: string;
    name: string;
    desc: string;
    star: number;
    Price: number;
    createdAt: string;
    category: number;
    image: string;
    shop: { name: string; picture: string };
}

interface ShopDetailProps {
    shop?: {
        id: string;
        name: string;
        image: string;
        created_at: string;
        foods: FoodType[];
    };
}

const categories = [
    { key: "popular", name: "Popular", icon: <IoFastFoodSharp className="w-5 h-5" /> },
    { key: "fastfood", name: "Fast Food", icon: <FaHamburger className="w-5 h-5" />, filter: 1 },
    { key: "salads", name: "Salads", icon: <FaLeaf className="w-5 h-5" />, filter: 2 },
    { key: "desserts", name: "Desserts", icon: <FaIceCream className="w-5 h-5" />, filter: 3 },
    { key: "drinks", name: "Drinks", icon: <FaGlassMartiniAlt className="w-5 h-5" />, filter: 4 },
];

const defaultFoods: FoodType[] = [
    {
        id: "1",
        name: "Cheese Burger",
        desc: "Juicy beef burger with melted cheese, lettuce, and tomato.",
        star: 4.5,
        Price: 8.99,
        createdAt: "2025-08-10",
        category: 1,
        image: "https://ghazaland.com/wp-content/uploads/2018/04/cheesberger.jpg",
        shop: { name: "Ope", picture: "https://epls.b-cdn.net/wp-content/uploads/2018/10/IMG_3155.jpg" },
    },
    {
        id: "2",
        name: "Caesar Salad",
        desc: "Fresh romaine lettuce with Caesar dressing and parmesan.",
        star: 4,
        Price: 6.5,
        createdAt: "2025-08-09",
        category: 2,
        image: "https://images.getrecipekit.com/20220427155305-caesar-salad.jpg?aspect_ratio=16:9&quality=90&",
        shop: { name: "Ope", picture: "https://epls.b-cdn.net/wp-content/uploads/2018/10/IMG_3155.jpg" },
    },
    {
        id: "3",
        name: "Chocolate Ice Cream",
        desc: "Creamy chocolate ice cream with chocolate chips.",
        star: 5,
        Price: 4.5,
        createdAt: "2025-08-08",
        category: 3,
        image: "https://www.cadburydessertscorner.com/hs-fs/hubfs/dc-website-2022/articles/bournville-dark-chocolate-ice-cream-why-not/bournville-dark-chocolate-ice-cream-why-not-feature.webp?width=768&height=432&name=bournville-dark-chocolate-ice-cream-why-not-feature.webp",
        shop: { name: "Ope", picture: "https://epls.b-cdn.net/wp-content/uploads/2018/10/IMG_3155.jpg" },
    },
    {
        id: "4",
        name: "Coca Cola",
        desc: "Refreshing soft drink to accompany your meal.",
        star: 4,
        Price: 2.0,
        createdAt: "2025-08-07",
        category: 4,
        image: "https://www.simplilearn.com/ice9/free_resources_article_thumb/Coca_Cola_Marketing_Strategy_2022.jpg",
        shop: { name: "Ope", picture: "https://epls.b-cdn.net/wp-content/uploads/2018/10/IMG_3155.jpg" },
    },
];

export default function ShopDetailClient({ shop }: ShopDetailProps) {
    const [activeCategory, setActiveCategory] = useState("popular");

    const currentShop = shop ?? {
        id: 2,
        name: "arash azhdar",
        image:
            "https://menumal.ir/vitrin/img/shop_logo/120.jpg",
        ownerId: "123e4567-e89b-12d3-a456-426614174001",
        created_at: new Date(),
        foods: defaultFoods,
    };

    const filteredFoods =
        activeCategory === "popular"
            ? currentShop.foods.filter((f) => f.star >= 4.99)
            : currentShop.foods.filter(
                (f) => f.category === categories.find((c) => c.key === activeCategory)?.filter
            );

    return (
        <div className="bg-background min-h-screen py-10 px-4 md:px-20">
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
                        <span>{currentShop.foods.length} food items</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-10">
                <div className="flex flex-wrap gap-3 border-b border-border pb-4">
                    {categories.map((cat) => (
                        <button
                            key={cat.key}
                            onClick={() => setActiveCategory(cat.key)}
                            className={`flex cursor-pointer items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 
                ${activeCategory === cat.key
                                    ? "bg-primary text-white"
                                    : "bg-muted text-muted-foreground hover:bg-muted-foreground/10"
                                }`}
                        >
                            {cat.icon}
                            {cat.name}
                        </button>
                    ))}
                </div>

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
