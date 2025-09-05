
'use client';

import { useState, useMemo, Suspense, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getGalleryItems } from '@/lib/gallery-data';
import type { GalleryItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import { Download, Share2, Loader2, PlayCircle, X } from 'lucide-react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
    const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

    useEffect(() => {
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (!isTouchDevice) {
            document.body.classList.add('desktop-device');
        }
        return () => {
            document.body.classList.remove('desktop-device');
        };
    }, []);

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

    const formatFairName = (fairName: string): string => {
        if (fairName === 'Todas') {
            return 'Todas as Feiras Orgânicas';
        }
        const doExceptions = ['Leme', 'Grajaú', 'Flamengo'];
        if (doExceptions.includes(fairName)) {
            return `Feira Orgânica do ${fairName}`;
        }
        return `Feira Orgânica de ${fairName}`;
    };

    return (
        <>
            <div className="sticky top-16 z-40 bg-background/95 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                     <Select value={selectedFair} onValueChange={(value) => handleFilterChange('fair', value)}>
                        <SelectTrigger className="w-full text-lg bg-accent text-accent-foreground hover:bg-accent/90 focus:ring-0 focus:ring-offset-0">
                            <SelectValue placeholder="Filtrar por Feira" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
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
                        <SelectTrigger className="w-full text-lg bg-accent text-accent-foreground hover:bg-accent/90 focus:ring-0 focus:ring-offset-0">
                            <SelectValue placeholder="Filtrar por Tema" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectGroup>
                                <SelectItem value="Todos">Todos os Temas</SelectItem>
                                <SelectItem value="Fotografias">Fotografias</SelectItem>
                                <SelectItem value="Agricultores - Animações e Cartoon">Agricultores - Animações e Cartoon</SelectItem>
                                <SelectItem value="Alimentos - Animações e Cartoon">Alimentos - Animações e Cartoon</SelectItem>
                                <SelectItem value="Personagens - Animações e Cartoon">Personagens - Animações e Cartoon</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            
            <div className="flex-grow pt-6">
                {filteredItems.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredItems.map(item => (
                            <Card key={item.id} className="overflow-hidden flex flex-col group">
                                <CardContent className="p-0">
                                    <div 
                                        className="relative w-full cursor-pointer bg-muted"
                                        onClick={() => {
                                            if (item.type === 'video') setVideoToPlay(item);
                                            if (item.type === 'image') setSelectedImage(item);
                                        }}
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
                                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 desktop-device:group-hover:opacity-100 transition-opacity duration-300">
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
                                    <div className="flex w-full gap-2">
                                        <Button variant="outline" size="sm" className="h-8 text-xs flex-1">
                                            <Download className="mr-2 h-4 w-4" />
                                            Baixar
                                        </Button>
                                        <Button size="sm" className="h-8 text-xs flex-1">
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
                         <div className="relative aspect-video bg-black/80">
                            <video src={videoToPlay.url} className="w-full h-full" controls autoPlay preload="auto">
                                Seu navegador não suporta a tag de vídeo.
                            </video>
                         </div>
                    )}
                </DialogContent>
            </Dialog>

            <Dialog open={!!selectedImage} onOpenChange={(isOpen) => !isOpen && setSelectedImage(null)}>
                <DialogContent className="p-0 border-0 max-w-4xl w-full">
                    {selectedImage && (
                        <div className="relative w-full h-auto">
                            <Image
                                src={selectedImage.url}
                                alt={selectedImage.title}
                                width={1024}
                                height={1024}
                                className="object-contain w-full h-auto max-h-[90vh] rounded-lg"
                                data-ai-hint={selectedImage.dataAiHint}
                            />
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
