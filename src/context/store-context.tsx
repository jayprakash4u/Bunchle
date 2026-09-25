"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { BestSellerProduct, BEST_SELLER_PRODUCTS } from "@/data/best-sellers";

export interface CartItem {
  id: string;
  name: string;
  volume?: string;
  price: number;
  originalPrice?: number;
  image?: string;
  quantity: number;
}

interface StoreContextType {
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: BestSellerProduct | CartItem, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  
  wishlist: string[];
  isWishlisted: (id: string) => boolean;
  toggleWishlist: (id: string) => void;
  wishlistCount: number;

  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: "bright-boost-vitamin-c",
    name: "Bright Boost Vitamin C Serum",
    volume: "30ml",
    price: 1599,
    originalPrice: 1999,
    image: "/bestsellerhmgimage/one.png",
    quantity: 1,
  },
  {
    id: "barrier-repair-moisturizer",
    name: "Barrier Repair Moisturizer",
    volume: "50ml",
    price: 1699,
    originalPrice: 1999,
    image: "/bestsellerhmgimage/two.png",
    quantity: 1,
  },
];

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>(["bright-boost-vitamin-c"]);

  // Lock background body scroll when cart or search modal is open
  useEffect(() => {
    if (isCartOpen || isSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen, isSearchOpen]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  const addToCart = (product: BestSellerProduct | CartItem, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          volume: product.volume,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          quantity,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const isWishlisted = (id: string) => wishlist.includes(id);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const wishlistCount = wishlist.length;

  return (
    <StoreContext.Provider
      value={{
        cart,
        cartCount,
        cartSubtotal,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        wishlist,
        isWishlisted,
        toggleWishlist,
        wishlistCount,
        isSearchOpen,
        openSearch,
        closeSearch,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
