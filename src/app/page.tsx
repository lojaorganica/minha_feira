import ProductBrowser from '@/components/product-browser';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/10">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex justify-center">
                <Logo size="large" />
            </div>
            <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
              <div className="space-y-2">
                <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl text-primary">
                  Bem-vindo(a) ao <span className="whitespace-nowrap">Minha Feira</span>, do Circuito Carioca de Feiras Orgânicas
                </h1>
                <p className="max-w-[600px] text-foreground/80 text-base md:text-xl mx-auto lg:mx-0 font-semibold">
                  Produtos frescos e orgânicos, entregues de fazendas locais diretamente para sua mesa. Experimente o sabor da natureza.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                  <Button asChild size="lg">
                      <Link href="/login/customer">Sou Cliente</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                      <Link href="/login/farmer">Sou Agricultor</Link>
                  </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <main className="flex-1">
        <ProductBrowser />
      </main>

      <footer className="bg-muted p-6 md:py-12 w-full">
        <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-base">
          <div className="grid gap-1">
            <h3 className="font-semibold font-headline text-primary">Feiras Orgânicas</h3>
            <p className="text-muted-foreground font-semibold">© 2024 Feiras Orgânicas Inc.</p>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold font-headline text-primary">Legal</h3>
            <a href="#" className="text-muted-foreground hover:text-foreground font-semibold">Termos de Serviço</a>
            <a href="#" className="text-muted-foreground hover:text-foreground font-semibold">Política de Privacidade</a>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold font-headline text-primary">Suporte</h3>
            <a href="#" className="text-muted-foreground hover:text-foreground font-semibold">Fale Conosco</a>
            <a href="#" className="text-muted-foreground hover:text-foreground font-semibold">FAQ</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
