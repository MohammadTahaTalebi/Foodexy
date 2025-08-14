"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/actions/auth.action";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function LoginForm({ className, ...props }: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-8 w-full", className)} {...props}>
      {/* Heading */}
      <div className="flex flex-col gap-2 text-center md:text-left">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-primary">
          Welcome Back
        </h1>
        <p className="text-muted-foreground">
          Sign in to your account and continue your journey with us.
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email" className="font-semibold">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            className="h-12 rounded-xl px-4 border-border focus:border-primary focus:ring-2 focus:ring-primary/40 transition-all"
          />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="font-semibold">
              Password
            </Label>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            required
            className="h-12 rounded-xl px-4 border-border focus:border-primary focus:ring-2 focus:ring-primary/40 transition-all"
          />
        </div>

        <Button
          formAction={login}
          type="submit"
          className="h-12 rounded-xl text-base font-semibold bg-gradient-to-r from-primary to-secondary text-white shadow-md hover:shadow-lg hover:brightness-110 transition-all"
        >
          Login
        </Button>
      </div>

      <div className="text-center md:text-center text-sm text-muted-foreground">
        Don’t have an account?{" "}
        <a
          href="/authentication/register"
          className="text-primary hover:text-primary/80 underline underline-offset-4"
        >
          Sign up
        </a>
      </div>
    </form>
  );
}
