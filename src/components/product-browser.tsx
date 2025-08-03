"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { FarmerWithProducts } from "@/lib/types";
import ProductCard from "./product-card";
import { useUser } from "@/hooks/use-user";
import { getFarmersWithProducts } from "@/lib/data";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function ProductBrowser() {
  const { user, isUserLoaded } = useUser();
  const searchParams = useSearchParams();
  const farmerIdParam = searchParams.get('farmerId');

  if (!isUserLoaded) {
    return (
      <section className="py-12 md:py-16">
        <div className="container flex justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  // Se um ID de agricultor específico for passado, mostre apenas os produtos dele
  if (farmerIdParam) {
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
            {singleFarmerWithProducts.map((farmer) => (
                <section key={farmer.id}>
                    <div className="flex flex-col items-center gap-2 mb-8">
                        <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl text-primary">
                        {farmer.name}
                        </h2>
                        <p className="text-lg font-semibold text-foreground/90 text-center max-w-2xl">{farmer.bio}</p>
                    </div>
                     <div className="mb-8 text-center">
                        <Button asChild>
                            <Link href="/select-farmers">Voltar para a seleção de agricultores</Link>
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {farmer.products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>
            ))}
        </div>
     )
  }

  // Comportamento padrão: mostrar produtos dos agricultores favoritos do usuário
  if (!user || user.favoriteFarmerIds.length === 0) {
    return (
      <section className="py-12 md:py-16">
        <div className="container text-center">
          <h2 className="font-headline text-2xl font-bold text-primary">
            Bem-vindo(a)!
          </h2>
          <p className="mt-2 text-lg font-semibold text-foreground/90">
            Parece que você ainda não segue nenhum agricultor.
          </p>
          <p className="mt-1 text-lg font-semibold text-foreground/90">
            Escolha seus agricultores favoritos para começar a comprar.
          </p>
          <Button asChild className="mt-4 text-base font-semibold">
            <Link href="/select-farmers">Escolher Agricultores</Link>
          </Button>
        </div>
      </section>
    );
  }

  const favoriteFarmersWithProducts: FarmerWithProducts[] = getFarmersWithProducts(user.favoriteFarmerIds);

  return (
    <div className="container py-12 md:py-16">
      {favoriteFarmersWithProducts.map((farmer) => (
        <section key={farmer.id} className="mb-16">
          <div className="flex flex-col items-center gap-2 mb-8">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl text-primary">
              {farmer.name}
            </h2>
             <p className="text-lg font-semibold text-foreground/90 text-center max-w-2xl">{farmer.bio}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {farmer.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
