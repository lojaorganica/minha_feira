
import type { GalleryItem, GalleryFair, GalleryTheme } from './types';

// Este arquivo conterá as novas URLs da galeria.
const allItemUrls: string[] = [
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_grajau_37_sporock.mp4?alt=media&token=45b2b6af-c42e-428c-a223-31f48f241951',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_grajau_40_aqualface.mp4?alt=media&token=ef12d21a-fed1-4faf-a85b-23877cef7f3f',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_grajau_45_uva_negra.mp4?alt=media&token=abc0ef6f-f505-459d-b0f7-8f252e82f2b7',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_grajau_47_coisa_de_milho.mp4?alt=media&token=c1f5e623-e814-4207-9547-f464dbc6e6c0',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_grajau_48_limao_america.mp4?alt=media&token=8f642654-b5f9-4d4e-a325-56fc749affdb',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_grajau_51_uverine.mp4?alt=media&token=a1b85d0c-0eea-4cdf-914f-486514a413e6',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_grajau_53_berinjela_negra.mp4?alt=media&token=d1e7cb31-e71c-4819-a3f5-0c8a0aab6364',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_grajau_54_brulk.mp4?alt=media&token=7cb17004-b13e-4cde-8d27-79c9b6969bf5',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_grajau_57_mandiorpheus.mp4?alt=media&token=55fd756b-0ebd-48e5-bca2-28d6dd409ac7',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_grajau_58_abobrinha_maravilha.mp4?alt=media&token=16a3e5de-d57d-450e-ad11-21cc65adb5e1',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_grajau_62_pepino_verde.mp4?alt=media&token=3dbf4bb7-bc97-40bd-ad6f-8a7a3defb2ed',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_grajau_73_beterraba_de_ferro.mp4?alt=media&token=2a029c77-86da-4bcb-8dd1-f283e7dcd2cb',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_leme_30_batatman.mp4?alt=media&token=64961140-c13b-4b43-b7fd-e3c087b3fda0',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_leme_31_inhame_aranha.mp4?alt=media&token=b786e600-78aa-476c-b02e-5fda5b6ae864',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_leme_32_sporock.mp4?alt=media&token=8b9e2e97-ee65-4ba9-879b-762e63a98288',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_leme_34_aqualface.mp4?alt=media&token=7e57f3b4-db37-41b3-b71c-1ecc72d0ea49',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_leme_37_robinete.mp4?alt=media&token=d1c6b0b7-b35a-4be7-960c-cfe5836faf04',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_leme_41_uva_negra.mp4?alt=media&token=94830cb3-1ffd-48a0-ac08-bc4cb28caf87',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_leme_43_coisa_de_milho.mp4?alt=media&token=ed8ecd95-add1-49c3-abf2-8f06e3144ebb',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_leme_46_limao_america.mp4?alt=media&token=d96c632e-04eb-4232-af1c-fb519c864e88',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_leme_48_uverine.mp4?alt=media&token=4a067b3b-99f4-421d-86c8-9030e41b1cbc',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_leme_49_berinjela_negra.mp4?alt=media&token=d039c9f3-4540-4a1f-980f-d9579da9a8c1',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_leme_52_brulk.mp4?alt=media&token=ea5aff65-a165-410d-947a-ceada4f9bf10',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_leme_54_mandiorpheus.mp4?alt=media&token=9489dd3c-627f-444f-8a36-2b77d4a08cf0',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_leme_55_abobrinha_maravilha.mp4?alt=media&token=03afdf8a-1fc9-4525-a0a8-b4977d476c25',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_leme_72_beterraba_de_ferro.mp4?alt=media&token=dffc16db-fc81-43ac-bfc7-867360ce3923',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_leme_83_pepino_verde.mp4?alt=media&token=d53da7b0-0394-4a87-bc89-da1c1617c50d',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_48_batatman.mp4?alt=media&token=b294d6aa-3bc5-444e-9887-602c546b901b',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_49_inhame_aranha.mp4?alt=media&token=806d4f89-478f-447f-a1b9-f56a11c70adb',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_52_robinete.mp4?alt=media&token=d22a3e62-056e-4e0e-ac0a-a1d484f4093a',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_54_sporock.mp4?alt=media&token=3d4055cf-76d2-45e4-a62a-a1c553b78ca8',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_57_aqualface.mp4?alt=media&token=e41f3c31-8497-401f-8fe2-982ed1077501',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_61_uva_negra.mp4?alt=media&token=c03748c9-20b7-45d2-a481-91da4ad879a1',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_63_coisa_de_milho.mp4?alt=media&token=5df59f3d-73b8-4329-b28a-c0aabd7a38b5',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_66_limao_america.mp4?alt=media&token=4db398b0-b3d6-4ea1-80de-b64bf18aeac9',
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

export function getNewGalleryItems(): GalleryItem[] {
  return allItemUrls.map((url, index) => {
    const fileName = extractFileNameFromUrl(url);
    const id = `new-item-${index}-${fileName.split('.')[0]}`;
    
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
}
