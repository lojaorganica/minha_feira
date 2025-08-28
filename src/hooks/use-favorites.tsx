
"use client";

import { createContext, useState, useEffect, useCallback, useContext, ReactNode } from "react";
import type { Product } from "@/lib/types";
import { useToast } from "./use-toast";
import { getProductById } from "@/lib/data";

interface FavoritesContextType {
    favorites: Product[];
    toggleFavorite: (product: Product) => void;
    isFavorite: (productId: string) => boolean;
    isLoaded: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
    const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
    const [isLoaded, setIsLoaded] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        try {
            const storedFavorites = localStorage.getItem("minha_feira_favorites");
            if (storedFavorites) {
                setFavoriteIds(new Set(JSON.parse(storedFavorites)));
            }
        } catch (error) {
            console.error("Falha ao carregar favoritos do localStorage", error);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (isLoaded) {
            try {
                localStorage.setItem("minha_feira_favorites", JSON.stringify(Array.from(favoriteIds)));
            } catch (error) {
                console.error("Falha ao salvar favoritos no localStorage", error);
            }
        }
    }, [favoriteIds, isLoaded]);

    const toggleFavorite = useCallback((product: Product) => {
        setFavoriteIds(prev => {
            const newFavorites = new Set(prev);
            if (newFavorites.has(product.id)) {
                newFavorites.delete(product.id);
                toast({
                    title: "Removido dos Favoritos",
                    description: `${product.name} não está mais nos seus favoritos.`,
                });
            } else {
                newFavorites.add(product.id);
                 toast({
                    title: "Adicionado aos Favoritos!",
                    description: `${product.name} agora está nos seus favoritos.`,
                });
            }
            return newFavorites;
        });
    }, [toast]);

    const isFavorite = useCallback((productId: string) => {
        return favoriteIds.has(productId);
    }, [favoriteIds]);

    const favorites = Array.from(favoriteIds)
        .map(id => getProductById(id))
        .filter((p): p is Product => Boolean(p));

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, isLoaded }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error("useFavorites must be used within a FavoritesProvider");
    }
    return context;
};
