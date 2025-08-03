
'use client';

import { Suspense } from 'react';
import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import type { FarmerWithProducts } from "@/lib/types";
import ProductCard from "@/components/product-card";
import { getFarmersWithProducts } from "@/lib/data";
import { Loader2 } from "lucide-react";
import BackButton from '@/components/back-button';

function ProductsContent() {
  const searchParams = useSearchParams();
  const farmerIdParam = searchParams.get('farmerId');

  if (!farmerIdParam) {
    return (
      <section className="py-12 md:py-16">
        <div className="container text-center">
            <h2 className="font-headline text-2xl font-bold text-primary">Nenhum agricultor especificado</h2>
            <p className="mt-2 text-lg font-semibold text-foreground/90">
                Por favor, selecione um agricultor para ver seus produtos.
            </p>
            <Button asChild className="mt-4 text-base font-semibold">
                <Link href="/select-farmers">Voltar para a seleção</Link>
            </Button>
        </div>
      </section>
    );
  }

  const singleFarmerWithProducts: FarmerWithProducts[] = getFarmersWithProducts([farmerIdParam]);

  if (singleFarmerWithProducts.length === 0) {
     return (
          <section className="py-12 md:py-16">
             <div className="container text-center">
                 <h2 className="font-headline text-2xl font-bold text-primary">Agricultor não encontrado</h2>
                 <p className="mt-2 text-lg font-semibold text-foreground/90">
                     Não foi possível encontrar produtos para este agricultor.
                 </p>
                 <Button asChild className="mt-4 text-base font-semibold">
                     <Link href="/select-farmers">Ver todos os agricultores</Link>
                 </Button>
             </div>
         </section>
     )
  }

  return (
     <div className="container py-12 md:py-16">
        <div className="mb-8">
            <BackButton />
        </div>
         {singleFarmerWithProducts.map((farmer) => (
             <section key={farmer.id}>
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

export default function ProductsPage() {
    return (
        <Suspense fallback={
            <div className="flex justify-center items-center p-12">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        }>
            <ProductsContent />
        </Suspense>
    )
}
