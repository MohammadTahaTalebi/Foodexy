import ShopDetailClient from "@/components/shopDetailClient";
import { getFromThisShop } from "@/lib/actions/foods.action";
import { getShopById } from "@/lib/actions/shops.action";

interface Props {
    params: {
        id: string
    };
}

export default async function ShopDetailServer({ params }: Props) {
    const currentShop = await getShopById(Number(params.id));
    const currentShopFoods = await getFromThisShop(Number(params.id));

    return (
        <ShopDetailClient currentShop={currentShop} foods={currentShopFoods} />
    );
}
