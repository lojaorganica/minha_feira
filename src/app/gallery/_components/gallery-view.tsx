

'use client';

import { useState, useMemo, Suspense, useEffect, useRef, useTransition } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getGalleryItems } from '@/lib/gallery-data';
import type { GalleryItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import { Download, Share2, Loader2, PlayCircle, X, Heart, Archive } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useGalleryFavorites } from '@/hooks/use-gallery-favorites';
import BackButton from '@/components/back-button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


function GalleryItemCard({ item, onShare, onPlayVideo, onSelectImage, isCurrentlyFavorite, onToggleFavorite }: { item: GalleryItem; onShare: (item: GalleryItem) => void; onPlayVideo: (item: GalleryItem) => void; onSelectImage: (item: GalleryItem) => void; isCurrentlyFavorite: boolean; onToggleFavorite: (item: GalleryItem) => void; }) {
    const touchStartPos = useRef({ x: 0, y: 0 });
    const isDragging = useRef(false);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        isDragging.current = false;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (isDragging.current) return;
        const touchCurrentPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        const deltaX = Math.abs(touchCurrentPos.x - touchStartPos.current.x);
        const deltaY = Math.abs(touchCurrentPos.y - touchStartPos.current.y);
        
        if (deltaX > 10 || deltaY > 10) {
            isDragging.current = true;
        }
    };
    
    const handleToggleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation();
        onToggleFavorite(item);
    };

    const handleActionClick = (action: () => void) => {
        if (!isDragging.current) {
            action();
        }
    };
    
    const handleDivClick = () => {
        handleActionClick(() => onSelectImage(item));
    }


    const handleDownload = (e: React.MouseEvent, url: string, title: string) => {
        e.stopPropagation();
        window.open(url, '_blank');
    };

    const formatFairName = (fairName: string): string => {
        if (fairName === 'Todas') {
            return 'Todas as Feiras';
        }
        if (fairName === 'Flamengo e Laranjeiras') {
            return 'Feiras Orgânicas do Flamengo e Laranjeiras';
        }
        const doExceptions = ['Leme', 'Grajaú', 'Flamengo'];
        if (doExceptions.includes(fairName)) {
            return `Feira Orgânica do ${fairName}`;
        }
        return `Feira Orgânica de ${fairName}`;
    };

    const { firstWord, rest } = useMemo(() => {
        const parts = item.theme[0]?.split(' - ') || [item.title];
        return { firstWord: parts[0], rest: parts.slice(1).join(' - ') };
    }, [item.theme, item.title]);
    
    return (
        <Card className="overflow-hidden flex flex-col">
            <CardContent className="p-0">
                <div 
                    className="relative w-full"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                >
                    {item.type === 'image' ? (
                        <>
                            <Image
                                src={item.url}
                                alt={item.title}
                                width={300}
                                height={300}
                                className="object-contain w-full h-auto"
                                data-ai-hint={item.dataAiHint}
                                loading="lazy"
                            />
                             <div 
                                className="absolute inset-0 cursor-pointer"
                                onClick={handleDivClick}
                            />
                        </>
                    ) : (
                         <div 
                            className="relative cursor-pointer" 
                            onClick={() => handleActionClick(() => onPlayVideo(item))}
                         >
                            <video src={item.url} className="w-full h-full object-contain" preload="metadata" />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/10 pointer-events-none">
                                <PlayCircle className="h-16 w-16 text-white/80 drop-shadow-lg" />
                            </div>
                        </div>
                    )}
                     <button
                        className="absolute top-1 right-1 h-8 w-8 rounded-full p-0 flex items-center justify-center border-none bg-transparent hover:bg-transparent focus-visible:bg-transparent active:bg-transparent focus:outline-none focus:ring-0 focus:ring-offset-0 [-webkit-tap-highlight-color:transparent] group"
                        onClick={handleToggleFavorite}
                        >
                        <Heart className={cn(
                            "h-6 w-6 drop-shadow-md transition-colors",
                            isCurrentlyFavorite
                                ? "fill-destructive stroke-destructive animate-pulse-heart"
                                : "stroke-white fill-white"
                        )}/>
                    </button>
                </div>
            </CardContent>
            <div className="p-2 space-y-1">
                <div className="flex flex-wrap gap-1">
                    {item.fair.map(f => <Badge key={f} variant="outline" className="text-xs px-1.5 py-0.5 border-transparent bg-transparent">{formatFairName(f)}</Badge>)}
                </div>
                <div className="flex flex-col items-start">
                    <Badge variant="outline" className="border-transparent text-accent text-xs font-semibold px-1 py-0">{firstWord}</Badge>
                    {rest && <Badge variant="outline" className="border-transparent text-accent/80 text-[10px] -mt-1 px-1 py-0">{rest}</Badge>}
                </div>
            </div>
            <CardFooter className="p-2 bg-muted/50 mt-auto">
                 <div className="flex w-full gap-2">
                    <Button variant="outline" size="sm" className="h-8 text-xs flex-1 hidden sm:flex" onClick={(e) => handleDownload(e, item.url, item.title)}>
                        <Download className="mr-2 h-4 w-4" />
                        Baixar
                    </Button>
                    <Button size="sm" className="h-8 text-xs flex-1" onClick={(e) => { e.stopPropagation(); onShare(item); }}>
                        <Share2 className="mr-2 h-4 w-4" />
                        Compartilhar
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}

function GalleryFilterAccordion({
    selectedFair,
    selectedTheme,
    onFilterChange,
    isDisabled,
}: {
    selectedFair: string | null;
    selectedTheme: string | null;
    onFilterChange: (type: 'fair' | 'theme', value: string | null) => void;
    isDisabled: boolean;
}) {
    const [openItems, setOpenItems] = useState<string[]>([]);
    const [isPending, startTransition] = useTransition();

    const fairs = [
        { value: 'Todas', label: 'Todas as Feiras' },
        { value: 'Flamengo e Laranjeiras', label: 'Feiras Orgânicas do Flamengo e Laranjeiras' },
        { value: 'Grajaú', label: 'Feira Orgânica do Grajaú' },
        { value: 'Tijuca', label: 'Feira Orgânica da Tijuca' },
        { value: 'Botafogo', label: 'Feira Orgânica de Botafogo' },
        { value: 'Leme', label: 'Feira Orgânica do Leme' },
    ];

    const themes = [
        { value: 'Fotografias', label: 'Fotografias' },
        { value: 'Agricultores - Animações e Cartoon', label: 'Agricultores - Animações e Cartoon' },
        { value: 'Alimentos - Animações e Cartoon', label: 'Alimentos - Animações e Cartoon' },
        { value: 'Personagens - Animações e Cartoon', label: 'Personagens - Animações e Cartoon' },
        { value: 'Story', label: 'Story' },
        { value: 'Dias Especiais', label: 'Dias Especiais' },
    ];
    
    const handleSelectAndClose = (type: 'fair' | 'theme', value: string) => {
        startTransition(() => {
            if (type === 'fair') {
                 onFilterChange('fair', selectedFair === value ? null : value);
            }
            if (type === 'theme') {
                 onFilterChange('theme', selectedTheme === value ? null : value);
            }
        });
        setOpenItems([]);
    };

    return (
        <Accordion type="multiple" className="w-full" disabled={isDisabled} value={openItems} onValueChange={setOpenItems}>
            <AccordionItem value="fair-filter">
                <AccordionTrigger className="text-lg focus:ring-0 focus:ring-offset-0 px-4 rounded-md py-2 h-auto">
                   Selecionar Feira
                </AccordionTrigger>
                <AccordionContent className="p-2 bg-background border rounded-b-md">
                    <div className="flex flex-col gap-1">
                        {fairs.map(fair => (
                            <Button
                                key={fair.value}
                                onClick={() => handleSelectAndClose('fair', fair.value)}
                                variant={'ghost'}
                                className={cn("justify-start h-auto text-base", selectedFair === fair.value ? "bg-accent text-accent-foreground" : "")}
                            >
                                {fair.label}
                            </Button>
                        ))}
                    </div>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="theme-filter">
                <AccordionTrigger className="text-lg focus:ring-0 focus:ring-offset-0 px-4 rounded-md mt-2 py-2 h-auto">
                   Selecionar Tema
                </AccordionTrigger>
                <AccordionContent className="p-2 bg-background border rounded-b-md">
                    <div className="flex flex-col gap-1">
                        {themes.map(theme => (
                            <Button
                                key={theme.value}
                                onClick={() => handleSelectAndClose('theme', theme.value)}
                                variant={'ghost'}
                                className={cn("justify-start h-auto text-base", selectedTheme === theme.value ? "bg-accent text-accent-foreground" : "")}
                            >
                                {theme.label}
                            </Button>
                        ))}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}

function GalleryViewContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const { favorites, toggleFavorite, isFavorite } = useGalleryFavorites();
    const allItems = useMemo(() => getGalleryItems(), []);
    
    const selectedFair = searchParams.get('feira');
    const selectedTheme = searchParams.get('tema');
    const [videoToPlay, setVideoToPlay] = useState<GalleryItem | null>(null);
    const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
    
    const isShowingFavorites = searchParams.get('favoritos') === 'true';

     const sourceItems = useMemo(() => {
        return isShowingFavorites ? favorites : allItems;
    }, [isShowingFavorites, favorites, allItems]);
    
    const filteredItems = useMemo(() => {
        return sourceItems.filter(item => {
            const fairMatch = !selectedFair || (selectedFair === 'Todas' ? item.fair.includes('Todas') : item.fair.includes(selectedFair as any));
            const themeMatch = !selectedTheme || item.theme.includes(selectedTheme as any);
            return fairMatch && themeMatch;
        });
    }, [sourceItems, selectedFair, selectedTheme]);


    const handleFilterChange = (type: 'fair' | 'theme', value: string | null) => {
        const currentParams = new URLSearchParams(searchParams.toString());
        
        if (type === 'fair') {
            if (value) currentParams.set('feira', value);
            else currentParams.delete('feira');
        }
        if (type === 'theme') {
            if (value) currentParams.set('tema', value);
            else currentParams.delete('tema');
        }

        router.push(`/gallery?${currentParams.toString()}`, { scroll: false });
    };
    
    const handleToggleShowFavorites = () => {
        const currentParams = new URLSearchParams(searchParams.toString());
        if (isShowingFavorites) {
            currentParams.delete('favoritos');
        } else {
            currentParams.set('favoritos', 'true');
        }
        router.push(`/gallery?${currentParams.toString()}`, { scroll: false });
    };

    const handleToggleFavorite = (item: GalleryItem) => {
        toggleFavorite(item);
    };
    
    const handleShare = async (item: GalleryItem) => {
        const title = item.title;
        const fileExtension = item.type === 'video' ? 'mp4' : 'jpg';
        const fileName = `${item.title.replace(/\s+/g, '_')}.${fileExtension}`;
        const mimeType = item.type === 'video' ? 'video/mp4' : 'image/jpeg';
        
        try {
            const response = await fetch(item.url);
            if (!response.ok) throw new Error('A resposta da rede não foi boa.');
            const blob = await response.blob();
            const file = new File([blob], fileName, { type: mimeType });

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    title: title,
                    text: `Confira esta propaganda da Minha Feira: ${title}`,
                    files: [file],
                });
            } else {
                 window.open(item.url, '_blank');
            }
        } catch (error) {
            console.error('Falha ao compartilhar, retornando para download direto:', error);
            window.open(item.url, '_blank');
        }
    };


    return (
        <div className="desktop-device">
            <div className="flex justify-between items-center mb-4">
                <BackButton />
                <button
                    onClick={handleToggleShowFavorites}
                    className="p-2 rounded-full group bg-transparent border-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:bg-transparent active:bg-transparent hover:bg-transparent [-webkit-tap-highlight-color:transparent]"
                >
                    <Heart className={cn(
                        "h-7 w-7 transition-colors group-hover:fill-destructive group-hover:stroke-destructive",
                        isShowingFavorites
                            ? "fill-destructive stroke-destructive"
                            : "stroke-primary fill-white"
                    )} />
                    <span className="sr-only">Mostrar Favoritos</span>
                </button>
            </div>
            
            <div className="mb-2">
                <h1 className="text-3xl font-bold font-headline text-primary tracking-tight sm:text-4xl">
                    Galeria de Propagandas
                </h1>
                <p className="mt-2 text-base font-medium text-foreground/90 max-w-3xl">
                    Utilize estas artes para divulgar as feiras em suas redes sociais. Baixe e compartilhe as imagens e vídeos à vontade! Use os filtros para encontrar a propaganda ideal. 
                </p>
            </div>
             <div className="flex justify-end text-right mt-2 mb-2">
              <div className="flex items-center gap-2 font-bold text-lg text-accent">
                  <Archive className="h-5 w-5" />
                  <span>Total de Itens:</span>
                  <span>{allItems.length}</span>
              </div>
            </div>

            <div className="sticky top-16 bg-background/95 backdrop-blur-sm z-10 py-4 space-y-2">
                <GalleryFilterAccordion
                    selectedFair={selectedFair}
                    selectedTheme={selectedTheme}
                    onFilterChange={handleFilterChange}
                    isDisabled={isShowingFavorites}
                />
            </div>
            
            <div className="pt-6">
                 {filteredItems.length > 0 ? (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {filteredItems.map(item => (
                                <GalleryItemCard 
                                    key={item.id} 
                                    item={item} 
                                    onShare={handleShare}
                                    onPlayVideo={setVideoToPlay}
                                    onSelectImage={setSelectedImage}
                                    isCurrentlyFavorite={isFavorite(item.id)}
                                    onToggleFavorite={handleToggleFavorite}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-20">
                        <h2 className="mt-4 text-2xl font-semibold">Nenhuma propaganda encontrada</h2>
                        <p className="text-lg font-semibold text-foreground/90 mt-2">
                            {isShowingFavorites ? "Você ainda não favoritou nenhuma mídia." : "Tente ajustar seus filtros para encontrar outros resultados."}
                        </p>
                    </div>
                )}
            </div>

            <Dialog open={!!videoToPlay} onOpenChange={(isOpen) => !isOpen && setVideoToPlay(null)}>
                <DialogContent className="max-w-3xl p-0 border-0 bg-transparent" showOverlay={true}>
                    {videoToPlay && (
                        <video 
                          src={videoToPlay.url} 
                          className="w-full h-auto rounded-lg" 
                          controls 
                          autoPlay 
                          suppressHydrationWarning
                        >
                            Seu navegador não suporta a tag de vídeo.
                        </video>
                    )}
                </DialogContent>
            </Dialog>

            <Dialog open={!!selectedImage} onOpenChange={(isOpen) => !isOpen && setSelectedImage(null)}>
                <DialogContent className="p-0 border-0 max-w-4xl w-full" showOverlay={true}>
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

    
