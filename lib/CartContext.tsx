"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CartItem {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setIsMounted(true);
    const storedCart = localStorage.getItem("nexus_cart");
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (e) {
        console.error("Failed to parse cart data", e);
      }
    }
  }, []);

  // Save to localStorage when cart changes
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("nexus_cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isMounted]);

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      // Prevent duplicates
      if (prev.find((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
