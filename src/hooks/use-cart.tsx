"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { CartItem, Product, Variant } from '@/lib/types';
import { useToast } from "@/hooks/use-toast";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number, variant?: Variant) => void;
  removeFromCart: (itemId: string) => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('premiere-commerce-cart');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('premiere-commerce-cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart to localStorage", error);
    }
  }, [cartItems]);

  const addToCart = (product: Product, quantity: number, variant?: Variant) => {
    setCartItems(prevItems => {
      const itemIdentifier = variant ? variant.id : product.id;
      const existingItem = prevItems.find(item => item.id === itemIdentifier);

      let newItems;
      if (existingItem) {
        newItems = prevItems.map(item =>
          item.id === itemIdentifier
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const newItem: CartItem = {
          id: itemIdentifier,
          name: product.name,
          price: variant ? variant.price : product.price,
          image: variant ? variant.image : product.images[0],
          quantity,
          variant: variant ? { id: variant.id, name: variant.name } : undefined,
        };
        newItems = [...prevItems, newItem];
      }
      return newItems;
    });
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
     toast({
      title: "Removed from cart",
      description: `Item has been removed from your cart.`,
      variant: 'destructive'
    });
  };

  const updateItemQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        )
      );
    }
  };
  
  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = useMemo(() => () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  const getCartCount = useMemo(() => () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateItemQuantity, clearCart, getCartTotal, getCartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
