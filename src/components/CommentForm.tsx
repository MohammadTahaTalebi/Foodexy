"use client";

import { createComment } from "@/lib/actions/comments.action";
import { getUser } from "@/lib/actions/getUser.action";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CommentForm = ({ foodId }: { foodId: number }) => {
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const [rating, setRating] = useState<number | "">("");
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState<{ msg?: string; rating?: string }>({});

  async function handleSubmit(formData: FormData) {
    const msgVal = formData.get("msg") as string;
    const ratingVal = Number(formData.get("rating"));
    const newErrors: typeof errors = {};

    if (!msgVal.trim()) newErrors.msg = "Please write a review.";
    if (!ratingVal) newErrors.rating = "Please select a rating.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsPending(true);

    try {
      const user = await getUser();
      await createComment({
        msg: msgVal.trim(),
        rating: ratingVal,
        foodId,
        userId: user.id,
      });
      router.refresh();
      setMsg("");
      setRating("");
    } catch (err) {
      console.error("Failed to submit review:", err);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form
      action={handleSubmit}
      className="mt-6 space-y-5 bg-background-secondry p-5 rounded-xl border border-border shadow-sm"
    >
      {/* Review Text */}
      <div className="flex flex-col gap-1">
        <textarea
          name="msg"
          placeholder="Write your review..."
          className={`w-full p-3 rounded-lg border text-sm resize-none min-h-[100px] focus:outline-none focus:ring-2 focus:ring-primary/50 transition ${
            errors.msg ? "border-red-500" : "border-border"
          } bg-background`}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          disabled={isPending}
        />
        {errors.msg && (
          <p className="text-red-500 text-xs">{errors.msg}</p>
        )}
      </div>

      {/* Rating + Submit */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div className="flex flex-col gap-1 w-full sm:w-auto">
          <label htmlFor="rating" className="text-sm font-medium">
            Your Rating
          </label>
          <select
            id="rating"
            name="rating"
            className={`border rounded-lg px-3 py-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition ${
              errors.rating ? "border-red-500" : "border-border"
            }`}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            disabled={isPending}
          >
            <option value="">Select rating</option>
            <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
            <option value="4">⭐⭐⭐⭐ Good</option>
            <option value="3">⭐⭐⭐ Average</option>
            <option value="2">⭐⭐ Poor</option>
            <option value="1">⭐ Terrible</option>
          </select>
          {errors.rating && (
            <p className="text-red-500 text-xs">{errors.rating}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className={`px-6 py-3 cursor-pointer rounded-lg font-semibold text-sm transition shadow-sm w-full sm:w-auto ${
            isPending
              ? "bg-primary/70 cursor-not-allowed text-white"
              : "bg-primary hover:bg-secondary text-white hover:scale-105"
          }`}
        >
          {isPending ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
