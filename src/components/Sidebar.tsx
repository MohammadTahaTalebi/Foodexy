export default function Sidebar() {
  return (
    <aside className="w-64 bg-background border-r p-4">
      <h1 className="text-2xl font-bold mb-8">Foodexy</h1>
      <nav className="flex flex-col gap-2">
        {["Dashboard", "Menu", "Cart", "Orders", "Settings"].map((item) => (
          <a
            key={item}
            href="#"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/30"
          >
            <span>📊</span>
            <span>{item}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
}
