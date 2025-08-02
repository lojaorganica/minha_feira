"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/types";
import ProductCard from "./product-card";
import VegetableIcon from "./icons/vegetable-icon";
import FruitIcon from "./icons/fruit-icon";
import DairyIcon from "./icons/dairy-icon";
import BakeryIcon from "./icons/bakery-icon";

interface ProductBrowserProps {
  products: Product[];
}

type Category = "Todos" | "Vegetal" | "Fruta" | "Laticínio" | "Padaria";

const categoryIcons: Record<Category, React.ComponentType<{ className?: string }>> = {
  Todos: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.88.99 6.6 2.6l-2.6 2.6"/><path d="M21 12a9 9 0 0 0-9-9"/></svg>
  ),
  Vegetal: VegetableIcon,
  Fruta: FruitIcon,
  Laticínio: DairyIcon,
  Padaria: BakeryIcon,
};


export default function ProductBrowser({ products }: ProductBrowserProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>("Todos");

  const filteredProducts = products.filter(
    (product) =>
      selectedCategory === "Todos" || product.category === selectedCategory
  );

  const categories: Category[] = ["Todos", "Vegetal", "Fruta", "Laticínio", "Padaria"];

  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <div className="flex flex-col items-center gap-4 mb-8">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl text-primary">
            Nossos Produtos
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((category) => {
                const Icon = categoryIcons[category];
                return (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="gap-2"
              >
                <Icon className="h-5 w-5"/>
                {category}
              </Button>
            )}
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
