

import BackButton from "@/components/back-button";
import ProductBrowser from "@/components/product-browser";

export default function CatalogPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center mb-4">
            <BackButton />
        </div>
         <div className="mb-6">
            <h1 className="text-3xl font-bold font-headline text-primary tracking-tight sm:text-4xl">
                Catálogo de Produtos
            </h1>
            <p className="mt-2 text-base font-semibold text-foreground/90 max-w-3xl">Explore todos os alimentos frescos e orgânicos disponíveis em nossa rede de agricultores.</p>
        </div>
        <ProductBrowser />
    </div>
  )
  
}
