import FoodDetailClient from "./FoodDetailClient";
import {
  getFoodById,
  getFromThisShopNotFoodID,
  getSimilarFoods,
} from "@/lib/actions/foods.action";
import { getFoodComments } from "@/lib/actions/comments.action";

interface FoodDetailServerProps {
  params: { id: string };
}

export default async function FoodDetailServer({ params }: FoodDetailServerProps) {
  const foodId = Number(params.id);
  const food = await getFoodById(foodId);

  if (!food) return null;

  const fromThisShop = await getFromThisShopNotFoodID(food.id, food.shopId);
  const similarFoods = await getSimilarFoods(food.id, food.category);
  const comments = await getFoodComments(food.id);

  return (
    <FoodDetailClient
      food={food}
      fromThisShop={fromThisShop}
      similarFoods={similarFoods}
      comments={comments}
    />
  );
}
