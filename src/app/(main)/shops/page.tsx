// app/shop/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Restaurants } from "../../../../prisma/src/generated/prisma";
import ShopCard from "@/components/common/ShopCard";

export default async function ShopPage() {
    const shops: Restaurants[] = [
        {
            id: 1,
            name: "Ope",
            image:
                "https://cdn.snappfood.ir/media/cache/vendor_logo/uploads/images/vendors/logos/5f1d8280c293d.jpeg",
            ownerId: "123e4567-e89b-12d3-a456-426614174000",
            created_at: new Date(),
            foods: [{ id: '1' }],
        },
        {
            id: 2,
            name: "arash azhdar",
            image:
                "https://menumal.ir/vitrin/img/shop_logo/120.jpg",
            ownerId: "123e4567-e89b-12d3-a456-426614174001",
            created_at: new Date(),
            foods: [],
        },
    ];

    return (
        <section className="py-16 px-6 md:px-20 bg-background">
            <h1 className="text-3xl font-extrabold text-center mb-12 text-primary">
                Our Food Vendors
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
                {shops.map((shop) => (
                    <ShopCard key={shop.id} shop={shop} />
                ))}
            </div>
        </section>
    );
}
