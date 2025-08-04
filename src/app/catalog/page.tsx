
import BackButton from "@/components/back-button";
import ProductBrowser from "@/components/product-browser";

export default function CatalogPage() {
  return (
    <div>
        <div className="container py-4 flex justify-between items-center">
            <BackButton />
        </div>
        <ProductBrowser />
    </div>
  )
  
}
