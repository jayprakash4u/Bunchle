"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { ArrowRightIcon, ChevronDownIcon } from "@/components/icons";

export interface NavCategory {
  id: string;
  label: string;
  href: string;
  isDirectLink?: boolean;
  dropdownStyle?: string;
  gridCols?: string;
  sections?: {
    title: string;
    items: { label: string; href: string; badge?: string }[];
  }[];
  featuredBanner?: {
    title: string;
    subtitle: string;
    href: string;
    badge?: string;
  };
  bottomCta?: {
    label: string;
    href: string;
  };
}

export const NAV_STRUCTURE: NavCategory[] = [
  {
    id: "shop",
    label: "Shop",
    href: "/shop",
    dropdownStyle: "w-[580px] left-0",
    gridCols: "grid-cols-1",
    sections: [
      {
        title: "EXPLORE CATALOG",
        items: [
          { label: "Shop All Products", href: "/shop" },
          { label: "New Arrivals", href: "/shop?filter=new-arrivals", badge: "NEW" },
          { label: "Best Sellers", href: "/shop?filter=best-sellers", badge: "POPULAR" },
          { label: "Deals & Special Offers", href: "/shop?filter=deals", badge: "SALE" },
          { label: "Bundles & Routine Kits", href: "/shop?category=bundles" },
          { label: "Travel Size Minis", href: "/shop?q=mini" },
          { label: "Curated Gift Sets", href: "/shop?category=bundles" },
        ],
      },
    ],
    featuredBanner: {
      title: "Daily Science Essentials",
      subtitle: "Clinically formulated skincare tailored for healthy barrier resilience.",
      href: "/shop?category=bundles",
      badge: "FEATURED BUNDLE",
    },
    bottomCta: {
      label: "View Entire Collection",
      href: "/shop",
    },
  },
  {
    id: "skincare",
    label: "Skin Care",
    href: "/shop?category=skin-care",
    dropdownStyle: "w-[940px] -left-20 lg:-left-36",
    gridCols: "grid-cols-3",
    sections: [
      {
        title: "BY PRODUCT",
        items: [
          { label: "Cleansers & Face Washes", href: "/shop?category=skin-care&q=cleanser" },
          { label: "Hydrating Toners & Mists", href: "/shop?category=skin-care&q=toner" },
          { label: "Facial Serums & Ampoules", href: "/shop?category=skin-care&q=serum", badge: "CORE" },
          { label: "Barrier Moisturizers & Creams", href: "/shop?category=skin-care&q=moisturizer" },
          { label: "Sunscreen & SPF Shields", href: "/shop?category=skin-care&q=sunscreen", badge: "HOT" },
          { label: "Face Masks & Treatments", href: "/shop?category=skin-care" },
          { label: "Eye Care & Creams", href: "/shop?category=skin-care" },
          { label: "Lip Care & Balms", href: "/shop?category=skin-care&q=lip" },
        ],
      },
      {
        title: "BY SKIN CONCERN",
        items: [
          { label: "Acne & Breakouts", href: "/shop?category=skin-care&q=acne" },
          { label: "Dark Spots & Hyperpigmentation", href: "/shop?category=skin-care&q=spots" },
          { label: "Dullness & Uneven Tone", href: "/shop?category=skin-care&q=glow" },
          { label: "Dryness & Dehydration", href: "/shop?category=skin-care&q=dryness" },
          { label: "Oil Control & Large Pores", href: "/shop?category=skin-care&q=oil" },
          { label: "Sensitive Skin & Redness", href: "/shop?category=skin-care&q=sensitive" },
          { label: "Aging & Fine Lines", href: "/shop?category=skin-care&q=aging" },
        ],
      },
      {
        title: "FEATURED INGREDIENTS",
        items: [
          { label: "Vitamin C (Radiance)", href: "/shop?category=skin-care&q=vitamin+c" },
          { label: "Niacinamide (Pores)", href: "/shop?category=skin-care&q=niacinamide" },
          { label: "Hyaluronic Acid (Hydration)", href: "/shop?category=skin-care&q=hyaluronic" },
          { label: "Ceramides (Barrier Repair)", href: "/shop?category=skin-care&q=ceramide" },
          { label: "Salicylic Acid (BHA Clarity)", href: "/shop?category=skin-care&q=salicylic" },
        ],
      },
    ],
    featuredBanner: {
      title: "Barrier Repair Line",
      subtitle: "3 Essential Ceramides + Panthenol for instant soothing hydration.",
      href: "/shop?category=skin-care&q=barrier",
      badge: "BESTSELLER",
    },
    bottomCta: {
      label: "Shop All Skin Care",
      href: "/shop?category=skin-care",
    },
  },
  {
    id: "haircare",
    label: "Hair Care",
    href: "/shop?category=hair-care",
    dropdownStyle: "w-[520px] -left-16",
    gridCols: "grid-cols-2",
    sections: [
      {
        title: "BY PRODUCT",
        items: [
          { label: "Gentle Shampoos", href: "/shop?category=hair-care" },
          { label: "Nourishing Conditioners", href: "/shop?category=hair-care" },
          { label: "Hair Serums & Oils", href: "/shop?category=hair-care&q=serum" },
          { label: "Deep Conditioning Masks", href: "/shop?category=hair-care&q=mask" },
          { label: "Scalp Exfoliators & Tonics", href: "/shop?category=hair-care&q=scalp" },
        ],
      },
      {
        title: "SHOP BY CONCERN",
        items: [
          { label: "Hair Fall & Thinning", href: "/shop?category=hair-care" },
          { label: "Dry & Damaged Hair", href: "/shop?category=hair-care" },
          { label: "Dandruff & Itchy Scalp", href: "/shop?category=hair-care" },
          { label: "Frizz & Humidity Defense", href: "/shop?category=hair-care" },
        ],
      },
    ],
    bottomCta: {
      label: "Shop All Hair Care",
      href: "/shop?category=hair-care",
    },
  },
  {
    id: "bodycare",
    label: "Body Care",
    href: "/shop?category=body-care",
    dropdownStyle: "w-[520px] -left-20",
    gridCols: "grid-cols-2",
    sections: [
      {
        title: "BY PRODUCT",
        items: [
          { label: "Hydrating Body Wash", href: "/shop?category=body-care&q=wash" },
          { label: "Ceramide Body Lotion", href: "/shop?category=body-care&q=lotion" },
          { label: "Exfoliating Body Scrubs", href: "/shop?category=body-care" },
          { label: "Hand & Foot Care", href: "/shop?category=body-care" },
          { label: "Aluminium-Free Deodorants", href: "/shop?category=body-care" },
        ],
      },
      {
        title: "SHOP BY CONCERN",
        items: [
          { label: "Dry & Flaky Skin", href: "/shop?category=body-care" },
          { label: "Rough Skin & Keratosis", href: "/shop?category=body-care&q=glycolic" },
          { label: "Body Acne & Bumps", href: "/shop?category=body-care" },
          { label: "Uneven Tone & Tan", href: "/shop?category=body-care" },
        ],
      },
    ],
    bottomCta: {
      label: "Shop All Body Care",
      href: "/shop?category=body-care",
    },
  },
  {
    id: "makeup",
    label: "Makeup",
    href: "/shop?category=makeup",
    dropdownStyle: "w-[560px] -left-24",
    gridCols: "grid-cols-3",
    sections: [
      {
        title: "FACE",
        items: [
          { label: "Skin Tint & Foundation", href: "/shop?category=makeup&q=tint" },
          { label: "Hydrating Concealer", href: "/shop?category=makeup" },
          { label: "Cream & Powder Blush", href: "/shop?category=makeup" },
          { label: "Dewy Highlighter", href: "/shop?category=makeup" },
        ],
      },
      {
        title: "LIPS",
        items: [
          { label: "Nourishing Lipstick", href: "/shop?category=makeup" },
          { label: "Hydrating Lip Gloss", href: "/shop?category=makeup" },
          { label: "Tinted Balm SPF 30", href: "/shop?category=makeup&q=lip" },
        ],
      },
      {
        title: "EYES",
        items: [
          { label: "Lengthening Mascara", href: "/shop?category=makeup" },
          { label: "Precision Eyeliner", href: "/shop?category=makeup" },
          { label: "Neutral Eyeshadow", href: "/shop?category=makeup" },
        ],
      },
    ],
    bottomCta: {
      label: "Shop All Makeup",
      href: "/shop?category=makeup",
    },
  },
  {
    id: "men",
    label: "Men",
    href: "/shop?category=men",
    dropdownStyle: "w-[520px] -left-28",
    gridCols: "grid-cols-2",
    sections: [
      {
        title: "MEN'S GROOMING",
        items: [
          { label: "Face Wash & Cleansers", href: "/shop?category=men&q=wash" },
          { label: "Lightweight Moisturizers", href: "/shop?category=men&q=moisturizer" },
          { label: "Anti-Dandruff Shampoos", href: "/shop?category=men" },
          { label: "Shaving Cream & Aftershave", href: "/shop?category=men" },
          { label: "Beard Oil & Growth Tonics", href: "/shop?category=men" },
        ],
      },
      {
        title: "CONCERNS",
        items: [
          { label: "Acne & Razor Bumps", href: "/shop?category=men" },
          { label: "Excess Oil & Shine", href: "/shop?category=men" },
          { label: "Dry & Sun-Exposed Skin", href: "/shop?category=men" },
          { label: "Beard Softening & Care", href: "/shop?category=men" },
        ],
      },
    ],
    bottomCta: {
      label: "Shop All Men's Care",
      href: "/shop?category=men",
    },
  },
  {
    id: "bestsellers",
    label: "Best Sellers",
    href: "/shop?filter=best-sellers",
    isDirectLink: true,
  },
];

export function DesktopNavigation() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (id: string, isDirectLink?: boolean) => {
    if (isDirectLink) {
      setActiveDropdown(null);
      return;
    }
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(id);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  return (
    <nav
      className="hidden md:flex items-center gap-1 lg:gap-2 relative"
      onMouseLeave={handleMouseLeave}
      aria-label="Main navigation"
    >
      {NAV_STRUCTURE.map((category) => {
        const isOpen = activeDropdown === category.id;

        if (category.isDirectLink) {
          return (
            <Link
              key={category.id}
              href={category.href}
              className="px-3 py-2 text-[14px] lg:text-[15px] font-semibold text-stone-700 hover:text-primary transition-colors flex items-center gap-1"
            >
              <span>{category.label}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-primary inline-block mb-1" />
            </Link>
          );
        }

        return (
          <div
            key={category.id}
            className="relative"
            onMouseEnter={() => handleMouseEnter(category.id, category.isDirectLink)}
          >
            <Link
              href={category.href}
              className={`px-3 py-2 text-[14px] lg:text-[15px] font-medium transition-colors flex items-center gap-1 rounded-lg ${
                isOpen
                  ? "text-primary bg-primary-soft/80 font-semibold"
                  : "text-stone-700 hover:text-primary hover:bg-stone-100/60"
              }`}
              aria-expanded={isOpen}
            >
              <span>{category.label}</span>
              <ChevronDownIcon
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  isOpen ? "rotate-180 text-primary" : "text-stone-400"
                }`}
              />
            </Link>

            {/* Dropdown Panel */}
            {isOpen && (
              <div
                className={`absolute top-full mt-1.5 bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.18)] border border-stone-200/90 z-50 p-6 animate-in fade-in slide-in-from-top-2 duration-150 ${
                  category.dropdownStyle || "w-80 left-0"
                }`}
              >
                <div className="flex gap-7 items-stretch">
                  {/* Category Sections Grid */}
                  <div
                    className={`flex-1 grid gap-6 ${
                      category.gridCols || "grid-cols-1"
                    }`}
                  >
                    {category.sections?.map((section, idx) => (
                      <div key={idx} className="space-y-3 min-w-[180px]">
                        <h4 className="text-[11px] font-bold tracking-wider uppercase text-stone-400 border-b border-stone-100 pb-2">
                          {section.title}
                        </h4>
                        <ul className="space-y-2">
                          {section.items.map((item, itemIdx) => (
                            <li key={itemIdx}>
                              <Link
                                href={item.href}
                                onClick={() => setActiveDropdown(null)}
                                className="group flex items-center justify-between text-[13px] font-medium text-stone-700 hover:text-primary transition-colors py-0.5 whitespace-nowrap"
                              >
                                <span className="group-hover:translate-x-1 transition-transform">
                                  {item.label}
                                </span>
                                {item.badge && (
                                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-sm bg-primary/10 text-primary tracking-tight ml-2 shrink-0">
                                    {item.badge}
                                  </span>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Optional Side Feature Banner */}
                  {category.featuredBanner && (
                    <div className="w-60 bg-gradient-to-b from-[#fdfbf9] to-stone-50 rounded-xl p-4.5 border border-stone-200/80 flex flex-col justify-between shrink-0 shadow-xs">
                      <div>
                        {category.featuredBanner.badge && (
                          <span className="text-[9.5px] font-bold tracking-wider uppercase text-primary bg-primary-soft px-2 py-0.5 rounded-full inline-block mb-2 border border-primary/10">
                            {category.featuredBanner.badge}
                          </span>
                        )}
                        <h5 className="font-serif text-[15px] font-bold text-stone-900 leading-snug">
                          {category.featuredBanner.title}
                        </h5>
                        <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
                          {category.featuredBanner.subtitle}
                        </p>
                      </div>
                      <Link
                        href={category.featuredBanner.href}
                        onClick={() => setActiveDropdown(null)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline mt-4 group"
                      >
                        <span>Explore Routine</span>
                        <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  )}
                </div>

                {/* Bottom CTA Bar */}
                {category.bottomCta && (
                  <div className="mt-5 pt-3.5 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-stone-400">
                      Formulated without parabens, sulfates, or artificial fragrances.
                    </span>
                    <Link
                      href={category.bottomCta.href}
                      onClick={() => setActiveDropdown(null)}
                      className="font-bold text-primary hover:text-primary-hover flex items-center gap-1 group"
                    >
                      <span>{category.bottomCta.label}</span>
                      <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
