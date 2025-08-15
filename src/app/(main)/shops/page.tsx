// app/shop/page.tsx
import ShopCard from "@/components/common/ShopCard";
import { getAllShops } from "@/lib/actions/shops.action";

export default async function ShopPage() {
    const shops = await getAllShops();
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
