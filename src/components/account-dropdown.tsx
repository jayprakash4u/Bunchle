"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useStore } from "@/context/store-context";
import {
  HeartIcon,
  ShieldCheckIcon,
  TruckIcon,
  UserIcon,
} from "@/components/icons";
import { Button } from "@/components/ui/button";

export function AccountDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { wishlistCount } = useStore();

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Account Button Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
          isOpen
            ? "bg-primary-soft text-primary"
            : "text-stone-700 hover:bg-stone-200/60 hover:text-stone-900"
        }`}
        aria-label="Account options"
        aria-expanded={isOpen}
      >
        <UserIcon className="h-5 w-5" />
      </button>

      {/* Popover Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-white p-4 shadow-2xl border border-stone-200/90 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          {!isLoggedIn ? (
            /* Logged Out View */
            <div className="space-y-3.5">
              <div className="pb-3 border-b border-stone-100">
                <h3 className="font-serif text-base font-bold text-stone-900">
                  Welcome to Bunchle
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Sign in to access your orders, saved routines & rewards.
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1 justify-center text-xs font-bold"
                  onClick={() => {
                    setIsLoggedIn(true);
                  }}
                >
                  Sign In
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 justify-center text-xs font-semibold"
                  onClick={() => {
                    setIsLoggedIn(true);
                  }}
                >
                  Create Account
                </Button>
              </div>

              <div className="pt-2 border-t border-stone-100 space-y-1">
                <Link
                  href="#"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-2.5 py-2 text-xs font-medium text-stone-700 hover:text-primary hover:bg-stone-50 rounded-lg transition-colors"
                >
                  <TruckIcon className="w-4 h-4 text-stone-400" />
                  <span>Track Your Order</span>
                </Link>

                <Link
                  href="#bestsellers"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between px-2.5 py-2 text-xs font-medium text-stone-700 hover:text-primary hover:bg-stone-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <HeartIcon className="w-4 h-4 text-stone-400" />
                    <span>My Wishlist</span>
                  </div>
                  {wishlistCount > 0 && (
                    <span className="text-[10px] bg-primary/10 text-primary font-bold px-1.5 py-0.5 rounded-full">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                <Link
                  href="#"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-2.5 py-2 text-xs font-medium text-stone-700 hover:text-primary hover:bg-stone-50 rounded-lg transition-colors"
                >
                  <ShieldCheckIcon className="w-4 h-4 text-stone-400" />
                  <span>Help & Skincare Support</span>
                </Link>
              </div>
            </div>
          ) : (
            /* Logged In View */
            <div className="space-y-3">
              <div className="flex items-center gap-3 pb-3 border-b border-stone-100">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm font-serif">
                  A
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Aashish Sharma</h4>
                  <p className="text-[11px] text-stone-500">aashish@example.com</p>
                </div>
              </div>

              <div className="space-y-1 text-xs font-medium text-stone-700">
                <Link
                  href="#"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between px-2.5 py-2 hover:bg-stone-50 hover:text-primary rounded-lg transition-colors"
                >
                  <span>My Orders</span>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-sm font-bold">
                    1 Active
                  </span>
                </Link>
                <Link
                  href="#"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between px-2.5 py-2 hover:bg-stone-50 hover:text-primary rounded-lg transition-colors"
                >
                  <span>Wishlist Items</span>
                  <span className="text-[10px] bg-primary/10 text-primary font-bold px-1.5 py-0.5 rounded-full">
                    {wishlistCount}
                  </span>
                </Link>
                <Link
                  href="#"
                  onClick={() => setIsOpen(false)}
                  className="block px-2.5 py-2 hover:bg-stone-50 hover:text-primary rounded-lg transition-colors"
                >
                  Saved Addresses
                </Link>
                <Link
                  href="#"
                  onClick={() => setIsOpen(false)}
                  className="block px-2.5 py-2 hover:bg-stone-50 hover:text-primary rounded-lg transition-colors"
                >
                  Account Settings
                </Link>
              </div>

              <div className="pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsLoggedIn(false);
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
