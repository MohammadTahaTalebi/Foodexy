"use client";

import { useState } from "react";
import { ShoppingCart, X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";

export default function CartSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const mockCartItems = [
    { id: 1, food: { id: 1, name: "Spicy Margherita Pizza", price: 12.99, image: "/foods/pizza.jpg" }, quantity: 2 },
    { id: 2, food: { id: 2, name: "Beef Burger Deluxe", price: 9.99, image: "/foods/burger.jpg" }, quantity: 1 },
  ];
  const total = mockCartItems.reduce((sum, item) => sum + item.food.price * item.quantity, 0);
  const itemCount = mockCartItems.reduce((sum, item) => sum + item.quantity, 0);

  const toggleCart = () => setIsOpen(!isOpen);

  return (
    <>
      {/* --- Floating Cart Button --- */}
      <button
        onClick={toggleCart}
        aria-label={`Open cart with ${itemCount} items`}
        className={`fixed right-0 top-1/2 -translate-y-1/2 z-40 flex items-center justify-center rounded-l-xl bg-primary p-4 text-primary-foreground shadow-lg transition-all duration-300 hover:scale-105 ${
          isOpen ? "translate-x-24" : "translate-x-0"
        }`}
      >
        <div className="relative">
          <ShoppingCart size={26} />
          {itemCount > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs font-semibold text-destructive-foreground shadow-md">
              {itemCount}
            </span>
          )}
        </div>
      </button>

      {/* --- Backdrop --- */}
      <div
        onClick={toggleCart}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* --- Sidebar --- */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col border-l bg-background shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-lg font-bold tracking-tight">Your Cart <span className="text-muted-foreground">({itemCount})</span></h2>
          <button
            onClick={toggleCart}
            className="rounded-full p-2 hover:bg-muted transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Content */}
        {itemCount > 0 ? (
          <>
            <div className="flex-1 space-y-5 overflow-y-auto p-5">
              {mockCartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-lg border p-3 shadow-sm hover:shadow-md transition"
                >
                  <div className="relative">
                    <img
                      src={item.food.image}
                      alt={item.food.name}
                      className="h-20 w-20 rounded-lg object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="font-medium leading-snug">{item.food.name}</h3>
                      <p className="text-sm text-muted-foreground">${item.food.price.toFixed(2)}</p>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <button className="rounded-md border p-1 hover:bg-muted">
                        <Minus size={14} />
                      </button>
                      <span className="w-6 text-center font-medium">{item.quantity}</span>
                      <button className="rounded-md border p-1 hover:bg-muted">
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <p className="font-bold">${(item.food.price * item.quantity).toFixed(2)}</p>
                    <button className="text-muted-foreground hover:text-destructive transition">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t bg-background p-5 shadow-lg">
              <div className="mb-4 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button className="w-full rounded-lg bg-primary py-3 font-medium text-primary-foreground shadow-md transition hover:scale-[1.02] hover:bg-primary/90">
                Proceed to Checkout
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <ShoppingBag size={64} className="text-muted-foreground" />
            <div>
              <h3 className="text-xl font-semibold">Your cart is empty</h3>
              <p className="text-muted-foreground">Looks like you haven't added anything yet.</p>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
