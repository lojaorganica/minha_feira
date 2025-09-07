
"use client";

import { createContext, useState, useEffect, useCallback, useContext, ReactNode } from "react";
import type { GalleryItem } from "@/lib/types";
import { useToast } from "./use-toast";
import { getGalleryItems } from "@/lib/gallery-data";

interface GalleryFavoritesContextType {
    favorites: GalleryItem[];
    toggleFavorite: (item: GalleryItem) => void;
    isFavorite: (itemId: string) => boolean;
    isLoaded: boolean;
}

const GalleryFavoritesContext = createContext<GalleryFavoritesContextType | undefined>(undefined);

export const GalleryFavoritesProvider = ({ children }: { children: ReactNode }) => {
    const [favorites, setFavorites] = useState<GalleryItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        try {
            const storedFavoriteIds = localStorage.getItem("minha_feira_gallery_favorites");
            if (storedFavoriteIds) {
                const ids = new Set<string>(JSON.parse(storedFavoriteIds));
                const allItems = getGalleryItems();
                setFavorites(allItems.filter(item => ids.has(item.id)));
            }
        } catch (error) {
            console.error("Falha ao carregar favoritos da galeria do localStorage", error);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    const saveFavoritesToLocalStorage = (items: GalleryItem[]) => {
        try {
            const favoriteIds = items.map(item => item.id);
            localStorage.setItem("minha_feira_gallery_favorites", JSON.stringify(favoriteIds));
        } catch (error) {
            console.error("Falha ao salvar favoritos da galeria no localStorage", error);
        }
    };
    
    const toggleFavorite = useCallback((item: GalleryItem) => {
        setFavorites(prevFavorites => {
            const isCurrentlyFavorite = prevFavorites.some(fav => fav.id === item.id);
            let newFavorites;

            if (isCurrentlyFavorite) {
                newFavorites = prevFavorites.filter(fav => fav.id !== item.id);
                toast({
                    title: "Removido dos Favoritos",
                    description: `"${item.title}" não está mais na sua galeria de favoritos.`,
                });
            } else {
                newFavorites = [...prevFavorites, item];
                toast({
                    title: "Adicionado aos Favoritos!",
                    description: `"${item.title}" foi adicionado à sua galeria de favoritos.`,
                });
            }

            saveFavoritesToLocalStorage(newFavorites);
            return newFavorites;
        });
    }, [toast]);
    
    const isFavorite = useCallback((itemId: string) => {
        return favorites.some(fav => fav.id === itemId);
    }, [favorites]);


    return (
        <GalleryFavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, isLoaded }}>
            {children}
        </GalleryFavoritesContext.Provider>
    );
};

export const useGalleryFavorites = () => {
    const context = useContext(GalleryFavoritesContext);
    if (!context) {
        throw new Error("useGalleryFavorites must be used within a GalleryFavoritesProvider");
    }
    return context;
};
