"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/store-context";
import {
  BagIcon,
  CheckIcon,
  SearchIcon,
  SparklesIcon,
  StarIcon,
  XIcon,
} from "@/components/icons";
import { BEST_SELLER_PRODUCTS, BestSellerProduct } from "@/data/best-sellers";

const POPULAR_SEARCH_TAGS = [
  "Vitamin C",
  "Niacinamide",
  "Sunscreen SPF 50",
  "Acne & Breakouts",
  "Barrier Moisturizer",
  "Salicylic Acid",
  "Ceramides",
  "Hydrating Toner",
];

export function SearchOverlay() {
  const { isSearchOpen, closeSearch, addToCart } = useStore();
  const [query, setQuery] = useState("");
  const [addedId, setAddedId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto focus input when opened
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery("");
    }
  }, [isSearchOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchOpen) {
        closeSearch();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  if (!isSearchOpen) return null;

  const filteredProducts = query.trim()
    ? BEST_SELLER_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category?.toLowerCase().includes(query.toLowerCase()) ||
          p.volume.toLowerCase().includes(query.toLowerCase()) ||
          p.id.toLowerCase().includes(query.toLowerCase()),
      )
    : BEST_SELLER_PRODUCTS.slice(0, 4);

  const handleQuickAdd = (product: BestSellerProduct) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => {
      setAddedId(null);
      closeSearch();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/70 backdrop-blur-sm transition-opacity"
        onClick={closeSearch}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative min-h-screen px-4 pt-12 sm:pt-20 pb-12 flex justify-center items-start">
        <div
          className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden transform transition-all animate-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Header Bar */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-stone-200 bg-[#fdfbf9]">
            <SearchIcon className="w-5 h-5 text-stone-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, ingredients or concerns..."
              className="w-full bg-transparent text-base sm:text-lg font-medium text-stone-900 placeholder:text-stone-400 focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-stone-400 hover:text-stone-600 p-1 cursor-pointer"
                aria-label="Clear search"
              >
                <XIcon className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={closeSearch}
              className="h-8 px-2.5 rounded-lg border border-stone-300 text-xs font-semibold text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-colors ml-1 cursor-pointer"
            >
              ESC
            </button>
          </div>

          {/* Popular Search Tags */}
          <div className="px-5 py-3.5 bg-stone-50/80 border-b border-stone-200/80 flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 shrink-0">
              Popular:
            </span>
            <div className="flex items-center gap-1.5 flex-wrap sm:flex-nowrap">
              {POPULAR_SEARCH_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setQuery(tag)}
                  className={`text-xs px-2.5 py-1 rounded-full border transition-colors shrink-0 cursor-pointer ${
                    query === tag
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-stone-700 border-stone-200 hover:border-primary hover:text-primary"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Results Area */}
          <div className="p-5 max-h-[60vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                {query.trim() ? `Results for "${query}"` : "Trending Science-Led Formulations"}
              </h3>
              <span className="text-xs text-stone-400">
                {filteredProducts.length} items
              </span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="py-12 text-center flex flex-col items-center gap-2">
                <SearchIcon className="w-8 h-8 text-stone-300" />
                <p className="text-sm font-semibold text-stone-700">
                  No products matched &ldquo;{query}&rdquo;
                </p>
                <p className="text-xs text-stone-400 max-w-sm">
                  Try searching for Vitamin C, Moisturizer, Niacinamide, or SPF Sunscreen.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 p-3 rounded-xl border border-stone-200 hover:border-primary/40 hover:shadow-sm bg-white transition-all group"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-16 h-16 bg-[#faf8f5] rounded-lg border border-stone-200/80 shrink-0 overflow-hidden flex items-center justify-center p-1">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="64px"
                          className="object-contain p-1 group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <SparklesIcon className="w-5 h-5 text-stone-300" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-sans text-xs font-semibold text-stone-900 leading-snug line-clamp-1 group-hover:text-primary transition-colors">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-1 text-[11px] text-amber-500 my-0.5">
                        <StarIcon className="w-3 h-3 fill-amber-400" />
                        <span className="font-medium text-stone-700">
                          {product.rating.toFixed(1)}
                        </span>
                        <span className="text-stone-400">({product.volume})</span>
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xs font-bold text-stone-900">
                          NPR {product.price.toLocaleString("en-US")}
                        </span>
                        {product.originalPrice && (
                          <span className="text-[10px] text-stone-400 line-through">
                            NPR {product.originalPrice.toLocaleString("en-US")}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quick Add Action */}
                    <button
                      type="button"
                      onClick={() => handleQuickAdd(product)}
                      disabled={addedId === product.id}
                      className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
                        addedId === product.id
                          ? "bg-emerald-600 text-white"
                          : "bg-primary-soft text-primary hover:bg-primary hover:text-white"
                      }`}
                      aria-label={`Add ${product.name} to cart`}
                    >
                      {addedId === product.id ? (
                        <CheckIcon className="w-4 h-4" />
                      ) : (
                        <BagIcon className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer banner */}
          <div className="px-5 py-3 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
            <span>Free Express Delivery across Nepal on orders over NPR 2,000</span>
            <Link
              href="#bestsellers"
              onClick={closeSearch}
              className="font-semibold text-primary hover:underline"
            >
              Explore All →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
