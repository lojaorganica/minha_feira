
"use client";

import type { Product, CartItem } from "@/lib/types";
import { useState, useEffect, useCallback, createContext, useContext } from "react";
import { useToast } from "./use-toast";
import { getFarmerById } from "@/lib/data";

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  isCartLoaded: boolean;
  cartFarmerId: string | null;
  handleConfirmClearAndAddToCart: (product: Product, quantity: number) => void;
  isDifferentFarmer: (farmerId: string) => boolean;
  currentFarmerInCartName: string | null;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCartState() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartLoaded, setIsCartLoaded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("verdant_market_cart");
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Falha ao carregar o carrinho do localStorage", error);
    } finally {
      setIsCartLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isCartLoaded) {
      try {
        localStorage.setItem("verdant_market_cart", JSON.stringify(cartItems));
      } catch (error) {
        console.error("Falha ao salvar o carrinho no localStorage", error);
      }
    }
  }, [cartItems, isCartLoaded]);

  const addToCart = useCallback((product: Product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity, farmerId: product.farmerId }];
    });
     toast({
        title: "Adicionado ao carrinho",
        description: `${quantity} x ${product.name} foi adicionado ao seu carrinho.`,
      });
  }, [toast]);

  const removeFromCart = useCallback((productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  }, []);

  const updateQuantity = useCallback((productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const cartFarmerId = cartItems.length > 0 ? cartItems[0].farmerId : null;
  
  const handleConfirmClearAndAddToCart = (product: Product, quantity: number) => {
    clearCart();
    // Adiciona um pequeno timeout para garantir que o estado do carrinho seja atualizado antes de adicionar o novo item
    setTimeout(() => {
        addToCart(product, quantity);
    }, 50);
  };
  
  const isDifferentFarmer = (farmerId: string) => {
    return cartFarmerId !== null && farmerId !== cartFarmerId;
  };
  
  const currentFarmerInCartName = cartFarmerId ? getFarmerById(cartFarmerId)?.name ?? null : null;
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  
  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotal,
    isCartLoaded,
    cartFarmerId,
    handleConfirmClearAndAddToCart,
    isDifferentFarmer,
    currentFarmerInCartName
  };
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
