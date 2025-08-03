
"use client";

import { useState, useEffect, useCallback } from "react";
import type { Customer } from "@/lib/types";
import { getCustomerById } from "@/lib/data";

const USER_STORAGE_KEY = "verdant_market_user";
const DEFAULT_CUSTOMER_ID = 'cust-001';

export function useUser() {
  const [user, setUser] = useState<Customer | null>(null);
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        // Se nenhum usuário estiver no localStorage, carregue o usuário padrão.
        // Em um aplicativo real, você redirecionaria para o login.
        const defaultUserData = getCustomerById(DEFAULT_CUSTOMER_ID);
        if (defaultUserData) {
          setUser(defaultUserData);
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(defaultUserData));
        }
      }
    } catch (error) {
      console.error("Falha ao carregar o usuário do localStorage", error);
    } finally {
      setIsUserLoaded(true);
    }
  }, []);

  const updateUser = useCallback((updatedUserData: Customer) => {
    setUser(updatedUserData);
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUserData));
    } catch (error) {
      console.error("Falha ao salvar o usuário no localStorage", error);
    }
  }, []);

  return {
    user,
    isUserLoaded,
    updateUser,
  };
}

    