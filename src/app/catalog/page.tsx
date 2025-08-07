
import BackButton from "@/components/back-button";
import ProductBrowser from "@/components/product-browser";

export default function CatalogPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
            <BackButton />
        </div>
        <ProductBrowser />
    </div>
  )
  
}
