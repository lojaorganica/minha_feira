
'use client';

import { ArrowDown, CheckCircle, Hand, MousePointerClick, ShoppingCart, Tractor } from "lucide-react";
import BackButton from "@/components/back-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

// Componente para um passo do tutorial
const TutorialStep = ({ number, title, description, children }: { number: string, title: string, description: string, children: React.ReactNode }) => (
  <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center gap-8 w-full">
    <div className="flex-1 space-y-4">
      <h2 className="font-headline text-4xl text-primary flex items-center gap-4">
        <span className="flex items-center justify-center h-12 w-12 rounded-full bg-accent text-accent-foreground font-bold text-2xl">{number}</span>
        {title}
      </h2>
      <p className="text-lg text-foreground/80 font-semibold">{description}</p>
    </div>
    <div className="flex-1 w-full flex items-center justify-center p-8 bg-muted rounded-lg shadow-inner">
      {children}
    </div>
  </motion.div>
);

export default function ConhecaPage() {
  return (
    <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-4">
        <BackButton />
      </div>

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-12"
      >
        <motion.header variants={itemVariants} className="text-center space-y-4">
          <h1 className="text-4xl font-bold font-headline text-primary tracking-tight sm:text-5xl">
            Como Usar o App Minha Feira
          </h1>
          <p className="mt-2 text-xl font-semibold text-foreground/90 max-w-3xl mx-auto">
            Comprar seus orgânicos direto do agricultor é simples e rápido. Siga os passos abaixo!
          </p>
           <Image 
              src="https://storage.googleapis.com/production-hostgator-brasil-v1-0-9/639/412639/oDCkRtc7/5d2d5a370e0a4df0a9972323e1f57991" 
              alt="Ilustração de uma cliente recebendo uma cesta de orgânicos"
              width={400} 
              height={300} 
              className="mx-auto rounded-lg"
              data-ai-hint="woman receiving grocery basket" 
            />
        </motion.header>

        <Separator />
        
        <TutorialStep 
          number="1"
          title="Escolha seu Agricultor"
          description="As compras são feitas de um agricultor por vez. Comece selecionando quem vai te fornecer os melhores produtos hoje."
        >
          <div className="relative transform scale-90">
            <Card className="w-80 shadow-lg border-primary ring-2 ring-primary">
              <CardHeader>
                <div className="flex flex-row items-center gap-4">
                  <Image src="https://placehold.co/100x100.png" data-ai-hint="farmer portrait" alt="Fazendas Vale Verde" width={60} height={60} className="rounded-full object-cover" />
                  <div className="flex-1">
                    <CardTitle className="text-2xl">Fazendas Vale Verde</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <Separator />
              <CardFooter className="p-4 bg-muted/50 flex-grow flex items-center justify-start gap-4">
                <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center bg-primary border-primary">
                  <CheckCircle className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-semibold text-base">Selecionado</span>
              </CardFooter>
            </Card>
            <MousePointerClick className="h-10 w-10 text-accent absolute -bottom-4 -right-4 animate-pulse" />
          </div>
        </TutorialStep>
        
        <div className="flex justify-center">
            <ArrowDown className="h-12 w-12 text-primary/30" />
        </div>

        <TutorialStep 
          number="2"
          title="Adicione Produtos ao Carrinho"
          description="Navegue pelos produtos do agricultor escolhido. Defina a quantidade e adicione ao seu carrinho de compras."
        >
           <div className="relative transform scale-90">
             <Card className="w-80 flex flex-col h-full transition-all duration-300 shadow-lg">
                <div className="relative aspect-video rounded-t-lg">
                <Image src="https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/macas_fuji.webp?alt=media&token=d9b195e6-0e42-4976-83fe-fdf87dfafd7c" alt="Maçã Fuji" fill className="object-cover rounded-t-lg" data-ai-hint="fuji apple" />
                </div>
                <CardContent className="p-4 flex-grow">
                <CardTitle className="text-xl font-headline text-primary">Maçã Fuji</CardTitle>
                <CardDescription className="text-base mt-1 font-semibold text-foreground/90 flex-grow">Maçãs Fuji orgânicas, conhecidas por sua doçura e textura crocante.</CardDescription>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex flex-col items-start gap-4">
                    <div className="text-lg font-bold text-primary w-full"><span>R$1.80</span><span className="text-base font-medium text-foreground/80 ml-1">/ unidade</span></div>
                    <Button className="w-full text-base font-semibold bg-accent text-accent-foreground hover:bg-accent/90">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Adicionar
                    </Button>
                </CardFooter>
            </Card>
             <Hand className="h-10 w-10 text-accent absolute -bottom-4 -right-4 animate-bounce" />
           </div>
        </TutorialStep>

         <div className="flex justify-center">
            <ArrowDown className="h-12 w-12 text-primary/30" />
        </div>

        <TutorialStep 
          number="3"
          title="Finalize e Pague com PIX"
          description="No seu carrinho, confira o pedido, escolha entre retirar na feira ou delivery, copie a chave PIX do agricultor e faça o pagamento no app do seu banco."
        >
          <div className="relative transform scale-90">
             <Card className="w-96">
                <CardHeader>
                    <CardTitle className="font-headline">Resumo do pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between font-bold text-xl">
                        <span>Total do pedido</span>
                        <span>R$18,00</span>
                    </div>
                    <Separator />
                    <div className="flex flex-col gap-2 pt-2">
                        <p className="font-bold text-xl text-accent">Chave PIX</p>
                        <div className="flex items-center justify-between gap-2 rounded-md bg-accent/10 px-3 py-2">
                            <span className="font-mono text-base font-semibold text-foreground/80 break-all">fazenda.vale.verde@email.com</span>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                     <p className="text-base text-center text-foreground/80">Efetue o pagamento e depois clique no botão abaixo para anexar o comprovante.</p>
                     <Button variant="outline" className="w-full text-base font-bold" size="lg">Anexar Comprovante</Button>
                </CardFooter>
            </Card>
          </div>
        </TutorialStep>
        
        <Separator />

        <motion.div variants={itemVariants} className="text-center space-y-4 py-8">
            <h2 className="text-3xl font-bold font-headline text-primary">Pronto!</h2>
            <p className="text-xl font-semibold text-foreground/90 max-w-2xl mx-auto">
                Agora é só aguardar a confirmação do agricultor via WhatsApp e combinar os detalhes da entrega ou retirada. Boas compras!
            </p>
            <Button size="lg" asChild>
                <a href="/catalog">Começar a Comprar</a>
            </Button>
        </motion.div>

      </motion.div>
    </div>
  );
}
