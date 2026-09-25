"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckIcon, HeartIcon, SparklesIcon, StarIcon } from "@/components/icons";
import { cn, formatPrice } from "@/lib/utils";

export interface Product {
  id: string;
  name: string;
  category: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  badge?: string;
  badgeVariant?: "primary" | "secondary" | "success" | "warning";
  volume?: string;
  imageBgColor?: string;
}

export function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const discountPercent = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : null;

  const handleQuickAdd = () => {
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1800);
  };

  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-card border border-border bg-surface shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-stone-300 hover:shadow-lift overflow-hidden",
        className,
      )}
    >
      {/* Product Image Stage */}
      <div
        className={cn(
          "relative aspect-[4/3.8] w-full overflow-hidden flex items-center justify-center p-6 transition-colors",
          product.imageBgColor || "bg-gradient-to-b from-stone-100/80 to-stone-200/50",
        )}
      >
        {/* Floating Badges */}
        <div className="absolute left-3.5 top-3.5 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <Badge variant={product.badgeVariant || "primary"} size="sm">
              {product.badge}
            </Badge>
          )}
          {discountPercent && (
            <Badge variant="warning" size="sm">
              -{discountPercent}%
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute right-3.5 top-3.5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-text-secondary shadow-sm backdrop-blur-sm transition-all hover:scale-110 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 cursor-pointer"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <HeartIcon
            className={cn(
              "h-4 w-4 transition-colors",
              isWishlisted && "fill-primary text-primary",
            )}
          />
        </button>

        {/* Product Visual Illustration / Bottle Icon */}
        <div className="relative flex flex-col items-center justify-center text-stone-400 group-hover:scale-105 transition-transform duration-500">
          <div className="flex flex-col items-center">
            {/* Bottle Cap */}
            <div className="h-4 w-6 rounded-t-sm bg-stone-300 border border-stone-400/30" />
            <div className="h-1.5 w-7 bg-stone-300/80 rounded-sm" />
            {/* Bottle Body */}
            <div className="relative flex flex-col items-center justify-center h-28 w-20 rounded-2xl bg-gradient-to-b from-white to-stone-100 border border-stone-300/60 shadow-sm p-2 text-center">
              <SparklesIcon className="h-4 w-4 text-primary/70 mb-1" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-700">
                bunchle
              </span>
              <span className="text-[8px] text-stone-500 leading-tight line-clamp-1">
                {product.name}
              </span>
            </div>
          </div>
        </div>

        {product.volume && (
          <span className="absolute bottom-2.5 right-3 text-[11px] font-medium text-text-muted bg-white/80 px-2 py-0.5 rounded-full backdrop-blur-xs">
            {product.volume}
          </span>
        )}
      </div>

      {/* Product Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Category & Rating */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            {product.category}
          </span>
          <div className="flex items-center gap-1 text-xs text-amber-600 font-medium">
            <StarIcon className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span>{product.rating.toFixed(1)}</span>
            <span className="text-text-muted">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Product Title */}
        <h3 className="font-display text-base font-semibold text-text leading-snug line-clamp-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Subtitle / Key benefit */}
        <p className="mt-1 text-xs text-text-secondary line-clamp-2 leading-relaxed">
          {product.subtitle}
        </p>

        {/* Price & Action */}
        <div className="mt-auto pt-4 flex items-center justify-between gap-3 border-t border-border-subtle">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-text">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-text-muted line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-text-muted">Incl. of all taxes</span>
          </div>

          <Button
            size="sm"
            variant={isAdded ? "secondary" : "primary"}
            onClick={handleQuickAdd}
            className={cn(
              "transition-all duration-200 shrink-0",
              isAdded && "bg-emerald-700 hover:bg-emerald-800 text-white",
            )}
            aria-label={`Add ${product.name} to shopping bag`}
          >
            {isAdded ? (
              <>
                <CheckIcon className="h-3.5 w-3.5" />
                <span>Added</span>
              </>
            ) : (
              <span>Add to Bag</span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
