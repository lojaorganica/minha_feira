
import Logo from '@/components/logo';
import PromotionsCarousel from '@/components/promotions-carousel';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export default function WelcomePage() {
  return (
    <div className="flex flex-col flex-grow">
      <section className="w-full py-8 md:py-16 lg:py-20 bg-primary/10 flex-grow flex items-center">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <Logo size="large" />
            <div className="space-y-3">
              <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-primary">
                Bem-vindo(a) ao Minha Feira!
              </h1>
               <h2 className="text-xl sm:text-2xl font-headline text-primary/90">
                Circuito Carioca de Feiras Orgânicas
              </h2>
              <Separator className="max-w-md mx-auto bg-primary/20" />
              <p className="max-w-[700px] text-foreground/80 text-base md:text-lg mx-auto font-semibold">
                Minha Feira é seu app de experiência exclusiva para antecipar suas compras de orgânicos diretamente com seus agricultores preferidos de nossas feiras orgânicas. Os pedidos poderão ser entregues nas feiras ou por delivery, basta combinar.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button asChild size="lg">
                    <Link href="/login/customer">Sou Cliente</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                    <Link href="/login/farmer">Sou Agricultor</Link>
                </Button>
            </div>
          </div>
        </div>
      </section>

      <PromotionsCarousel />

      <footer className="bg-muted p-6 md:py-12 w-full mt-auto">
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
