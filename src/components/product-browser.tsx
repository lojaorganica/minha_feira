
"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { getFarmersWithProducts, getFarmers } from "@/lib/data";
import type { FarmerWithProducts, Farmer } from "@/lib/types";
import { useSearch } from "@/hooks/use-search";
import ProductCard from "./product-card";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

function FarmerFilter({
  farmers,
  selectedFarmerId,
  onSelectFarmer,
  searchTerm,
  onSearchChange,
  filterRef,
}: {
  farmers: Farmer[];
  selectedFarmerId: string | null;
  onSelectFarmer: (id: string | null) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filterRef: React.RefObject<HTMLDivElement>;
}) {
  return (
    <div className="mb-8" ref={filterRef}>
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-center">
         <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              onClick={() => onSelectFarmer(null)}
              className={cn(
                selectedFarmerId === null
                  ? "bg-accent text-accent-foreground hover:bg-accent/90"
                  : "bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              Todos
            </Button>
            {farmers.map((farmer) => (
              <Button
                key={farmer.id}
                size="sm"
                onClick={() => onSelectFarmer(farmer.id)}
                className={cn(
                  selectedFarmerId === farmer.id
                    ? "bg-accent text-accent-foreground hover:bg-accent/90"
                    : "bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {farmer.name}
              </Button>
            ))}
        </div>
        <div className="relative w-full sm:w-auto sm:flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar alimentos..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}


export default function ProductBrowser() {
  const { searchTerm, setSearchTerm } = useSearch();
  const [selectedFarmerId, setSelectedFarmerId] = useState<string | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Rola para a área de filtro quando uma busca é realizada
    if (searchTerm && filterRef.current) {
        // Usamos um pequeno timeout para garantir que o DOM foi atualizado antes de rolar
        setTimeout(() => {
            if(filterRef.current) {
              filterRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    }
  }, [searchTerm]);

  const allFarmers = useMemo(() => getFarmers(), []);

  const allFarmersWithProducts: FarmerWithProducts[] = useMemo(() => {
    return getFarmersWithProducts();
  }, []);

  const filteredProductsByFarmer: FarmerWithProducts[] = useMemo(() => {
    let farmers = allFarmersWithProducts;

    // 1. Filtrar por agricultor selecionado
    if (selectedFarmerId) {
      farmers = farmers.filter(farmer => farmer.id === selectedFarmerId);
    }

    // 2. Filtrar por termo de busca
    if (!searchTerm) {
      return farmers; // Retorna todos os produtos do(s) agricultor(es) selecionado(s)
    }

    return farmers
      .map(farmer => {
        const filteredProducts = farmer.products.filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) && product.status === 'active'
        );
        return { ...farmer, products: filteredProducts };
      })
      .filter(farmer => farmer.products.length > 0);
      
  }, [searchTerm, allFarmersWithProducts, selectedFarmerId]);

  if (allFarmersWithProducts.length === 0) {
     return (
         <section className="py-12 md:py-16">
             <div className="container text-center">
                 <h2 className="font-headline text-2xl font-bold text-primary">Nenhum produto encontrado</h2>
                 <p className="mt-2 text-lg font-semibold text-foreground/90">
                     Não há produtos disponíveis no momento.
                 </p>
             </div>
         </section>
     )
  }

  return (
    <div>
      <FarmerFilter 
        farmers={allFarmers}
        selectedFarmerId={selectedFarmerId}
        onSelectFarmer={setSelectedFarmerId}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterRef={filterRef}
      />
      {filteredProductsByFarmer.length > 0 ? (
        filteredProductsByFarmer.map((farmer) => (
          <section key={farmer.id} className="mb-12">
            <div className="flex flex-col items-start gap-2 mb-6">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl text-primary">
                {farmer.name}
              </h2>
               <p className="text-lg font-semibold text-foreground/90 text-left max-w-2xl">{farmer.bio}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {farmer.products.map((product) => (
                <ProductCard key={product.id} product={product} farmerName={farmer.name} />
              ))}
            </div>
          </section>
        ))
      ) : (
        <section className="py-12 md:py-16">
             <div className="container text-center">
                 <h2 className="font-headline text-2xl font-bold text-primary">Nenhum produto encontrado</h2>
                 <p className="mt-2 text-lg font-semibold text-foreground/90">
                    Sua busca por "{searchTerm}" não encontrou resultados {selectedFarmerId ? `em ${allFarmers.find(f => f.id === selectedFarmerId)?.name}` : ''}.
                 </p>
             </div>
         </section>
      )}
    </div>
  );
}
