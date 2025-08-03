
"use client";

import type { CustomerOrder } from "@/lib/types";
import { useState, useEffect, useCallback, createContext, useContext } from "react";

export interface OrderHistoryContextType {
  orders: CustomerOrder[];
  addOrder: (order: CustomerOrder) => void;
  isLoaded: boolean;
}

export const OrderHistoryContext = createContext<OrderHistoryContextType | undefined>(undefined);

export function useOrderHistoryState() {
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedOrders = localStorage.getItem("verdant_market_order_history");
      if (storedOrders) {
        // Ordena do mais recente para o mais antigo ao carregar
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
        localStorage.setItem("verdant_market_order_history", JSON.stringify(orders));
      } catch (error) {
        console.error("Falha ao salvar o histórico de pedidos no localStorage", error);
      }
    }
  }, [orders, isLoaded]);

  const addOrder = useCallback((order: CustomerOrder) => {
    setOrders((prevOrders) => {
      const newOrders = [order, ...prevOrders];
      // Garante que a ordenação está correta após adicionar
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

    