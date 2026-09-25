"use client";

import React from "react";
import Image from "next/image";

interface ProductIllustrationProps {
  type?:
    | "dropper-amber"
    | "cream-tub"
    | "tube-sunscreen"
    | "toner-bottle"
    | "dropper-clear"
    | "tube-cleanser";
  image?: string;
  name: string;
  className?: string;
}

export function ProductVisual({
  type = "dropper-amber",
  image,
  name,
  className = "",
}: ProductIllustrationProps) {
  // If an image URL is supplied, render the Next.js Image component
  if (image) {
    return (
      <div className={`relative w-full h-40 sm:h-44 md:h-48 flex items-center justify-center p-2 select-none ${className}`}>
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 70vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
          priority
        />
      </div>
    );
  }

  // Placeholder high-fidelity visual representations matching mockup
  return (
    <div
      className={`relative w-full h-40 sm:h-44 md:h-48 flex items-center justify-center select-none transition-transform duration-500 group-hover:scale-105 ${className}`}
      aria-hidden="true"
    >
      {/* Product Soft Base Shadow */}
      <div className="absolute bottom-2 w-20 sm:w-24 h-2.5 bg-stone-900/10 blur-md rounded-full" />

      {type === "dropper-amber" && (
        <div className="relative flex flex-col items-center scale-90 sm:scale-95">
          <div className="w-4 h-4 bg-stone-900 rounded-t-full shadow-inner" />
          <div className="w-6 h-5 bg-gradient-to-r from-stone-800 via-stone-700 to-stone-900 rounded-xs border-y border-stone-600 shadow-sm" />
          <div className="w-7 h-1.5 bg-stone-800 rounded-xs" />
          <div className="relative w-16 h-28 rounded-t-xl rounded-b-lg bg-gradient-to-r from-[#2c160a] via-[#6d3410] to-[#200e04] shadow-md flex flex-col items-center overflow-hidden border border-amber-950/40">
            <div className="absolute left-1.5 top-0 bottom-0 w-1.5 bg-white/20 rounded-full blur-[0.5px]" />
            <div className="absolute right-2 top-0 bottom-0 w-0.5 bg-white/10" />
            <div className="mt-5 w-[86%] h-18 bg-[#fafaf9] rounded-xs shadow-xs p-1 flex flex-col items-center justify-between text-center border border-stone-200">
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-[7.5px] font-bold text-stone-900 leading-none tracking-tight">
                  BRIGHT BOOST
                </span>
                <span className="text-[6px] text-stone-600 leading-none">
                  Vitamin C Serum
                </span>
                <span className="text-[5px] text-stone-400 leading-none mt-0.5">
                  30ml / 1.01 fl. oz.
                </span>
              </div>
              <span className="text-[7.5px] font-black tracking-tight text-[#e0483c] font-sans pb-0.5">
                bunche
              </span>
            </div>
          </div>
        </div>
      )}

      {type === "cream-tub" && (
        <div className="relative flex flex-col items-center mt-2 scale-90 sm:scale-95">
          <div className="w-24 h-7 rounded-t-lg bg-gradient-to-r from-[#d32f2f] via-[#ef4444] to-[#b91c1c] shadow-sm border border-red-700/60 flex items-center justify-center">
            <div className="w-full h-0.5 bg-white/20 absolute top-1" />
          </div>
          <div className="relative w-24 h-18 rounded-b-xl bg-gradient-to-r from-stone-100 via-white to-stone-200 shadow-md border-x border-b border-stone-300/80 flex flex-col items-center justify-between p-2 text-center overflow-hidden">
            <div className="absolute left-2 top-0 bottom-0 w-2 bg-white/60 blur-[1px]" />
            <div className="flex flex-col items-center mt-1">
              <span className="text-[8px] font-bold text-stone-900 tracking-wider uppercase leading-tight">
                BARRIER
              </span>
              <span className="text-[7px] font-semibold text-stone-700 leading-tight">
                REPAIR MOISTURIZER
              </span>
              <span className="text-[5.5px] text-stone-500 mt-0.5">
                50ml / 1.69 fl. oz.
              </span>
            </div>
            <span className="text-[8.5px] font-black tracking-tight text-[#e0483c] font-sans pb-0.5">
              bunche
            </span>
          </div>
        </div>
      )}

      {type === "tube-sunscreen" && (
        <div className="relative flex flex-col items-center scale-90 sm:scale-95">
          <div className="relative w-15 h-28 rounded-t-sm rounded-b-2xl bg-gradient-to-r from-stone-100 via-white to-stone-200 border border-stone-300/80 shadow-md flex flex-col items-center justify-between p-1.5 text-center overflow-hidden">
            <div className="w-full h-1.5 bg-stone-300/80 rounded-t-xs -mt-1.5 border-b border-stone-400/40" />
            <div className="flex flex-col items-center mt-2.5">
              <span className="text-[7px] font-extrabold text-stone-800 tracking-tight uppercase leading-none">
                SUNSCREEN
              </span>
              <span className="text-[6.5px] font-bold text-[#e0483c] leading-tight">
                SPF 50
              </span>
              <span className="text-[5.5px] text-stone-500 mt-0.5">
                Ultra Light Fluid
              </span>
              <span className="text-[5px] text-stone-400">50ml</span>
            </div>
            <span className="text-[7.5px] font-black tracking-tight text-[#e0483c] font-sans pb-1">
              bunche
            </span>
          </div>
          <div className="w-8 h-3 bg-gradient-to-r from-stone-200 via-white to-stone-300 rounded-b-sm border border-stone-300/90 shadow-xs" />
        </div>
      )}

      {type === "toner-bottle" && (
        <div className="relative flex flex-col items-center scale-90 sm:scale-95">
          <div className="w-6 h-5.5 rounded-t-sm bg-gradient-to-r from-[#d32f2f] via-[#ef4444] to-[#b91c1c] shadow-xs border border-red-750" />
          <div className="w-7 h-1 bg-[#b91c1c] rounded-xs" />
          <div className="relative w-14 h-28 rounded-t-lg rounded-b-md bg-gradient-to-r from-stone-100 via-white to-stone-200 border border-stone-300/80 shadow-md flex flex-col items-center justify-between p-2 text-center overflow-hidden">
            <div className="absolute left-1.5 top-0 bottom-0 w-1.5 bg-white/70 blur-[0.5px]" />
            <div className="flex flex-col items-center mt-3">
              <span className="text-[7.5px] font-bold text-stone-900 tracking-wider uppercase leading-none">
                DAILY
              </span>
              <span className="text-[7px] font-semibold text-stone-800 leading-tight">
                BALANCE
              </span>
              <span className="text-[5.5px] text-stone-500 mt-1">
                Hydrating Toner
              </span>
              <span className="text-[5px] text-stone-400">200ml</span>
            </div>
            <span className="text-[7.5px] font-black tracking-tight text-[#e0483c] font-sans pb-1">
              bunche
            </span>
          </div>
        </div>
      )}

      {type === "dropper-clear" && (
        <div className="relative flex flex-col items-center scale-90 sm:scale-95">
          <div className="w-4 h-4 bg-stone-900 rounded-t-full shadow-inner" />
          <div className="w-6 h-5 bg-gradient-to-r from-stone-800 via-stone-700 to-stone-900 rounded-xs border-y border-stone-600 shadow-sm" />
          <div className="w-7 h-1.5 bg-stone-800 rounded-xs" />
          <div className="relative w-16 h-28 rounded-t-xl rounded-b-lg bg-gradient-to-r from-stone-100/90 via-white/80 to-stone-200/90 shadow-md flex flex-col items-center overflow-hidden border border-stone-300/90 backdrop-blur-xs">
            <div className="absolute left-1.5 top-0 bottom-0 w-1.5 bg-white/60 rounded-full blur-[0.5px]" />
            <div className="absolute right-2 top-0 bottom-0 w-1 bg-white/30" />
            <div className="absolute bottom-0 inset-x-0 h-22 bg-stone-200/40" />
            <div className="relative z-10 mt-5 w-[86%] h-18 bg-[#ffffff] rounded-xs shadow-xs p-1 flex flex-col items-center justify-between text-center border border-stone-200">
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-[7px] font-bold text-stone-900 leading-none tracking-tight uppercase">
                  NIACINAMIDE
                </span>
                <span className="text-[6.5px] font-semibold text-stone-700 leading-none">
                  10% Serum
                </span>
                <span className="text-[5px] text-stone-400 leading-none mt-0.5">
                  30ml / 1.01 fl. oz.
                </span>
              </div>
              <span className="text-[7.5px] font-black tracking-tight text-[#e0483c] font-sans pb-0.5">
                bunche
              </span>
            </div>
          </div>
        </div>
      )}

      {type === "tube-cleanser" && (
        <div className="relative flex flex-col items-center scale-90 sm:scale-95">
          <div className="relative w-16 h-28 rounded-t-sm rounded-b-2xl bg-gradient-to-r from-stone-100 via-white to-stone-200 border border-stone-300/80 shadow-md flex flex-col items-center justify-between p-1.5 text-center overflow-hidden">
            <div className="w-full h-1.5 bg-stone-300/80 rounded-t-xs -mt-1.5 border-b border-stone-400/40" />
            <div className="flex flex-col items-center mt-2.5">
              <span className="text-[7px] font-bold text-stone-800 tracking-wider uppercase leading-none">
                GENTLE
              </span>
              <span className="text-[6.5px] font-medium text-stone-700 leading-tight">
                CLEANSER
              </span>
              <span className="text-[5.5px] text-stone-500 mt-1">
                Daily Face Wash
              </span>
              <span className="text-[5px] text-stone-400">100ml</span>
            </div>
            <span className="text-[7.5px] font-black tracking-tight text-[#e0483c] font-sans pb-1">
              bunche
            </span>
          </div>
          <div className="w-10 h-3 bg-gradient-to-r from-stone-200 via-white to-stone-300 rounded-b-sm border border-stone-300/90 shadow-xs" />
        </div>
      )}
    </div>
  );
}
