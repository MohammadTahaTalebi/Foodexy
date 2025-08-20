"use server";

import { prisma } from "../prisma";

export async function createCartItem(cartId: number, foodId: number, quantity: number) {
  return prisma.shoppingCartItem.create({
    data: {
      id: Date.now() /1000, 
      cartId,
      foodId,
      quantity,
    },
  });
}

export async function getCartItems() {
  return prisma.shoppingCartItem.findMany({
    orderBy: { id: "desc" },
  });
}

export async function updateCartItem(id: number, quantity: number) {
  return prisma.shoppingCartItem.update({
    where: { id },
    data: { quantity },
  });
}

export async function deleteCartItem(id: number) {
  return prisma.shoppingCartItem.delete({
    where: { id },
  });
}

