
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { FarmerWithProducts, Product } from "@/lib/types";
import ProductCard from "./product-card";
import { useUser } from "@/hooks/use-user";
import { getFarmersWithProducts } from "@/lib/data";
import { Loader2 } from "lucide-react";
import { useSearch } from "@/hooks/use-search";
import { useMemo } from "react";

export default function ProductBrowser() {
  const { user, isUserLoaded } = useUser();
  const { searchTerm } = useSearch();

  const favoriteFarmersWithProducts: FarmerWithProducts[] = useMemo(() => {
    if (!user || user.favoriteFarmerIds.length === 0) return [];
    // Pega apenas o primeiro (e único) agricultor selecionado
    return getFarmersWithProducts([user.favoriteFarmerIds[0]]);
  }, [user]);

  const filteredProductsByFarmer: FarmerWithProducts[] = useMemo(() => {
    if (!searchTerm) {
      return favoriteFarmersWithProducts;
    }

    return favoriteFarmersWithProducts
      .map(farmer => {
        const filteredProducts = farmer.products.filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return { ...farmer, products: filteredProducts };
      })
      .filter(farmer => farmer.products.length > 0);
  }, [searchTerm, favoriteFarmersWithProducts]);


  if (!isUserLoaded) {
    return (
      <section className="py-12 md:py-16">
        <div className="container flex justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </section>
    );
  }
  
  if (!user || user.favoriteFarmerIds.length === 0) {
    return (
      <section className="py-12 md:py-16">
        <div className="container text-center">
          <h2 className="font-headline text-2xl font-bold text-primary">
            Bem-vindo(a)!
          </h2>
          <p className="mt-2 text-lg font-semibold text-foreground/90">
            Parece que você ainda não selecionou um agricultor.
          </p>
          <p className="mt-1 text-lg font-semibold text-foreground/90">
            Escolha seu agricultor favorito para começar a comprar.
          </p>
          <Button asChild className="mt-4 text-base font-semibold">
            <Link href="/select-farmers">Escolher Agricultor</Link>
          </Button>
        </div>
      </section>
    );
  }
  
  if (filteredProductsByFarmer.length === 0 && searchTerm) {
     return (
         <section className="py-12 md:py-16">
             <div className="container text-center">
                 <h2 className="font-headline text-2xl font-bold text-primary">Nenhum produto encontrado</h2>
                 <p className="mt-2 text-lg font-semibold text-foreground/90">
                     Não encontramos nenhum produto com o nome "{searchTerm}".
                 </p>
                 <p className="mt-1 text-lg font-semibold text-foreground/90">
                     Tente buscar por outro termo.
                 </p>
             </div>
         </section>
     )
  }

  return (
    <div className="container py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      {filteredProductsByFarmer.map((farmer) => (
        <section key={farmer.id} className="mb-16">
          <div className="flex flex-col items-center gap-2 mb-8">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl text-primary">
              {farmer.name}
            </h2>
             <p className="text-lg font-semibold text-foreground/90 text-center max-w-2xl">{farmer.bio}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {farmer.products.map((product) => (
              <ProductCard key={product.id} product={product} farmerName={farmer.name} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
