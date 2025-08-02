import { getProducts } from '@/lib/data';
import ProductBrowser from '@/components/product-browser';
import { Card, CardContent } from '@/components/ui/card';
import Logo from '@/components/logo';

export default function Home() {
  const products = getProducts();
  return (
    <div className="flex flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/10">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex justify-center">
              <div className="bg-background/80 rounded-full p-8 shadow-lg w-64 h-64 flex items-center justify-center">
                <Logo size="large" />
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
              <div className="space-y-2">
                <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-primary">
                  Bem-vindo ao Mercado Verdante
                </h1>
                <p className="max-w-[600px] text-foreground/80 md:text-xl mx-auto lg:mx-0">
                  Produtos frescos e orgânicos, entregues de fazendas locais diretamente para sua mesa. Experimente o sabor da natureza.
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
            <h3 className="font-semibold font-headline text-primary">Mercado Verdante</h3>
            <p className="text-muted-foreground">© 2024 Mercado Verdante Inc.</p>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold font-headline text-primary">Legal</h3>
            <a href="#" className="text-muted-foreground hover:text-foreground">Termos de Serviço</a>
            <a href="#" className="text-muted-foreground hover:text-foreground">Política de Privacidade</a>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold font-headline text-primary">Suporte</h3>
            <a href="#" className="text-muted-foreground hover:text-foreground">Fale Conosco</a>
            <a href="#" className="text-muted-foreground hover:text-foreground">FAQ</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
