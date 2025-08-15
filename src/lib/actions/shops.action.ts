import { prisma } from "../prisma";

export async function getAllShops() {
  try {
    return await prisma.restaurants.findMany({});
  } catch (err) {
    throw new Error("Error fetching restaurants: " + (err as Error).message);
  }
}

export async function getShopById(restaurantId: number) {
  try {
    return await prisma.restaurants.findUnique({
      where: { id: restaurantId },
    });
  } catch (err) {
    throw new Error("Error fetching restaurant: " + (err as Error).message);
  }
}
