
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Link from 'next/link';

export default function WelcomePage() {
  const backgroundImageUrl = "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/background_capa_02.webp?alt=media&token=49a9d645-6b3f-4308-a963-8018442aeb89";

  return (
    <div className="flex flex-col flex-grow">
      <section className="relative w-full py-8 md:py-16 lg:py-20 flex-grow flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
            <Image 
                src={backgroundImageUrl}
                alt="Fundo de uma feira orgânica"
                fill
                className="object-cover opacity-20"
                data-ai-hint="organic farm"
                priority
            />
            <div className="absolute inset-0 bg-background/40" />
        </div>
        
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <Logo size="large" />
            <div className="space-y-3">
              <h1 className="font-headline text-2xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-primary">
                Bem-vindo(a) ao Minha Feira!
              </h1>
               <h2 className="text-xl sm:text-2xl font-headline text-primary/90">
                Seu App de conexão direta com os agricultores e fornecedores do Circuito Carioca de Feiras Orgânicas.
              </h2>
              <Separator className="max-w-md mx-auto bg-primary/20" />
              <p className="max-w-[700px] text-foreground/80 text-base md:text-lg mx-auto font-semibold">
                Garanta a reserva de seus alimentos orgânicos mais frescos, com a compra antecipada e direta, junto aos seus agricultores e fornecedores favoritos. Depois é só pegar na feira escolhida ou solicitar delivery.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button asChild size="lg">
                    <Link href="/login/customer">Sou Cliente</Link>
                </Button>
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link href="/login/farmer">Sou Agricultor</Link>
                </Button>
            </div>
          </div>
        </div>
      </section>
      
      <footer className="bg-muted p-6 md:py-12 w-full mt-auto">
        <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-base">
          <div className="grid gap-1">
            <h3 className="font-semibold font-headline text-primary">Minha Feira</h3>
            <p className="text-muted-foreground font-semibold">© 2025 Minha Feira Inc.</p>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold font-headline text-primary">Navegue</h3>
             <Link href="/conheca" className="text-muted-foreground hover:text-foreground font-semibold">Conheça o App</Link>
            <Link href="/faq" className="text-muted-foreground hover:text-foreground font-semibold">FAQ</Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold font-headline text-primary">Legal</h3>
            <Link href="/terms" className="text-muted-foreground hover:text-foreground font-semibold">Termos de Serviço</Link>
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground font-semibold">Política de Privacidade</Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold font-headline text-primary">Suporte</h3>
            <Link href="https://www.facebook.com/feirasorganicas/" className="text-muted-foreground hover:text-foreground font-semibold">Fale Conosco</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
