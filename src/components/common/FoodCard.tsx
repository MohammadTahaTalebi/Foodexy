import { Star } from "lucide-react";
import Image from "next/image";
import { Category, Food, Restaurants } from "../../../prisma/src/generated/prisma";
import Link from "next/link";
import { FaHamburger, FaLeaf, FaIceCream, FaGlassMartiniAlt } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";

interface FoodCardProps {
  food: Food & { shop: Restaurants };
  onAddToCart?: () => void;
}

export const categoryMap: Record<Category, { name: string; icon: string }> = {
  FAST_FOOD: {
    name: "Fast Food",
    icon: "https://img.icons8.com/?size=100&id=DbH0FbjXLLIZ&format=png&color=ffffff"
  },
  SALADS: {
    name: "Salads",
    icon: "https://img.icons8.com/?size=100&id=WhCAJ2GOgHnN&format=png&color=ffffff"
  },
  DESSERTS: {
    name: "Desserts",
    icon: "https://img.icons8.com/?size=100&id=1g4hL99Duiau&format=png&color=ffffff"
  },
  DRINKS: {
    name: "Drinks",
    icon: "https://img.icons8.com/?size=100&id=45816&format=png&color=ffffff"
  }
};


export default function FoodCard({ food, onAddToCart }: FoodCardProps) {
  const category = categoryMap[food.category];
  const relativeDate = formatDistanceToNow(new Date(food.createdAt), { addSuffix: true });

  return (
    <div className="!w-full bg-background-secondry rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-border group">
      {/* Image Section */}
      <div className="relative w-full h-60 overflow-hidden">
        <Image
          src={food.image}
          alt={food.name}
          width={1080}
          height={1080}
          className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Category */}
        <div className="absolute top-3 left-3 bg-primary/90 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 select-none shadow-md">
          {category?.icon}
          <span>{category?.name}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3">
        {/* Title & Rating */}
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-bold text-card-foreground truncate max-w-[70%]">
            {food.name}
          </h2>
          <div className="flex items-center gap-[2px]">
            {Array.from({ length: 5 }, (_, i) => {
              const full = i + 1 <= Math.floor(food.star);
              const half = !full && i + 0.5 < food.star;
              return (
                <Star
                  key={i}
                  className={`w-4 h-4 ${full
                      ? "fill-secondary text-secondary"
                      : half
                        ? "text-primary/50 fill-primary/20"
                        : "text-primary/50 fill-primary/20"
                    }`}
                />
              );
            })}
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm truncate">{food.desc}</p>

        {/* Shop & Price */}
        <div className="flex justify-between items-center  pt-3">
          <Link href={`/shop/${food.shop.id}`} className="flex items-center gap-2 group">
            <img
              src={food.shop.image}
              alt={food.shop.name}
              className="w-7 h-7 rounded-full object-cover border border-border"
              loading="lazy"
            />
            <span className="text-card-foreground font-semibold group-hover:text-primary transition-colors">
              {food.shop.name}
            </span>
          </Link>
          <div className="text-secondary font-bold text-lg">{food.price}$</div>
        </div>

        {/* Date, Buttons */}
        <div className="flex justify-between items-center border-t border-border pt-3 text-xs text-muted-foreground">
          <span>{relativeDate}</span>
          <div className="flex gap-2">
            <button
              onClick={onAddToCart}
              className="bg-primary hover:bg-primary/90 text-white font-medium px-3 py-1 rounded-full shadow-md transition-all duration-200 hover:scale-105 text-xs"
            >
              Add to Cart
            </button>
            <Link href={`/foods/${food.id}`}>
              <button className="bg-primary hover:bg-primary/90 text-white font-medium px-3 py-1 rounded-full shadow-md transition-all duration-200 hover:scale-105 text-xs">
                View Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
