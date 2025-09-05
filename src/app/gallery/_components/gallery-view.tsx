
'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getGalleryItems } from '@/lib/gallery-data';
import type { GalleryItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import { Download, Share2, Loader2, PlayCircle, X } from 'lucide-react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

function GalleryViewContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const initialFair = searchParams.get('feira') || 'Todas';
    const initialTheme = searchParams.get('tema') || 'Todos';

    const [selectedFair, setSelectedFair] = useState(initialFair);
    const [selectedTheme, setSelectedTheme] = useState(initialTheme);
    const [videoToPlay, setVideoToPlay] = useState<GalleryItem | null>(null);

    const allItems = useMemo(() => getGalleryItems(), []);

    const filteredItems = useMemo(() => {
        return allItems.filter(item => {
            const fairMatch = selectedFair === 'Todas' || item.fair.includes(selectedFair as any);
            const themeMatch = selectedTheme === 'Todos' || item.theme.includes(selectedTheme as any);
            return fairMatch && themeMatch;
        });
    }, [allItems, selectedFair, selectedTheme]);

    const handleFilterChange = (type: 'fair' | 'theme', value: string) => {
        const currentParams = new URLSearchParams(searchParams.toString());
        
        if (type === 'fair') {
            setSelectedFair(value);
            if (value === 'Todas') currentParams.delete('feira');
            else currentParams.set('feira', value);
        }
        if (type === 'theme') {
            setSelectedTheme(value);
            if (value === 'Todos') currentParams.delete('tema');
            else currentParams.set('tema', value);
        }

        router.push(`/gallery?${currentParams.toString()}`, { scroll: false });
    };

    const formatFairName = (fairName: string) => {
        if (fairName === 'Todas') {
            return 'Todas as Feiras Orgânicas';
        }
        if (fairName.includes(' e ')) {
            return `Feiras Orgânicas de ${fairName}`;
        }
        const doExceptions = ['Leme', 'Grajaú', 'Flamengo'];
        if (doExceptions.includes(fairName)) {
            return `Feira Orgânica do ${fairName}`;
        }
        return `Feira Orgânica de ${fairName}`;
    };

    return (
        <>
            <div className="sticky top-16 z-10 py-4 mb-6 bg-background/90 backdrop-blur-sm -mx-4 px-4 border-b">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Select value={selectedFair} onValueChange={(value) => handleFilterChange('fair', value)}>
                            <SelectTrigger className="w-full sm:w-[250px] text-lg">
                                <SelectValue placeholder="Filtrar por Feira" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel className="text-base">Feiras</SelectLabel>
                                    <SelectItem value="Todas" className="text-base">Todas as Feiras</SelectItem>
                                    <SelectItem value="Flamengo e Laranjeiras" className="text-base">Flamengo e Laranjeiras</SelectItem>
                                    <SelectItem value="Grajaú" className="text-base">Grajaú</SelectItem>
                                    <SelectItem value="Tijuca" className="text-base">Tijuca</SelectItem>
                                    <SelectItem value="Botafogo" className="text-base">Botafogo</SelectItem>
                                    <SelectItem value="Leme" className="text-base">Leme</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        
                        <Select value={selectedTheme} onValueChange={(value) => handleFilterChange('theme', value)}>
                            <SelectTrigger className="w-full sm:w-[250px] text-lg">
                                <SelectValue placeholder="Filtrar por Tema" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel className="text-base">Temas</SelectLabel>
                                    <SelectItem value="Todos" className="text-base">Todos os Temas</SelectItem>
                                    <SelectItem value="Fotografias" className="text-base">Fotografias</SelectItem>
                                    <SelectItem value="Agricultores - Animações e Cartoon" className="text-base">Agricultores - Animações e Cartoon</SelectItem>
                                    <SelectItem value="Alimentos - Animações e Cartoon" className="text-base">Alimentos - Animações e Cartoon</SelectItem>
                                    <SelectItem value="Personagens - Animações e Cartoon" className="text-base">Personagens - Animações e Cartoon</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
            
            <div className="flex-grow">
                {filteredItems.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredItems.map(item => (
                            <Card key={item.id} className="overflow-hidden flex flex-col group">
                                <CardContent className="p-0">
                                    <div 
                                        className="relative w-full cursor-pointer bg-muted"
                                        onClick={() => item.type === 'video' && setVideoToPlay(item)}
                                    >
                                        {item.type === 'image' ? (
                                            <Image
                                                src={item.url}
                                                alt={item.title}
                                                width={300}
                                                height={300}
                                                className="object-contain w-full h-auto"
                                                data-ai-hint={item.dataAiHint}
                                            />
                                        ) : (
                                            <>
                                                <video src={item.url} className="w-full h-full object-contain" preload="metadata" />
                                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <PlayCircle className="h-16 w-16 text-white/80" />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </CardContent>
                                <div className="p-2 space-y-1">
                                    <div className="flex flex-wrap gap-1">
                                        {item.fair.map(f => <Badge key={f} variant="secondary" className="text-xs px-1.5 py-0.5">{formatFairName(f)}</Badge>)}
                                    </div>
                                     <div className="flex flex-wrap gap-1">
                                        {item.theme.map(t => <Badge key={t} variant="outline" className="border-transparent text-accent text-[9px] px-1 py-0">{t}</Badge>)}
                                    </div>
                                </div>
                                <CardFooter className="p-2 bg-muted/50 mt-auto">
                                    <div className="grid grid-cols-2 w-full gap-2">
                                        <Button variant="outline" size="sm" className="h-8 text-xs">
                                            <Download className="mr-2 h-4 w-4" />
                                            Baixar
                                        </Button>
                                        <Button size="sm" className="h-8 text-xs">
                                            <Share2 className="mr-2 h-4 w-4" />
                                            Compartilhar
                                        </Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <h2 className="mt-4 text-2xl font-semibold">Nenhuma propaganda encontrada</h2>
                        <p className="text-lg font-semibold text-foreground/90 mt-2">Tente ajustar seus filtros para encontrar outros resultados.</p>
                    </div>
                )}
            </div>

            <Dialog open={!!videoToPlay} onOpenChange={(isOpen) => !isOpen && setVideoToPlay(null)}>
                <DialogContent className="max-w-3xl p-0 border-0">
                    {videoToPlay && (
                         <div className="relative aspect-video">
                            <video src={videoToPlay.url} className="w-full h-full" controls autoPlay preload="auto">
                                Seu navegador não suporta a tag de vídeo.
                            </video>
                         </div>
                    )}
                </DialogContent>
            </Dialog>

        </>
    );
}


export default function GalleryView() {
    return (
        <Suspense fallback={<div className="flex justify-center items-center h-64"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>}>
            <GalleryViewContent />
        </Suspense>
    );
}
