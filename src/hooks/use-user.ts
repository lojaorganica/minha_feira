
"use client";

import { useState, useEffect, useCallback } from "react";
import type { Customer, Farmer } from "@/lib/types";
import { getCustomerById, getFarmerById } from "@/lib/data";

const USER_STORAGE_KEY = "verdant_market_user";
const USER_TYPE_STORAGE_KEY = "verdant_market_user_type";
const DEFAULT_CUSTOMER_ID = 'cust-001';
const DEFAULT_FARMER_ID = '1';

// This is a simplified user management hook for demonstration purposes.
// In a real application, this would be a proper authentication context.
export function useUser() {
  const [user, setUser] = useState<Customer | Farmer | null>(null);
  const [userType, setUserType] = useState<'customer' | 'farmer' | null>(null);
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);
      const storedUserType = localStorage.getItem(USER_TYPE_STORAGE_KEY) as 'customer' | 'farmer' | null;
      
      if (storedUser && storedUserType) {
        setUser(JSON.parse(storedUser));
        setUserType(storedUserType);
      } else {
        // Default to customer if nothing is stored
        const defaultUserData = getCustomerById(DEFAULT_CUSTOMER_ID);
        if (defaultUserData) {
          setUser(defaultUserData);
          setUserType('customer');
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(defaultUserData));
          localStorage.setItem(USER_TYPE_STORAGE_KEY, 'customer');
        }
      }
    } catch (error) {
      console.error("Falha ao carregar o usuário do localStorage", error);
    } finally {
      setIsUserLoaded(true);
    }
  }, []);

  const updateUser = useCallback((updatedUserData: Customer | Farmer) => {
    setUser(updatedUserData);
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUserData));
    } catch (error) {
      console.error("Falha ao salvar o usuário no localStorage", error);
    }
  }, []);

  return {
    user,
    userType,
    isUserLoaded,
    updateUser,
  };
}
