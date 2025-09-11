"use client";

import { useMemo, useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getFarmers, getProducts } from "@/lib/data";
import type { FarmerWithProducts, Farmer } from "@/lib/types";
import { useSearch } from "@/hooks/use-search";
import ProductCard from "./product-card";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Search, Loader2 } from "lucide-react";

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}


function FarmerFilter({
  farmers,
  selectedFarmerId,
  onSelectFarmer,
  searchTerm,
  onSearchChange,
}: {
  farmers: Farmer[];
  selectedFarmerId: string | null;
  onSelectFarmer: (id: string | null) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}) {
  return (
    <div className="mb-8">
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

function ProductBrowserContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { searchTerm, setSearchTerm } = useSearch();
  
  const selectedFarmerId = searchParams.get('farmerId');
  const filterRef = useRef<HTMLDivElement>(null);
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  
  useEffect(() => {
    // Se um ID de agricultor estiver na URL, limpe qualquer termo de busca.
    if (searchParams.get('farmerId')) {
      setSearchTerm('');
    }
  }, [searchParams, setSearchTerm]);

  const handleSelectFarmer = (farmerId: string | null) => {
    // Sempre limpa a busca ao selecionar um novo agricultor ou "Todos"
    setSearchTerm('');
    
    const currentParams = new URLSearchParams(searchParams.toString());
    if (farmerId) {
      currentParams.set('farmerId', farmerId);
    } else {
      currentParams.delete('farmerId');
    }
    router.push(`/catalog?${currentParams.toString()}`, { scroll: false });
  };
  
  useEffect(() => {
    if (filterRef.current && (debouncedSearchTerm || selectedFarmerId)) {
        setTimeout(() => {
            if(filterRef.current) {
              const topPos = filterRef.current.getBoundingClientRect().top + window.scrollY - 100;
              window.scrollTo({
                top: topPos,
                behavior: 'smooth'
              });
            }
        }, 100);
    }
  }, [debouncedSearchTerm, selectedFarmerId]);

  const allFarmers = useMemo(() => getFarmers(), []);
  const allProducts = useMemo(() => getProducts({ includePaused: false }), []);

  const filteredProductsByFarmer: FarmerWithProducts[] = useMemo(() => {
    const farmersWithProducts = allFarmers.map(farmer => ({
      ...farmer,
      products: allProducts.filter(p => p.farmerId === farmer.id),
    }));

    let farmers = farmersWithProducts;

    if (selectedFarmerId) {
      farmers = farmers.filter(farmer => farmer.id === selectedFarmerId);
    }

    if (!debouncedSearchTerm) {
      return farmers.filter(farmer => farmer.products.length > 0);
    }

    return farmers
      .map(farmer => {
        const filteredProducts = farmer.products.filter(product =>
          product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        );
        return { ...farmer, products: filteredProducts };
      })
      .filter(farmer => farmer.products.length > 0);
      
  }, [debouncedSearchTerm, allProducts, allFarmers, selectedFarmerId]);
  
  const hasAnyProducts = useMemo(() => allProducts.length > 0, [allProducts]);

  if (!hasAnyProducts) {
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
    <div ref={filterRef}>
      <FarmerFilter 
        farmers={allFarmers}
        selectedFarmerId={selectedFarmerId}
        onSelectFarmer={handleSelectFarmer}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <div>
        {filteredProductsByFarmer.length > 0 ? (
          filteredProductsByFarmer.map((farmer) => (
            <section key={farmer.id} className="mb-12">
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
                {farmer.products.map((product) => (
                  <ProductCard key={`${farmer.id}-${product.id}`} product={product} farmerName={farmer.name} responsibleName={farmer.responsibleName} />
                ))}
              </div>
            </section>
          ))
        ) : (
          <section className="py-12 md:py-16">
              <div className="container text-center">
                  <h2 className="font-headline text-2xl font-bold text-primary">Nenhum produto encontrado</h2>
                  <p className="mt-2 text-lg font-semibold text-foreground/90">
                      Sua busca por "{searchTerm}" não encontrou resultados{selectedFarmerId ? ` em ${allFarmers.find(f => f.id === selectedFarmerId)?.name}` : ''}.
                  </p>
              </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default function ProductBrowser() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-64"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>}>
      <ProductBrowserContent />
    </Suspense>
  )
}
