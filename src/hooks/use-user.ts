
"use client";

import { useState, useEffect, useCallback, useContext } from "react";
import type { Customer, Farmer } from "@/lib/types";
import { getCustomerById, getFarmerById, addFarmer as saveFarmer, updateFarmer as persistFarmer, updateCustomer as persistCustomer } from "@/lib/data";
import { CartContext } from "./use-cart";

const USER_STORAGE_KEY = "verdant_market_user";
const USER_TYPE_STORAGE_KEY = "verdant_market_user_type";

const getInitialUserState = (): { user: Customer | Farmer | null; userType: 'customer' | 'farmer' | null } => {
    if (typeof window === 'undefined') {
        return { user: null, userType: null };
    }
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
                return { user: freshData, userType: storedUserType };
            }
        }
    } catch (error) {
        console.error("Falha ao carregar o usuário inicial do localStorage", error);
    }
    return { user: null, userType: null };
};


export function useUser() {
  const initialState = getInitialUserState();
  const [user, setUser] = useState<Customer | Farmer | null>(initialState.user);
  const [userType, setUserType] = useState<'customer' | 'farmer' | null>(initialState.userType);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const cartContext = useContext(CartContext);
  
  useEffect(() => {
    // Agora o useEffect só controla o estado de 'isUserLoaded'
    // A checagem real ocorre fora, o que evita o "piscar" da UI
    setIsUserLoaded(true);
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
        try {
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
          localStorage.setItem(USER_TYPE_STORAGE_KEY, type);
        } catch(e) {
          console.error("Falha ao salvar o usuário no localStorage", e);
        }
    }
  };
  
  const addFarmer = (farmerData: Omit<Farmer, 'id' | 'location' | 'image'>): Farmer => {
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
