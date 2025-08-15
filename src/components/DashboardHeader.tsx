export default function Header() {
  return (
    <header className="bg-background border-b p-4 flex items-center justify-between">
      <div className="relative w-full max-w-md">
        <input
          placeholder="Search foods or restaurants..."
          className="pl-10 py-2 w-full rounded-lg border"
        />
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-secondary/30">
          <span>🔔</span>
        </button>
        <button className="p-2 rounded-full hover:bg-secondary/30">
          <span>👤</span>
        </button>
      </div>
    </header>
  );
}
