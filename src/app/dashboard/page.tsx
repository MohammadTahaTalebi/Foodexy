import FoodCard from "@/components/DashboardCard";

const mockFoods = [
  {
    id: 1,
    name: "Spicy Margherita Pizza",
    desc: "Classic pizza with fresh mozzarella and basil",
    star: 4.8,
    price: 12.99,
    image: "/foods/pizza.jpg",
  },
  {
    id: 2,
    name: "Beef Burger Deluxe",
    desc: "Juicy beef patty with cheese and special sauce",
    star: 4.5,
    price: 9.99,
    image: "/foods/burger.jpg",
  },
  {
    id: 3,
    name: "Chicken Tikka Masala",
    desc: "Creamy Indian curry with grilled chicken",
    star: 4.7,
    price: 14.99,
    image: "/foods/curry.jpg",
  },
];

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Today's Specials</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockFoods.map((food) => (
          <FoodCard key={food.id} food={food} />
        ))}
      </div>
    </div>
  );
}
