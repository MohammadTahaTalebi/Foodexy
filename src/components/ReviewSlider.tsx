"use client";

import { getUser } from "@/lib/actions/getUser.action";
import { createLandingComment, getLandingComments } from "@/lib/actions/landingComments.action";
import { Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { A11y, Autoplay, EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import UserProfile from "./common/UserProfile";
import { FaRegCommentDots } from "react-icons/fa";

export default function ReviewSlider() {
  const swiperRef = useRef<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);

  const refreshReviews = async () => {
    try {
      setLoadingReviews(true);
      const data = await getLandingComments();
      setReviews(data);
    } catch (err) {
      console.error("Error fetching reviews", err);
    } finally {
      setLoadingReviews(false);
    }
  };

  useEffect(() => {
    refreshReviews();
  }, []);

  const handleSubmit = async () => {
    if (!message.trim()) return toast.error("Message cannot be empty");
    setLoading(true);
    try {
      const user = await getUser();
      await createLandingComment({
        message,
        rating,
        userId: user.id,
      });
      toast.success("Comment added!");
      setModalOpen(false);
      setMessage("");
      setRating(5);
      refreshReviews();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add comment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 px-6 md:px-20">
      <div className="flex justify-between">
        <span />
        <h2 className="text-3xl font-extrabold text-center mb-4 text-card-foreground">
          What Our Customers Say
        </h2>
        <div className="text-center mb-8">
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 bg-primary 
                 text-background px-5 py-2.5 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
            <FaRegCommentDots className="text-lg" />
            <span className="font-medium">Add Comment</span>
          </button>
        </div>
      </div>


      {loadingReviews ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              className="bg-background mb-10 p-6 rounded-2xl shadow-lg border border-border transition-all duration-500 hover:-translate-y-1 animate-pulse"
            >
              <div className="flex w-full justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="size-9 rounded-full bg-primary/20" />
                  <div>
                    <div className="h-4 w-24 bg-primary/20 rounded mb-2"></div>
                    <div className="h-3 w-16 bg-primary/20 rounded"></div>
                  </div>
                </div>

                <div className="flex items-center gap-[2px]">
                  {Array.from({ length: 5 }, (_, i) => (
                    <div key={i} className="w-4 h-4 bg-primary/20 rounded-full"></div>
                  ))}
                </div>
              </div>
              <div className="space-y-2 mb-6 h-25">
                <div className="h-3 w-full bg-primary/20 rounded"></div>
                <div className="h-3 w-5/6 bg-primary/20 rounded"></div>
                <div className="h-3 w-3/4 bg-primary/20 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        reviews.length > 0 && (
          <div className="relative group">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 z-20 
              bg-background text-primary p-3 rounded-full shadow-lg 
              hover:bg-primary hover:text-background cursor-pointer 
              transition opacity-0 group-hover:opacity-100 duration-300"
            >
              <FaChevronLeft />
            </button>

            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 z-20 
              bg-background text-primary p-3 rounded-full shadow-lg 
              hover:bg-primary hover:text-background cursor-pointer 
              transition opacity-0 group-hover:opacity-100 duration-300"
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
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 1, spaceBetween: 16 },
                1024: { slidesPerView: 2, spaceBetween: 24 },
                1440: { slidesPerView: 3, spaceBetween: 32 },
              }}
              className="pb-12 !px-3"
            >
              {reviews.map((review) => (
                <SwiperSlide key={review.id} className="mb-10 mt-5">
                  <div
                    className="bg-background p-6 rounded-2xl shadow-lg border border-border 
                    transition-all duration-500 hover:-translate-y-1"
                  >
                    <div className="flex w-full justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <UserProfile className="size-7 text-xl font-bold" email={review.user.email} />
                        <div>
                          <p className="font-semibold text-card-foreground">
                            {review.user.email.replace("@gmail.com", "").toUpperCase()}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(review.created_at).toLocaleDateString("en-US")}
                          </p>
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

                    <p className="text-muted-foreground mb-6 leading-relaxed italic h-25 overflow-scroll">
                      "{review.message}"
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-background p-8 rounded-2xl w-full max-w-md relative shadow-lg">
            <h3 className="text-xl font-bold mb-4">Add Your Comment</h3>
            <textarea
              className="w-full h-35 ml-2 p-3 border border-border rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="flex ml-2 items-center mb-4 gap-1">
              <span className="mr-3">Rating:</span>
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  onClick={() => setRating(i + 1)}
                  className={`w-6 h-6 cursor-pointer ${i + 1 <= rating ? "fill-secondary text-secondary" : "text-primary/40 fill-primary/10"
                    }`}
                />
              ))}
            </div>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 cursor-pointer rounded-xl border border-border hover:bg-primary/30 transition"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 cursor-pointer rounded-xl bg-primary text-background hover:shadow-lg transition"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Comment"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
