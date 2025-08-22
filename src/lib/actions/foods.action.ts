"use server";

import {
  Category,
  Restaurants,
} from "./../../../prisma/src/generated/prisma/index.d";
import { prisma } from "../prisma";

export async function getAllFoods(query?: string) {
  const params = new URLSearchParams(query);
  const search = params.get("search") || "";
  const category = params.get("category");
  return prisma.food.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
      ...(category && category !== "ALL" ? { category } : {}),
    },
    include: {
      shop: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getFoodById(foodId: number) {
  try {
    return await prisma.food.findUnique({
      where: { id: foodId },
    });
  } catch (err) {
    throw err;
  }
}

export async function getFromThisShopNotFoodID(foodId: number, shopId: number) {
  try {
    return await prisma.food.findMany({
      take: 4,
      where: {
        id: { not: foodId },
        shopId: shopId,
      },
    });
  } catch (err) {
    throw err;
  }
}

export async function getFromThisShop(shopId: number) {
  try {
    return await prisma.food.findMany({
      where: {
        shopId: shopId,
      },
    });
  } catch (err) {
    throw err;
  }
}

export async function getSimilarFoods(foodId: number, category: Category) {
  try {
    return await prisma.food.findMany({
      take: 4,
      where: {
        id: { not: foodId },
        category: category,
      },
    });
  } catch (err) {
    throw err;
  }
}
