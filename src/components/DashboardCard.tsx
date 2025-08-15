export default function FoodCard({ food }: { food: any }) {
  return (
    <div className="rounded-lg border overflow-hidden shadow-sm hover:shadow-md">
      <div className="h-48">
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{food.name}</h3>
          <div className="flex items-center gap-1">
            <span>⭐</span>
            <span>{food.star}</span>
          </div>
        </div>
        <p className="text-secondary/80 text-sm mb-4">{food.desc}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold">${food.price.toFixed(2)}</span>
          <button className="bg-primary px-3 py-1 rounded-lg">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
