import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import { Food, Restaurants } from "../../../prisma/src/generated/prisma";
import Link from "next/link";

interface FoodCardProps {
  food: Food & { shop: Restaurants };
}

export default function MiniFoodCard({ food }: FoodCardProps) {
  return (
    <Link href={`foods/${food.id}`}>
      <div
        key={food.id}
        className="bg-background-secondry border border-border rounded-xl overflow-hidden hover:shadow-lg transition"
      >
        <Image
          src={food.image}
          alt={""}
          width={300}
          height={200}
          className="object-cover w-full h-40 bg-primary"
        />
        <div className="p-4">
          <h3 className="font-medium">{food.name}</h3>
          <p className="text-primary font-bold">${food.price}</p>
        </div>
      </div>
    </Link>
  );
}
