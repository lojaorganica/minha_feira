

import { Suspense } from 'react';
import BackButton from "@/components/back-button";
import ProductBrowser from "@/components/product-browser";
import { Loader2 } from 'lucide-react';

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
            <p className="mt-2 text-base font-medium text-foreground/90 max-w-3xl">Explore todos os alimentos orgânicos de nossa rede de agricultores e fornecedores. Você também pode filtrar e visualizar os produtos por agricultor ou fornecedor. Lembre-se: suas compras devem ser feitas com apenas um agricultor/fornecedor por vez, pois o pagamento via PIX é individual para cada um.</p>
        </div>
        <Suspense fallback={<div className="flex justify-center items-center h-64"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>}>
          <ProductBrowser />
        </Suspense>
    </div>
  )
  
}
