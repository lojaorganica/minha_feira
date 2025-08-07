
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { FarmerWithProducts } from "@/lib/types";
import ProductCard from "./product-card";
import { getFarmersWithProducts } from "@/lib/data";
import { useSearch } from "@/hooks/use-search";
import { useMemo } from "react";

export default function ProductBrowser() {
  const { searchTerm } = useSearch();

  // Modificado para buscar todos os agricultores
  const allFarmersWithProducts: FarmerWithProducts[] = useMemo(() => {
    const allFarmers = getFarmersWithProducts(); // Sem argumento, pega todos
    return allFarmers;
  }, []);

  const filteredProductsByFarmer: FarmerWithProducts[] = useMemo(() => {
    if (!searchTerm) {
      return allFarmersWithProducts;
    }

    return allFarmersWithProducts
      .map(farmer => {
        const filteredProducts = farmer.products.filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return { ...farmer, products: filteredProducts };
      })
      .filter(farmer => farmer.products.length > 0);
  }, [searchTerm, allFarmersWithProducts]);

  if (filteredProductsByFarmer.length === 0) {
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
    <div className="py-6 md:py-8">
      {filteredProductsByFarmer.map((farmer) => (
        <section key={farmer.id} className="mb-12">
          <div className="flex flex-col items-center gap-2 mb-6">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl text-primary">
              {farmer.name}
            </h2>
             <p className="text-lg font-semibold text-foreground/90 text-center max-w-2xl">{farmer.bio}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {farmer.products.map((product) => (
              <ProductCard key={product.id} product={product} farmerName={farmer.name} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
