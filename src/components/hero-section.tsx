"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CreditCardIcon,
  DropletIcon,
  RotateCcwIcon,
  ShieldCheckIcon,
  StarIcon,
  TruckIcon,
} from "@/components/icons";

interface SlideData {
  id: string;
  eyebrow: string;
  headlinePart1: string;
  headlinePart2: string;
  description: string;
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
  image: string;
  alt: string;
  accentColorClass: string;
  buttonColorClass: string;
  outlineButtonClass: string;
}

const slides: SlideData[] = [
  {
    id: "slide-1",
    eyebrow: "CLEAN FORMULAS. REAL RESULTS.",
    headlinePart1: "Science-led Beauty,",
    headlinePart2: "Made to Trust.",
    description:
      "Gentle, effective, and backed by science. Skincare you can rely on, every day.",
    primaryCtaText: "Shop Now",
    primaryCtaHref: "#bestsellers",
    secondaryCtaText: "Explore Best Sellers",
    secondaryCtaHref: "#bestsellers",
    image: "/herorightsideimg.png",
    alt: "Bunchle science-led skincare products lineup",
    accentColorClass: "text-primary",
    buttonColorClass: "bg-primary hover:bg-primary-hover",
    outlineButtonClass: "border-primary text-primary hover:bg-primary-soft",
  },
  {
    id: "slide-2",
    eyebrow: "PURE CARE  ×  NATURAL BEAUTY",
    headlinePart1: "Healthy Skin",
    headlinePart2: "Looks Good On You",
    description:
      "Discover skincare and beauty essentials crafted with botanical integrity for your natural glow.",
    primaryCtaText: "Shop Now",
    primaryCtaHref: "#bestsellers",
    secondaryCtaText: "Explore Best Sellers",
    secondaryCtaHref: "#bestsellers",
    image: "/herosectionimage2.png",
    alt: "Pure care botanical beauty and skincare essentials",
    accentColorClass: "text-[#c9465a]",
    buttonColorClass: "bg-[#c9465a] hover:bg-[#b0384b]",
    outlineButtonClass: "border-[#c9465a] text-[#c9465a] hover:bg-[#fdf2f4]",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    resetTimer();
  }, [resetTimer]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    resetTimer();
  }, [resetTimer]);

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentSlide(index);
      resetTimer();
    },
    [resetTimer],
  );

  // Reliable automatic rotation every 4 seconds
  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  return (
    <section
      className="relative w-full bg-[#fdfbf9] pt-4 sm:pt-6 pb-0 border-b border-stone-200/60 select-none overflow-x-clip"
      aria-roledescription="carousel"
      aria-label="Hero Highlights"
    >
      {/* Ambient background template contained in its own overflow-hidden layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40 mix-blend-multiply">
        <Image
          src="/herobgimagetempelate.png"
          alt="Hero background texture"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Outer Left & Right Chevron Controls (Positioned in side gutters far away from content) */}
      <button
        type="button"
        onClick={prevSlide}
        className="hidden xl:flex absolute left-4 2xl:left-8 top-[38%] sm:top-[42%] -translate-y-1/2 z-30 h-10 w-10 items-center justify-center rounded-full bg-white/95 text-stone-700 shadow-md border border-stone-200/80 backdrop-blur-sm transition-all duration-200 hover:bg-white hover:scale-110 hover:text-stone-950 hover:shadow-lg cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        aria-label="Previous slide"
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        className="hidden xl:flex absolute right-4 2xl:right-8 top-[38%] sm:top-[42%] -translate-y-1/2 z-30 h-10 w-10 items-center justify-center rounded-full bg-white/95 text-stone-700 shadow-md border border-stone-200/80 backdrop-blur-sm transition-all duration-200 hover:bg-white hover:scale-110 hover:text-stone-950 hover:shadow-lg cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        aria-label="Next slide"
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>

      {/* Expanded Max-Width Container (1380px) for generous breathing room */}
      <div className="relative z-10 w-full max-w-[1380px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Main 2-Column Hero Carousel Content */}
        <div className="relative min-h-[380px] sm:min-h-[400px] lg:min-h-[440px] flex items-center">
          {slides.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={slide.id}
                className={`w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-16 items-center transition-opacity duration-700 ease-in-out ${
                  isActive
                    ? "opacity-100 relative z-10"
                    : "opacity-0 absolute inset-0 pointer-events-none"
                }`}
                aria-hidden={!isActive}
              >
                {/* Left Column: Typography, CTAs, Social Proof (order-2 on mobile, order-1 on desktop) */}
                <div className="order-2 lg:order-1 lg:col-span-6 xl:col-span-5 flex flex-col items-start justify-center py-1 sm:py-2">
                  {/* Eyebrow Tag */}
                  <span
                    className={`text-xs sm:text-[12px] font-bold uppercase tracking-[0.18em] mb-2 sm:mb-2.5 transition-colors ${slide.accentColorClass}`}
                  >
                    {slide.eyebrow}
                  </span>

                  {/* Main Headline */}
                  <h1 className="font-serif text-3xl sm:text-4xl lg:text-[46px] xl:text-[48px] font-normal tracking-tight text-stone-900 leading-[1.12]">
                    {slide.headlinePart1}
                    <span
                      className={`block font-semibold mt-0.5 transition-colors ${slide.accentColorClass}`}
                    >
                      {slide.headlinePart2}
                    </span>
                  </h1>

                  {/* Description Subtitle */}
                  <p className="mt-2.5 sm:mt-3 text-xs sm:text-[14px] lg:text-[15px] text-stone-600 leading-relaxed max-w-lg">
                    {slide.description}
                  </p>

                  {/* CTA Buttons */}
                  <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-3 w-full sm:w-auto">
                    <Link
                      href={slide.primaryCtaHref}
                      className={`inline-flex h-10 items-center justify-center rounded-lg px-6 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 ${slide.buttonColorClass}`}
                    >
                      {slide.primaryCtaText}
                    </Link>
                    <Link
                      href={slide.secondaryCtaHref}
                      className={`inline-flex h-10 items-center justify-center rounded-lg border bg-white px-5 text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 ${slide.outlineButtonClass}`}
                    >
                      {slide.secondaryCtaText}
                    </Link>
                  </div>

                  {/* Customer Rating & Avatars */}
                  <div className="mt-6 sm:mt-7 flex items-center gap-3">
                    {/* Overlapping Avatar Circles */}
                    <div className="flex -space-x-2 overflow-hidden">
                      <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white overflow-hidden bg-stone-300">
                        <Image
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                          alt="Customer"
                          width={32}
                          height={32}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white overflow-hidden bg-stone-300">
                        <Image
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                          alt="Customer"
                          width={32}
                          height={32}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white overflow-hidden bg-stone-300">
                        <Image
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                          alt="Customer"
                          width={32}
                          height={32}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white overflow-hidden bg-stone-300">
                        <Image
                          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
                          alt="Customer"
                          width={32}
                          height={32}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Star Rating & Loved by */}
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1 text-amber-500">
                        <StarIcon className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        <StarIcon className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        <StarIcon className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        <StarIcon className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        <StarIcon className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      </div>
                      <span className="text-[11px] sm:text-xs font-semibold text-stone-800 leading-tight mt-0.5">
                        Loved by 20,000+ customers
                      </span>
                      <span className="text-[10px] sm:text-[11px] text-stone-500 leading-tight">
                        across Nepal
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Hero Product Lineup Image (order-1 on mobile, order-2 on desktop) */}
                <div className="order-1 lg:order-2 lg:col-span-6 xl:col-span-7 relative flex items-center justify-center lg:justify-end">
                  <div className="relative w-full max-w-[540px] lg:max-w-[580px] xl:max-w-[620px] aspect-[16/10.5] sm:aspect-[16/10] flex items-center justify-center">
                    <Image
                      src={slide.image}
                      alt={slide.alt}
                      fill
                      priority={index === 0}
                      className="object-contain object-center drop-shadow-sm transition-all duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 620px"
                    />
                  </div>
                </div>
              </div>
            );
          })}

          {/* Slider Dot Indicators */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => goToSlide(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
                  idx === currentSlide
                    ? "w-6 h-2 bg-stone-800"
                    : "w-2 h-2 bg-stone-300 hover:bg-stone-400"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
                aria-current={idx === currentSlide}
              />
            ))}
          </div>
        </div>

        {/* Overlapping Floating Trust Bar (Half inside hero, half outside hero) */}
        <div className="relative z-30 translate-y-1/2 w-full rounded-xl sm:rounded-2xl border border-stone-200/90 bg-white shadow-md p-4 sm:p-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-stone-100">
            {/* 1. 100% Genuine */}
            <div className="flex items-center gap-3 pt-2.5 sm:pt-0 sm:px-3 first:pt-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-primary">
                <ShieldCheckIcon className="h-5.5 w-5.5 stroke-[1.8]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-[13px] font-bold text-stone-900 leading-snug">
                  100% Genuine
                </span>
                <span className="text-[11px] sm:text-xs text-stone-500 leading-tight">
                  Products
                </span>
              </div>
            </div>

            {/* 2. Dermatologically Tested */}
            <div className="flex items-center gap-3 pt-2.5 sm:pt-0 sm:px-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-primary">
                <DropletIcon className="h-5.5 w-5.5 stroke-[1.8]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-[13px] font-bold text-stone-900 leading-snug">
                  Dermatologically
                </span>
                <span className="text-[11px] sm:text-xs text-stone-500 leading-tight">
                  Tested
                </span>
              </div>
            </div>

            {/* 3. Fast Delivery */}
            <div className="flex items-center gap-3 pt-2.5 sm:pt-0 sm:px-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-primary">
                <TruckIcon className="h-5.5 w-5.5 stroke-[1.8]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-[13px] font-bold text-stone-900 leading-snug">
                  Fast Delivery
                </span>
                <span className="text-[11px] sm:text-xs text-stone-500 leading-tight">
                  Across Nepal
                </span>
              </div>
            </div>

            {/* 4. Easy Returns */}
            <div className="flex items-center gap-3 pt-2.5 sm:pt-0 sm:px-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-primary">
                <RotateCcwIcon className="h-5.5 w-5.5 stroke-[1.8]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-[13px] font-bold text-stone-900 leading-snug">
                  Easy Returns
                </span>
                <span className="text-[11px] sm:text-xs text-stone-500 leading-tight">
                  Hassle-free
                </span>
              </div>
            </div>

            {/* 5. Cash on Delivery */}
            <div className="col-span-2 sm:col-span-1 flex items-center gap-3 pt-2.5 sm:pt-0 sm:px-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-primary">
                <CreditCardIcon className="h-5.5 w-5.5 stroke-[1.8]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-[13px] font-bold text-stone-900 leading-snug">
                  Cash on Delivery
                </span>
                <span className="text-[11px] sm:text-xs text-stone-500 leading-tight">
                  Pay when you receive
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
