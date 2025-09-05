
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
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

function GalleryViewContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();

    const initialFair = searchParams.get('feira') || 'Todas';
    const initialTheme = searchParams.get('tema') || 'Todos';

    const [selectedFair, setSelectedFair] = useState(initialFair);
    const [selectedTheme, setSelectedTheme] = useState(initialTheme);
    const [videoToPlay, setVideoToPlay] = useState<GalleryItem | null>(null);
    const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = window.matchMedia("(max-width: 768px)").matches;
        setIsMobile(checkMobile);
    }, []);

    useEffect(() => {
        if (!isMobile) {
            document.body.classList.add('desktop-device');
        }
        return () => {
            document.body.classList.remove('desktop-device');
        };
    }, [isMobile]);

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
        if (fairName === 'Flamengo e Laranjeiras') {
            return 'Feiras Orgânicas do Flamengo e Laranjeiras';
        }
        const doExceptions = ['Leme', 'Grajaú', 'Flamengo'];
        if (doExceptions.includes(fairName)) {
            return `Feira Orgânica do ${fairName}`;
        }
        return `Feira Orgânica de ${fairName}`;
    };

    const formatThemeName = (themeName: string) => {
        const parts = themeName.split(' - ');
        const firstWord = parts[0];
        const rest = parts.slice(1).join(' - ');
        return { firstWord, rest };
    };
    
    const handleDownload = (url: string) => {
        window.open(url, '_blank');
        toast({
          title: "Abrindo mídia...",
          description: `Sua imagem ou vídeo está abrindo em uma nova aba.`,
        });
    };
    
    const handleShare = async (item: GalleryItem) => {
        const title = item.title;
        const fileExtension = item.type === 'video' ? 'mp4' : 'jpg';
        const fileName = `${item.title.replace(/\s+/g, '_')}.${fileExtension}`;
        const mimeType = item.type === 'video' ? 'video/mp4' : 'image/jpeg';
        
        try {
            const response = await fetch(item.url);
            if (!response.ok) throw new Error('Network response was not ok.');
            const blob = await response.blob();
            const file = new File([blob], fileName, { type: mimeType });

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    title: title,
                    text: `Confira esta propaganda da Minha Feira: ${title}`,
                    files: [file],
                });
            } else {
                handleDownload(item.url);
            }
        } catch (error) {
            console.error('Share/download failed, falling back to direct download:', error);
            handleDownload(item.url);
        }
    };


    return (
        <>
            <div className="sticky top-16 z-40 bg-background/95 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                     <Select value={selectedFair} onValueChange={(value) => handleFilterChange('fair', value)}>
                        <SelectTrigger className="w-full text-lg bg-accent text-accent-foreground hover:bg-accent/90 focus:ring-0 focus:ring-offset-0">
                            <SelectValue placeholder="Filtrar por Feira" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Todas">Todas as Feiras</SelectItem>
                            <SelectItem value="Flamengo e Laranjeiras">Feiras Orgânicas do Flamengo e Laranjeiras</SelectItem>
                            <SelectItem value="Grajaú">Feira Orgânica do Grajaú</SelectItem>
                            <SelectItem value="Tijuca">Feira Orgânica da Tijuca</SelectItem>
                            <SelectItem value="Botafogo">Feira Orgânica de Botafogo</SelectItem>
                            <SelectItem value="Leme">Feira Orgânica do Leme</SelectItem>
                        </SelectContent>
                    </Select>
                    
                    <Select value={selectedTheme} onValueChange={(value) => handleFilterChange('theme', value)}>
                        <SelectTrigger className="w-full text-lg bg-accent text-accent-foreground hover:bg-accent/90 focus:ring-0 focus:ring-offset-0">
                            <SelectValue placeholder="Filtrar por Tema" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="Todos">Todos os Temas</SelectItem>
                           <SelectItem value="Fotografias">Fotografias</SelectItem>
                           <SelectItem value="Agricultores - Animações e Cartoon">Agricultores - Animações e Cartoon</SelectItem>
                           <SelectItem value="Alimentos - Animações e Cartoon">Alimentos - Animações e Cartoon</SelectItem>
                           <SelectItem value="Personagens - Animações e Cartoon">Personagens - Animações e Cartoon</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            
            <div className="flex-grow pt-6">
                {filteredItems.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredItems.map(item => {
                            const { firstWord, rest } = formatThemeName(item.theme[0]);
                            return (
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
                                                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:desktop-device:opacity-100 transition-opacity duration-300">
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
                                    <div className="flex flex-col items-start">
                                        <Badge variant="outline" className="border-transparent text-accent text-xs font-semibold px-1 py-0">{firstWord}</Badge>
                                        {rest && <Badge variant="outline" className="border-transparent text-accent/80 text-[10px] -mt-1 px-1 py-0">{rest}</Badge>}
                                    </div>
                                </div>
                                <CardFooter className="p-2 bg-muted/50 mt-auto">
                                    <div className="flex w-full gap-2">
                                        {!isMobile && (
                                            <Button variant="outline" size="sm" className="h-8 text-xs w-full flex-1" onClick={() => handleDownload(item.url)}>
                                                <Download className="mr-2 h-4 w-4" />
                                                Baixar
                                            </Button>
                                        )}
                                        <Button size="sm" className="h-8 text-xs flex-1" onClick={() => handleShare(item)}>
                                            <Share2 className="mr-2 h-4 w-4" />
                                            Compartilhar
                                        </Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        )})}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <h2 className="mt-4 text-2xl font-semibold">Nenhuma propaganda encontrada</h2>
                        <p className="text-lg font-semibold text-foreground/90 mt-2">Tente ajustar seus filtros para encontrar outros resultados.</p>
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
