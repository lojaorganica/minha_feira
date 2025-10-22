
import BackButton from "@/components/back-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function GotaNftPage() {
    return (
        <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8 max-w-3xl">
            <div className="mb-4">
                <BackButton />
            </div>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold font-headline text-primary tracking-tight sm:text-4xl">
                        Resgate sua Gota/NFT
                    </CardTitle>
                    <CardDescription className="mt-2 text-lg font-semibold text-foreground/90 max-w-2xl mx-auto">
                        Siga os passos abaixo para adicionar esta Gota exclusiva à sua coleção digital.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-8">
                    <div className="relative aspect-square w-full max-w-md rounded-lg overflow-hidden shadow-lg">
                        <Image
                            src="https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/batatman_nft.webp?alt=media&token=e9d3d3b7-73d8-4f24-9b2f-2d6d03d3c8c6"
                            alt="Gota NFT Batatman"
                            fill
                            className="object-cover"
                            data-ai-hint="superhero potato"
                        />
                    </div>
                    <div className="space-y-4 text-lg font-semibold text-foreground/80 text-left">
                        <p><strong>Passo 1:</strong> Certifique-se de que você tem uma carteira digital (wallet) compatível com a rede Polygon.</p>
                        <p><strong>Passo 2:</strong> Clique no botão "Resgatar Agora" (funcionalidade em desenvolvimento).</p>
                        <p><strong>Passo 3:</strong> Siga as instruções na sua carteira para confirmar a transação (haverá uma pequena taxa de rede, conhecida como "gas").</p>
                        <p><strong>Passo 4:</strong> Pronto! A Gota/NFT será sua e aparecerá na sua coleção em instantes.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
