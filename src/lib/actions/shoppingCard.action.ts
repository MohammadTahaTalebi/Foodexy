"use server";

import { prisma } from "../prisma";

export async function createOrBumpCartItem(
  cartId: number,
  foodId: number,
  quantity = 1
) {
  const existing = await prisma.shoppingCartItem.findFirst({
    where: { cartId, foodId },
  });

  if (existing) {
    return prisma.shoppingCartItem.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + quantity },
    });
  }

  return prisma.shoppingCartItem.create({
    data: { cartId, foodId, quantity },
  });
}

export async function getCartItems(UserCartId: number) {
  return prisma.shoppingCartItem.findMany({
    where: { cartId: UserCartId },
    orderBy: { id: "desc" },
  });
}

export async function updateCartItem(id: number, quantity: number) {
  return prisma.shoppingCartItem.update({
    where: { id },
    data: { quantity },
  });
}

export async function findCartItem(userId: string, foodId: number) {
  const cart = await getOrCreateCartByUserId(userId);

  return prisma.shoppingCartItem.findFirst({
    where: {
      cartId: cart.id,
      foodId,
    },
  });
}

export async function deleteCartItem(id: number) {
  return prisma.shoppingCartItem.delete({
    where: { id },
  });
}

export async function getOrCreateCartByUserId(userId?: number) {
  const id = userId ?? Math.floor(Date.now());

  return await prisma.shoppingCart.upsert({
    where: { userId: id },
    update: {},
    create: { userId: id },
  });
}
