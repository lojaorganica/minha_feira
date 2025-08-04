
"use client";

import { useState, useEffect, useCallback, useContext } from "react";
import type { Customer, Farmer } from "@/lib/types";
import { getCustomerById, getFarmerById, addFarmer as saveFarmer, updateFarmer as persistFarmer, updateCustomer as persistCustomer } from "@/lib/data";
import { CartContext } from "./use-cart";

const USER_STORAGE_KEY = "verdant_market_user";
const USER_TYPE_STORAGE_KEY = "verdant_market_user_type";

export function useUser() {
  const [user, setUser] = useState<Customer | Farmer | null>(null);
  const [userType, setUserType] = useState<'customer' | 'farmer' | null>(null);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const cartContext = useContext(CartContext);

  useEffect(() => {
    // This effect runs only once on mount to load the user from localStorage.
    // It sets the initial state for the user session.
    let isMounted = true;
    const loadUserFromStorage = () => {
      if (typeof window !== 'undefined') {
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
            
            if (isMounted && freshData) {
              setUser(freshData);
              setUserType(storedUserType);
            }
          }
        } catch (error) {
          console.error("Falha ao carregar o usuário do localStorage", error);
          if (isMounted) {
            setUser(null);
            setUserType(null);
          }
        } finally {
          if (isMounted) {
            setIsUserLoaded(true);
          }
        }
      }
    };
    
    loadUserFromStorage();

    return () => {
      isMounted = false;
    };
  }, []);

  const updateUser = useCallback((updatedUserData: Partial<Customer | Farmer>) => {
    setUser(currentUser => {
        if (!currentUser) return null;
        
        const newUser = { ...currentUser, ...updatedUserData };

        if (userType === 'farmer') {
            persistFarmer(currentUser.id, updatedUserData as Partial<Farmer>);
        } else if (userType === 'customer') {
            persistCustomer(currentUser.id, updatedUserData as Partial<Customer>);
        }

        try {
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
        } catch (error) {
            console.error("Falha ao salvar o usuário no localStorage", error);
        }
        return newUser;
    });
  }, [userType]);

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
        setIsUserLoaded(true); // Indicate that user is now loaded
        try {
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
          localStorage.setItem(USER_TYPE_STORAGE_KEY, type);
        } catch(e) {
          console.error("Falha ao salvar o usuário no localStorage", e);
        }
    }
  };
  
  const addFarmer = (farmerData: Omit<Farmer, 'id' | 'location'>): Farmer => {
    const newFarmer = saveFarmer(farmerData);
    login(newFarmer.id, 'farmer');
    return newFarmer;
  }

  const logout = useCallback(() => {
    setUser(null);
    setUserType(null);
    try {
      localStorage.removeItem(USER_STORAGE_KEY);
      localStorage.removeItem(USER_TYPE_STORAGE_KEY);
    } catch(e) {
       console.error("Falha ao remover o usuário do localStorage", e);
    }
    
    // Limpa o carrinho ao fazer logout para evitar inconsistências
    if (cartContext && cartContext.clearCart) {
      cartContext.clearCart();
    }
  }, [cartContext]);

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

    