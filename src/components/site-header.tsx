"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BagIcon,
  HeartIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
  XIcon,
} from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const navItems = [
  { label: "Skin Care", href: "#skincare" },
  { label: "Hair Care", href: "#haircare" },
  { label: "Makeup", href: "#makeup" },
  { label: "Body Care", href: "#bodycare" },
  { label: "Men", href: "#men" },
  { label: "Best Sellers", href: "#bestsellers" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const cartCount = 2;
  const [isScrolled, setIsScrolled] = useState(false);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-[#fdfbf9]/95 backdrop-blur-md transition-all duration-200 border-b border-stone-200/70 ${
        isScrolled ? "shadow-sm" : ""
      }`}
    >
      <Container className="flex h-16 sm:h-20 items-center justify-between gap-4">
        {/* Brand Logo - Stylized 'bunchle' logo in coral red */}
        <Link
          href="/"
          className="flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-lg py-1 select-none"
          aria-label="bunchle homepage"
        >
          {/* Custom SVG Stylized brandmark */}
          <div className="flex items-center">
            <svg
              className="h-7 sm:h-8 w-auto text-primary"
              viewBox="0 0 135 34"
              fill="currentColor"
              aria-hidden="true"
            >
              {/* Stylized 'bunchle' wordmark */}
              <text
                x="0"
                y="26"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontWeight="800"
                fontSize="29"
                letterSpacing="-0.03em"
                fill="currentColor"
              >
                bunchle
              </text>
            </svg>
          </div>
        </Link>

        {/* Center Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-6 lg:gap-9"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[14px] lg:text-[15px] font-medium text-stone-700 transition-colors duration-150 hover:text-primary whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Action Icons: Search, User, Heart, Bag with Badge */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full text-stone-700 transition-colors hover:bg-stone-200/60 hover:text-stone-900 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            aria-label="Search"
          >
            <SearchIcon className="h-5 w-5" />
          </button>

          <button
            type="button"
            className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full text-stone-700 transition-colors hover:bg-stone-200/60 hover:text-stone-900 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            aria-label="Account profile"
          >
            <UserIcon className="h-5 w-5" />
          </button>

          <button
            type="button"
            className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full text-stone-700 transition-colors hover:bg-stone-200/60 hover:text-stone-900 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            aria-label="Wishlist items"
          >
            <HeartIcon className="h-5 w-5" />
          </button>

          <button
            type="button"
            className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full text-stone-700 transition-colors hover:bg-stone-200/60 hover:text-stone-900 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            aria-label={`Cart with ${cartCount} items`}
          >
            <BagIcon className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white shadow-xs">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full text-stone-700 transition-colors hover:bg-stone-200/60 md:hidden cursor-pointer"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-[#fdfbf9] px-6 py-5 shadow-lg animate-in fade-in duration-200">
          <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="py-2.5 text-base font-medium text-stone-800 transition-colors hover:text-primary border-b border-stone-100 last:border-0"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 pt-4 border-t border-stone-200 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 justify-center"
            >
              Sign In
            </Button>
            <Button
              variant="primary"
              size="sm"
              href="#bestsellers"
              className="flex-1 justify-center"
              onClick={() => setMenuOpen(false)}
            >
              Shop Now
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
