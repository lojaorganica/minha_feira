"use client";

import { ReactNode } from "react";
import { OrderHistoryContext, useOrderHistoryState } from "@/hooks/use-order-history";

export function OrderHistoryProvider({ children }: { children: ReactNode }) {
  const orderHistoryState = useOrderHistoryState();
  return <OrderHistoryContext.Provider value={orderHistoryState}>{children}</OrderHistoryContext.Provider>;
}

    
