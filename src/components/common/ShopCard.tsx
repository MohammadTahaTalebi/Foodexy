import Image from "next/image";
import Link from "next/link";
import { Restaurants } from "../../../prisma/src/generated/prisma";
import { getFromThisShop } from "@/lib/actions/foods.action";

interface ShopCardProps {
  shop: Restaurants
}

export default async function ShopCard({ shop }: ShopCardProps) {
  const Food = await getFromThisShop(shop.id);
  return (
    <Link
      href={`/shops/${shop.id}`}
      className="group bg-background-secondry  rounded-2xl shadow-md border border-border overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1 hover:border-primary/40"
    >
      <div className="flex flex-col items-center p-6 relative">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary/10 blur-lg scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          <Image
            src={shop.image}
            alt={shop.name}
            width={120}
            height={120}
            className="rounded-full border-4 border-secondary shadow-lg object-cover transform transition-transform duration-500 group-hover:scale-110"
          />
          <span className="absolute -bottom-2 flex gap-1 -left-2 bg-gradient-to-r from-primary to-secondary text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            <span>{Food.length}</span>food items
          </span>
        </div>
        <h3 className="mt-5 text-xl font-extrabold text-card-foreground tracking-wide group-hover:text-primary transition-colors">
          {shop.name}
        </h3>
        <p className="text-muted-foreground text-sm">
          Joined {new Date(shop.created_at).toLocaleDateString("en-US")}
        </p>
      </div>
    </Link>
  );
}