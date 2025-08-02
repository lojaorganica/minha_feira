"use client";

import { useState, useEffect } from "react";
import type { Customer } from "@/lib/types";
import { getCustomerById } from "@/lib/data";

// Para fins de demonstração, usamos um ID de cliente codificado.
// Em um aplicativo real, isso viria de sua sessão de autenticação.
const LOGGED_IN_CUSTOMER_ID = 'cust-001';

export function useUser() {
  const [user, setUser] = useState<Customer | null>(null);
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  useEffect(() => {
    // Simula a busca de dados do usuário logado.
    const customerData = getCustomerById(LOGGED_IN_CUSTOMER_ID);
    if (customerData) {
      setUser(customerData);
    }
    setIsUserLoaded(true);
  }, []);

  // Futuramente, você pode adicionar funções aqui para, por exemplo,
  // adicionar/remover agricultores favoritos.
  // const addFavoriteFarmer = (farmerId: string) => { ... }
  // const removeFavoriteFarmer = (farmerId: string) => { ... }

  return {
    user,
    isUserLoaded,
    // futuramente: addFavoriteFarmer, removeFavoriteFarmer
  };
}
