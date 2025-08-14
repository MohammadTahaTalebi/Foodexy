import { Category, Restaurants } from "./../../../prisma/src/generated/prisma/index.d";
import { prisma } from "../prisma";

export async function getAllFoods() {
  try {
    return prisma.food.findMany({
      include: {
        shop: true,
      },
    });
  } catch (err) {
    throw err;
  }
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

export async function getFromThisShop(foodId: number, shopId: number) {
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