export default function FoodCardSkeleton() {
  return (
    <div className="!w-full bg-background-secondary rounded-2xl shadow-lg overflow-hidden border border-border animate-pulse">
      {/* Image skeleton */}
      <div className="relative w-full h-60 bg-primary/20" />

      {/* Content */}
      <div className="p-5 flex flex-col gap-3">
        {/* Title & Rating */}
        <div className="flex justify-between items-start">
          <div className="h-5 w-2/3 bg-primary/20 rounded" />
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 rounded-full bg-primary/20"
              />
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="h-4 w-full bg-primary/20 rounded" />

        {/* Shop & Price */}
        <div className="flex justify-between items-center pt-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary/20" />
            <div className="h-4 w-20 bg-primary/20 rounded" />
          </div>
          <div className="h-5 w-12 bg-primary/20 rounded" />
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center border-t border-border pt-3">
          <div className="h-3 w-16 bg-primary/20 rounded" />
          <div className="flex gap-2">
            <div className="h-6 w-20 bg-primary/20 rounded-full" />
            <div className="h-6 w-20 bg-primary/20 rounded-full" />
          </div>
        </div>
      </div>
    </div>

  );
}
