import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Food, Restaurants } from "../../../prisma/src/generated/prisma";

interface FoodCardProps {
  food: Food & { shop: Restaurants };
  onAddToCart?: () => void;
}

export default function FoodCard({ food, onAddToCart }: FoodCardProps) {
  return (
    <div className="w-full bg-background-secondry rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-border overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative w-full h-60 overflow-hidden">
        <Image
          src={food.image}
          alt={food.name}
          fill
          unoptimized
          className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute top-3 left-3 bg-primary/90 text-white px-3 py-1 rounded-full text-xs font-semibold">
          {food.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Name + Rating */}
        <div className="flex justify-between items-start mb-1">
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
                  className={`w-4 h-4 ${
                    full
                      ? "fill-secondary text-secondary"
                      : half
                      ? "text-secondary/70 fill-secondary/30"
                      : "text-primary/40 fill-primary/10"
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {food.desc}
        </p>

        {/* Shop + Price */}
        <div className="flex justify-between items-center mb-4">
          <Link
            href={`/shops/${food.shop.id}`}
            className="flex items-center gap-2 group"
          >
            <Image
              src={food.shop.image}
              alt={food.shop.name}
              width={24}
              height={24}
              className="rounded-full object-cover border border-border"
            />
            <span className="text-card-foreground font-semibold group-hover:text-primary transition-colors">
              {food.shop.name}
            </span>
          </Link>
          <div className="text-secondary font-bold text-lg">${food.price}</div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={onAddToCart}
            className="flex-1 bg-primary hover:bg-secondary text-white font-medium px-4 py-2 rounded-full shadow-md transition-transform duration-200 hover:scale-105"
            aria-label={`Add ${food.name} to cart`}
          >
            Add to Cart
          </button>
          <Link
            href={`/foods/${food.id}`}
            className="flex-1 bg-muted hover:bg-muted/80 text-card-foreground font-medium px-4 py-2 rounded-full shadow-md transition-transform duration-200 hover:scale-105 text-center"
            aria-label={`View ${food.name} detail`}
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
