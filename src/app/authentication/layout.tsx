"use client";

import { ThemeProvider } from "@/components/common/ThemeProvider";
import Image from "next/image";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`vazirmatn antialiased`}
        style={{ fontFamily: "'Vazirmatn', sans-serif" }}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 px-4">
            <div className="w-full max-w-6xl flex flex-col md:flex-row items-center md:items-stretch gap-8 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl border border-border bg-background/70 animate-fade-in">
              <div className="flex-1 p-8 sm:p-12 flex flex-col justify-center">
                {children}
              </div>
              <div className="flex-1 relative hidden md:flex flex-col justify-center items-center bg-background-secondry">
                <Image
                  src="https://png.pngtree.com/png-vector/20250124/ourmid/pngtree-mouth-watering-pepperoni-pizza-slice-png-image_15317290.png"
                  alt="Pizza Slice"
                  width={450}
                  height={450}
                  className="drop-shadow-2xl object-cover object-center transform transition-transform duration-200 animate-float"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-secondary/30 mix-blend-multiply pointer-events-none" />
              </div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
