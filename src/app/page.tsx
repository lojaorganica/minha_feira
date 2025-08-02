import { getProducts } from '@/lib/data';
import ProductBrowser from '@/components/product-browser';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  const products = getProducts();
  return (
    <div className="flex flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/10">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-1 lg:gap-12 xl:grid-cols-1">
            <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
              <div className="space-y-2">
                <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-primary">
                  Welcome to Verdant Market
                </h1>
                <p className="max-w-[600px] text-foreground/80 md:text-xl mx-auto lg:mx-0">
                  Fresh, organic produce delivered from local farms directly to your table. Experience the taste of nature.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <main className="flex-1">
        <ProductBrowser products={products} />
      </main>

      <footer className="bg-muted p-6 md:py-12 w-full">
        <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
          <div className="grid gap-1">
            <h3 className="font-semibold font-headline text-primary">Verdant Market</h3>
            <p className="text-muted-foreground">© 2024 Verdant Market Inc.</p>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold font-headline text-primary">Legal</h3>
            <a href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</a>
            <a href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</a>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold font-headline text-primary">Support</h3>
            <a href="#" className="text-muted-foreground hover:text-foreground">Contact Us</a>
            <a href="#" className="text-muted-foreground hover:text-foreground">FAQ</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
