"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/store-context";
import {
  BagIcon,
  CheckIcon,
  MinusIcon,
  PlusIcon,
  TruckIcon,
  XIcon,
} from "@/components/icons";
import { Button } from "@/components/ui/button";

const FREE_SHIPPING_THRESHOLD = 2000;

export function CartDrawer() {
  const {
    cart,
    cartCount,
    cartSubtotal,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
  } = useStore();

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCartOpen, closeCart]);

  if (!isCartOpen) return null;

  const freeShippingProgress = Math.min(
    100,
    Math.round((cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100),
  );
  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - cartSubtotal;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
        onClick={closeCart}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md transform bg-white shadow-2xl transition-all duration-300 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200 bg-[#fdfbf9]">
            <div className="flex items-center gap-2.5">
              <BagIcon className="w-5 h-5 text-primary" />
              <h2 className="font-display text-lg font-bold text-stone-900 tracking-tight">
                Your Shopping Bag
              </h2>
              <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full">
                {cartCount} {cartCount === 1 ? "item" : "items"}
              </span>
            </div>

            <button
              type="button"
              onClick={closeCart}
              className="h-8 w-8 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Tracker */}
          <div className="px-5 py-3.5 bg-stone-50 border-b border-stone-200/80">
            <div className="flex items-center gap-2 mb-2">
              <TruckIcon className="w-4 h-4 text-primary shrink-0" />
              <p className="text-xs font-semibold text-stone-800">
                {remainingForFreeShipping <= 0 ? (
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckIcon className="w-3.5 h-3.5 inline" /> You&apos;ve unlocked FREE Express Delivery!
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-primary font-bold">NPR {remainingForFreeShipping.toLocaleString("en-US")}</strong> more for <strong className="text-stone-900">FREE Express Delivery</strong>
                  </span>
                )}
              </p>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  remainingForFreeShipping <= 0 ? "bg-emerald-600" : "bg-primary"
                }`}
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto px-5 py-4 divide-y divide-stone-100">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 gap-3">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-2">
                  <BagIcon className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-800">
                  Your cart is empty
                </h3>
                <p className="text-xs text-stone-500 max-w-xs">
                  Looks like you haven&apos;t added any science-led skincare essentials yet.
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={closeCart}
                  href="#bestsellers"
                  className="mt-3"
                >
                  Explore Best Sellers
                </Button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="py-4 flex gap-3.5 items-center group">
                  {/* Thumbnail */}
                  <div className="relative w-18 h-20 sm:w-20 sm:h-22 bg-[#faf8f5] rounded-xl border border-stone-200/80 shrink-0 overflow-hidden flex items-center justify-center p-1.5">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-contain p-1"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone-400">
                        <BagIcon className="w-6 h-6 text-stone-300" />
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-sans text-[13.5px] font-semibold text-stone-900 leading-snug line-clamp-1">
                        {item.name}
                      </h4>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-stone-400 hover:text-red-500 p-1 -mr-1 transition-colors cursor-pointer"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <XIcon className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {item.volume && (
                      <span className="text-[11px] text-stone-400 block mt-0.5">
                        {item.volume}
                      </span>
                    )}

                    <div className="flex items-center justify-between mt-2.5">
                      {/* Price */}
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-sm font-bold text-stone-900">
                          NPR {(item.price * item.quantity).toLocaleString("en-US")}
                        </span>
                        {item.originalPrice && (
                          <span className="text-[11px] text-stone-400 line-through">
                            NPR {(item.originalPrice * item.quantity).toLocaleString("en-US")}
                          </span>
                        )}
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-stone-300 rounded-lg bg-stone-50 overflow-hidden">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-7 w-7 flex items-center justify-center text-stone-600 hover:bg-stone-200/80 transition-colors cursor-pointer active:scale-90"
                          aria-label="Decrease quantity"
                        >
                          <MinusIcon className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-stone-900 select-none">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-7 w-7 flex items-center justify-center text-stone-600 hover:bg-stone-200/80 transition-colors cursor-pointer active:scale-90"
                          aria-label="Increase quantity"
                        >
                          <PlusIcon className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-[#fdfbf9] space-y-3">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span>Shipping</span>
                  <span className="font-medium text-stone-800">
                    {remainingForFreeShipping <= 0 ? (
                      <span className="text-emerald-700 font-bold">FREE</span>
                    ) : (
                      "Calculated at checkout"
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between text-base font-bold text-stone-900 pt-1 border-t border-stone-200/60">
                  <span>Estimated Total</span>
                  <span className="font-sans text-lg text-stone-900">
                    NPR {cartSubtotal.toLocaleString("en-US")}
                  </span>
                </div>
                <p className="text-[11px] text-stone-400">Taxes and shipping calculated at checkout.</p>
              </div>

              <div className="flex flex-col gap-2 pt-1">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full justify-center text-sm font-semibold shadow-button hover:bg-primary-hover"
                  onClick={() => {
                    alert("Proceeding to secure checkout...");
                    closeCart();
                  }}
                >
                  Proceed to Checkout • NPR {cartSubtotal.toLocaleString("en-US")}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-center text-xs font-semibold"
                  onClick={closeCart}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
