"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaDollarSign, FaTrash } from "react-icons/fa";
import * as Popover from "@radix-ui/react-popover";
import { ShoppingBag } from "lucide-react";
import { getCartItems, updateCartItem, deleteCartItem, getOrCreateCartByUserId } from "@/lib/actions/shoppingCard.action";
import { getFoodById } from "@/lib/actions/foods.action";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type FoodType = {
    id: number;
    name: string;
    image: string;
    price: number;
    star: number;
};

type ShoppingCartItemType = {
    id: number;
    cartId: number;
    foodId: number;
    quantity: number;
};

export default function ShoppingCartPopover() {
    const [cartItems, setCartItems] = useState<(ShoppingCartItemType & { food: FoodType })[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchCart = async () => {
            setLoading(true);
            const { data: userData, error: userError } = await supabase.auth.getUser();
            const userId = userData.user?.id;
            const cart = await getOrCreateCartByUserId(userId);
            const items = await getCartItems(cart.id);
            const itemsWithFood = await Promise.all(
                items.map(async (item) => {
                    const food = await getFoodById(item.foodId);
                    return { ...item, food };
                })
            );
            setCartItems(itemsWithFood);
            setLoading(false);
        };
        fetchCart();
    }, []);

    const handleQuantityChange = async (id: number, newQuantity: number) => {
        if (newQuantity < 1) newQuantity = 1;
        if (newQuantity > 99) newQuantity = 99;

        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );

        try {
            await updateCartItem(id, newQuantity);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id: number) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
        try {
            await deleteCartItem(id);
        } catch (err) {
            console.error(err);
        }
    };

    const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.food.price * item.quantity,
        0
    );

    return (
        <Popover.Root>
            <Popover.Trigger className="h-10 p-2 hover:bg-muted w-full cursor-pointer text-[15px] text-foreground flex gap-2 items-center rounded hover:text-primary font-normal">
                <ShoppingBag className="w-6" /> <p className="my-auto">Cart</p>
            </Popover.Trigger>

            <Popover.Content
                side="left"
                align="start"
                sideOffset={10}
                className="w-[380px] max-w-[90vw] max-h-[80vh] overflow-auto bg-background p-4 rounded-2xl shadow-lg border border-border space-y-4"
            >
                <h2 className="text-xl font-bold text-card-foreground text-center">
                    Your Cart
                </h2>
                <div className="flex flex-colo flex-wrap gap-3 max-h-45 overflow-y-scroll w-full">
                    {loading && (
                        <div className="text-center w-full text-primary py-4">
                            Loading cart...
                        </div>
                    )}

                    {!loading && !cartItems.length && (
                        <div className="text-center text-muted-foreground py-4">
                            Your cart is empty
                        </div>
                    )}

                    {!loading &&
                        cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex justify-between w-full mr-3 gap-3 bg-background-secondry p-3 rounded-xl border border-border"
                            >
                                <Link className="flex items-center gap-3 cursor-pointer h-15" href={`foods/${item.id}`}>
                                    <Image
                                        src={item.food.image}
                                        alt={""}
                                        width={60}
                                        height={60}
                                        className="rounded-lg object-cover bg-muted h-15"
                                    />

                                    <div className="flex-1">
                                        <h3 className="text-md font-semibold text-card-foreground">
                                            {item.food.name}
                                        </h3>
                                        <p className="text-md font-semibold text-card-foreground/60">
                                            {item.food.price}$
                                        </p>
                                    </div></Link>

                                <div className="flex gap-1 items-center">
                                    <input
                                        type="number"
                                        min={1}
                                        max={99}
                                        value={item.quantity}
                                        onChange={(e) => {
                                            let value = parseInt(e.target.value);
                                            if (isNaN(value) || value < 1) value = 1;
                                            if (value > 99) value = 99;
                                            handleQuantityChange(item.id, value);
                                        }}
                                        className="w-12 text-center bg-transparent border-none outline-none p-0 h-auto leading-none text-foreground" />
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="p-2 text-red-500 hover:text-red-700"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
                {!loading && cartItems.length > 0 && (
                    <div className="pt-4 border-t border-border flex justify-between items-center text-lg font-bold text-primary">
                        <span>Total:</span>
                        <span className="flex items-center gap-1">
                            <FaDollarSign /> {totalPrice.toFixed(2)}
                        </span>
                    </div>


                )}

            </Popover.Content>
        </Popover.Root>
    );
}
