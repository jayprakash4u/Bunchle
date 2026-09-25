"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ArrowRightIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
  StarIcon,
} from "@/components/icons";
import { Container } from "@/components/ui/container";
import { ProductVisual } from "@/components/product-illustrations";
import {
  BEST_SELLER_PRODUCTS,
  BestSellerProduct,
} from "@/data/best-sellers";
import { useStore } from "@/context/store-context";

// Shopping Bag Icon matching the button design
function BagOutlineIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

// Single Best Seller Product Card
export function BestSellerCard({
  product,
}: {
  product: BestSellerProduct;
}) {
  const { addToCart, isWishlisted, toggleWishlist } = useStore();
  const [isAdded, setIsAdded] = useState(false);

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    setIsAdded(true);
    addToCart(product);
    setTimeout(() => {
      setIsAdded(false);
    }, 1200);
  };

  const formattedPrice = `NPR ${product.price.toLocaleString("en-US")}`;
  const formattedOriginalPrice = `NPR ${product.originalPrice.toLocaleString("en-US")}`;

  return (
    <div className="group relative flex flex-col justify-between bg-white rounded-2xl border border-stone-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:border-stone-300 transition-all duration-300 p-3.5 sm:p-4 shrink-0 snap-start w-[240px] sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)]">
      {/* Top Badges & Wishlist Heart */}
      <div className="flex items-center justify-between z-10 w-full mb-1">
        {/* Discount Badge */}
        <span className="bg-[#e0483c] text-white text-[11px] sm:text-xs font-bold px-2.5 py-0.5 rounded-sm tracking-tight shadow-xs select-none">
          -{product.discountPercent}%
        </span>

        {/* Wishlist Heart Icon Button */}
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          className="flex h-7.5 w-7.5 items-center justify-center rounded-full text-stone-400 hover:text-[#e0483c] hover:bg-stone-50 transition-all active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0483c]/30 cursor-pointer"
          aria-label={
            wishlisted
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          aria-pressed={wishlisted}
        >
          <HeartIcon
            className={`w-4 h-4 transition-all duration-200 ${
              wishlisted
                ? "fill-[#e0483c] text-[#e0483c] scale-110"
                : "text-stone-400 hover:text-stone-600"
            }`}
          />
        </button>
      </div>

      {/* Product Image Stage */}
      <div className="relative w-full h-44 sm:h-48 flex items-center justify-center my-1.5 overflow-hidden bg-[#faf8f5]/60 rounded-xl">
        <ProductVisual
          type={product.illustrationType}
          image={product.image}
          name={product.name}
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-1 mt-2">
        {/* Title */}
        <h3
          className="font-sans text-[14.5px] sm:text-[15.5px] font-semibold text-stone-900 leading-snug line-clamp-1 group-hover:text-[#e0483c] transition-colors"
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Volume */}
        <p className="text-xs text-stone-400 font-normal mt-0.5">
          {product.volume}
        </p>

        {/* Star Rating & Review Count */}
        <div className="flex items-center gap-1 mt-1.5 mb-2.5 select-none">
          <div className="flex items-center text-amber-400 gap-0.5">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className="w-3.5 h-3.5 fill-amber-400" />
            ))}
          </div>
          <span className="text-xs text-stone-400 font-normal ml-0.5">
            ({product.reviewsCount})
          </span>
        </div>

        {/* Price Row */}
        <div className="flex items-baseline gap-2 mb-3 mt-auto">
          <span className="text-base sm:text-[17px] font-bold text-stone-900 tracking-tight">
            {formattedPrice}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-stone-400 line-through">
              {formattedOriginalPrice}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isAdded}
          className={`w-full py-2.5 px-3 rounded-lg text-xs sm:text-[13px] font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer shadow-xs active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0483c]/40 ${
            isAdded
              ? "bg-emerald-600 text-white"
              : "bg-[#e0483c] hover:bg-[#c9352a] text-white"
          }`}
          aria-label={`Add ${product.name} to cart`}
        >
          {isAdded ? (
            <>
              <CheckIcon className="w-4 h-4 animate-in zoom-in-50 duration-150" />
              <span>Added</span>
            </>
          ) : (
            <>
              <BagOutlineIcon className="w-4 h-4" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// Section Component with 4-Card Visible Scrollable Track
export function BestSellersSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  useEffect(() => {
    checkScrollability();
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener("scroll", checkScrollability, { passive: true });
    }
    window.addEventListener("resize", checkScrollability);
    return () => {
      if (el) {
        el.removeEventListener("scroll", checkScrollability);
      }
      window.removeEventListener("resize", checkScrollability);
    };
  }, [checkScrollability]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.firstElementChild
        ? (container.firstElementChild as HTMLElement).offsetWidth + 24
        : 300;
      const scrollDistance = direction === "left" ? -cardWidth : cardWidth;
      container.scrollBy({
        left: scrollDistance,
        behavior: "smooth",
      });
      setTimeout(checkScrollability, 350);
    }
  };

  return (
    <section id="bestsellers" className="w-full py-12 sm:py-16 bg-[#faf8f5]">
      <Container>
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-2xl sm:text-3xl md:text-[32px] font-bold text-[#191817] tracking-tight">
              Best Sellers
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Scroll Arrow Controls */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className="h-8.5 w-8.5 rounded-full border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 hover:text-stone-900 disabled:opacity-35 disabled:cursor-not-allowed flex items-center justify-center transition-all cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 active:scale-95"
                aria-label="Scroll products left"
              >
                <ChevronLeftIcon className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className="h-8.5 w-8.5 rounded-full border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 hover:text-stone-900 disabled:opacity-35 disabled:cursor-not-allowed flex items-center justify-center transition-all cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 active:scale-95"
                aria-label="Scroll products right"
              >
                <ChevronRightIcon className="w-4 h-4" />
              </button>
            </div>

            {/* View All Link */}
            <Link
              href="#skincare"
              className="group inline-flex items-center gap-1.5 text-sm sm:text-base font-semibold text-[#e0483c] hover:text-[#c9352a] transition-colors ml-2"
            >
              <span>View All</span>
              <ArrowRightIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* 4 Cards Visible Scrollable Carousel Track */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-4 sm:gap-5 md:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory py-2 px-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {BEST_SELLER_PRODUCTS.map((product) => (
              <BestSellerCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
