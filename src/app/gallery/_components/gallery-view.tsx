
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

    return (
        <div className="flex flex-col h-full">
            <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 border rounded-lg bg-muted/50 flex-shrink-0">
                <Select value={selectedFair} onValueChange={(value) => handleFilterChange('fair', value)}>
                    <SelectTrigger className="w-full sm:w-[250px]">
                        <SelectValue placeholder="Filtrar por Feira" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Feiras</SelectLabel>
                            <SelectItem value="Todas">Todas as Feiras</SelectItem>
                            <SelectItem value="Flamengo e Laranjeiras">Flamengo e Laranjeiras</SelectItem>
                            <SelectItem value="Grajaú">Grajaú</SelectItem>
                            <SelectItem value="Tijuca">Tijuca</SelectItem>
                            <SelectItem value="Botafogo">Botafogo</SelectItem>
                            <SelectItem value="Leme">Leme</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                
                <Select value={selectedTheme} onValueChange={(value) => handleFilterChange('theme', value)}>
                    <SelectTrigger className="w-full sm:w-[250px]">
                        <SelectValue placeholder="Filtrar por Tema" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Temas</SelectLabel>
                            <SelectItem value="Todos">Todos os Temas</SelectItem>
                            <SelectItem value="Fotografias">Fotografias</SelectItem>
                            <SelectItem value="Agricultores - Animações e Cartoon">Agricultores - Animações e Cartoon</SelectItem>
                            <SelectItem value="Alimentos - Animações e Cartoon">Alimentos - Animações e Cartoon</SelectItem>
                            <SelectItem value="Personagens - Animações e Cartoon">Personagens - Animações e Cartoon</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            
            <div className="flex-grow overflow-y-auto">
                {filteredItems.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredItems.map(item => (
                            <Card key={item.id} className="overflow-hidden flex flex-col group">
                                <CardContent className="p-0">
                                    <div 
                                        className="relative aspect-square w-full cursor-pointer bg-muted"
                                        onClick={() => item.type === 'video' && setVideoToPlay(item)}
                                    >
                                        {item.type === 'image' ? (
                                            <Image
                                                src={item.url}
                                                alt={item.title}
                                                fill
                                                className="object-contain transition-transform duration-300 group-hover:scale-105"
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
                                <div className="p-4 flex-grow flex flex-col">
                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {item.fair.map(f => <Badge key={f} variant="secondary">{f}</Badge>)}
                                        {item.theme.map(t => <Badge key={t} variant="outline" className="border-accent text-accent">{t}</Badge>)}
                                    </div>
                                </div>
                                <CardFooter className="p-2 bg-muted/50 mt-auto">
                                    <div className="flex w-full gap-2">
                                        <Button variant="outline" className="w-full">
                                            <Download className="mr-2 h-4 w-4" />
                                            Baixar
                                        </Button>
                                        <Button className="w-full">
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

        </div>
    );
}


export default function GalleryView() {
    return (
        <Suspense fallback={<div className="flex justify-center items-center h-64"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>}>
            <GalleryViewContent />
        </Suspense>
    );
}
