import { FaHamburger, FaLeaf, FaIceCream, FaGlassMartiniAlt } from "react-icons/fa";
import { Star } from "lucide-react";
import Image from "next/image";

interface FoodCardProps {
    food: {
        name: string;
        Star: number;
        desc: string;
        Price: number;
        createdAt: string;
        image: string;
        category: number;
        shop: {
            name: string;
            picture: string;
        };
    };
    onAddToCart: () => void;
}

const categoryMap = {
    1: { name: "Fast Food", icon: <FaHamburger className="w-4 h-4" /> },
    2: { name: "Salads", icon: <FaLeaf className="w-4 h-4" /> },
    3: { name: "Desserts", icon: <FaIceCream className="w-4 h-4" /> },
    4: { name: "Drinks", icon: <FaGlassMartiniAlt className="w-4 h-4" /> },
};

export default function FoodCard({ food, onAddToCart }: FoodCardProps) {
    const category = categoryMap[food.category];

    return (
        <div className="!w-full bg-background-secondry rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-border group">
            <div className="relative w-full h-60 overflow-hidden rounded-2xl group">
                <Image
                    src={food.image}
                    alt={food.name}
                    width={1080}
                    height={1080}
                    className="w-full h-full  transform transition-transform duration-300 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                {category && (
                    <div className="absolute top-3 left-3 bg-primary/90 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2 select-none">
                        {category.icon}
                        <span>{category.name}</span>
                    </div>
                )}
            </div>
            <div className="p-6 flex flex-col gap-2">
                <div className="flex justify-between items-start">
                    <h2 className="text-xl font-bold text-card-foreground truncate max-w-[70%]">
                        {food.name}
                    </h2>
                    <div className="flex items-center gap-[2px] mb-1">
                        {Array.from({ length: 5 }, (_, i) => {
                            const full = i + 1 <= Math.floor(food.Star);
                            const half = !full && i + 0.5 < food.Star;
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

                <p className="text-muted-foreground text-sm truncate w-full mb-3">
                    {food.desc}
                </p>

                <div className="flex justify-between items-center ">
                    <div className="flex items-center gap-1 cursor-pointer">
                        <img
                            src={food.shop.picture}
                            alt={food.shop.name}
                            className="w-6 h-6 rounded-full object-cover border border-border"
                            loading="lazy"
                        />
                        <span className=" text-card-foreground font-bold hover:text-primary">{food.shop.name}</span>
                    </div>
                    <div className="text-secondary font-bold text-xl">
                        {food.Price.toLocaleString("en-US")}&nbsp;$
                    </div>

                </div>

                <div className="flex justify-between items-center mt-3 text-xs text-muted-foreground border-t border-border pt-4">
                    <div className="text-muted-foreground">
                        {new Date(food.createdAt).toLocaleDateString("en-US")}
                    </div>
                    <button
                        onClick={onAddToCart}
                        className="text-sm cursor-pointer bg-primary hover:bg-secondary text-white font-semibold px-4 py-1.5 rounded-full shadow-md transition-all duration-300 hover:scale-105"
                        aria-label={`Add ${food.name} to cart`}
                    >
                        Add to Cart
                    </button>

                </div>
            </div>
        </div>
    );
}
