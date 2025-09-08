
import type { GalleryItem, GalleryFair, GalleryTheme } from './types';
import { getGalleryItems as getNewGalleryItems } from './gallery-data-new';

const allItemUrls: string[] = [
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_cartoon_feira_botafogo_67_ivison.jpg?alt=media&token=6448f512-2caa-4852-9e74-052f207a2e37',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_cartoon_feira_tijuca_39_lucia.png?alt=media&token=fc58054a-ae29-436c-b917-c947b616ece8',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_cartoon_feira_tijuca_40_evelyn.png?alt=media&token=9d38b9c4-2927-40d5-a1f5-1a88f63cca77',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_cartoon_feira_tijuca_41_luciene.png?alt=media&token=3f34879d-d22c-4c5f-999a-7502e63bba97',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_cartoon_feira_tijuca_44_rosana.png?alt=media&token=2faba5ab-8013-4350-83dd-7eaba75c7a3d',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_cartoon_feiras_flamengo_laranjeiras_74_ivison.png?alt=media&token=407a4857-fb2d-46b1-8856-9bb112bfd8c4',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_cartoon_feiras_flamengo_laranjeiras_94_ivison.png?alt=media&token=1ea6662f-bfd7-42ee-aa5e-233c1ad2f55b',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_cartoon_todas_feiras_23.jpg?alt=media&token=516dc23a-e262-400a-ad5c-6e9a3fb31af1',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feira_botafogo_28_walace.mp4?alt=media&token=71db03c5-f42f-43a3-a93c-6554a33a0885',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feira_botafogo_29_giulia.mp4?alt=media&token=e8adaecd-739b-4e81-a22d-121b9d51c46b',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feira_botafogo_30_ailton.mp4?alt=media&token=c28f942c-27ad-4852-9b62-549a670cf8b2',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feira_botafogo_31_nathalia.mp4?alt=media&token=145a513d-358f-4bf7-a2e4-e9476ae1647f',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feira_botafogo_68_ivison.mp4?alt=media&token=877cf44d-87a8-4770-9f7f-a8b83f3db25f',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feira_grajau_27_walace.mp4?alt=media&token=1980ae71-4f30-483b-b64e-5790573f8e8a',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feira_grajau_28_matias.mp4?alt=media&token=17c2df1c-a351-41c1-808b-c96c04784af6',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feira_grajau_29_david_matias.mp4?alt=media&token=352de92e-fd97-4bec-97fc-e62fa25f84b8',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feira_grajau_30_evelyn.mp4?alt=media&token=c17c67ee-01fd-415b-97ba-ea47bbb49e64',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feira_leme_26_walace.mp4?alt=media&token=d31d9126-1cd9-4620-b2c0-61bc5b881be6',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feira_tijuca_38a_rosana_evelyn.mp4?alt=media&token=c810b4c3-cfaa-4653-89d9-a761818721fa',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feira_tijuca_38b_rosana_evelyn.mp4?alt=media&token=be14f67b-fe93-44a2-b52b-86ea155e087d',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feira_tijuca_42_lucia.mp4?alt=media&token=c5d30eb5-c3cf-4808-ae4d-07bc6e5bbe1b',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feira_tijuca_43a_evelyn.mp4?alt=media&token=59369c96-e1ad-4bfd-ace3-8f6076900904',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feira_tijuca_43b_evelyn.mp4?alt=media&token=9a2a17ab-77d9-4391-b936-0fcac0c3223e',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feira_tijuca_45_rosana.mp4?alt=media&token=0c69991f-332f-45c4-9d87-16ade153eed4',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feira_tijuca_47_rosana_evelyn.mp4?alt=media&token=0b9cfc9a-c564-4ca8-b8dd-dc77e9dc5729',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feiras_flamengo_laranjeiras_43_paloma.mp4?alt=media&token=17e6a8e3-9797-43b8-91df-dccbe0ec3464',
];

function getFairCategories(fileName: string): GalleryFair[] {
    const fairs: GalleryFair[] = [];
    if (fileName.includes('todas_feiras')) fairs.push('Todas');
    if (fileName.includes('feiras_flamengo_laranjeiras')) fairs.push('Flamengo e Laranjeiras');
    if (fileName.includes('feira_grajau')) fairs.push('Grajaú');
    if (fileName.includes('feira_tijuca')) fairs.push('Tijuca');
    if (fileName.includes('feira_botafogo')) fairs.push('Botafogo');
    if (fileName.includes('feira_leme')) fairs.push('Leme');
    
    if (fairs.length === 0) fairs.push('Todas');
    return fairs;
}

function getThemeCategories(fileName: string): GalleryTheme[] {
    const themes: GalleryTheme[] = [];
    if (fileName.startsWith('fot')) themes.push('Fotografias');
    if (fileName.startsWith('aagr')) themes.push('Agricultores - Animações e Cartoon');
    if (fileName.startsWith('aali')) themes.push('Alimentos - Animações e Cartoon');
    if (fileName.startsWith('ap_')) themes.push('Personagens - Animações e Cartoon');
    if (fileName.includes('story')) themes.push('Story');
    if (fileName.includes('especial')) themes.push('Dias Especiais');

    if (themes.length === 0) {
        if (fileName.endsWith('.mp4')) {
            themes.push('Agricultores - Animações e Cartoon');
        } else {
             themes.push('Fotografias');
        }
    }
    return themes;
}

function extractFileNameFromUrl(url: string): string {
    try {
        const decodedUrl = decodeURIComponent(url);
        const path = new URL(decodedUrl).pathname;
        const parts = path.split('/');
        return parts[parts.length - 1].split('?')[0];
    } catch (e) {
        const lastSlashIndex = url.lastIndexOf('%2F');
        const questionMarkIndex = url.indexOf('?');
        if (lastSlashIndex !== -1) {
            const end = questionMarkIndex > -1 ? questionMarkIndex : url.length;
            return decodeURIComponent(url.substring(lastSlashIndex + 3, end));
        }
        return `arquivo-${Math.random()}`;
    }
}

let galleryItemsCache: GalleryItem[] | null = null;

export function getGalleryItems(): GalleryItem[] {
  if (galleryItemsCache) {
    return galleryItemsCache;
  }
  
  const oldItems: GalleryItem[] = allItemUrls.map((url, index) => {
    const fileName = extractFileNameFromUrl(url);
    const id = `item-${index}-${fileName.split('.')[0]}`;
    
    let title = fileName
      .replace(/_/g, ' ')
      .replace(/\.(jpg|png|mp4|jpeg)$/i, '');

    const parts = title.split(' ');
    if (parts.length > 2 && /^\d+$/.test(parts[1])) {
        title = parts.slice(2).join(' ');
    }
     if (/^\d+$/.test(parts[0])) {
        title = parts.slice(1).join(' ');
    }

    title = title
        .replace(/ feira(s)? (de|do|da)? (grajau|tijuca|botafogo|leme|flamengo|laranjeiras|todas)/gi, '')
        .replace(/feiras flamengo laranjeiras/gi, '')
        .replace(/\b\w/g, l => l.toUpperCase());

    const type = fileName.endsWith('.mp4') ? 'video' : 'image';
    const dataAiHint = title.toLowerCase().split(' ').slice(0, 2).join(' ');

    return {
      id,
      url,
      title,
      type,
      dataAiHint,
      fair: getFairCategories(fileName),
      theme: getThemeCategories(fileName),
    };
  });

  const newItems = getNewGalleryItems();
  const allItems = [...oldItems, ...newItems];
  
  galleryItemsCache = allItems;
  return galleryItemsCache;
}
