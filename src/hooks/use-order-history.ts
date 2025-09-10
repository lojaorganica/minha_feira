
"use client";

import type { CustomerOrder } from "@/lib/types";
import { useState, useEffect, useCallback, createContext, useContext } from "react";
import { getProductByName } from "@/lib/data";

export interface OrderHistoryContextType {
  orders: CustomerOrder[];
  addOrder: (order: Omit<CustomerOrder, 'items'> & { items: { productName: string, quantity: number }[] }) => void;
  isLoaded: boolean;
}

export const OrderHistoryContext = createContext<OrderHistoryContextType | undefined>(undefined);

export function useOrderHistoryState() {
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedOrders = localStorage.getItem("minha_feira_order_history");
      if (storedOrders) {
        const parsedOrders = JSON.parse(storedOrders);
        setOrders(parsedOrders.sort((a: CustomerOrder, b: CustomerOrder) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      }
    } catch (error) {
      console.error("Falha ao carregar o histórico de pedidos do localStorage", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("minha_feira_order_history", JSON.stringify(orders));
      } catch (error) {
        console.error("Falha ao salvar o histórico de pedidos no localStorage", error);
      }
    }
  }, [orders, isLoaded]);

  const addOrder = useCallback((order: Omit<CustomerOrder, 'items'> & { items: { productName: string, quantity: number }[] }) => {
    // Enrich items with unit before saving
    const enrichedItems = order.items.map(item => {
        const productDetails = getProductByName(item.productName);
        return {
            ...item,
            productUnit: productDetails?.unit || ''
        };
    });

    const newOrder: CustomerOrder = {
        ...order,
        items: enrichedItems,
    };

    setOrders((prevOrders) => {
      const newOrders = [newOrder, ...prevOrders];
      return newOrders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });
  }, []);

  return {
    orders,
    addOrder,
    isLoaded,
  };
}

export function useOrderHistory() {
  const context = useContext(OrderHistoryContext);
  if (context === undefined) {
    throw new Error("useOrderHistory must be used within an OrderHistoryProvider");
  }
  return context;
}
