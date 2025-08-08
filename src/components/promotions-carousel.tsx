
'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Autoplay from "embla-carousel-autoplay"
import { getPromotionalProducts } from '@/lib/data';
import type { Product } from '@/lib/types';
import { Card, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Tractor } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

export default function PromotionsCarousel() {
    const [promotions, setPromotions] = useState<(Product & { farmerName: string })[]>([]);
    const plugin = useRef(
      Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })
    )

    useEffect(() => {
        setPromotions(getPromotionalProducts());
    }, []);

    if (promotions.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-lg font-semibold text-muted-foreground">Nenhuma promoção ativa no momento.</p>
            </div>
        );
    }

    return (
        <div className="w-full">
                <Carousel
                    plugins={[plugin.current]}
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto"
                >
                    <CarouselContent className="-ml-4">
                        {promotions.map((product) => (
                            <CarouselItem key={product.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                                <div className="p-1 h-full">
                                    <Card className="overflow-hidden h-full flex flex-col">
                                        <div className="relative aspect-video">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-cover"
                                                data-ai-hint={product.dataAiHint}
                                            />
                                        </div>
                                        <CardContent className="p-4 flex-grow">
                                            <CardTitle className="font-headline text-primary">{product.name}</CardTitle>
                                            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground font-semibold">
                                                <Tractor className="h-4 w-4 text-primary" />
                                                <span>{product.farmerName}</span>
                                            </div>
                                            <p className="text-lg font-bold text-primary mt-2">
                                                R${product.price.toFixed(2).replace('.', ',')}
                                                <span className="text-base font-medium text-foreground/80 ml-1">/ {product.unit}</span>
                                            </p>
                                        </CardContent>
                                        <CardFooter className="p-4">
                                             <Button asChild className="w-full">
                                                <Link href={`/products?farmerId=${product.farmerId}`}>Ver produto</Link>
                                             </Button>
                                        </CardFooter>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-[-50px] top-1/2 -translate-y-1/2 hidden h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground transition-opacity hover:bg-accent/90 disabled:opacity-50 sm:flex" />
                    <CarouselNext className="absolute right-[-50px] top-1/2 -translate-y-1/2 hidden h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground transition-opacity hover:bg-accent/90 disabled:opacity-50 sm:flex" />
                </Carousel>
        </div>
    );
}
