
import type { GalleryItem } from './types';

const galleryItems: GalleryItem[] = [
  {
    id: 'propaganda-01',
    title: 'Super Beterraba em Botafogo',
    type: 'image',
    url: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/propagandas%2Fpropaganda_beterraba_botafogo.jpg?alt=media&token=188f6155-2d88-466d-8e43-855799981881',
    fair: ['Botafogo'],
    theme: ['Personagens - Animações e Cartoon'],
    dataAiHint: 'beetroot superhero',
  },
  {
    id: 'propaganda-02',
    title: 'Tomate Feliz na Tijuca',
    type: 'image',
    url: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/propagandas%2Ftomate_anuncio_tijuca.jpg?alt=media&token=e115dbf1-a1b7-4403-9e45-83c92b23a506',
    fair: ['Tijuca'],
    theme: ['Alimentos - Animações e Cartoon'],
    dataAiHint: 'tomato character',
  },
  {
    id: 'propaganda-03',
    title: 'Cenoura do Grajaú',
    type: 'image',
    url: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/propagandas%2Fcenoura_anuncio_grajau.jpg?alt=media&token=6a12c499-4c12-42e1-8868-b80c35395a1a',
    fair: ['Grajaú'],
    theme: ['Alimentos - Animações e Cartoon'],
    dataAiHint: 'carrot character',
  },
  {
    id: 'propaganda-04',
    title: 'Divulgação Geral Feiras',
    type: 'image',
    url: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/propagandas%2Fdivulgacao_geral_feiras.jpg?alt=media&token=c19b6748-0382-45e3-85f8-b397945d8b7b',
    fair: ['Todas'],
    theme: ['Personagens - Animações e Cartoon'],
    dataAiHint: 'vegetables characters',
  },
  {
    id: 'propaganda-05',
    title: 'Vídeo Feira Flamengo',
    type: 'video',
    url: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/propagandas%2Fvideo_anuncio_flamengo_laranjeiras.mp4?alt=media&token=24c4e7f3-e578-43d9-9529-1a06e9389e18',
    fair: ['Flamengo e Laranjeiras'],
    theme: ['Personagens - Animações e Cartoon'],
    dataAiHint: 'vegetables video',
  },
  {
    id: 'propaganda-06',
    title: 'Foto Feira Orgânica',
    type: 'image',
    url: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/propagandas%2Ffoto_feira_organica.jpg?alt=media&token=2e055f10-67c4-42b7-a065-27a1a5b8e9b8',
    fair: ['Todas'],
    theme: ['Fotografias'],
    dataAiHint: 'organic market stall',
  },
  {
    id: 'propaganda-07',
    title: 'Anúncio Agricultor Leme',
    type: 'image',
    url: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/propagandas%2Fanuncio_agricultor_leme.jpg?alt=media&token=a860b2d6-47b2-4d04-89c5-7f1367098485',
    fair: ['Leme'],
    theme: ['Agricultores - Animações e Cartoon'],
    dataAiHint: 'farmer character',
  },
  {
    id: 'propaganda-08',
    title: 'Feira no Bairro de Laranjeiras',
    type: 'image',
    url: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/propagandas%2Ffoto_feira_laranjeiras.jpg?alt=media&token=5b2670e9-74d7-463d-82d2-a38f328198f3',
    fair: ['Flamengo e Laranjeiras'],
    theme: ['Fotografias'],
    dataAiHint: 'organic market photo',
  },
   {
    id: 'propaganda-09',
    title: 'Super Alface em Botafogo',
    type: 'image',
    url: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/propagandas%2Fsuper_alface_botafogo.jpg?alt=media&token=636b1a37-56f8-4a94-82ca-f83199c90b0e',
    fair: ['Botafogo'],
    theme: ['Personagens - Animações e Cartoon'],
    dataAiHint: 'lettuce character',
  },
  {
    id: 'propaganda-10',
    title: 'Orgânicos da Tijuca',
    type: 'image',
    url: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/propagandas%2Forganicos_tijuca.jpg?alt=media&token=522818a7-7a5b-43d9-959c-6a454d67389a',
    fair: ['Tijuca'],
    theme: ['Fotografias'],
    dataAiHint: 'organic food',
  },
  // Adicione mais itens aqui
];

export function getGalleryItems(): GalleryItem[] {
  return galleryItems;
}
