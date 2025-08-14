"use server"

import { prisma } from "../prisma";

export async function getFoodComments(foodId: number) {
  try {
    return prisma.comments.findMany({
      where: {
        foodId: foodId,
      },
      include: {
        user: true,
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function createComment(data: {
  msg: string;
  rating: number;
  foodId: number;
  userId: string;
}) {
  try {
    return prisma.comments.create({
      data,
    });
  } catch (error) {
    throw error;
  }
}
