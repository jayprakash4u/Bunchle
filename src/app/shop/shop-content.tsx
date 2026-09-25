"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ProductVisual } from "@/components/product-illustrations";
import {
  ALL_PRODUCTS,
  CATEGORY_OPTIONS,
  CONCERN_OPTIONS,
  INGREDIENT_OPTIONS,
  Product,
} from "@/data/products";
import { useStore } from "@/context/store-context";
import {
  CheckIcon,
  ChevronDownIcon,
  HeartIcon,
  SearchIcon,
  SparklesIcon,
  StarIcon,
  XIcon,
} from "@/components/icons";

// Shopping Bag Icon
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

// Filter Icon
function FilterIcon({ className = "w-4 h-4" }: { className?: string }) {
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
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="8" x2="16" y1="12" y2="12" />
      <line x1="10" x2="14" y1="18" y2="18" />
    </svg>
  );
}

export function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addToCart, isWishlisted, toggleWishlist } = useStore();

  // Search & Filter State
  const categoryParam = searchParams.get("category") || "all";
  const filterParam = searchParams.get("filter") || "";
  const queryParam = searchParams.get("q") || "";

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [searchQuery, setSearchQuery] = useState<string>(queryParam);
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string>("all");
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [addingId, setAddingId] = useState<string | null>(null);

  // Sync URL changes with state
  useEffect(() => {
    setSelectedCategory(searchParams.get("category") || "all");
    if (searchParams.get("q")) {
      setSearchQuery(searchParams.get("q") || "");
    }
  }, [searchParams]);

  // Handle Category Pill Click
  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    if (slug === "all") {
      router.push("/shop");
    } else {
      router.push(`/shop?category=${slug}`);
    }
  };

  // Toggle Concerns
  const toggleConcern = (concern: string) => {
    setSelectedConcerns((prev) =>
      prev.includes(concern)
        ? prev.filter((c) => c !== concern)
        : [...prev, concern],
    );
  };

  // Toggle Ingredients
  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient],
    );
  };

  // Reset All Filters
  const resetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setSelectedConcerns([]);
    setSelectedIngredients([]);
    setPriceRange("all");
    setMinRating(0);
    setSortBy("featured");
    router.push("/shop");
  };

  const activeFiltersCount =
    (selectedCategory !== "all" ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0) +
    selectedConcerns.length +
    selectedIngredients.length +
    (priceRange !== "all" ? 1 : 0) +
    (minRating > 0 ? 1 : 0);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== "all" && product.category !== selectedCategory) {
        return false;
      }

      // Query filter parameter from URL (best-sellers, new-arrivals, deals, bundles)
      if (filterParam === "best-sellers" && !product.isBestSeller) return false;
      if (filterParam === "new-arrivals" && !product.isNewArrival) return false;
      if (filterParam === "deals" && !product.isDeal) return false;
      if (filterParam === "bundles" && !product.isBundle) return false;

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesSubtitle = product.subtitle.toLowerCase().includes(query);
        const matchesCategory = product.categoryLabel.toLowerCase().includes(query);
        const matchesIngredients = product.ingredients?.some((ing) =>
          ing.toLowerCase().includes(query),
        );
        const matchesConcerns = product.skinConcern?.some((sc) =>
          sc.toLowerCase().includes(query),
        );
        if (
          !matchesName &&
          !matchesSubtitle &&
          !matchesCategory &&
          !matchesIngredients &&
          !matchesConcerns
        ) {
          return false;
        }
      }

      // Concerns filter
      if (selectedConcerns.length > 0) {
        const hasConcern = product.skinConcern?.some((c) =>
          selectedConcerns.includes(c),
        );
        if (!hasConcern) return false;
      }

      // Ingredients filter
      if (selectedIngredients.length > 0) {
        const hasIngredient = product.ingredients?.some((ing) =>
          selectedIngredients.includes(ing),
        );
        if (!hasIngredient) return false;
      }

      // Price filter
      if (priceRange === "under-1200" && product.price >= 1200) return false;
      if (
        priceRange === "1200-1600" &&
        (product.price < 1200 || product.price > 1600)
      ) {
        return false;
      }
      if (priceRange === "above-1600" && product.price <= 1600) return false;

      // Rating filter
      if (minRating > 0 && product.rating < minRating) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "discount")
        return (b.discountPercent || 0) - (a.discountPercent || 0);
      return 0; // "featured" defaults to catalog order
    });
  }, [
    selectedCategory,
    filterParam,
    searchQuery,
    selectedConcerns,
    selectedIngredients,
    priceRange,
    minRating,
    sortBy,
  ]);

  const handleAdd = (product: Product) => {
    setAddingId(product.id);
    addToCart({
      id: product.id,
      name: product.name,
      volume: product.volume,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      quantity: 1,
    });
    setTimeout(() => {
      setAddingId(null);
    }, 1200);
  };

  // Dynamic Header Title
  const getHeaderTitle = () => {
    if (filterParam === "best-sellers") return "Best Sellers";
    if (filterParam === "new-arrivals") return "New Arrivals";
    if (filterParam === "deals") return "Deals & Special Offers";
    if (filterParam === "bundles") return "Bundles & Routine Kits";
    const found = CATEGORY_OPTIONS.find((c) => c.slug === selectedCategory);
    return found ? found.label : "Shop All";
  };

  return (
    <div className="bg-[#faf8f5] min-h-screen py-8 sm:py-12">
      <Container>
        {/* Page Header */}
        <div className="mb-8 sm:mb-10 text-left">
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-primary font-bold">{getHeaderTitle()}</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-[42px] font-bold text-stone-900 tracking-tight">
            {getHeaderTitle()}
          </h1>
          <p className="text-sm sm:text-base text-stone-500 mt-1.5 max-w-2xl">
            Discover science-backed skincare and wellness essentials crafted for radiant, resilient skin.
          </p>
        </div>

        {/* Quick Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-6">
          {CATEGORY_OPTIONS.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => handleCategoryChange(cat.slug)}
              className={`px-4 py-2 rounded-full text-xs sm:text-[13px] font-semibold transition-all whitespace-nowrap cursor-pointer shadow-xs ${
                selectedCategory === cat.slug
                  ? "bg-primary text-white shadow-button"
                  : "bg-white text-stone-700 border border-stone-200 hover:border-primary hover:text-primary"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search, Sort, and Mobile Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3.5 sm:p-4 bg-white rounded-2xl border border-stone-200/90 shadow-xs mb-8">
          {/* Search Box */}
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, ingredients, or skin concerns..."
              className="w-full bg-stone-50/80 border border-stone-200 rounded-xl pl-10 pr-9 py-2 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-primary focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
              >
                <XIcon className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5 justify-between sm:justify-end">
            {/* Mobile Filter Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-stone-300 bg-stone-50 text-xs font-semibold text-stone-700 hover:bg-stone-100 cursor-pointer"
            >
              <FilterIcon className="w-4 h-4 text-stone-500" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="bg-primary text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-stone-500 hidden sm:inline">
                Sort by:
              </span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 pr-8 text-xs font-semibold text-stone-800 hover:border-stone-400 focus:outline-none focus:border-primary cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="discount">Biggest Discount</option>
                </select>
                <ChevronDownIcon className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Desktop Left Sidebar Filters */}
          <aside className="hidden lg:block space-y-6 bg-white p-6 rounded-2xl border border-stone-200/90 shadow-xs sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-sans text-sm font-bold text-stone-900 uppercase tracking-wider">
                Filters
              </h3>
              {activeFiltersCount > 0 && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs font-semibold text-primary hover:underline cursor-pointer"
                >
                  Reset All
                </button>
              )}
            </div>

            {/* Categories */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Category
              </h4>
              <div className="space-y-1.5 text-xs font-medium">
                {CATEGORY_OPTIONS.map((cat) => (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => handleCategoryChange(cat.slug)}
                    className={`w-full text-left px-2 py-1.5 rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                      selectedCategory === cat.slug
                        ? "bg-primary/10 text-primary font-bold"
                        : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                    }`}
                  >
                    <span>{cat.label}</span>
                    {selectedCategory === cat.slug && (
                      <CheckIcon className="w-3.5 h-3.5 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-2.5 pt-4 border-t border-stone-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Price Range
              </h4>
              <div className="space-y-1.5 text-xs text-stone-700">
                {[
                  { value: "all", label: "All Prices" },
                  { value: "under-1200", label: "Under NPR 1,200" },
                  { value: "1200-1600", label: "NPR 1,200 – NPR 1,600" },
                  { value: "above-1600", label: "Above NPR 1,600" },
                ].map((item) => (
                  <label
                    key={item.value}
                    className="flex items-center gap-2 cursor-pointer py-1"
                  >
                    <input
                      type="radio"
                      name="priceRange"
                      value={item.value}
                      checked={priceRange === item.value}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="text-primary focus:ring-primary h-3.5 w-3.5"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Skin & Hair Concern */}
            <div className="space-y-2.5 pt-4 border-t border-stone-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Shop by Concern
              </h4>
              <div className="space-y-1.5 text-xs text-stone-700 max-h-48 overflow-y-auto pr-1">
                {CONCERN_OPTIONS.map((concern) => (
                  <label
                    key={concern}
                    className="flex items-center gap-2 cursor-pointer py-0.5"
                  >
                    <input
                      type="checkbox"
                      checked={selectedConcerns.includes(concern)}
                      onChange={() => toggleConcern(concern)}
                      className="rounded-xs text-primary focus:ring-primary h-3.5 w-3.5"
                    />
                    <span className="line-clamp-1">{concern}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Key Ingredients */}
            <div className="space-y-2.5 pt-4 border-t border-stone-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Key Actives & Ingredients
              </h4>
              <div className="space-y-1.5 text-xs text-stone-700 max-h-48 overflow-y-auto pr-1">
                {INGREDIENT_OPTIONS.map((ingredient) => (
                  <label
                    key={ingredient}
                    className="flex items-center gap-2 cursor-pointer py-0.5"
                  >
                    <input
                      type="checkbox"
                      checked={selectedIngredients.includes(ingredient)}
                      onChange={() => toggleIngredient(ingredient)}
                      className="rounded-xs text-primary focus:ring-primary h-3.5 w-3.5"
                    />
                    <span className="line-clamp-1">{ingredient}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Minimum Rating */}
            <div className="space-y-2.5 pt-4 border-t border-stone-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Customer Rating
              </h4>
              <div className="space-y-1.5 text-xs text-stone-700">
                {[
                  { rating: 0, label: "All Ratings" },
                  { rating: 4.8, label: "4.8★ & Above" },
                  { rating: 5.0, label: "5.0★ Top Rated Only" },
                ].map((item) => (
                  <label
                    key={item.rating}
                    className="flex items-center gap-2 cursor-pointer py-0.5"
                  >
                    <input
                      type="radio"
                      name="minRating"
                      checked={minRating === item.rating}
                      onChange={() => setMinRating(item.rating)}
                      className="text-primary focus:ring-primary h-3.5 w-3.5"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Right Product Grid */}
          <div className="lg:col-span-3">
            {/* Products Count Info */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-medium text-stone-500">
                Showing <strong className="text-stone-900">{filteredProducts.length}</strong> products
              </p>
              {activeFiltersCount > 0 && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="lg:hidden text-xs font-semibold text-primary"
                >
                  Clear all filters
                </button>
              )}
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-stone-200/90 p-12 text-center flex flex-col items-center justify-center gap-3">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-1">
                  <SearchIcon className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-800">
                  No products found
                </h3>
                <p className="text-xs text-stone-500 max-w-sm">
                  We couldn&apos;t find any products matching your active filters. Try clearing some filters or searching for something else.
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={resetFilters}
                  className="mt-2"
                >
                  Reset All Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {filteredProducts.map((product) => {
                  const wishlisted = isWishlisted(product.id);
                  const isAdding = addingId === product.id;

                  return (
                    <div
                      key={product.id}
                      className="group relative flex flex-col justify-between bg-white rounded-2xl border border-stone-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:border-stone-300 transition-all duration-300 p-4"
                    >
                      {/* Top Badges & Wishlist Heart */}
                      <div className="flex items-center justify-between z-10 w-full mb-1">
                        <div className="flex items-center gap-1.5">
                          {product.discountPercent && (
                            <span className="bg-[#e0483c] text-white text-[11px] font-bold px-2 py-0.5 rounded-sm tracking-tight shadow-xs select-none">
                              -{product.discountPercent}%
                            </span>
                          )}
                          {product.isNewArrival && !product.discountPercent && (
                            <span className="bg-stone-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm tracking-tight shadow-xs uppercase">
                              NEW
                            </span>
                          )}
                        </div>

                        {/* Wishlist Heart Button */}
                        <button
                          type="button"
                          onClick={() => toggleWishlist(product.id)}
                          className="flex h-7.5 w-7.5 items-center justify-center rounded-full text-stone-400 hover:text-[#e0483c] hover:bg-stone-50 transition-all active:scale-90 cursor-pointer"
                          aria-label={
                            wishlisted
                              ? `Remove ${product.name} from wishlist`
                              : `Add ${product.name} to wishlist`
                          }
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

                      {/* Product Details */}
                      <div className="flex flex-col flex-1 mt-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary mb-0.5">
                          {product.categoryLabel}
                        </span>

                        <h3
                          className="font-sans text-[14.5px] font-semibold text-stone-900 leading-snug line-clamp-1 group-hover:text-[#e0483c] transition-colors"
                          title={product.name}
                        >
                          {product.name}
                        </h3>

                        <p className="text-xs text-stone-500 font-normal line-clamp-1 mt-0.5">
                          {product.subtitle}
                        </p>

                        {/* Star Rating & Review Count */}
                        <div className="flex items-center gap-1 mt-1.5 mb-2.5 select-none">
                          <div className="flex items-center text-amber-400 gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon
                                key={i}
                                className="w-3.5 h-3.5 fill-amber-400"
                              />
                            ))}
                          </div>
                          <span className="text-xs text-stone-400 font-normal ml-0.5">
                            ({product.reviewsCount})
                          </span>
                          <span className="text-xs text-stone-300 ml-auto font-medium">
                            {product.volume}
                          </span>
                        </div>

                        {/* Price Row */}
                        <div className="flex items-baseline gap-2 mb-3 mt-auto">
                          <span className="text-base font-bold text-stone-900 tracking-tight">
                            NPR {product.price.toLocaleString("en-US")}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-stone-400 line-through">
                              NPR {product.originalPrice.toLocaleString("en-US")}
                            </span>
                          )}
                        </div>

                        {/* Add to Cart Button */}
                        <button
                          type="button"
                          onClick={() => handleAdd(product)}
                          disabled={isAdding}
                          className={`w-full py-2.5 px-3 rounded-lg text-xs sm:text-[13px] font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer shadow-xs active:scale-[0.98] ${
                            isAdding
                              ? "bg-emerald-600 text-white"
                              : "bg-[#e0483c] hover:bg-[#c9352a] text-white"
                          }`}
                          aria-label={`Add ${product.name} to cart`}
                        >
                          {isAdding ? (
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
                })}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden lg:hidden animate-in fade-in duration-200">
            <div
              className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs"
              onClick={() => setIsMobileFilterOpen(false)}
            />
            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
              <div className="w-screen max-w-xs bg-white p-5 shadow-2xl flex flex-col justify-between overflow-y-auto">
                <div className="space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                    <h3 className="font-serif text-base font-bold text-stone-900">
                      Filter Catalog
                    </h3>
                    <button
                      type="button"
                      onClick={() => setIsMobileFilterOpen(false)}
                      className="p-1 text-stone-400 hover:text-stone-700"
                    >
                      <XIcon className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Categories */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
                      Category
                    </h4>
                    <div className="space-y-1 text-xs">
                      {CATEGORY_OPTIONS.map((cat) => (
                        <button
                          key={cat.slug}
                          type="button"
                          onClick={() => {
                            handleCategoryChange(cat.slug);
                            setIsMobileFilterOpen(false);
                          }}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg ${
                            selectedCategory === cat.slug
                              ? "bg-primary/10 text-primary font-bold"
                              : "text-stone-700 hover:bg-stone-50"
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="pt-3 border-t border-stone-100">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
                      Price Range
                    </h4>
                    <div className="space-y-1.5 text-xs text-stone-700">
                      {[
                        { value: "all", label: "All Prices" },
                        { value: "under-1200", label: "Under NPR 1,200" },
                        { value: "1200-1600", label: "NPR 1,200 – NPR 1,600" },
                        { value: "above-1600", label: "Above NPR 1,600" },
                      ].map((item) => (
                        <label
                          key={item.value}
                          className="flex items-center gap-2 py-0.5"
                        >
                          <input
                            type="radio"
                            name="mobilePrice"
                            value={item.value}
                            checked={priceRange === item.value}
                            onChange={(e) => setPriceRange(e.target.value)}
                            className="text-primary focus:ring-primary h-3.5 w-3.5"
                          />
                          <span>{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-200 mt-6 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 justify-center text-xs font-semibold"
                    onClick={resetFilters}
                  >
                    Reset
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-1 justify-center text-xs font-semibold"
                    onClick={() => setIsMobileFilterOpen(false)}
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
