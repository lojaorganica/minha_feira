
import type { GalleryItem, GalleryFair, GalleryTheme } from './types';

const allGalleryItems: Omit<GalleryItem, 'fair' | 'theme'>[] = [
  {
    id: 'propaganda-01',
    title: 'Beterraba de Ferro em Botafogo',
    type: 'image',
    url: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_botafogo_77_beterraba_de_ferro.png?alt=media&token=3bd1a183-eea8-4eec-83c1-d97e4ef8d0c8',
    dataAiHint: 'beetroot superhero',
  },
  {
    id: 'propaganda-02',
    title: 'Uverine no Grajaú',
    type: 'image',
    url: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_grajau_50_uverine.png?alt=media&token=db3fc380-bb75-45e5-9d31-49ccbc405e4c',
    dataAiHint: 'grape character',
  },
  {
    id: 'propaganda-03',
    title: 'Limão América no Leme',
    type: 'image',
    url: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_leme_45_limao_america.png?alt=media&token=e525af6b-2054-48ff-b1e1-1c486a9a7c43',
    dataAiHint: 'lemon character',
  },
  {
    id: 'propaganda-04',
    title: 'Coisa de Milho no Leme',
    type: 'video',
    url: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_leme_43_coisa_de_milho.mp4?alt=media&token=f33db838-cefe-4cac-9e8e-c03188b13d8a',
    dataAiHint: 'corn video',
  },
  {
    id: 'propaganda-05',
    title: 'Inhame Aranha em Flamengo e Laranjeiras',
    type: 'video',
    url: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feiras_flamengo_laranjeiras_76_inhame_aranha.mp4?alt=media&token=26e2fdd2-9c3c-4498-b16a-0d041892086f',
    dataAiHint: 'yam character video',
  },
  {
    id: 'propaganda-06',
    title: 'Sporock para Todas as Feiras',
    type: 'video',
    url: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_todas_feiras_53_sporock.mp4?alt=media&token=8eeeb7ef-94d2-4f81-bb51-b605d0f848a4',
    dataAiHint: 'broccoli character video',
  },
  {
    id: 'propaganda-07',
    title: 'Anúncio Agricultor Leme',
    type: 'image',
    url: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/propagandas%2Fanuncio_agricultor_leme.jpg?alt=media&token=a860b2d6-47b2-4d04-89c5-7f1367098485',
    dataAiHint: 'farmer character',
  },
  {
    id: 'propaganda-08',
    title: 'Foto Feira Orgânica',
    type: 'image',
    url: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/propagandas%2Ffoto_feira_organica.jpg?alt=media&token=2e055f10-67c4-42b7-a065-27a1a5b8e9b8',
    dataAiHint: 'organic market stall',
  },
];


function extractFileNameFromUrl(url: string): string {
    try {
        const decodedUrl = decodeURIComponent(url);
        const path = new URL(decodedUrl).pathname;
        const parts = path.split('/');
        const lastPart = parts[parts.length - 1];
        // Remover o token de mídia, se houver
        return lastPart.split('?')[0];
    } catch (e) {
        console.error("URL inválida:", url, e);
        return "";
    }
}


function getFairCategories(fileName: string): GalleryFair[] {
    const fairs: GalleryFair[] = [];
    if (fileName.includes('todas_feiras')) fairs.push('Todas');
    if (fileName.includes('feiras_flamengo_laranjeiras')) fairs.push('Flamengo e Laranjeiras');
    if (fileName.includes('feira_grajau')) fairs.push('Grajaú');
    if (fileName.includes('feira_tijuca')) fairs.push('Tijuca');
    if (fileName.includes('feira_botafogo')) fairs.push('Botafogo');
    if (fileName.includes('feira_leme')) fairs.push('Leme');
    
    // Se nenhuma regra específica for encontrada, mas não for "todas", pode ser uma foto genérica.
    if (fairs.length === 0) fairs.push('Todas');

    return fairs;
}


function getThemeCategories(fileName: string): GalleryTheme[] {
    const themes: GalleryTheme[] = [];
    if (fileName.startsWith('fot')) themes.push('Fotografias');
    if (fileName.startsWith('aarg')) themes.push('Agricultores - Animações e Cartoon');
    if (fileName.startsWith('aali')) themes.push('Alimentos - Animações e Cartoon');
    if (fileName.startsWith('ap')) themes.push('Personagens - Animações e Cartoon');
    if (fileName.includes('story')) themes.push('Story');
    if (fileName.includes('especial')) themes.push('Dias Especiais');

    // Se nenhuma regra for encontrada, pode ser uma foto genérica.
    if (themes.length === 0) themes.push('Fotografias');

    return themes;
}

export function getGalleryItems(): GalleryItem[] {
  return allGalleryItems.map(item => {
    const fileName = extractFileNameFromUrl(item.url);
    const fairs = getFairCategories(fileName);
    const themes = getThemeCategories(fileName);

    return {
      ...item,
      fair: fairs,
      theme: themes,
    };
  });
}
