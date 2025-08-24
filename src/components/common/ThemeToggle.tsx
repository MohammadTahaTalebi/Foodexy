"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle({className}:{className:string}) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <button
        className="rounded-md p-2"
      >
        <Sun className="h-5 w-5 opacity-0" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`rounded-md p-2 cursor-pointer ${className}`}
    >
      <Sun className={`h-5 w-5 transition-all ${theme === "dark" ? "" : "hidden"}`} />
      <Moon className={`h-5 w-5 transition-all ${theme === "dark" ? "hidden" : ""}`} />
    </button>
  );
}