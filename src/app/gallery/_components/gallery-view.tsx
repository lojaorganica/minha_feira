
'use client';

import { useState, useMemo, Suspense, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getGalleryItems } from '@/lib/gallery-data';
import type { GalleryItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import { Download, Share2, Loader2, PlayCircle, X, Heart } from 'lucide-react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useGalleryFavorites } from '@/hooks/use-gallery-favorites';
import BackButton from '@/components/back-button';

const ITEMS_PER_PAGE = 24;

// Componente de Card individual para otimizar o estado de favorito
function GalleryItemCard({ item, onShare, onPlayVideo, onSelectImage }: { item: GalleryItem; onShare: (item: GalleryItem) => void; onPlayVideo: (item: GalleryItem) => void; onSelectImage: (item: GalleryItem) => void; }) {
    const { toggleFavorite, isFavorite } = useGalleryFavorites();
    const [isLocallyFavorite, setIsLocallyFavorite] = useState(() => isFavorite(item.id));
    const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

    // Efeito para sincronizar o estado local se o estado global mudar (ex: ao filtrar para favoritos)
    useEffect(() => {
        setIsLocallyFavorite(isFavorite(item.id));
    }, [isFavorite, item.id]);


    useEffect(() => {
      const checkMobile = () => window.matchMedia("(max-width: 768px)").matches;
      setIsMobile(checkMobile());
      const handleResize = () => setIsMobile(checkMobile());
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleToggleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation();
        // Atualiza o estado visual local imediatamente para resposta instantânea.
        setIsLocallyFavorite(current => !current);
        // Chama a função para atualizar o estado global e o localStorage em segundo plano.
        toggleFavorite(item);
    };

    const handleDownload = (url: string, title: string) => {
        window.open(url, '_blank');
    };

    const handleVideoClick = (e: React.MouseEvent | React.TouchEvent) => {
        e.stopPropagation();
        onPlayVideo(item);
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
        const parts = item.theme[0].split(' - ');
        return { firstWord: parts[0], rest: parts.slice(1).join(' - ') };
    }, [item.theme]);
    

    return (
        <Card className="overflow-hidden flex flex-col">
            <CardContent className="p-0">
                <div className="relative w-full">
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
                                onClick={() => onSelectImage(item)}
                            />
                        </>
                    ) : (
                        <div className="relative cursor-pointer" onClick={handleVideoClick} onTouchEnd={handleVideoClick}>
                            <video src={item.url} className="w-full h-full object-contain" preload="metadata" />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <PlayCircle className="h-16 w-16 text-white/80 drop-shadow-lg" />
                            </div>
                        </div>
                    )}
                    <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1 right-1 h-8 w-8 rounded-full focus-visible:ring-0 focus-visible:ring-offset-0 hover:bg-transparent"
                    onClick={handleToggleFavorite}
                    >
                        <Heart className={cn(
                            "h-6 w-6 stroke-white fill-white transition-all hover:fill-destructive hover:stroke-destructive md:h-7 md:w-7", 
                            isLocallyFavorite && "fill-destructive stroke-destructive animate-pulse-heart"
                        )}/>
                    </Button>
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
                {isMobile === undefined ? (
                    <div className="flex w-full gap-2 h-8" />
                ) : (
                    <div className="flex w-full gap-2">
                        <Button variant="outline" size="sm" className="h-8 text-xs flex-1 hidden sm:flex" onClick={() => handleDownload(item.url, item.title)}>
                            <Download className="mr-2 h-4 w-4" />
                            Baixar
                        </Button>
                        <Button size="sm" className="h-8 text-xs flex-1" onClick={() => onShare(item)}>
                            <Share2 className="mr-2 h-4 w-4" />
                            Compartilhar
                        </Button>
                    </div>
                )}
            </CardFooter>
        </Card>
    );
}


function GalleryViewContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const { favorites, isFavorite } = useGalleryFavorites();

    const initialFair = searchParams.get('feira') || null;
    const initialTheme = searchParams.get('tema') || 'Todos';
    const showFavoritesParam = searchParams.get('favoritos') === 'true';

    const [selectedFair, setSelectedFair] = useState(initialFair);
    const [selectedTheme, setSelectedTheme] = useState(initialTheme);
    const [showFavorites, setShowFavorites] = useState(showFavoritesParam);
    const [videoToPlay, setVideoToPlay] = useState<GalleryItem | null>(null);
    const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
    
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

    const loaderRef = useRef(null);

    const allItems = useMemo(() => getGalleryItems(), []);

    const filteredItems = useMemo(() => {
        let sourceItems = allItems;

        if (showFavorites) {
          const favoriteIds = new Set(favorites.map(f => f.id));
          sourceItems = allItems.filter(item => favoriteIds.has(item.id));
        }
        
        return sourceItems.filter(item => {
            const fairMatch = !selectedFair || (selectedFair === 'Todas' ? item.fair.includes('Todas') : item.fair.includes(selectedFair as any));
            const themeMatch = selectedTheme === 'Todos' || item.theme.includes(selectedTheme as any);
            return fairMatch && themeMatch;
        });
    }, [allItems, favorites, showFavorites, selectedFair, selectedTheme]);

    // Resetar a contagem de visibilidade ao mudar os filtros
    useEffect(() => {
        setVisibleCount(ITEMS_PER_PAGE);
    }, [filteredItems]);


    // Lógica para o scroll infinito
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setVisibleCount((prevCount) =>
                        Math.min(prevCount + ITEMS_PER_PAGE, filteredItems.length)
                    );
                }
            },
            { rootMargin: '200px' }
        );

        const currentLoaderRef = loaderRef.current;
        if (currentLoaderRef) {
            observer.observe(currentLoaderRef);
        }

        return () => {
            if (currentLoaderRef) {
                observer.unobserve(currentLoaderRef);
            }
        };
    }, [filteredItems.length]);

    const itemsToShow = useMemo(() => filteredItems.slice(0, visibleCount), [filteredItems, visibleCount]);

    const updateUrlParams = (params: URLSearchParams) => {
        router.push(`/gallery?${params.toString()}`, { scroll: false });
    };

    const handleFilterChange = (type: 'fair' | 'theme', value: string) => {
        const currentParams = new URLSearchParams(searchParams.toString());
        
        if (type === 'fair') {
            setSelectedFair(value === 'null' ? null : value);
            if (value === 'null') currentParams.delete('feira');
            else currentParams.set('feira', value);
        }
        if (type === 'theme') {
            setSelectedTheme(value);
            if (value === 'Todos') currentParams.delete('tema');
            else currentParams.set('tema', value);
        }
        updateUrlParams(currentParams);
    };

    const toggleShowFavorites = () => {
        const newShowFavorites = !showFavorites;
        setShowFavorites(newShowFavorites);
        const currentParams = new URLSearchParams(searchParams.toString());
        if (newShowFavorites) {
            currentParams.set('favoritos', 'true');
        } else {
            currentParams.delete('favoritos');
        }
        updateUrlParams(currentParams);
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
    
    const allUniqueFairs = useMemo(() => {
        const fairs = new Set<string>();
        allItems.forEach(item => item.fair.forEach(f => fairs.add(f)));
        return Array.from(fairs).sort();
    }, [allItems]);

    const allUniqueThemes = useMemo(() => {
        const themes = new Set<string>();
        allItems.forEach(item => item.theme.forEach(t => themes.add(t)));
        return Array.from(themes).sort();
    }, [allItems]);
    
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
        <>
            <div className="flex justify-between items-center mb-4">
                <BackButton />
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleShowFavorites}
                    className="group hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                >
                    <Heart className={cn(
                        "h-7 w-7 transition-colors",
                        showFavorites
                            ? "fill-destructive text-destructive"
                            : "stroke-primary hover:fill-destructive hover:stroke-destructive"
                    )} />
                    <span className="sr-only">Mostrar Favoritos</span>
                </Button>
            </div>
            
             <div className="mb-2">
                 <h1 className="text-3xl font-bold font-headline text-primary tracking-tight sm:text-4xl">
                    Galeria de Propagandas
                </h1>
                <p className="mt-2 text-base font-medium text-foreground/90 max-w-3xl">
                    Utilize estas artes para divulgar as feiras em suas redes sociais. Baixe e compartilhe as imagens e vídeos à vontade! Use os filtros para encontrar a propaganda ideal. 
                </p>
            </div>
            
             <div className="sticky top-16 z-40 bg-background/95 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                     <Select value={selectedFair ?? 'null'} onValueChange={(value) => handleFilterChange('fair', value)} disabled={showFavorites}>
                        <SelectTrigger className="w-full text-lg bg-accent text-accent-foreground hover:bg-accent/90 focus:ring-0 focus:ring-offset-0 disabled:opacity-50">
                             <div className="flex-1 text-left">
                                <SelectValue>
                                    {selectedFair ? formatFairName(selectedFair) : "Selecionar Feiras"}
                                </SelectValue>
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="null">Mostrar Todas as Mídias</SelectItem>
                            <SelectItem value="Todas">Todas as Feiras</SelectItem>
                            <SelectItem value="Flamengo e Laranjeiras">Feiras Orgânicas do Flamengo e Laranjeiras</SelectItem>
                            <SelectItem value="Grajaú">Feira Orgânica do Grajaú</SelectItem>
                            <SelectItem value="Tijuca">Feira Orgânica da Tijuca</SelectItem>
                            <SelectItem value="Botafogo">Feira Orgânica de Botafogo</SelectItem>
                            <SelectItem value="Leme">Feira Orgânica do Leme</SelectItem>
                        </SelectContent>
                    </Select>
                    
                    <Select value={selectedTheme} onValueChange={(value) => handleFilterChange('theme', value)} disabled={showFavorites}>
                        <SelectTrigger className="w-full text-lg bg-accent text-accent-foreground hover:bg-accent/90 focus:ring-0 focus:ring-offset-0 disabled:opacity-50">
                             <div className="flex-1 text-left">
                                <SelectValue>
                                    {selectedTheme === 'Todos' ? 'Selecionar Temas' : selectedTheme}
                                </SelectValue>
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="Todos">Todos os Temas</SelectItem>
                           <SelectItem value="Fotografias">Fotografias</SelectItem>
                           <SelectItem value="Agricultores - Animações e Cartoon">Agricultores - Animações e Cartoon</SelectItem>
                           <SelectItem value="Alimentos - Animações e Cartoon">Alimentos - Animações e Cartoon</SelectItem>
                           <SelectItem value="Personagens - Animações e Cartoon">Personagens - Animações e Cartoon</SelectItem>
                           <SelectItem value="Story">Story</SelectItem>
                           <SelectItem value="Dias Especiais">Dias Especiais</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            
            <div className="flex-grow pt-6">
                {itemsToShow.length > 0 ? (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {itemsToShow.map(item => (
                                <GalleryItemCard 
                                    key={item.id} 
                                    item={item} 
                                    onShare={handleShare}
                                    onPlayVideo={setVideoToPlay}
                                    onSelectImage={setSelectedImage}
                                />
                            ))}
                        </div>
                        {visibleCount < filteredItems.length && (
                            <div ref={loaderRef} className="flex justify-center items-center py-8">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-20">
                        <h2 className="mt-4 text-2xl font-semibold">Nenhuma propaganda encontrada</h2>
                        <p className="text-lg font-semibold text-foreground/90 mt-2">
                            {showFavorites ? "Você ainda não favoritou nenhuma mídia." : "Tente ajustar seus filtros para encontrar outros resultados."}
                        </p>
                    </div>
                )}
            </div>

            <Dialog open={!!videoToPlay} onOpenChange={(isOpen) => !isOpen && setVideoToPlay(null)}>
                <DialogContent className="max-w-3xl p-0 border-0 bg-transparent">
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
                     <DialogClose asChild>
                        <button
                          className="absolute right-2 top-2 rounded-full bg-accent p-1 text-accent-foreground transition-opacity hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-white disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                          aria-label="Fechar"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </DialogClose>
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
                     <DialogClose asChild>
                       <button
                          className="absolute right-2 top-2 rounded-full bg-accent p-1 text-accent-foreground transition-opacity hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-white disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                          aria-label="Fechar"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </DialogClose>
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

    

    