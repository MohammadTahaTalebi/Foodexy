import PopularSlider from "@/components/PopularSlider";
import ReviewSlider from "@/components/ReviewSlider";
import { getLandingComments } from "@/lib/actions/landingComments.action";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { FaClock, FaGlassMartiniAlt, FaHamburger, FaIceCream, FaLeaf, FaShieldAlt, FaShoppingCart, FaSmile, FaStar, FaTruck, FaUtensils } from "react-icons/fa";


const categories = [
  { name: "Fast Food", icon: <FaHamburger className="w-15 h-15" />, url: "/foods?category=FAST_FOOD" },
  { name: "Salads", icon: <FaLeaf className="w-15 h-15" />, url: "/foods?category=SALAD" },
  { name: "Desserts", icon: <FaIceCream className="w-15 h-15" />, url: "/foods?category=DESSERT" },
  { name: "Drinks", icon: <FaGlassMartiniAlt className="w-15 h-15" />, url: "/foods?category=DRINK" },
];

export default async function HomePage() {

  const popularFoods = await prisma.food.findMany({
    take: 6,
    orderBy: {
      star: "desc",
    },
    include: {
      shop: true,
    },
  });

  const reviews = await getLandingComments();

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
          <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight drop-shadow-lg">
            <span className="block text-secondary text-6xl max-[360px]:mb-2 md:text-7xl lg:text-8xl">
              Foodexy
            </span>
            <span className="block text-white">
              Bringing Delicious Meals To Your Doorstep
            </span>
          </h1>

          <p className="text-lg opacity-80 max-w-xl mx-auto mb-10 drop-shadow-md text-white">
            Enjoy fast, fresh, and tasty food delivered in under 30 minutes.
          </p>
          <div className="flex flex-row gap-6 justify-center max-[360px]:flex-col">
            <button className="bg-secondary text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-primary transition duration-300 min-w-[150px] md:min-w-[200px]">
              Order Now
            </button>
            <button className="border-2 border-secondary text-secondary px-8 py-3 rounded-full font-semibold hover:bg-secondary hover:text-white transition duration-300 min-w-[150px] md:min-w-[200px]">
              View Menu
            </button>
          </div>

          <div className="mt-10 sm:mt-12 md:mt-16 grid min-[500px]:grid-cols-3 gap-4 sm:gap-6 md:gap-8 text-sm text-white select-none drop-shadow-sm">
            {[
              { icon: <FaStar />, text: "Rated 4.9 / 1000+ reviews" },
              { icon: <FaClock />, text: "24/7 Fast Delivery" },
              { icon: <FaShieldAlt />, text: "100% Quality Guarantee" },
            ].map(({ icon, text }, i) => (
              <div
                key={i}
                className="flex mx-auto w-auto items-center gap-1 sm:gap-2 md:gap-3 justify-start sm:justify-center"
              >
                <div className="text-secondary text-lg sm:text-xl">{icon}</div>
                <span className="text-left">{text}</span>
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
            <Link key={cat.name} href={cat.url}>
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
        <PopularSlider foods={popularFoods} />
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

      <ReviewSlider />
    </main>
  );

}