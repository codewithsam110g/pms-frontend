"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { MoonIcon, SunIcon, Menu } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NavLink = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link>
>(({ className, ...props }, ref) => (
  <Link
    ref={ref}
    className={cn(
      "transition-colors hover:text-foreground/80 text-foreground/60",
      className,
    )}
    {...props}
  />
));

NavLink.displayName = "NavLink";

export function Navbar() {
  const { setTheme } = useTheme();
  const [isSheetOpen, setSheetOpen] = useState(false);

  const handleLinkClick = () => {
    setSheetOpen(false); // Close sheet when a link is clicked
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="backdrop-blur-md bg-background/70 border-b">
        <div className="container flex h-16 max-w-full items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href={"/"}>
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
              </svg>
              <span className="font-bold">PMS</span>
            </div>
          </Link>

          {/* Navigation and Actions */}
          <div className="flex items-center space-x-6 text-sm font-medium">
            {/* Nav Links */}
            <nav className="hidden md:flex items-center space-x-6">
              <NavLink href="#features">Features</NavLink>
              <NavLink href="#benefits">Benefits</NavLink>
              <NavLink href="#pricing">Pricing</NavLink>
              <NavLink href="#faq">Faq</NavLink>
            </nav>
            {/* Get Started Button */}
            <Link href={"/login"}>
              <Button>Get Started</Button>
            </Link>
            {/* Theme Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="w-9 px-0">
                  <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* Mobile Hamburger Menu */}
            <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="top" // Opens the sheet from the top
                className="h-auto p-4 bg-background shadow-md"
              >
                <nav className="flex flex-col gap-4">
                  <NavLink href="#features" onClick={handleLinkClick}>
                    Features
                  </NavLink>
                  <NavLink href="#benefits" onClick={handleLinkClick}>
                    Benefits
                  </NavLink>
                  <NavLink href="#pricing" onClick={handleLinkClick}>
                    Pricing
                  </NavLink>
                  <NavLink href="#faq" onClick={handleLinkClick}>
                    Faq
                  </NavLink>
                  <Link href="/login" onClick={handleLinkClick}>
                    <Button>Get Started</Button>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}