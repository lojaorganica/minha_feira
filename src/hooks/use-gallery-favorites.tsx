
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
    const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
    const [isLoaded, setIsLoaded] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        try {
            const storedFavorites = localStorage.getItem("minha_feira_gallery_favorites");
            if (storedFavorites) {
                setFavoriteIds(new Set(JSON.parse(storedFavorites)));
            }
        } catch (error) {
            console.error("Falha ao carregar favoritos da galeria do localStorage", error);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (isLoaded) {
            try {
                localStorage.setItem("minha_feira_gallery_favorites", JSON.stringify(Array.from(favoriteIds)));
            } catch (error) {
                console.error("Falha ao salvar favoritos da galeria no localStorage", error);
            }
        }
    }, [favoriteIds, isLoaded]);

    const toggleFavorite = useCallback((item: GalleryItem) => {
        setFavoriteIds(prev => {
            const newFavorites = new Set(prev);
            if (newFavorites.has(item.id)) {
                newFavorites.delete(item.id);
                toast({
                    title: "Removido dos Favoritos",
                    description: `"${item.title}" não está mais na sua galeria de favoritos.`,
                });
            } else {
                newFavorites.add(item.id);
                 toast({
                    title: "Adicionado aos Favoritos!",
                    description: `"${item.title}" foi adicionado à sua galeria de favoritos.`,
                });
            }
            return newFavorites;
        });
    }, [toast]);

    const isFavorite = useCallback((itemId: string) => {
        return favoriteIds.has(itemId);
    }, [favoriteIds]);

    const favorites = getGalleryItems().filter(item => favoriteIds.has(item.id));

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
