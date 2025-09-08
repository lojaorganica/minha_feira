
import type { GalleryItem } from './types';
import { getNewGalleryItems } from './gallery-data-new';
import { getExtraGalleryItems } from './gallery-data-extra';

/**
 * @fileoverview Este é o arquivo principal que agrega todos os itens da galeria.
 * Ele importa os itens de arquivos de dados separados (`new` e `extra`)
 * para garantir que o sistema permaneça performático e escalável.
 */

export function getGalleryItems(): GalleryItem[] {
  // Importa os itens dos arquivos de lote
  const newItems = getNewGalleryItems();
  const extraItems = getExtraGalleryItems();

  // Retorna a soma de todos os itens da galeria
  return [...newItems, ...extraItems];
}
