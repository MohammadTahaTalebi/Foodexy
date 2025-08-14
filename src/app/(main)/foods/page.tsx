import FoodCard from "@/components/common/FoodCard";
import { getAllFoods } from "@/lib/actions/foods.action";

export default async function FoodsPage() {
  const foods = await getAllFoods();
  return (
    <div className="p-6 md:p-12">
      {foods.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {foods.map((food) => (
            <FoodCard key={food.name} food={food} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No foods found.</p>
      )}
    </div>
  );
}
