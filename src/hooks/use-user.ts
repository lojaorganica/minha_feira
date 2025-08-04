
"use client";

import { useState, useEffect, useCallback } from "react";
import type { Customer, Farmer } from "@/lib/types";
import { getCustomerById, getFarmerById, addFarmer as saveFarmer } from "@/lib/data";

const USER_STORAGE_KEY = "verdant_market_user";
const USER_TYPE_STORAGE_KEY = "verdant_market_user_type";

export function useUser() {
  const [user, setUser] = useState<Customer | Farmer | null>(null);
  const [userType, setUserType] = useState<'customer' | 'farmer' | null>(null);
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  useEffect(() => {
    // This effect should only run on the client side
    if (typeof window === 'undefined') return;

    try {
      const storedUserType = localStorage.getItem(USER_TYPE_STORAGE_KEY) as 'customer' | 'farmer' | null;
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);
      
      if (storedUser && storedUserType) {
        const parsedUser = JSON.parse(storedUser);
        
        let freshData;
        if (storedUserType === 'customer') {
            freshData = getCustomerById(parsedUser.id);
        } else if (storedUserType === 'farmer') {
            freshData = getFarmerById(parsedUser.id);
        }

        if (freshData) {
          setUser(freshData);
          setUserType(storedUserType);
        } else {
          // If user not found in 'DB', clear from storage
          logout();
        }
      }
    } catch (error) {
      console.error("Falha ao carregar o usuário do localStorage", error);
      // Clear storage on error
      logout();
    } finally {
      setIsUserLoaded(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateUser = useCallback((updatedUserData: Partial<Customer | Farmer>) => {
    setUser(currentUser => {
        if (!currentUser) return null;
        const newUser = { ...currentUser, ...updatedUserData };
        try {
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
            // Note: This only updates local state. A real app would save this to a backend.
            // For this prototype, we assume `data.ts` is our "database" and changes
            // are ephemeral or managed through direct function calls.
        } catch (error) {
            console.error("Falha ao salvar o usuário no localStorage", error);
        }
        return newUser;
    });
  }, []);

  const login = (id: string, type: 'customer' | 'farmer') => {
    let userData;
    if (type === 'customer') {
        userData = getCustomerById(id);
    } else {
        userData = getFarmerById(id);
    }

    if (userData) {
        setUser(userData);
        setUserType(type);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
        localStorage.setItem(USER_TYPE_STORAGE_KEY, type);
    }
  };
  
  const addFarmer = (farmerData: Omit<Farmer, 'id' | 'location'>): Farmer => {
    const newFarmer = saveFarmer(farmerData);
    login(newFarmer.id, 'farmer');
    return newFarmer;
  }

  const logout = () => {
    setUser(null);
    setUserType(null);
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(USER_TYPE_STORAGE_KEY);
  }

  return {
    user,
    userType,
    isUserLoaded,
    updateUser,
    login,
    logout,
    addFarmer
  };
}
