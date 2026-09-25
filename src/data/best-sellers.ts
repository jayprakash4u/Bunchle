export interface BestSellerProduct {
  id: string;
  name: string;
  volume: string;
  category?: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewsCount: number;
  image?: string;
  illustrationType:
    | "dropper-amber"
    | "cream-tub"
    | "tube-sunscreen"
    | "toner-bottle"
    | "dropper-clear"
    | "tube-cleanser";
  inStock?: boolean;
}

export const BEST_SELLER_PRODUCTS: BestSellerProduct[] = [
  {
    id: "bright-boost-vitamin-c",
    name: "Bright Boost Vitamin C Serum",
    volume: "30ml",
    category: "Treatment",
    price: 1599,
    originalPrice: 1999,
    discountPercent: 20,
    rating: 5.0,
    reviewsCount: 452,
    image: "/bestsellerhmgimage/one.png",
    illustrationType: "dropper-amber",
    inStock: true,
  },
  {
    id: "barrier-repair-moisturizer",
    name: "Barrier Repair Moisturizer",
    volume: "50ml",
    category: "Moisturizer",
    price: 1699,
    originalPrice: 1999,
    discountPercent: 15,
    rating: 5.0,
    reviewsCount: 389,
    image: "/bestsellerhmgimage/two.png",
    illustrationType: "cream-tub",
    inStock: true,
  },
  {
    id: "ultra-light-sunscreen",
    name: "Ultra Light Sunscreen SPF 50",
    volume: "50ml",
    category: "Sun Care",
    price: 1449,
    originalPrice: 1599,
    discountPercent: 10,
    rating: 5.0,
    reviewsCount: 520,
    illustrationType: "tube-sunscreen",
    inStock: true,
  },
  {
    id: "daily-balance-hydrating-toner",
    name: "Daily Balance Hydrating Toner",
    volume: "200ml",
    category: "Toner",
    price: 1279,
    originalPrice: 1599,
    discountPercent: 20,
    rating: 5.0,
    reviewsCount: 276,
    illustrationType: "toner-bottle",
    inStock: true,
  },
  {
    id: "niacinamide-10-serum",
    name: "Niacinamide 10% Serum",
    volume: "30ml",
    category: "Treatment",
    price: 1279,
    originalPrice: 1599,
    discountPercent: 15,
    rating: 5.0,
    reviewsCount: 278,
    illustrationType: "dropper-clear",
    inStock: true,
  },
  {
    id: "gentle-hydrating-cleanser",
    name: "Gentle Hydrating Cleanser",
    volume: "100ml",
    category: "Cleanser",
    price: 1169,
    originalPrice: 1299,
    discountPercent: 10,
    rating: 5.0,
    reviewsCount: 318,
    image: "/bestsellerhmgimage/three.png",
    illustrationType: "tube-cleanser",
    inStock: true,
  },
];
