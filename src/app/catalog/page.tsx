
import BackButton from "@/components/back-button";
import ProductBrowser from "@/components/product-browser";

export default function CatalogPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
            <BackButton />
        </div>
         <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-headline text-primary tracking-tight sm:text-4xl">
                Catálogo de Produtos
            </h1>
            <p className="mt-2 text-lg font-semibold text-foreground/90 max-w-3xl mx-auto">Explore todos os alimentos frescos e orgânicos disponíveis em nossa rede de agricultores.</p>
        </div>
        <ProductBrowser />
    </div>
  )
  
}
