"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BagIcon,
  ChevronDownIcon,
  HeartIcon,
  MenuIcon,
  SearchIcon,
  XIcon,
} from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { DesktopNavigation, NAV_STRUCTURE } from "@/components/mega-menu";
import { AccountDropdown } from "@/components/account-dropdown";
import { SearchOverlay } from "@/components/search-overlay";
import { CartDrawer } from "@/components/cart-drawer";
import { useStore } from "@/context/store-context";

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const { cartCount, wishlistCount, openCart, openSearch } = useStore();

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Scroll effect for elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileCategory = (id: string) => {
    setExpandedMobileCategory((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full bg-[#fdfbf9]/95 backdrop-blur-md transition-all duration-200 border-b border-stone-200/80 ${
          isScrolled ? "shadow-sm bg-white/95" : ""
        }`}
      >
        <Container className="flex h-16 sm:h-20 items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-lg py-1 select-none"
            aria-label="bunchle homepage"
          >
            <div className="flex items-center">
              <svg
                className="h-7 sm:h-8 w-auto text-primary"
                viewBox="0 0 135 34"
                fill="currentColor"
                aria-hidden="true"
              >
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

          {/* Center Desktop Navigation Dropdowns */}
          <DesktopNavigation />

          {/* Right Action Icons: Search, Wishlist, Account, Cart, Mobile Toggle */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search Trigger */}
            <button
              type="button"
              onClick={openSearch}
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full text-stone-700 transition-colors hover:bg-stone-200/60 hover:text-stone-900 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              aria-label="Search products, ingredients and concerns"
            >
              <SearchIcon className="h-5 w-5" />
            </button>

            {/* Wishlist Icon with Counter */}
            <Link
              href="#bestsellers"
              className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full text-stone-700 transition-colors hover:bg-stone-200/60 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              aria-label={`Wishlist with ${wishlistCount} items`}
            >
              <HeartIcon className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Account Popover */}
            <AccountDropdown />

            {/* Cart Button with Slide-over Trigger */}
            <button
              type="button"
              onClick={openCart}
              className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full text-stone-700 transition-colors hover:bg-stone-200/60 hover:text-stone-900 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <BagIcon className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white shadow-xs animate-in zoom-in-50 duration-150">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full text-stone-700 transition-colors hover:bg-stone-200/60 md:hidden cursor-pointer ml-0.5"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              {mobileMenuOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </Container>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-stone-200 bg-[#fdfbf9] max-h-[80vh] overflow-y-auto px-5 py-4 shadow-xl animate-in fade-in duration-200">
            {/* Mobile Quick Search Bar */}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openSearch();
              }}
              className="w-full flex items-center gap-2.5 px-3.5 py-2.5 bg-stone-100/90 text-stone-500 rounded-xl text-xs font-medium mb-4 border border-stone-200 text-left"
            >
              <SearchIcon className="w-4 h-4 text-stone-400" />
              <span>Search products, ingredients, concerns...</span>
            </button>

            {/* Accordion Categories */}
            <nav className="flex flex-col divide-y divide-stone-100" aria-label="Mobile navigation">
              {NAV_STRUCTURE.map((category) => {
                if (category.isDirectLink) {
                  return (
                    <Link
                      key={category.id}
                      href={category.href}
                      className="py-3 text-sm font-bold text-stone-800 flex items-center justify-between hover:text-primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>{category.label}</span>
                      <span className="text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full">
                        POPULAR
                      </span>
                    </Link>
                  );
                }

                const isExpanded = expandedMobileCategory === category.id;

                return (
                  <div key={category.id} className="py-2.5">
                    <button
                      type="button"
                      onClick={() => toggleMobileCategory(category.id)}
                      className="w-full flex items-center justify-between text-sm font-semibold text-stone-800 hover:text-primary py-1"
                    >
                      <span>{category.label}</span>
                      <ChevronDownIcon
                        className={`w-4 h-4 text-stone-400 transition-transform ${
                          isExpanded ? "rotate-180 text-primary" : ""
                        }`}
                      />
                    </button>

                    {isExpanded && (
                      <div className="pl-3 pr-1 py-2 space-y-3 bg-stone-50/70 rounded-xl my-1 animate-in fade-in duration-150">
                        {category.sections?.map((section, sIdx) => (
                          <div key={sIdx} className="space-y-1.5">
                            <h5 className="text-[10px] font-bold uppercase tracking-wider text-stone-400 pt-1">
                              {section.title}
                            </h5>
                            <div className="flex flex-col space-y-1 pl-1">
                              {section.items.map((item, iIdx) => (
                                <Link
                                  key={iIdx}
                                  href={item.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="text-xs text-stone-700 py-1 hover:text-primary flex items-center justify-between"
                                >
                                  <span>{item.label}</span>
                                  {item.badge && (
                                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-xs bg-primary/10 text-primary">
                                      {item.badge}
                                    </span>
                                  )}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}

                        {category.bottomCta && (
                          <div className="pt-2 border-t border-stone-200/80">
                            <Link
                              href={category.bottomCta.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="text-xs font-bold text-primary hover:underline"
                            >
                              {category.bottomCta.label} →
                            </Link>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Mobile Footer Actions */}
            <div className="mt-5 pt-4 border-t border-stone-200 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 justify-center text-xs font-semibold"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Button>
              <Button
                variant="primary"
                size="sm"
                href="#bestsellers"
                className="flex-1 justify-center text-xs font-semibold"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop Best Sellers
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Global Interactive Overlays */}
      <SearchOverlay />
      <CartDrawer />
    </>
  );
}
