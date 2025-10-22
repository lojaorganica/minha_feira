
'use client';

import BackButton from "@/components/back-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function GotaNftPage() {
    const { toast } = useToast();
    const code = "CENOURAORGANICA";

    const handleCopyCode = () => {
        navigator.clipboard.writeText(code);
        toast({
            title: "Código Copiado!",
            description: "O código de resgate foi copiado para a área de transferência.",
        });
    };

    return (
        <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8 max-w-3xl">
            <div className="mb-4">
                <BackButton />
            </div>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold font-headline text-primary tracking-tight sm:text-4xl">
                        Resgate sua Gota | NFT EXCLUSIVA!
                    </CardTitle>
                    <CardDescription className="mt-2 text-base font-semibold text-foreground/90 max-w-2xl mx-auto">
                        Parabéns! Você encontrou uma Gota colecionável. Esse NFT é um ativo digital raro, que pode agregar valor com o tempo e traz, em sua área de benefícios, um desconto especial para a compra de mel orgânico em uma de nossas feiras orgânicas. Siga os passos abaixo para resgatar seu NFT exclusivo.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-8">
                    <div className="relative aspect-square w-full max-w-md rounded-lg overflow-hidden shadow-lg bg-black">
                        <video
                            src="https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2FNFT%2001_Cenoura_Organica_Apaixonada.mp4?alt=media&token=633789db-deef-4720-b1ec-fb2e2a01e807"
                            className="object-contain w-full h-full"
                            controls
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                    </div>
                    <div className="space-y-6 text-lg font-semibold text-foreground/80 text-left w-full">
                        <h3 className="font-headline text-2xl text-primary">Como Resgatar:</h3>
                        <ol className="list-decimal list-inside space-y-3">
                            <li>Acesse o site <a href="https://gotas.social" target="_blank" rel="noopener noreferrer" className="font-bold text-accent underline">gotas.social</a>.</li>
                            <li>Faça seu cadastro/login com seu e-mail do Google, Apple ou carteira Metamask.</li>
                            <li>Insira o código abaixo para validar o resgate de sua gotinha (NFT) da Cenoura Orgânica Apaixonada:</li>
                        </ol>
                        
                        <div 
                            className="w-full border-2 border-dashed border-accent p-4 rounded-lg flex items-center justify-between cursor-pointer hover:bg-accent/10 transition-colors"
                            onClick={handleCopyCode}
                        >
                            <span className="font-mono font-bold text-2xl text-accent tracking-widest">{code}</span>
                            <Copy className="h-6 w-6 text-accent" />
                        </div>
                        <p className="text-center text-sm text-muted-foreground -mt-2">Clique para copiar o código</p>

                    </div>
                </CardContent>
                <CardFooter>
                    <Button asChild size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                        <Link href="https://gotas.social" target="_blank" rel="noopener noreferrer">
                           Ir para Gotas.social agora
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
