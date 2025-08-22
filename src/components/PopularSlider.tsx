"use client";

import { useRef } from "react";
import FoodCard from "@/components/common/FoodCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type PopularSliderProps = {
  foods: Array<any>; 
};

export default function PopularSlider({ foods }: PopularSliderProps) {
  const swiperRef = useRef<any>(null);

  if (!foods?.length) return null;

  return (
    <div className="relative group">
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 z-20 bg-background text-primary p-3 rounded-full shadow-lg hover:bg-primary hover:text-background cursor-pointer transition opacity-0 group-hover:opacity-100 duration-300"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 z-20 bg-background text-primary p-3 rounded-full shadow-lg hover:bg-primary hover:text-background cursor-pointer transition opacity-0 group-hover:opacity-100 duration-300"
      >
        <FaChevronRight />
      </button>

      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        modules={[Navigation, Pagination, Autoplay, EffectCoverflow, A11y]}
        slidesPerView={1}
        spaceBetween={16}
        loop={true}                        
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 16 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
          1440: { slidesPerView: 4, spaceBetween: 32 },
        }}
        className="pb-12 px-10"
      >
        {foods.map((food) => (
          <SwiperSlide className="mb-10" key={food.id}>
            <FoodCard food={food} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
