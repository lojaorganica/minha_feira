
"use client";

import { useMemo } from "react";
import { useFavorites } from "@/hooks/use-favorites.tsx";
import { getFarmerById } from "@/lib/data";
import type { Product, Farmer } from "@/lib/types";
import ProductCard from "@/components/product-card";
import { Loader2, Heart, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface FarmerWithProducts extends Farmer {
  products: Product[];
}

export default function FavoritesView() {
  const { favorites, isLoaded } = useFavorites();

  const favoritesByFarmer = useMemo(() => {
    if (!isLoaded) return [];

    const grouped: { [key: string]: FarmerWithProducts } = {};

    favorites.forEach(product => {
      const farmer = getFarmerById(product.farmerId);
      if (!farmer) return;

      if (!grouped[farmer.id]) {
        grouped[farmer.id] = {
          ...farmer,
          products: [],
        };
      }
      grouped[farmer.id].products.push(product);
    });

    return Object.values(grouped);
  }, [favorites, isLoaded]);

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center p-12">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center py-20">
        <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
        <h2 className="mt-4 text-2xl font-semibold">Você ainda não tem favoritos</h2>
        <p className="text-lg font-semibold text-foreground/90 mt-2">
          Clique no ícone de coração nos produtos para adicioná-los aqui.
        </p>
        <Button asChild className="mt-6 text-base font-semibold">
          <Link href="/catalog">Explorar Catálogo</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {favoritesByFarmer.map(farmer => (
        <section key={farmer.id}>
          <div className="flex flex-col items-start gap-1 mb-6">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl text-primary">
              {farmer.name}
            </h2>
             {farmer.responsibleName && (
                <p className="text-sm font-semibold text-muted-foreground -mt-1">
                    Responsável: {farmer.responsibleName}
                </p>
            )}
            <p className="text-lg font-semibold text-foreground/90 text-left max-w-2xl mt-2">{farmer.bio}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {farmer.products.map(product => (
              <ProductCard key={product.id} product={product} farmerName={farmer.name} responsibleName={farmer.responsibleName} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
