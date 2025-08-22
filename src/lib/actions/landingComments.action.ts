"use server";

import { prisma } from "../prisma";

export async function getLandingComments() {
  try {
    return prisma.landingComments.findMany({
      orderBy: { created_at: "desc" },
      take: 10,
      include: { user: true },
    });
  } catch (error) {
    throw error;
  }
}

export async function createLandingComment(data: {
  message: string;
  rating: number;
  userId: string;
}) {
  try {
    return prisma.landingComments.create({
      data: {
        id: (Date.now()/10000),
        message: data.message,
        rating: data.rating,
        userId: data.userId,
      },
    });
  } catch (error) {
    throw error;
  }
}
