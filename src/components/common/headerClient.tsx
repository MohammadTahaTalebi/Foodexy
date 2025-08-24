"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "../../../public/Image/logo.png";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { ThemeToggle } from "./ThemeToggle";
import UserProfile from "./UserProfile";
import UserMenuItems from "../UserMenuItems";
import ShoppingCartPopover from "../ShoppingCartPopover";
import Image from "next/image";

export default function HeaderClient({ email }: { email: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const navItems = [
        { title: "Home", href: "/" },
        { title: "Foods", href: "/foods" },
        { title: "Shops", href: "/shops" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full flex justify-center border-b bg-background/95 backdrop-blur px-4">
            <div className="w-full flex h-16 items-center justify-between md:px-10">
                {/* Logo */}
                <Link href="/" className="hidden md:flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                        <Image className="w-10 h-10 rounded-lg" alt="" src={Logo}></Image>
                    </div>
                    <span className="hidden sm:inline-block font-bold text-xl">Foodexy</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`font-semibold transition-colors ${pathname === item.href ? "text-primary" : "text-foreground hover:text-primary"
                                }`}
                        >
                            {item.title}
                        </Link>
                    ))}
                </nav>


                {/* Right */}
                <div className="flex items-center gap-4">
                    <Popover>
                        <PopoverTrigger>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <UserProfile className="text-[11px] size-6" email={email} />
                                </TooltipTrigger>
                                <TooltipContent><p>{email}</p></TooltipContent>
                            </Tooltip>
                        </PopoverTrigger>
                        <PopoverContent className="w-[353px] shadow-lg p-2 rounded bg-background border-border">
                            <div className="flex flex-wrap gap-y-1">
                                <div className="bg-muted rounded flex items-center flex-grow p-4">
                                    <UserProfile email={email} className="size-16 text-3xl font-bold" />
                                    <div className="flex flex-col gap-y-1 pl-2">
                                        <span className="font-semibold text-xl max-w-[200px] truncate">
                                            {email?.replace("@gmail.com", "").toUpperCase()}
                                        </span>
                                        <span className="text-muted-foreground text-[13px]">{email}</span>
                                    </div>
                                </div>
                                <ShoppingCartPopover />
                                <UserMenuItems />
                            </div>
                        </PopoverContent>
                    </Popover>
                    <ThemeToggle className="hidden md:flex" />
                </div>


                {/* Mobile Button */}
                <button
                    className="md:hidden cursor-pointer p-2 rounded-md hover:text-primary"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? "✖" : "☰"}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="absolute top-full left-0 w-full bg-background/95 backdrop-blur border-t z-40">
                    <div className="container py-4 px-4 flex flex-col gap-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="px-5 py-2 border-b"
                            >
                                {item.title}
                            </Link>
                        ))}
                        <ThemeToggle className="ml-[11px]"/>
                    </div>
                </div>
            )}

        </header>
    );
}
