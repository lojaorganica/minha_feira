
"use client";

import { ReactNode } from "react";
import { CartContext, useCartState } from "@/hooks/use-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const cartState = useCartState();
  return <CartContext.Provider value={cartState}>{children}</CartContext.Provider>;
}
