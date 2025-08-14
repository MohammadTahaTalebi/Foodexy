import FoodCard from "@/components/common/FoodCard";
import { Star } from "lucide-react";
import Link from "next/link";
import { FaClock, FaFacebookF, FaInstagram, FaShieldAlt, FaShoppingCart, FaSmile, FaStar, FaTruck, FaTwitter, FaUtensils, FaYoutube } from "react-icons/fa";

import { FaGlassMartiniAlt, FaHamburger, FaIceCream, FaLeaf } from "react-icons/fa";

const categories = [
  { name: "Fast Food", icon: <FaHamburger className="w-15 h-15" />, url: "/foods?filter=1" },
  { name: "Salads", icon: <FaLeaf className="w-15 h-15" />, url: "/foods?filter=2" },
  { name: "Desserts", icon: <FaIceCream className="w-15 h-15" />, url: "/foods?filter=3" },
  { name: "Drinks", icon: <FaGlassMartiniAlt className="w-15 h-15" />, url: "/foods?filter=4" },
];

export default async function HomePage() {


  const popularFoods = [
    {
      name: "Cheese Burger",
      desc: "Juicy beef burger with melted cheese, lettuce, and tomato.",
      Star: 4.5,
      Price: 8.99,
      createdAt: "2025-08-10",
      category: 1,
      image: "https://ghazaland.com/wp-content/uploads/2018/04/cheesberger.jpg",
      shop: { name: "Ope", picture: "https://epls.b-cdn.net/wp-content/uploads/2018/10/IMG_3155.jpg" }
    },
    {
      name: "Caesar Salad",
      desc: "Fresh romaine lettuce with Caesar dressing and parmesan.",
      Star: 4,
      Price: 6.5,
      createdAt: "2025-08-09",
      category: 2,
      image: "https://images.getrecipekit.com/20220427155305-caesar-salad.jpg?aspect_ratio=16:9&quality=90&",
      shop: { name: "Ope", picture: "https://epls.b-cdn.net/wp-content/uploads/2018/10/IMG_3155.jpg" }
    },
    {
      name: "Chocolate Cake",
      desc: "Rich and moist chocolate cake topped with ganache.",
      Star: 5,
      Price: 4.75,
      createdAt: "2025-08-08",
      category: 3,
      image: "https://www.hersheyland.com/content/dam/hersheyland/en-us/recipes/recipe-images/40-hersheys-deep-dark-chocolate-cake.jpg",
      shop: { name: "Ope", picture: "https://epls.b-cdn.net/wp-content/uploads/2018/10/IMG_3155.jpg" }
    },
  ];

  const reviews = [
    {
      name: "Alex Johnson",
      msg: "The burgers here are absolutely amazing! Fresh ingredients and perfect seasoning.",
      rating: 5,
      date: "2025-07-21T00:00:00Z",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Sophia Lee",
      msg: "Loved the salads! Super fresh and full of flavor. Will definitely come back.",
      rating: 4,
      date: "2025-06-12T00:00:00Z",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg"
    },
    {
      name: "Daniel Smith",
      msg: "Desserts are heavenly. The chocolate lava cake is a must-try!",
      rating: 5,
      date: "2025-05-03T00:00:00Z",
      avatar: "https://randomuser.me/api/portraits/men/44.jpg"
    }
  ];

  const steps = [
    {
      title: "Place Your Order",
      desc: "Choose your favorite meals and add them to the cart.",
      icon: <FaShoppingCart className="text-secondary w-8 h-8" />,
    },
    {
      title: "Food Preparation",
      desc: "Our chefs start cooking your meal fresh & delicious.",
      icon: <FaUtensils className="text-secondary w-8 h-8" />,
    },
    {
      title: "Fast Delivery",
      desc: "Our courier brings your food hot and fresh to your door.",
      icon: <FaTruck className="text-secondary w-8 h-8" />,
    },
    {
      title: "Enjoy Your Meal",
      desc: "Sit back, relax, and enjoy your delicious order.",
      icon: <FaSmile className="text-secondary w-8 h-8" />,
    },
  ];


  return (
    <main className="bg-background text-foreground">
      <section className="relative min-h-screen flex items-center justify-center text-card-foreground px-6 sm:px-12 overflow-hidden isolate">

        <div
          className="absolute inset-0 bg-center bg-cover filter blur-[20px] scale-110"
          style={{ backgroundImage: "url('/Image/HeroSection.png')" }}
          aria-hidden="true"
        />

        <div className="absolute inset-0 bg-black/60" aria-hidden="true" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">

          <h1 className="text-5xl font-extrabold mb-4 leading-tight drop-shadow-lg">
            <span className="text-secondary text-7xl">Foodexy</span>
            <br />
            <span className="text-white">Bringing Delicious Meals To Your Doorstep</span>
          </h1>

          <p className="text-lg opacity-80 max-w-xl mx-auto mb-10 drop-shadow-md text-white">
            Enjoy fast, fresh, and tasty food delivered in under 30 minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-secondary text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-primary transition duration-300 min-w-[180px]">
              Order Now
            </button>
            <button className="border-2 border-secondary text-secondary px-8 py-3 rounded-full font-semibold hover:bg-secondary hover:text-white transition duration-300 min-w-[180px]">
              View Menu
            </button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-6 text-sm text-white select-none drop-shadow-sm">
            {[
              { icon: <FaStar />, text: "Rated 4.9 / 1000+ reviews" },
              { icon: <FaClock />, text: "24/7 Fast Delivery" },
              { icon: <FaShieldAlt />, text: "100% Quality Guarantee" }
            ].map(({ icon, text }, i) => (
              <div key={i} className="flex items-center gap-2 justify-center">
                <div className="text-secondary">{icon}</div>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background-secondry px-6 md:px-20">
        <h2 className="text-3xl font-extrabold text-center mb-12 text-card-foreground select-none">
          Browse by Category
        </h2>

        <div className="grid max-[400px]:grid-cols-1 max-[768px]:grid-cols-2 md:grid-cols-4 justify-between gap-8 mx-auto">
          {categories.map((cat) => (
            <Link href={cat.url}>
              <div
                key={cat.name}
                className="bg-background rounded-2xl md:w-full shadow-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-transform duration-700 ease-in-out hover:scale-105 hover:shadow-2xl group"
              >
                <div className="text-6xl mb-5 relative rounded-full w-24 h-24 flex items-center justify-center bg-gradient-to-tr from-primary to-secondary text-white shadow-md">
                  {cat.icon}
                </div>

                <p className="text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors select-none">
                  {cat.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-16 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-10">Popular Dishes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {popularFoods.map((food) => (
            <FoodCard key={food.name} food={food} />

          ))}
        </div>
      </section>

      <section className="py-20 bg-background-secondry px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-16">
          How Your Food Reaches You
        </h2>

        <div className="hidden md:flex justify-between items-start relative mx-auto">
          <div className="absolute top-8 left-0 right-0 h-1 bg-border z-0"></div>

          {steps.map((step, idx) => (
            <div key={idx} className="relative flex flex-col items-center w-1/4 px-4 z-10">
              <div className="bg-background-secondry border-4 border-primary w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                {step.icon}
              </div>
              <h3 className="mt-4 font-bold text-lg text-card-foreground text-center">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm text-center mt-2">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-12 md:hidden">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-4 ${idx % 2 === 0 ? "" : "flex-row-reverse"}`}
            >
              <div className="bg-background-secondry border-4 border-primary w-16 h-16 rounded-full flex items-center justify-center shadow-lg">
                {step.icon}
              </div>
              <div>
                <h3 className="font-bold text-lg text-card-foreground">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-6 md:px-20">
        <h2 className="text-3xl font-extrabold text-center mb-12 text-card-foreground">
          What Our Customers Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="bg-background p-6 rounded-2xl shadow-lg border border-border hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
            >
              <div className="flex w-full justify-between mb-4">

                <div className="flex items-center gap-2">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover border border-border"
                    loading="lazy"
                  />
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-semibold text-card-foreground">{review.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(review.date).toLocaleDateString("en-US")}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-[2px]">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i + 1 <= review.rating
                        ? "fill-secondary text-secondary"
                        : "text-primary/40 fill-primary/10"
                        }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed italic h-25 overflow-scroll ">
                "{review.msg}"
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );

}