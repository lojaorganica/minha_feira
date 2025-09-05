
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
  // Adicione mais itens aqui
];

export function getGalleryItems(): GalleryItem[] {
  return galleryItems;
}
