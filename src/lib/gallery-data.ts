
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
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feiras_flamengo_laranjeiras_54_ivison.mp4?alt=media&token=3797a156-ffba-48af-8eac-a8a072319b47',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feiras_flamengo_laranjeiras_57_matias_.mp4?alt=media&token=88a4f562-c791-42cb-9818-cf1353a2027f',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feiras_flamengo_laranjeiras_58_ivison.mp4?alt=media&token=6220b309-0314-4bdd-a6fc-e55721a5b97d',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_story_cartoon_feiras_flamengo_laranjeiras_39_ivison.png?alt=media&token=7e1f27a6-096c-4cac-821f-7e248615d9cb',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_story_cartoon_feiras_flamengo_laranjeiras_40_rosana.png?alt=media&token=4a6b1bcb-b277-4b7a-8fcd-63536e5abba2',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_story_cartoon_feiras_flamengo_laranjeiras_50.png?alt=media&token=205a9dc5-a895-4c60-aebf-8167ff449f81',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_story_cartoon_feiras_flamengo_laranjeiras_83_ivison.png?alt=media&token=742c77b6-5a2c-4e65-9163-777b01601c2d',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_story_cartoon_todas_feiras_46_rosana.png?alt=media&token=3732fbf6-ad39-42c2-a29a-23a387394942',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_story_cartoon_todas_feiras_47_lucia.png?alt=media&token=d2e290cc-4024-4802-aceb-cdf7af1c6ffb',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_story_cartoon_todas_feiras_85_ivison.png?alt=media&token=5448cd01-de1a-4076-8616-3aceeee0b98e',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_todas_feiras_46_walace.mp4?alt=media&token=6a684f74-8af1-4de8-a719-bd4319e8fdf6',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_todas_feiras_49_matias_david.mp4?alt=media&token=a8e5b1b2-d770-4a83-8b28-5347044a7b40',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_025_abacate_feira_grajau.mp4?alt=media&token=04c003db-85ad-4906-986a-e78432396685',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_026_abacate_feira_botafogo.mp4?alt=media&token=baebbf62-d59a-478f-8c1e-cbaa35f3af40',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_026_abacate_feira_leme.mp4?alt=media&token=0f39fa51-a303-4482-b4a8-ff07ad8818ce',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_026_maracugina_feira_grajau.mp4?alt=media&token=97c01f87-9a4e-4d5c-b3ab-6e1cc7a88bde',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_027_maracugina_feira_botafogo.mp4?alt=media&token=7371976d-0cc8-4810-baac-1410094e0833',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_031_abacate_feira_tijuca.mp4?alt=media&token=a10245e4-f097-4d02-904d-ebb007a16cd3',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_032_maracugina_feira_tijuca.mp4?alt=media&token=18df391b-2e53-4dc4-931f-10f4512ed562',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_038_maca_todas_feiras.mp4?alt=media&token=b5df862e-93e4-4da4-919a-49ce127c9e56',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_041_abacate_todas_feiras.mp4?alt=media&token=1684e6ac-ef75-4dfd-b6d0-8704a51c4598',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_045_maracugina_todas_feiras.mp4?alt=media&token=e35e3036-b7db-4612-b982-bb015746815b',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_049_cenoura_feiras_flamengo_laranjeiras.mp4?alt=media&token=e8690e8c-bbd4-457b-8505-4bb96a35ce72',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_057_maracugina_feira_leme.mp4?alt=media&token=05c73073-97b5-4a8b-8e62-774656b0abeb',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_058_maca_feira_leme.mp4?alt=media&token=0f2b2221-e6ad-4486-849c-92aa8632391a',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_060_maca_feira_grajau.mp4?alt=media&token=7886f3c7-9119-4fa9-ae21-56d8d17b4f2c',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_061_maca_feira_botafogo.mp4?alt=media&token=c5b1b902-2fdf-433a-a452-54a8365b7d73',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_064_cenoura_feira_leme.mp4?alt=media&token=e142ddc9-efa8-4f0d-a7c7-d7a6705a9707',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_065_cenoura_feira_grajau.mp4?alt=media&token=5ce32ba8-cda2-460c-b80f-3fc084016365',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_066_cenoura_feira_botafogo.mp4?alt=media&token=8b41e41c-b21b-450e-9dff-90f4ff8c4bdb',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_078_maca_feira_tijuca.mp4?alt=media&token=61f1e1a5-01cf-4fc1-88ca-e630c5f0b1ba',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_083_cenoura_feira_tijuca.mp4?alt=media&token=1f51b03b-4729-4f70-ad75-1c81231a16cc',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_086_cenoura_todas_feiras.mp4?alt=media&token=bf290504-fe62-46b4-ad35-723462f99d6e',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_100_maca_feiras_flamengo_laranjeiras.mp4?alt=media&token=3992dbf1-f9a7-4647-b6da-844899465c67',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_101_abacate_feiras_flamengo_laranjeiras.mp4?alt=media&token=3d60f792-26f0-46b8-8f2e-ffbaced5fe9e',
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
