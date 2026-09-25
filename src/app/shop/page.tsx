import { Suspense } from "react";
import { Metadata } from "next";
import { ShopContent } from "./shop-content";

export const metadata: Metadata = {
  title: "Shop All Products | Science-Led Beauty & Wellness",
  description:
    "Explore Bunchle's full collection of clean, science-backed skincare, hair care, body care, and wellness essentials.",
};

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-semibold text-stone-500">
              Loading Bunchle Collection...
            </span>
          </div>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
