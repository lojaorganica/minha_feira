
import type { GalleryItem, GalleryFair, GalleryTheme } from './types';

// Otimização: Em vez de URLs completas, apenas os nomes dos arquivos são listados aqui.
// A URL base do Firebase Storage será adicionada dinamicamente.
const allGalleryFileNames: { id: string; fileName: string; title: string; type: 'image' | 'video'; dataAiHint: string; }[] = [
  // Para adicionar novos itens, basta colar o nome do arquivo aqui e preencher os outros campos.
  // Exemplo: { id: 'novo-item', fileName: 'nome-do-seu-arquivo.jpg', title: 'Título do Item', type: 'image', dataAiHint: 'palavras chave' }
  {
    id: 'propaganda-01',
    fileName: 'ap_cartoon_feira_botafogo_77_beterraba_de_ferro.png',
    title: 'Beterraba de Ferro em Botafogo',
    type: 'image',
    dataAiHint: 'beetroot superhero',
  },
  {
    id: 'propaganda-02',
    fileName: 'ap_cartoon_feira_grajau_50_uverine.png',
    title: 'Uverine no Grajaú',
    type: 'image',
    dataAiHint: 'grape character',
  },
  {
    id: 'propaganda-03',
    fileName: 'ap_cartoon_feira_leme_45_limao_america.png',
    title: 'Limão América no Leme',
    type: 'image',
    dataAiHint: 'lemon character',
  },
  {
    id: 'propaganda-04',
    fileName: 'ap_feira_leme_43_coisa_de_milho.mp4',
    title: 'Coisa de Milho no Leme',
    type: 'video',
    dataAiHint: 'corn video',
  },
  {
    id: 'propaganda-05',
    fileName: 'ap_feiras_flamengo_laranjeiras_76_inhame_aranha.mp4',
    title: 'Inhame Aranha em Flamengo e Laranjeiras',
    type: 'video',
    dataAiHint: 'yam character video',
  },
  {
    id: 'propaganda-06',
    fileName: 'ap_todas_feiras_53_sporock.mp4',
    title: 'Sporock para Todas as Feiras',
    type: 'video',
    dataAiHint: 'broccoli character video',
  },
  {
    id: 'propaganda-07',
    fileName: 'anuncio_agricultor_leme.jpg',
    title: 'Anúncio Agricultor Leme',
    type: 'image',
    dataAiHint: 'farmer character',
  },
  {
    id: 'propaganda-08',
    fileName: 'foto_feira_organica.jpg',
    title: 'Foto Feira Orgânica',
    type: 'image',
    dataAiHint: 'organic market stall',
  },
  {
    id: 'propaganda-09',
    fileName: 'aagr_cartoon_feira_botafogo_67_ivison.jpg',
    title: 'Ivison na Feira de Botafogo',
    type: 'image',
    dataAiHint: 'farmer ivison',
  },
  {
    id: 'propaganda-10',
    fileName: 'aagr_cartoon_feira_tijuca_39_lucia.png',
    title: 'Lucia na Feira da Tijuca',
    type: 'image',
    dataAiHint: 'farmer lucia',
  },
  {
    id: 'propaganda-11',
    fileName: 'aagr_cartoon_feira_tijuca_40_evelyn.png',
    title: 'Evelyn na Feira da Tijuca',
    type: 'image',
    dataAiHint: 'farmer evelyn',
  },
  {
    id: 'propaganda-12',
    fileName: 'aagr_cartoon_feira_tijuca_41_luciene.png',
    title: 'Luciene na Feira da Tijuca',
    type: 'image',
    dataAiHint: 'farmer luciene',
  },
  {
    id: 'propaganda-13',
    fileName: 'aagr_cartoon_feira_tijuca_44_rosana.png',
    title: 'Rosana na Feira da Tijuca',
    type: 'image',
    dataAiHint: 'farmer rosana',
  },
  {
    id: 'propaganda-14',
    fileName: 'aagr_cartoon_feiras_flamengo_laranjeiras_74_ivison.png',
    title: 'Ivison em Flamengo e Laranjeiras',
    type: 'image',
    dataAiHint: 'farmer ivison',
  },
  {
    id: 'propaganda-15',
    fileName: 'aagr_cartoon_feiras_flamengo_laranjeiras_94_ivison.png',
    title: 'Ivison em Flamengo e Laranjeiras',
    type: 'image',
    dataAiHint: 'farmer ivison',
  },
  {
    id: 'propaganda-16',
    fileName: 'aagr_cartoon_todas_feiras_23.jpg',
    title: 'Anúncio para Todas as Feiras',
    type: 'image',
    dataAiHint: 'farmer announcement',
  },
  {
    id: 'propaganda-17',
    fileName: 'aagr_feira_botafogo_28_walace.mp4',
    title: 'Walace na Feira de Botafogo',
    type: 'video',
    dataAiHint: 'farmer walace',
  },
  {
    id: 'propaganda-18',
    fileName: 'aagr_feira_botafogo_29_giulia.mp4',
    title: 'Giulia na Feira de Botafogo',
    type: 'video',
    dataAiHint: 'farmer giulia',
  },
  {
    id: 'propaganda-19',
    fileName: 'aagr_feira_botafogo_30_ailton.mp4',
    title: 'Ailton na Feira de Botafogo',
    type: 'video',
    dataAiHint: 'farmer ailton',
  },
  {
    id: 'propaganda-20',
    fileName: 'aagr_feira_botafogo_31_nathalia.mp4',
    title: 'Nathalia na Feira de Botafogo',
    type: 'video',
    dataAiHint: 'farmer nathalia',
  },
  {
    id: 'propaganda-21',
    fileName: 'aagr_feira_botafogo_68_ivison.mp4',
    title: 'Ivison na Feira de Botafogo',
    type: 'video',
    dataAiHint: 'farmer ivison',
  },
];

const STORAGE_BASE_URL = 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/';
const STORAGE_SUB_FOLDER = 'media_minha_feira%2F'; // Corresponde à pasta "media_minha_feira/"
const STORAGE_TOKEN = '?alt=media'; // Token de acesso público, pode precisar ser ajustado se as regras de segurança mudarem

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

    if (themes.length === 0) themes.push('Fotografias');
    return themes;
}

export function getGalleryItems(): GalleryItem[] {
  return allGalleryFileNames.map(item => {
    const isPropagandaFolder = item.fileName.startsWith('anuncio_') || item.fileName.startsWith('foto_');
    const folder = isPropagandaFolder ? 'propagandas%2F' : STORAGE_SUB_FOLDER;
    
    // Constrói a URL completa dinamicamente
    const fullUrl = `${STORAGE_BASE_URL}${folder}${item.fileName}${STORAGE_TOKEN}`;

    const fairs = getFairCategories(item.fileName);
    const themes = getThemeCategories(item.fileName);

    return {
      ...item,
      url: fullUrl,
      fair: fairs,
      theme: themes,
    };
  });
}
