"use client";

import { createComment } from "@/lib/actions/comments.action";
import { getUser } from "@/lib/actions/getUser.action";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CommentForm = ({ foodId }: { foodId: number }) => {
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const [rating, setRating] = useState<number | "">("");

  async function handleSubmit(formData: FormData) {
    const msg = formData.get("msg") as string;
    const rating = Number(formData.get("rating"));
    const user = await getUser();

    if (!msg || !rating) return;

    await createComment({ msg, rating, foodId, userId: user.id });
    router.refresh();

    setMsg("");
    setRating("");
  }
  return (
    <form action={handleSubmit} className="mt-6 space-y-4">
      <textarea
        name="msg"
        placeholder="Write your review..."
        className="w-full p-3 rounded-lg border border-border bg-background"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />

      <div className="flex items-center gap-4">
        <select
          name="rating"
          className="border border-border rounded-lg p-2 bg-background"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          <option value="">Rating</option>
          <option value="5">⭐⭐⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="2">⭐⭐</option>
          <option value="1">⭐</option>
        </select>

        <button
          type="submit"
          className="bg-primary text-white px-6 py-3 rounded-xl hover:opacity-90 transition"
        >
          Submit Review
        </button>
      </div>
    </form>
  );
};
export default CommentForm;
