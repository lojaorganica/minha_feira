
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
  {
    id: 'propaganda-22',
    fileName: 'aagr_feira_grajau_27_walace.mp4',
    title: 'Walace na Feira do Grajaú',
    type: 'video',
    dataAiHint: 'farmer walace',
  },
  {
    id: 'propaganda-23',
    fileName: 'aagr_feira_grajau_28_matias.mp4',
    title: 'Matias na Feira do Grajaú',
    type: 'video',
    dataAiHint: 'farmer matias',
  },
  {
    id: 'propaganda-24',
    fileName: 'aagr_feira_grajau_29_david_matias.mp4',
    title: 'David Matias na Feira do Grajaú',
    type: 'video',
    dataAiHint: 'farmer david matias',
  },
  {
    id: 'propaganda-25',
    fileName: 'aagr_feira_grajau_30_evelyn.mp4',
    title: 'Evelyn na Feira do Grajaú',
    type: 'video',
    dataAiHint: 'farmer evelyn',
  },
  {
    id: 'propaganda-26',
    fileName: 'aagr_feira_leme_26_walace.mp4',
    title: 'Walace na Feira do Leme',
    type: 'video',
    dataAiHint: 'farmer walace',
  },
  {
    id: 'propaganda-27',
    fileName: 'aagr_feira_tijuca_38a_rosana_evelyn.mp4',
    title: 'Rosana e Evelyn na Feira da Tijuca',
    type: 'video',
    dataAiHint: 'farmer rosana evelyn',
  },
  {
    id: 'propaganda-28',
    fileName: 'aagr_feira_tijuca_38b_rosana_evelyn.mp4',
    title: 'Rosana e Evelyn na Feira da Tijuca (Parte 2)',
    type: 'video',
    dataAiHint: 'farmer rosana evelyn',
  },
  {
    id: 'propaganda-29',
    fileName: 'aagr_feira_tijuca_42_lucia.mp4',
    title: 'Lucia na Feira da Tijuca',
    type: 'video',
    dataAiHint: 'farmer lucia',
  },
  {
    id: 'propaganda-30',
    fileName: 'aagr_feira_tijuca_43a_evelyn.mp4',
    title: 'Evelyn na Feira da Tijuca',
    type: 'video',
    dataAiHint: 'farmer evelyn',
  },
  {
    id: 'propaganda-31',
    fileName: 'aagr_feira_tijuca_43b_evelyn.mp4',
    title: 'Evelyn na Feira da Tijuca (Parte 2)',
    type: 'video',
    dataAiHint: 'farmer evelyn',
  },
  {
    id: 'propaganda-32',
    fileName: 'aagr_feira_tijuca_45_rosana.mp4',
    title: 'Rosana na Feira da Tijuca',
    type: 'video',
    dataAiHint: 'farmer rosana',
  },
  {
    id: 'propaganda-33',
    fileName: 'aagr_feira_tijuca_47_rosana_evelyn.mp4',
    title: 'Rosana e Evelyn na Feira da Tijuca (Final)',
    type: 'video',
    dataAiHint: 'farmer rosana evelyn',
  },
  {
    id: 'propaganda-34',
    fileName: 'aagr_feiras_flamengo_laranjeiras_43_paloma.mp4',
    title: 'Paloma em Flamengo e Laranjeiras',
    type: 'video',
    dataAiHint: 'farmer paloma',
  },
  {
    id: 'propaganda-35',
    fileName: 'aagr_feiras_flamengo_laranjeiras_54_ivison.mp4',
    title: 'Ivison em Flamengo e Laranjeiras',
    type: 'video',
    dataAiHint: 'farmer ivison',
  },
  {
    id: 'propaganda-36',
    fileName: 'aagr_feiras_flamengo_laranjeiras_57_matias_.mp4',
    title: 'Matias em Flamengo e Laranjeiras',
    type: 'video',
    dataAiHint: 'farmer matias',
  },
  {
    id: 'propaganda-37',
    fileName: 'aagr_feiras_flamengo_laranjeiras_58_ivison.mp4',
    title: 'Ivison em Flamengo e Laranjeiras (Parte 2)',
    type: 'video',
    dataAiHint: 'farmer ivison',
  },
  {
    id: 'propaganda-38',
    fileName: 'aagr_story_cartoon_feiras_flamengo_laranjeiras_39_ivison.png',
    title: 'Story Ivison em Flamengo e Laranjeiras',
    type: 'image',
    dataAiHint: 'farmer ivison story',
  },
  {
    id: 'propaganda-39',
    fileName: 'aagr_story_cartoon_feiras_flamengo_laranjeiras_40_rosana.png',
    title: 'Story Rosana em Flamengo e Laranjeiras',
    type: 'image',
    dataAiHint: 'farmer rosana story',
  },
  {
    id: 'propaganda-40',
    fileName: 'aagr_story_cartoon_feiras_flamengo_laranjeiras_50.png',
    title: 'Story Flamengo e Laranjeiras',
    type: 'image',
    dataAiHint: 'farmer story',
  },
  {
    id: 'propaganda-41',
    fileName: 'aagr_story_cartoon_feiras_flamengo_laranjeiras_83_ivison.png',
    title: 'Story Ivison em Flamengo e Laranjeiras (v2)',
    type: 'image',
    dataAiHint: 'farmer ivison story',
  },
  {
    id: 'propaganda-42',
    fileName: 'aagr_story_cartoon_todas_feiras_46_rosana.png',
    title: 'Story Rosana para Todas as Feiras',
    type: 'image',
    dataAiHint: 'farmer rosana story',
  },
  {
    id: 'propaganda-43',
    fileName: 'aagr_story_cartoon_todas_feiras_47_lucia.png',
    title: 'Story Lucia para Todas as Feiras',
    type: 'image',
    dataAiHint: 'farmer lucia story',
  },
   {
    id: 'propaganda-44',
    fileName: 'aagr_story_cartoon_todas_feiras_85_ivison.png',
    title: 'Story Ivison para Todas as Feiras',
    type: 'image',
    dataAiHint: 'farmer ivison story',
  },
  {
    id: 'propaganda-45',
    fileName: 'aagr_todas_feiras_46_walace.mp4',
    title: 'Walace para Todas as Feiras',
    type: 'video',
    dataAiHint: 'farmer walace',
  },
  {
    id: 'propaganda-46',
    fileName: 'aagr_todas_feiras_49_matias_david.mp4',
    title: 'Matias e David para Todas as Feiras',
    type: 'video',
    dataAiHint: 'farmer matias david',
  },
  {
    id: 'propaganda-47',
    fileName: 'aali_025_abacate_feira_grajau.mp4',
    title: 'Abacate na Feira do Grajaú',
    type: 'video',
    dataAiHint: 'avocado video',
  },
  {
    id: 'propaganda-48',
    fileName: 'aali_026_abacate_feira_botafogo.mp4',
    title: 'Abacate na Feira de Botafogo',
    type: 'video',
    dataAiHint: 'avocado video',
  },
  {
    id: 'propaganda-49',
    fileName: 'aali_026_abacate_feira_leme.mp4',
    title: 'Abacate na Feira do Leme',
    type: 'video',
    dataAiHint: 'avocado video',
  },
  {
    id: 'propaganda-50',
    fileName: 'aali_026_maracugina_feira_grajau.mp4',
    title: 'Maracugina na Feira do Grajaú',
    type: 'video',
    dataAiHint: 'passion fruit character',
  },
  {
    id: 'propaganda-51',
    fileName: 'aali_027_maracugina_feira_botafogo.mp4',
    title: 'Maracugina na Feira de Botafogo',
    type: 'video',
    dataAiHint: 'passion fruit character',
  },
  {
    id: 'propaganda-52',
    fileName: 'aali_031_abacate_feira_tijuca.mp4',
    title: 'Abacate na Feira da Tijuca',
    type: 'video',
    dataAiHint: 'avocado video',
  },
  {
    id: 'propaganda-53',
    fileName: 'aali_032_maracugina_feira_tijuca.mp4',
    title: 'Maracugina na Feira da Tijuca',
    type: 'video',
    dataAiHint: 'passion fruit character',
  },
  {
    id: 'propaganda-54',
    fileName: 'aali_038_maca_todas_feiras.mp4',
    title: 'Maçã para Todas as Feiras',
    type: 'video',
    dataAiHint: 'apple video',
  },
  {
    id: 'propaganda-55',
    fileName: 'aali_041_abacate_todas_feiras.mp4',
    title: 'Abacate para Todas as Feiras',
    type: 'video',
    dataAiHint: 'avocado video',
  },
  {
    id: 'propaganda-56',
    fileName: 'aali_045_maracugina_todas_feiras.mp4',
    title: 'Maracugina para Todas as Feiras',
    type: 'video',
    dataAiHint: 'passion fruit character video',
  },
  {
    id: 'propaganda-57',
    fileName: 'aali_049_cenoura_feiras_flamengo_laranjeiras.mp4',
    title: 'Cenoura em Flamengo e Laranjeiras',
    type: 'video',
    dataAiHint: 'carrot video',
  },
  {
    id: 'propaganda-58',
    fileName: 'aali_057_maracugina_feira_leme.mp4',
    title: 'Maracugina na Feira do Leme',
    type: 'video',
    dataAiHint: 'passion fruit character video',
  },
  {
    id: 'propaganda-59',
    fileName: 'aali_058_maca_feira_leme.mp4',
    title: 'Maçã na Feira do Leme',
    type: 'video',
    dataAiHint: 'apple video',
  },
  {
    id: 'propaganda-60',
    fileName: 'aali_060_maca_feira_grajau.mp4',
    title: 'Maçã na Feira do Grajaú',
    type: 'video',
    dataAiHint: 'apple video',
  },
  {
    id: 'propaganda-61',
    fileName: 'aali_061_maca_feira_botafogo.mp4',
    title: 'Maçã na Feira de Botafogo',
    type: 'video',
    dataAiHint: 'apple video',
  },
  {
    id: 'propaganda-62',
    fileName: 'aali_064_cenoura_feira_leme.mp4',
    title: 'Cenoura na Feira do Leme',
    type: 'video',
    dataAiHint: 'carrot video',
  },
  {
    id: 'propaganda-63',
    fileName: 'aali_065_cenoura_feira_grajau.mp4',
    title: 'Cenoura na Feira do Grajaú',
    type: 'video',
    dataAiHint: 'carrot video',
  },
  {
    id: 'propaganda-64',
    fileName: 'aali_066_cenoura_feira_botafogo.mp4',
    title: 'Cenoura na Feira de Botafogo',
    type: 'video',
    dataAiHint: 'carrot video',
  },
  {
    id: 'propaganda-65',
    fileName: 'aali_078_maca_feira_tijuca.mp4',
    title: 'Maçã na Feira da Tijuca',
    type: 'video',
    dataAiHint: 'apple video',
  },
  {
    id: 'propaganda-66',
    fileName: 'aali_083_cenoura_feira_tijuca.mp4',
    title: 'Cenoura na Feira da Tijuca',
    type: 'video',
    dataAiHint: 'carrot video',
  },
  {
    id: 'propaganda-67',
    fileName: 'aali_086_cenoura_todas_feiras.mp4',
    title: 'Cenoura para Todas as Feiras',
    type: 'video',
    dataAiHint: 'carrot video',
  },
  {
    id: 'propaganda-68',
    fileName: 'aali_100_maca_feiras_flamengo_laranjeiras.mp4',
    title: 'Maçã em Flamengo e Laranjeiras',
    type: 'video',
    dataAiHint: 'apple video',
  },
  {
    id: 'propaganda-69',
    fileName: 'aali_101_abacate_feiras_flamengo_laranjeiras.mp4',
    title: 'Abacate em Flamengo e Laranjeiras',
    type: 'video',
    dataAiHint: 'avocado video',
  },
  {
    id: 'propaganda-70',
    fileName: 'aali_148_maracugina_feiras_flamengo_laranjeiras.mp4',
    title: 'Maracugina em Flamengo e Laranjeiras',
    type: 'video',
    dataAiHint: 'passion fruit character video',
  },
  {
    id: 'propaganda-71',
    fileName: 'aali_cartoon_020_tomate_feira_grajau.png',
    title: 'Tomate na Feira do Grajaú',
    type: 'image',
    dataAiHint: 'tomato cartoon',
  },
  {
    id: 'propaganda-72',
    fileName: 'aali_cartoon_021_tomate_feira_botafogo.png',
    title: 'Tomate na Feira de Botafogo',
    type: 'image',
    dataAiHint: 'tomato cartoon',
  },
  {
    id: 'propaganda-73',
    fileName: 'aali_cartoon_021_tomate_feira_leme.png',
    title: 'Tomate na Feira do Leme',
    type: 'image',
    dataAiHint: 'tomato cartoon',
  },
  {
    id: 'propaganda-74',
    fileName: 'aali_cartoon_022_maca_feira_grajau.png',
    title: 'Maçã na Feira do Grajaú',
    type: 'image',
    dataAiHint: 'apple cartoon',
  },
  {
    id: 'propaganda-75',
    fileName: 'aali_cartoon_023_maca_feira_botafogo.png',
    title: 'Maçã na Feira de Botafogo',
    type: 'image',
    dataAiHint: 'apple cartoon',
  },
  {
    id: 'propaganda-76',
    fileName: 'aali_cartoon_023_maca_feira_leme.png',
    title: 'Maçã na Feira do Leme',
    type: 'image',
    dataAiHint: 'apple cartoon',
  },
  {
    id: 'propaganda-77',
    fileName: 'aali_cartoon_024_abacate_feira_grajau.png',
    title: 'Abacate na Feira do Grajaú',
    type: 'image',
    dataAiHint: 'avocado cartoon',
  },
  {
    id: 'propaganda-78',
    fileName: 'aali_cartoon_025_abacate_feira_botafogo.png',
    title: 'Abacate na Feira de Botafogo',
    type: 'image',
    dataAiHint: 'avocado cartoon',
  },
  {
    id: 'propaganda-79',
    fileName: 'aali_cartoon_025_abacate_feira_leme.png',
    title: 'Abacate na Feira do Leme',
    type: 'image',
    dataAiHint: 'avocado cartoon',
  },
  {
    id: 'propaganda-80',
    fileName: 'aali_cartoon_025_tomate_feira_tijuca.png',
    title: 'Tomate na Feira da Tijuca',
    type: 'image',
    dataAiHint: 'tomato cartoon',
  },
  {
    id: 'propaganda-81',
    fileName: 'aali_cartoon_032_tomate_feiras_flamengo_laranjeiras.png',
    title: 'Tomate em Flamengo e Laranjeiras',
    type: 'image',
    dataAiHint: 'tomato cartoon',
  },
  {
    id: 'propaganda-82',
    fileName: 'aali_cartoon_036_maca_feiras_flamengo_laranjeiras.png',
    title: 'Maçã em Flamengo e Laranjeiras',
    type: 'image',
    dataAiHint: 'apple cartoon',
  },
  {
    id: 'propaganda-83',
    fileName: 'aali_cartoon_036_tomate_todas_feiras.png',
    title: 'Tomate para Todas as Feiras',
    type: 'image',
    dataAiHint: 'tomato cartoon',
  },
  {
    id: 'propaganda-84',
    fileName: 'aali_cartoon_037_cenoura_feiras_flamengo_laranjeiras.png',
    title: 'Cenoura em Flamengo e Laranjeiras',
    type: 'image',
    dataAiHint: 'carrot cartoon',
  },
  {
    id: 'propaganda-85',
    fileName: 'aali_cartoon_038_maca_todas_feiras.png',
    title: 'Maçã para Todas as Feiras',
    type: 'image',
    dataAiHint: 'apple cartoon',
  },
  {
    id: 'propaganda-86',
    fileName: 'aali_cartoon_039_abacate_feira_tijuca.png',
    title: 'Abacate na Feira da Tijuca',
    type: 'image',
    dataAiHint: 'avocado cartoon',
  },
  {
    id: 'propaganda-87',
    fileName: 'aali_cartoon_042_abacate_todas_feiras.png',
    title: 'Abacate para Todas as Feiras',
    type: 'image',
    dataAiHint: 'avocado cartoon',
  },
  {
    id: 'propaganda-88',
    fileName: 'aali_cartoon_043_abacate_feiras_flamengo_laranjeiras.png',
    title: 'Abacate em Flamengo e Laranjeiras',
    type: 'image',
    dataAiHint: 'avocado cartoon',
  },
  {
    id: 'propaganda-89',
    fileName: 'aali_cartoon_044_maracugina_feiras_flamengo_laranjeiras.png',
    title: 'Maracugina em Flamengo e Laranjeiras',
    type: 'image',
    dataAiHint: 'passion fruit character',
  },
  {
    id: 'propaganda-90',
    fileName: 'aali_cartoon_059_maracugina_feira_leme.png',
    title: 'Maracugina na Feira do Leme',
    type: 'image',
    dataAiHint: 'passion fruit character',
  },
  {
    id: 'propaganda-91',
    fileName: 'aali_cartoon_061_maracugina_feira_grajau.png',
    title: 'Maracugina na Feira do Grajaú',
    type: 'image',
    dataAiHint: 'passion fruit character',
  },
  {
    id: 'propaganda-92',
    fileName: 'aali_cartoon_062_maracugina_feira_botafogo.png',
    title: 'Maracugina na Feira de Botafogo',
    type: 'image',
    dataAiHint: 'passion fruit character',
  },
  {
    id: 'propaganda-93',
    fileName: 'aali_cartoon_063_cenoura_feira_leme.png',
    title: 'Cenoura na Feira do Leme',
    type: 'image',
    dataAiHint: 'carrot cartoon',
  },
  {
    id: 'propaganda-94',
    fileName: 'aali_cartoon_064_cenoura_feira_grajau.png',
    title: 'Cenoura na Feira do Grajaú',
    type: 'image',
    dataAiHint: 'carrot cartoon',
  },
  {
    id: 'propaganda-95',
    fileName: 'aali_cartoon_065_cenoura_feira_botafogo.png',
    title: 'Cenoura na Feira de Botafogo',
    type: 'image',
    dataAiHint: 'carrot cartoon',
  },
  {
    id: 'propaganda-96',
    fileName: 'aali_cartoon_077_maca_feira_tijuca.png',
    title: 'Maçã na Feira da Tijuca',
    type: 'image',
    dataAiHint: 'apple cartoon',
  },
  {
    id: 'propaganda-97',
    fileName: 'aali_cartoon_079_maracugina_feira_tijuca.png',
    title: 'Maracugina na Feira da Tijuca',
    type: 'image',
    dataAiHint: 'passion fruit character',
  },
  {
    id: 'propaganda-98',
    fileName: 'aali_cartoon_082_cenoura_feira_tijuca.png',
    title: 'Cenoura na Feira da Tijuca',
    type: 'image',
    dataAiHint: 'carrot cartoon',
  },
  {
    id: 'propaganda-99',
    fileName: 'aali_cartoon_082_maracugina_todas_feiras.png',
    title: 'Maracugina para Todas as Feiras',
    type: 'image',
    dataAiHint: 'passion fruit character',
  },
  {
    id: 'propaganda-100',
    fileName: 'aali_cartoon_085_cenoura_todas_feiras.png',
    title: 'Cenoura para Todas as Feiras',
    type: 'image',
    dataAiHint: 'carrot cartoon',
  },
  {
    id: 'propaganda-101',
    fileName: 'aali_story_cartoon_016_tomate_feiras_flamengo_laranjeiras.png',
    title: 'Story Tomate em Flamengo e Laranjeiras',
    type: 'image',
    dataAiHint: 'tomato story'
  },
  {
    id: 'propaganda-102',
    fileName: 'aali_story_cartoon_018_feiras_flamengo_laranjeiras.png',
    title: 'Story Flamengo e Laranjeiras',
    type: 'image',
    dataAiHint: 'organic market story'
  },
  {
    id: 'propaganda-103',
    fileName: 'aali_story_cartoon_020_maca_todas_feiras.png',
    title: 'Story Maçã para Todas as Feiras',
    type: 'image',
    dataAiHint: 'apple story'
  },
  {
    id: 'propaganda-104',
    fileName: 'aali_story_cartoon_022_mara_feiras_flamengo_laranjeiras.png',
    title: 'Story Mara em Flamengo e Laranjeiras',
    type: 'image',
    dataAiHint: 'character story'
  },
  {
    id: 'propaganda-105',
    fileName: 'aali_story_cartoon_024_abacate_feiras_flamengo_laranjeiras.png',
    title: 'Story Abacate em Flamengo e Laranjeiras',
    type: 'image',
    dataAiHint: 'avocado story'
  },
  {
    id: 'propaganda-106',
    fileName: 'aali_story_cartoon_026_abacate_todas_feiras.png',
    title: 'Story Abacate para Todas as Feiras',
    type: 'image',
    dataAiHint: 'avocado story'
  },
  {
    id: 'propaganda-107',
    fileName: 'aali_story_cartoon_027_cenoura_todas_feiras.png',
    title: 'Story Cenoura para Todas as Feiras',
    type: 'image',
    dataAiHint: 'carrot story'
  },
  {
    id: 'propaganda-108',
    fileName: 'aali_story_cartoon_028_maracugina_todas_feiras.png',
    title: 'Story Maracugina para Todas as Feiras',
    type: 'image',
    dataAiHint: 'passion fruit story'
  },
  {
    id: 'propaganda-109',
    fileName: 'aali_story_cartoon_082_cenoura_feiras_flamengo_laranjeiras.png',
    title: 'Story Cenoura em Flamengo e Laranjeiras',
    type: 'image',
    dataAiHint: 'carrot story'
  },
  {
    id: 'propaganda-110',
    fileName: 'aali_story_cartoon_084_tomate_todas_feiras.png',
    title: 'Story Tomate para Todas as Feiras',
    type: 'image',
    dataAiHint: 'tomato story'
  },
  {
    id: 'propaganda-111',
    fileName: 'ap_cartoon_feira_botafogo_19_joaninha.png',
    title: 'Joaninha na Feira de Botafogo',
    type: 'image',
    dataAiHint: 'ladybug character'
  },
  {
    id: 'propaganda-112',
    fileName: 'ap_cartoon_feira_botafogo_38_aqualface.png',
    title: 'Aqualface na Feira de Botafogo',
    type: 'image',
    dataAiHint: 'lettuce character'
  },
  {
    id: 'propaganda-113',
    fileName: 'ap_cartoon_feira_botafogo_39_batatman.png',
    title: 'Batatman na Feira de Botafogo',
    type: 'image',
    dataAiHint: 'potato character'
  },
  {
    id: 'propaganda-114',
    fileName: 'ap_cartoon_feira_botafogo_40_robinete.png',
    title: 'Robinete na Feira de Botafogo',
    type: 'image',
    dataAiHint: 'radish character'
  },
  {
    id: 'propaganda-115',
    fileName: 'ap_cartoon_feira_botafogo_42_inhame_aranha.png',
    title: 'Inhame Aranha na Feira de Botafogo',
    type: 'image',
    dataAiHint: 'yam character'
  },
  {
    id: 'propaganda-116',
    fileName: 'ap_cartoon_feira_botafogo_43_sporock.png',
    title: 'Sporock na Feira de Botafogo',
    type: 'image',
    dataAiHint: 'broccoli character'
  },
  {
    id: 'propaganda-117',
    fileName: 'ap_cartoon_feira_botafogo_46_uva_negra.png',
    title: 'Uva Negra na Feira de Botafogo',
    type: 'image',
    dataAiHint: 'grape character'
  },
  {
    id: 'propaganda-118',
    fileName: 'ap_cartoon_feira_botafogo_48_coisa_de_milho.png',
    title: 'Coisa de Milho na Feira de Botafogo',
    type: 'image',
    dataAiHint: 'corn character'
  },
  {
    id: 'propaganda-119',
    fileName: 'ap_cartoon_feira_botafogo_49_limao_america.png',
    title: 'Limão América na Feira de Botafogo',
    type: 'image',
    dataAiHint: 'lemon character'
  },
  {
    id: 'propaganda-120',
    fileName: 'ap_cartoon_feira_botafogo_51_uverine.png',
    title: 'Uverine na Feira de Botafogo',
    type: 'image',
    dataAiHint: 'grape character'
  },
  {
    id: 'propaganda-121',
    fileName: 'ap_cartoon_feira_botafogo_54_berinjela_negra.png',
    title: 'Berinjela Negra na Feira de Botafogo',
    type: 'image',
    dataAiHint: 'eggplant character'
  },
  {
    id: 'propaganda-122',
    fileName: 'ap_cartoon_feira_botafogo_55_brulk.png',
    title: 'Brulk na Feira de Botafogo',
    type: 'image',
    dataAiHint: 'brulk character'
  },
  {
    id: 'propaganda-123',
    fileName: 'ap_cartoon_feira_botafogo_57_mandiorpheus.png',
    title: 'Mandiorpheus na Feira de Botafogo',
    type: 'image',
    dataAiHint: 'mandiorpheus character'
  },
  {
    id: 'propaganda-124',
    fileName: 'ap_cartoon_feira_botafogo_60_abobrinha_maravilha.png',
    title: 'Abobrinha Maravilha na Feira de Botafogo',
    type: 'image',
    dataAiHint: 'zucchini character'
  },
  {
    id: 'propaganda-125',
    fileName: 'ap_cartoon_feira_botafogo_64_pepino_verde.png',
    title: 'Pepino Verde na Feira de Botafogo',
    type: 'image',
    dataAiHint: 'cucumber character'
  },
  {
    id: 'propaganda-126',
    fileName: 'ap_cartoon_feira_grajau_18_joaninha.png',
    title: 'Joaninha na Feira do Grajaú',
    type: 'image',
    dataAiHint: 'ladybug character'
  },
  {
    id: 'propaganda-127',
    fileName: 'ap_cartoon_feira_grajau_33_batatman.png',
    title: 'Batatman na Feira do Grajaú',
    type: 'image',
    dataAiHint: 'potato character'
  },
  {
    id: 'propaganda-128',
    fileName: 'ap_cartoon_feira_grajau_34_inhame_aranha.png',
    title: 'Inhame Aranha na Feira do Grajaú',
    type: 'image',
    dataAiHint: 'yam character'
  },
  {
    id: 'propaganda-129',
    fileName: 'ap_cartoon_feira_grajau_36_robinete.png',
    title: 'Robinete na Feira do Grajaú',
    type: 'image',
    dataAiHint: 'radish character'
  },
  {
    id: 'propaganda-130',
    fileName: 'ap_cartoon_feira_grajau_42_aqualface.png',
    title: 'Aqualface na Feira do Grajaú',
    type: 'image',
    dataAiHint: 'lettuce character'
  },
  {
    id: 'propaganda-131',
    fileName: 'ap_cartoon_feira_grajau_42_sporock.png',
    title: 'Sporock na Feira do Grajaú',
    type: 'image',
    dataAiHint: 'broccoli character'
  },
  {
    id: 'propaganda-132',
    fileName: 'ap_cartoon_feira_grajau_44_uva_negra.png',
    title: 'Uva Negra na Feira do Grajaú',
    type: 'image',
    dataAiHint: 'grape character'
  },
  {
    id: 'propaganda-133',
    fileName: 'ap_cartoon_feira_grajau_46_coisa_de_milho.png',
    title: 'Coisa de Milho na Feira do Grajaú',
    type: 'image',
    dataAiHint: 'corn character'
  },
  {
    id: 'propaganda-134',
    fileName: 'ap_cartoon_feira_grajau_49_limao_america.png',
    title: 'Limão América na Feira do Grajaú',
    type: 'image',
    dataAiHint: 'lemon character'
  },
  {
    id: 'propaganda-135',
    fileName: 'ap_cartoon_feira_grajau_52_berinjela_negra.png',
    title: 'Berinjela Negra na Feira do Grajaú',
    type: 'image',
    dataAiHint: 'eggplant character'
  },
  {
    id: 'propaganda-136',
    fileName: 'ap_cartoon_feira_grajau_55_brulk.png',
    title: 'Brulk na Feira do Grajaú',
    type: 'image',
    dataAiHint: 'brulk character'
  },
  {
    id: 'propaganda-137',
    fileName: 'ap_cartoon_feira_grajau_56_mandiorpheus.png',
    title: 'Mandiorpheus na Feira do Grajaú',
    type: 'image',
    dataAiHint: 'mandiorpheus character'
  },
  {
    id: 'propaganda-138',
    fileName: 'ap_cartoon_feira_grajau_59_abobrinha_maravilha.png',
    title: 'Abobrinha Maravilha na Feira do Grajaú',
    type: 'image',
    dataAiHint: 'zucchini character'
  },
  {
    id: 'propaganda-139',
    fileName: 'ap_cartoon_feira_grajau_64_pepino_verde.png',
    title: 'Pepino Verde na Feira do Grajaú',
    type: 'image',
    dataAiHint: 'cucumber character'
  },
  {
    id: 'propaganda-140',
    fileName: 'ap_cartoon_feira_grajau_74_beterraba_de_ferro.png',
    title: 'Beterraba de Ferro na Feira do Grajaú',
    type: 'image',
    dataAiHint: 'beetroot character'
  },
  {
    id: 'propaganda-141',
    fileName: 'ap_cartoon_feira_leme_19_joaninha.png',
    title: 'Joaninha na Feira do Leme',
    type: 'image',
    dataAiHint: 'ladybug character'
  },
  {
    id: 'propaganda-142',
    fileName: 'ap_cartoon_feira_leme_35_aqualface.png',
    title: 'Aqualface na Feira do Leme',
    type: 'image',
    dataAiHint: 'lettuce character'
  },
  {
    id: 'propaganda-143',
    fileName: 'ap_cartoon_feira_leme_36_batatman.png',
    title: 'Batatman na Feira do Leme',
    type: 'image',
    dataAiHint: 'potato character'
  },
  {
    id: 'propaganda-144',
    fileName: 'ap_cartoon_feira_leme_38_robinete.png',
    title: 'Robinete na Feira do Leme',
    type: 'image',
    dataAiHint: 'radish character'
  },
  {
    id: 'propaganda-145',
    fileName: 'ap_cartoon_feira_leme_39_inhame_aranha.png',
    title: 'Inhame Aranha na Feira do Leme',
    type: 'image',
    dataAiHint: 'yam character'
  },
  {
    id: 'propaganda-146',
    fileName: 'ap_cartoon_feira_leme_40_sporock.png',
    title: 'Sporock na Feira do Leme',
    type: 'image',
    dataAiHint: 'broccoli character'
  },
  {
    id: 'propaganda-147',
    fileName: 'ap_cartoon_feira_leme_42_uva_negra.png',
    title: 'Uva Negra na Feira do Leme',
    type: 'image',
    dataAiHint: 'grape character'
  },
  {
    id: 'propaganda-148',
    fileName: 'ap_cartoon_feira_leme_44_coisa_de_milho.png',
    title: 'Coisa de Milho na Feira do Leme',
    type: 'image',
    dataAiHint: 'corn character'
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

function extractFileNameFromUrl(url: string): string {
    try {
        const decodedUrl = decodeURIComponent(url);
        const path = new URL(decodedUrl).pathname;
        const parts = path.split('/');
        // Pega a última parte, que deve ser o nome do arquivo, e remove query params se houver
        return parts[parts.length - 1].split('?')[0];
    } catch (e) {
        console.error("URL inválida para extração do nome do arquivo:", url, e);
        // Tenta uma abordagem mais simples como fallback
        const lastSlashIndex = url.lastIndexOf('%2F');
        const questionMarkIndex = url.indexOf('?');
        if (lastSlashIndex !== -1 && questionMarkIndex !== -1) {
            return decodeURIComponent(url.substring(lastSlashIndex + 3, questionMarkIndex));
        }
        return `arquivo-${Math.random()}`; // Retorna um nome genérico em caso de falha total
    }
}


export function getGalleryItems(): GalleryItem[] {
  const allItems: GalleryItem[] = [];

  // Primeiro, processa os itens que já estão na lista de nomes de arquivos
  const processedFromNames = allGalleryFileNames.map(item => {
    const isPropagandaFolder = item.fileName.startsWith('anuncio_') || item.fileName.startsWith('foto_');
    const folder = isPropagandaFolder ? 'propagandas%2F' : STORAGE_SUB_FOLDER;
    
    const decodedFileName = decodeURIComponent(item.fileName);

    const fullUrl = `${STORAGE_BASE_URL}${folder}${item.fileName}${STORAGE_TOKEN}`;

    const fairs = getFairCategories(decodedFileName);
    const themes = getThemeCategories(decodedFileName);

    return {
      ...item,
      url: fullUrl,
      fair: fairs,
      theme: themes,
    };
  });
  allItems.push(...processedFromNames);


  // Adiciona as URLs completas fornecidas, evitando duplicatas
  const providedUrls = [
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_leme_45_limao_america.png?alt=media&token=4d03805c-8095-4d3a-acb9-4a65bac4cdc5",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_leme_47_uverine.png?alt=media&token=18f961db-2fb0-480d-8336-fd06d1f20158",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_leme_50_berinjela_negra.png?alt=media&token=595f9ec8-38a6-4710-89a4-c393043a02b2",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_leme_51_brulk.png?alt=media&token=0ebddb7c-3812-4dd5-927a-b154e7db738e",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_leme_53_mandiorpheus.png?alt=media&token=e47ac5f5-4dd5-4146-be8b-f868a0b12104",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_leme_56_abobrinha_maravilha.png?alt=media&token=e05beaa4-7ffc-43f9-9027-78d401170859",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_leme_61_pepino_verde.png?alt=media&token=e3dd85b2-8c8e-4b50-bc4d-cd7736496113",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_leme_73_beterraba_de_ferro.png?alt=media&token=5ad2d81b-e23b-4b2c-ac5c-655575b71503",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_tijuca_21_joaninha.png?alt=media&token=752d11e3-ae78-446d-ad76-2c94823fc2a2",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_tijuca_50_inhame_aranha.png?alt=media&token=2c0bd11a-08f3-4b29-98ca-1e3ce00e1127",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_tijuca_51_batatman.png?alt=media&token=d7e06552-4821-4ea1-8469-e2b0979405c8",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_tijuca_53_robinete.png?alt=media&token=b2bba7a7-b4ac-49ef-94d8-386161459896",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_tijuca_58_aqualface.png?alt=media&token=57330ade-030e-4e9e-b949-1bcbb91a5c88",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_tijuca_59_sporock.png?alt=media&token=2ebffec2-5b53-4d64-9ae1-17065e8f8b34",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_tijuca_62_uva_negra.png?alt=media&token=e71f5f17-9b97-4faf-9086-b6b10e71f184",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_tijuca_64_coisa_de_milho.png?alt=media&token=ce945b98-3794-4794-9d46-3dcb677d3da8",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_tijuca_65_limao_america.png?alt=media&token=02d43d7a-b3b5-4f20-b473-a4d895ff2bc3",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_tijuca_67_uverine.png?alt=media&token=ef1cf006-f941-44b6-bf1e-c7d007854b33",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_tijuca_70_berinjela_negra.png?alt=media&token=eedd470f-fad7-46b3-a078-33aeea795cf8",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_tijuca_73_mandiorpheus.png?alt=media&token=aaea14d0-93b9-4e02-93ae-0e6e60d4da6d",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_tijuca_81_pepino_verde.png?alt=media&token=b33cf144-855e-4731-aaf6-3de935f12bf8",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_tijuca_92_beterraba_de_ferro.png?alt=media&token=8082d54a-1cde-4893-9b5d-ec123e3f84f3",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_flamengo_laranjeiras_103_bete.png?alt=media&token=3c112f6f-4ad9-4a54-8564-9d0ed6e9582d",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_flamengo_laranjeiras_23_joaninha.png?alt=media&token=a069c205-4637-4b90-8e63-c085fc868f1b",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_flamengo_laranjeiras_61_batatman.png?alt=media&token=6ea75b42-6d6c-454c-b13f-8d0cb5928e40",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_flamengo_laranjeiras_63_mandio.png?alt=media&token=099d9f7d-9464-4984-a582-0cfc61fb4f1e",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_flamengo_laranjeiras_65_inhame.png?alt=media&token=325038c4-6b3d-4596-895c-8313f18d284a",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_flamengo_laranjeiras_66_uverine.png?alt=media&token=e6fb071b-b225-4283-8ae2-78434e00d8fc",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_flamengo_laranjeiras_67_robinete.png?alt=media&token=d5136c13-3189-4129-9579-acb47f39f48e",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_flamengo_laranjeiras_70_aqua.png?alt=media&token=4a9952c9-1db4-4707-9e5b-c17b588bf68e",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_flamengo_laranjeiras_77_sporock.png?alt=media&token=07d8f7a7-b4d8-4fbb-a66c-2946e6c5af79",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_flamengo_laranjeiras_80_uva_negra.png?alt=media&token=bb990aa6-f533-4275-a241-0b8344cac861",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_flamengo_laranjeiras_82_limao.png?alt=media&token=1a7c917d-c619-4b4d-aceb-403ad22e8d58",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_flamengo_laranjeiras_93_abobrinha.png?alt=media&token=6d3b6395-a7ad-4538-98a7-732494b7b0b4",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_flamengo_laranjeiras_93_pepino.png?alt=media&token=0dc5c5d8-ed9c-471d-8067-4ffe4b7ee6e7",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_flamengo_laranjeiras_94a_coisa.png?alt=media&token=b690ab5e-a050-420c-8ff5-3881b8b1fed9",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_flamengo_laranjeiras_94b_coisa.png?alt=media&token=d934d89d-9359-447c-8f52-c142a603ea0f",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_flamengo_laranjeiras_97_berin.png?alt=media&token=29eb0d33-0244-426e-8cf4-6199f9146f35",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_flamengo_laranjeiras_99_brulk.png?alt=media&token=593a813f-b898-4f13-ba07-8286acd7acf1",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_tijuca_72_brulk.png?alt=media&token=70efbb2e-f058-4ebd-98a5-4a69d75f41ba",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_103_bete.png?alt=media&token=b6c3e862-4a7a-4bf6-b78a-bc8579495b86",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_36_bata.png?alt=media&token=20e18dcb-b7f0-410a-922b-a98a9ab2d985",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_38_robin.png?alt=media&token=526e91d5-bf81-46e6-9d66-e9efa84d4807",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_44_sporock.png?alt=media&token=43001901-4292-4d29-bd47-edb5897cca89",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_45_inhame.png?alt=media&token=fdd03fd9-4461-4561-9a67-304ab8aeee55",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_48_uva.png?alt=media&token=a65368aa-dec7-471a-a6e7-e06fd1582154",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_49_limao.png?alt=media&token=d293f76c-464c-4d1b-8015-303f146aaaf6",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_52_uverine.png?alt=media&token=658030d2-6d5f-4032-9d14-844f75a6500a",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_53_beri.png?alt=media&token=b733bbed-dcd6-4f2a-ad0d-b786684f6f97",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_57_brulk.png?alt=media&token=5f80cf2e-6492-45a1-9e8d-0f92dde7ab73",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_63_abobrinha_maravilha.png?alt=media&token=db9327cd-a40d-44ad-ba44-aaaf85730fa4",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_64_coisa.jpeg?alt=media&token=69990a11-90ee-4f3c-a051-8ad12a79215e",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_70_aqua.png?alt=media&token=47c7ac36-9d58-42fa-ba71-1f8057e6e7f4",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_76_mandi.png?alt=media&token=3b4385d4-6c8a-42cb-a48b-10919dcfe8f2",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_79_pepino.png?alt=media&token=fc091f89-17c3-4e76-8457-473eef8f8bc3",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_todas_feiras_102_beterraba_de_ferro.png?alt=media&token=68d94139-f7c3-412e-ae5f-ee8f560e2cd8",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_todas_feiras_36_batatman.png?alt=media&token=9c5f537f-6f8f-4932-a1c5-f838b5f26bb5",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_todas_feiras_41_sporock.png?alt=media&token=6f8933dd-843c-47af-9d23-2857596aa576",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_todas_feiras_42_inhame_aranha.png?alt=media&token=6d6fdfd8-8139-41a5-b6a5-0f5d51e55885",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_todas_feiras_61_aqualface.png?alt=media&token=e3a7691c-dff9-47b7-b75c-3fba31ad6de0",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_todas_feiras_66_robinete.png?alt=media&token=a4b6681c-e989-435f-9afa-881449696269",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_todas_feiras_67_coisa_de_milho.png?alt=media&token=3fb50090-3c24-4dbd-8809-0ee48af7171b",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_todas_feiras_68_uva_negra.png?alt=media&token=eb834665-5b86-434e-87a0-cabd67f8211a",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_todas_feiras_70_limao_america.png?alt=media&token=9e888adf-86a8-42d0-9577-a37238695479",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_todas_feiras_72_uverine.png?alt=media&token=d886adda-aebc-4fec-b3f6-5e1a1d18a41c",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_todas_feiras_73_berinjela_negra.png?alt=media&token=2ccff49f-bff4-41ed-9f13-ed64c77e102b",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_todas_feiras_75_brulk.png?alt=media&token=bf189472-fab5-4d29-99f8-1a0cf2ee730b",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_todas_feiras_75_brulk.png?alt=media&token=bf189472-fab5-4d29-99f8-1a0cf2ee730b",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_todas_feiras_79_abobrinha_maravilha.png?alt=media&token=f8621c97-24e7-44bd-984a-2b10413a420d",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_todas_feiras_80_pepino.png?alt=media&token=ba9dd9e5-75a3-453e-872f-62e03f804ab3",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_todas_feiras_102_beterraba_de_ferro.png?alt=media&token=42214b73-7be5-4396-8f92-00adc3574f34",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_todas_feiras_28_joaninha.png?alt=media&token=ba64cf3f-d89f-45ad-89f9-a49eb6f5caf4",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_todas_feiras_51_batatman.png?alt=media&token=2124d0fe-3ce9-48d0-8685-6a3afa681739",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_todas_feiras_60_aqualface.png?alt=media&token=2982f1ee-4ee8-45e2-8e8c-2a97a9c70546",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_todas_feiras_63_robinete.png?alt=media&token=6755a62d-0d0b-43b0-b418-588ebbfbdf85",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_todas_feiras_64_inhame_aranha.png?alt=media&token=3526f683-a529-4c4a-adb0-62450cc3b513",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_todas_feiras_65_sporock.png?alt=media&token=327dc776-015f-4593-a61e-c04304e352b6",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_todas_feiras_67_coisa_de_milho.png?alt=media&token=8e3ba13e-34e7-407b-9884-9dadb23ce941",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_todas_feiras_69_uva_negra.png?alt=media&token=2d5c7146-6399-4e55-b3e0-59f77cbf0fca",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_todas_feiras_70_limao_america.png?alt=media&token=a697b88c-812c-4160-88d7-b0a16c420dd4",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_todas_feiras_72_uverine.png?alt=media&token=4f8f32ae-d465-4af8-9982-a57026fcdbd8",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_cartoon_feira_botafogo_67_ivison.jpg?alt=media&token=6448f512-2caa-4852-9e74-052f207a2e37",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_cartoon_feira_tijuca_39_lucia.png?alt=media&token=fc58054a-ae29-436c-b917-c947b616ece8",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_cartoon_feira_tijuca_40_evelyn.png?alt=media&token=9d38b9c4-2927-40d5-a1f5-1a88f63cca77",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_cartoon_feira_tijuca_41_luciene.png?alt=media&token=3f34879d-d22c-4c5f-999a-7502e63bba97",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_cartoon_feira_tijuca_44_rosana.png?alt=media&token=2faba5ab-8013-4350-83dd-7eaba75c7a3d",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_cartoon_feiras_flamengo_laranjeiras_74_ivison.png?alt=media&token=407a4857-fb2d-46b1-8856-9bb112bfd8c4",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_cartoon_feiras_flamengo_laranjeiras_94_ivison.png?alt=media&token=1ea6662f-bfd7-42ee-aa5e-233c1ad2f55b",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_cartoon_todas_feiras_23.jpg?alt=media&token=516dc23a-e262-400a-ad5c-6e9a3fb31af1",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feira_botafogo_28_walace.mp4?alt=media&token=71db03c5-f42f-43a3-a93c-6554a33a0885",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feira_botafogo_29_giulia.mp4?alt=media&token=e8adaecd-739b-4e81-a22d-121b9d51c46b",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feira_botafogo_30_ailton.mp4?alt=media&token=c28f942c-27ad-4852-9b62-549a670cf8b2",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feira_botafogo_31_nathalia.mp4?alt=media&token=145a513d-358f-4bf7-a2e4-e9476ae1647f",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feira_botafogo_68_ivison.mp4?alt=media&token=877cf44d-87a8-4770-9f7f-a8b83f3db25f",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feira_grajau_27_walace.mp4?alt=media&token=1980ae71-4f30-483b-b64e-5790573f8e8a",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feira_grajau_28_matias.mp4?alt=media&token=17c2df1c-a351-41c1-808b-c96c04784af6",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feira_grajau_29_david_matias.mp4?alt=media&token=352de92e-fd97-4bec-97fc-e62fa25f84b8",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feira_grajau_30_evelyn.mp4?alt=media&token=c17c67ee-01fd-415b-97ba-ea47bbb49e64",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feira_leme_26_walace.mp4?alt=media&token=d31d9126-1cd9-4620-b2c0-61bc5b881be6",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feira_tijuca_38a_rosana_evelyn.mp4?alt=media&token=c810b4c3-cfaa-4653-89d9-a761818721fa",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feira_tijuca_38b_rosana_evelyn.mp4?alt=media&token=be14f67b-fe93-44a2-b52b-86ea155e087d",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feira_tijuca_42_lucia.mp4?alt=media&token=c5d30eb5-c3cf-4808-ae4d-07bc6e5bbe1b",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feira_tijuca_43a_evelyn.mp4?alt=media&token=59369c96-e1ad-4bfd-ace3-8f6076900904",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feira_tijuca_43b_evelyn.mp4?alt=media&token=9a2a17ab-77d9-4391-b936-0fcac0c3223e",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feira_tijuca_45_rosana.mp4?alt=media&token=0c69991f-332f-45c4-9d87-16ade153eed4",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feira_tijuca_47_rosana_evelyn.mp4?alt=media&token=0b9cfc9a-c564-4ca8-b8dd-dc77e9dc5729",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feiras_flamengo_laranjeiras_43_paloma.mp4?alt=media&token=17e6a8e3-9797-43b8-91df-dccbe0ec3464",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feiras_flamengo_laranjeiras_54_ivison.mp4?alt=media&token=3797a156-ffba-48af-8eac-a8a072319b47",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feiras_flamengo_laranjeiras_57_matias_.mp4?alt=media&token=88a4f562-c791-42cb-9818-cf1353a2027f",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feiras_flamengo_laranjeiras_58_ivison.mp4?alt=media&token=6220b309-0314-4bdd-a6fc-e55721a5b97d",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_story_cartoon_feiras_flamengo_laranjeiras_39_ivison.png?alt=media&token=7e1f27a6-096c-4cac-821f-7e248615d9cb",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_story_cartoon_feiras_flamengo_laranjeiras_40_rosana.png?alt=media&token=4a6b1bcb-b277-4b7a-8fcd-63536e5abba2",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_story_cartoon_feiras_flamengo_laranjeiras_50.png?alt=media&token=205a9dc5-a895-4c60-aebf-8167ff449f81",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_story_cartoon_feiras_flamengo_laranjeiras_83_ivison.png?alt=media&token=742c77b6-5a2c-4e65-9163-777b01601c2d",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_story_cartoon_todas_feiras_46_rosana.png?alt=media&token=3732fbf6-ad39-42c2-a29a-23a387394942",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_story_cartoon_todas_feiras_47_lucia.png?alt=media&token=d2e290cc-4024-4802-aceb-cdf7af1c6ffb",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_story_cartoon_todas_feiras_85_ivison.png?alt=media&token=5448cd01-de1a-4076-8616-3aceeee0b98e",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_todas_feiras_46_walace.mp4?alt=media&token=6a684f74-8af1-4de8-a719-bd4319e8fdf6",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_todas_feiras_49_matias_david.mp4?alt=media&token=a8e5b1b2-d770-4a83-8b28-5347044a7b40",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_025_abacate_feira_grajau.mp4?alt=media&token=04c003db-85ad-4906-986a-e78432396685",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_026_abacate_feira_botafogo.mp4?alt=media&token=baebbf62-d59a-478f-8c1e-cbaa35f3af40",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_026_abacate_feira_leme.mp4?alt=media&token=0f39fa51-a303-4482-b4a8-ff07ad8818ce",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_026_maracugina_feira_grajau.mp4?alt=media&token=97c01f87-9a4e-4d5c-b3ab-6e1cc7a88bde",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_027_maracugina_feira_botafogo.mp4?alt=media&token=7371976d-0cc8-4810-baac-1410094e0833",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_031_abacate_feira_tijuca.mp4?alt=media&token=a10245e4-f097-4d02-904d-ebb007a16cd3",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_032_maracugina_feira_tijuca.mp4?alt=media&token=18df391b-2e53-4dc4-931f-10f4512ed562",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_038_maca_todas_feiras.mp4?alt=media&token=b5df862e-93e4-4da4-919a-49ce127c9e56",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_041_abacate_todas_feiras.mp4?alt=media&token=1684e6ac-ef75-4dfd-b6d0-8704a51c4598",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_045_maracugina_todas_feiras.mp4?alt=media&token=e35e3036-b7db-4612-b982-bb015746815b",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_049_cenoura_feiras_flamengo_laranjeiras.mp4?alt=media&token=e8690e8c-bbd4-457b-8505-4bb96a35ce72",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_057_maracugina_feira_leme.mp4?alt=media&token=05c73073-97b5-4a8b-8e62-774656b0abeb",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_058_maca_feira_leme.mp4?alt=media&token=0f2b2221-e6ad-4486-849c-92aa8632391a",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_060_maca_feira_grajau.mp4?alt=media&token=7886f3c7-9119-4fa9-ae21-56d8d17b4f2c",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_061_maca_feira_botafogo.mp4?alt=media&token=c5b1b902-2fdf-433a-a452-54a8365b7d73",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_064_cenoura_feira_leme.mp4?alt=media&token=e142ddc9-efa8-4f0d-a7c7-d7a6705a9707",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_065_cenoura_feira_grajau.mp4?alt=media&token=5ce32ba8-cda2-460c-b80f-3fc08401636c",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_066_cenoura_feira_botafogo.mp4?alt=media&token=8b41e41c-b21b-450e-9dff-90f4ff8c4bdb",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_078_maca_feira_tijuca.mp4?alt=media&token=61f1e1a5-01cf-4fc1-88ca-e630c5f0b1ba",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_083_cenoura_feira_tijuca.mp4?alt=media&token=1f51b03b-4729-4f70-ad75-1c81231a16cc",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_086_cenoura_todas_feiras.mp4?alt=media&token=bf290504-fe62-46b4-ad35-723462f99d6e",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_100_maca_feiras_flamengo_laranjeiras.mp4?alt=media&token=3992dbf1-f9a7-4647-b6da-844899465c67",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_101_abacate_feiras_flamengo_laranjeiras.mp4?alt=media&token=3d60f792-26f0-46b8-8f2e-ffbaced5fe9e",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_148_maracugina_feiras_flamengo_laranjeiras.mp4?alt=media&token=5e734681-a11a-4c52-ab3f-f9e4f4f2b2bd",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_020_tomate_feira_grajau.png?alt=media&token=364f98ec-7515-46e3-afe7-800e8f8276cf",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_021_tomate_feira_botafogo.png?alt=media&token=eb699d1b-406a-4de8-bc2f-164a02c438cd",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_021_tomate_feira_leme.png?alt=media&token=5d076996-8237-4c42-a8f5-ea704f68cce6",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_022_maca_feira_grajau.png?alt=media&token=ffb45c7c-aebd-4647-998e-f145d2325511",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_023_maca_feira_botafogo.png?alt=media&token=e75e3315-857a-461c-a694-b624180fcb5a",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_023_maca_feira_leme.png?alt=media&token=4ea261b6-4d4f-41e6-b12b-2a7f706de8c0",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_024_abacate_feira_grajau.png?alt=media&token=075f6655-607c-4449-bf2c-ab7bd5969cc8",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_025_abacate_feira_botafogo.png?alt=media&token=3ccd599f-6d93-4807-b59d-d994568765b1",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_025_abacate_feira_leme.png?alt=media&token=30c22b0d-24e1-4bd5-88a6-884604eb20fc",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_025_tomate_feira_tijuca.png?alt=media&token=d8f0fa8f-ad1a-4696-b18a-f4f4cde48f6c",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_032_tomate_feiras_flamengo_laranjeiras.png?alt=media&token=74d3017f-cab1-4405-9ddb-f69fde2dea30",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_036_maca_feiras_flamengo_laranjeiras.png?alt=media&token=fee100de-79d1-49b2-bc71-a2916ee26b7a",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_036_tomate_todas_feiras.png?alt=media&token=fdbec818-f58c-4e83-9bf0-1fdc71cf5d84",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_037_cenoura_feiras_flamengo_laranjeiras.png?alt=media&token=54caaae8-b76d-467d-8a46-75dfa64be777",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_038_maca_todas_feiras.png?alt=media&token=05762ea0-08ca-4b61-b142-61530b638160",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_039_abacate_feira_tijuca.png?alt=media&token=405a28a8-0c72-483a-87bc-a969737b2aa3",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_042_abacate_todas_feiras.png?alt=media&token=7d85e45a-a2c9-4d21-acae-f669ee710929",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_043_abacate_feiras_flamengo_laranjeiras.png?alt=media&token=b9186611-97da-4b22-8319-bf859e898eb2",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_044_maracugina_feiras_flamengo_laranjeiras.png?alt=media&token=eb6da12e-6593-4375-a41a-dc8565b73d8a",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_059_maracugina_feira_leme.png?alt=media&token=a3b82715-8751-42d1-94ce-ba1cb5e9770f",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_061_maracugina_feira_grajau.png?alt=media&token=2720ddcb-e4c4-45cf-adfb-3337fd2f2701",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_062_maracugina_feira_botafogo.png?alt=media&token=e0622de6-7c14-43ef-ad61-6b174638a2df",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_063_cenoura_feira_leme.png?alt=media&token=9a8a7722-6504-4671-aba5-28f55c6a8081",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_064_cenoura_feira_grajau.png?alt=media&token=fe3eeb67-84f8-4a55-8b5a-c89667c7ddb0",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_065_cenoura_feira_botafogo.png?alt=media&token=cf0536a9-3e0b-4e58-9c6c-25ef766bdba1",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_077_maca_feira_tijuca.png?alt=media&token=ff9978c3-8824-406e-8b9f-56ad046cc34c",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_079_maracugina_feira_tijuca.png?alt=media&token=f7841ee2-91ff-4259-87f6-7d6f99e2aba7",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_082_cenoura_feira_tijuca.png?alt=media&token=7ef0a6d6-37ce-40e0-8654-70eff80a5a5b",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_082_maracugina_todas_feiras.png?alt=media&token=1ed067f6-2336-4084-aca2-1ecd9a03f896",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_085_cenoura_todas_feiras.png?alt=media&token=0ec75bb3-3d2b-4613-9786-2cccae7e3c41",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_story_cartoon_016_tomate_feiras_flamengo_laranjeiras.png?alt=media&token=bf89420e-a785-42a5-9a1e-91b581dd70bc",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_story_cartoon_018_feiras_flamengo_laranjeiras.png?alt=media&token=8694ede7-c2dd-4f74-b380-25eabfd6e2a5",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_story_cartoon_020_maca_todas_feiras.png?alt=media&token=10dcc0f4-a78f-4b87-9f7c-56d493de4239",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_story_cartoon_022_mara_feiras_flamengo_laranjeiras.png?alt=media&token=4b8e18fa-d353-4401-94df-a3d1a232444e",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_story_cartoon_024_abacate_feiras_flamengo_laranjeiras.png?alt=media&token=613306ca-b6cc-4832-8f5a-3b6639247439",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_story_cartoon_026_abacate_todas_feiras.png?alt=media&token=b7e3b73e-9d3c-4435-ba0d-886b4dc347f3",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_story_cartoon_027_cenoura_todas_feiras.png?alt=media&token=5f43898f-8834-4727-9639-602569c68356",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_story_cartoon_028_maracugina_todas_feiras.png?alt=media&token=06363945-c644-4399-8945-638076d672a8",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_story_cartoon_082_cenoura_feiras_flamengo_laranjeiras.png?alt=media&token=ffeacc6a-506a-4553-8319-439b7d38afd9",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_story_cartoon_084_tomate_todas_feiras.png?alt=media&token=2a215bd2-cd94-4582-86ba-3ca38fe90c19",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_botafogo_19_joaninha.png?alt=media&token=16fdf6d3-a1e1-4bf8-9d90-c9a46d40e5e9",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_botafogo_38_aqualface.png?alt=media&token=1c3c8255-b72d-46df-92a1-4a585132c568",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_botafogo_39_batatman.png?alt=media&token=bbf8388d-1612-4597-892b-10b6ffb3b905",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_botafogo_40_robinete.png?alt=media&token=ead347d1-e911-4f03-a924-61618faff60c",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_botafogo_42_inhame_aranha.png?alt=media&token=365a2b21-0b97-44b8-9932-59f8d1be9ac6",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_botafogo_43_sporock.png?alt=media&token=da813c2b-f270-4d1b-87a4-1d1298dfb65f",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_botafogo_46_uva_negra.png?alt=media&token=4a3eddc4-67d4-4d07-bc21-77b9540fe71d",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_botafogo_48_coisa_de_milho.png?alt=media&token=af1c79f0-daa4-4f8d-90f7-7bd4d929ae89",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_botafogo_49_limao_america.png?alt=media&token=ad2d7296-19ca-4989-98ee-f5e720daadd6",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_botafogo_51_uverine.png?alt=media&token=144bd897-9c7a-4c27-ba43-4340421ac398",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_botafogo_54_berinjela_negra.png?alt=media&token=90ab807c-4067-4eac-ad53-014568fe6dab",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_botafogo_55_brulk.png?alt=media&token=d15a716f-0348-4a2d-a51d-891ce48d2496",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_botafogo_57_mandiorpheus.png?alt=media&token=63a59b94-58ed-4090-90da-e960e42689b0",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_botafogo_60_abobrinha_maravilha.png?alt=media&token=54b99ce7-fc90-4d44-82ca-38c3bd974dbe",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_botafogo_64_pepino_verde.png?alt=media&token=ca90291c-d4b0-4e68-a56a-4b36e928b2ad",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_botafogo_77_beterraba_de_ferro.png?alt=media&token=3e700f16-dc49-4066-9993-bd1151d2b5e7",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_grajau_18_joaninha.png?alt=media&token=9616c3cb-3d34-438a-a255-88e3c6456ba3",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_grajau_33_batatman.png?alt=media&token=58dce275-1ad8-4a64-a9ff-a09a16044873",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_grajau_34_inhame_aranha.png?alt=media&token=ebfea0f7-9fd5-45dd-9306-62296927d9fa",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_grajau_36_robinete.png?alt=media&token=03a9fa8f-7355-4026-ae04-8723c4cdd92c",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_grajau_42_aqualface.png?alt=media&token=3655cf86-971a-4be9-8ab0-b229e14bf849",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_grajau_42_sporock.png?alt=media&token=70a8f0d1-ba90-4a1e-ad7e-e16a8b8449a4",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_grajau_44_uva_negra.png?alt=media&token=5fc8eab0-1427-430f-8c6b-cf2bab24ece3",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_grajau_46_coisa_de_milho.png?alt=media&token=956aa132-883e-48c6-9872-2f9137a44e78",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_grajau_49_limao_america.png?alt=media&token=f3dc4829-5711-40d0-be54-326bd25bf0bf",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_grajau_50_uverine.png?alt=media&token=34061057-c91d-4655-ac1e-30c694f39fd0",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_grajau_52_berinjela_negra.png?alt=media&token=4ad7fa5f-c3f9-4804-8c85-7b8d8b1245eb",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_grajau_55_brulk.png?alt=media&token=af988f4e-fe58-4c39-bbce-071eb6bd110c",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_grajau_56_mandiorpheus.png?alt=media&token=2b54c654-d793-46b7-a326-a4eeac08d572",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_grajau_59_abobrinha_maravilha.png?alt=media&token=6b2327a6-d67b-46e0-aba9-a5daf4ab0725",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_grajau_64_pepino_verde.png?alt=media&token=bae099e1-0e8c-4599-9288-073f97e69657",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_grajau_74_beterraba_de_ferro.png?alt=media&token=408269b2-b019-4a48-bbc0-2d1e156d87e6",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_leme_19_joaninha.png?alt=media&token=bac77cd6-37de-42a7-a53b-39e8addebdd0",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_leme_35_aqualface.png?alt=media&token=856e2570-beb7-4d8f-afbb-f718de41cb5f",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_leme_36_batatman.png?alt=media&token=00ac3512-8c0f-4179-aeac-eb5c4f1d7304",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_leme_38_robinete.png?alt=media&token=70899612-b0c3-4a74-b4ff-ad8cb10fa66b",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_leme_39_inhame_aranha.png?alt=media&token=bd5fa426-5e1b-4bcc-8f46-069c01e4dac1",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_leme_40_sporock.png?alt=media&token=dd3ec322-dd73-4639-b8ec-c58259101faf",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_leme_42_uva_negra.png?alt=media&token=a51b409a-bafc-4303-a65b-f123b45052b1",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_leme_44_coisa_de_milho.png?alt=media&token=4242b413-66e3-4607-b1cf-3214b5c3efd5",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_todas_feiras_75_berinjela_negra.png?alt=media&token=757d7d6e-9bdb-4cad-b8ad-373647305b22",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_todas_feiras_76_brulk.png?alt=media&token=73c957a3-2746-41b8-b137-6a1b9f8ecab2",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_todas_feiras_78_mandiorpheus.png?alt=media&token=a29d4869-4f1e-4ffa-bbc5-c4c8b25faf13",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_todas_feiras_81_abobrinha_maravilha.png?alt=media&token=62996402-619d-4c22-befa-b375d56d385c",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_todas_feiras_84_pepino_verde.png?alt=media&token=71f94515-ad48-44a7-9f05-abba16920f98",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_botafogo_32_batatman.mp4?alt=media&token=e5105a98-3287-4ffe-9818-797b1a624220",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_botafogo_33_Inhame_aranha.mp4?alt=media&token=1a9ddd79-96b9-43f7-bba7-aaa96b768775",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_botafogo_34_sporock.mp4?alt=media&token=c86d8f64-53fe-40f0-bd6b-26d302763248",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_botafogo_37_aqualface.mp4?alt=media&token=926d8fdf-b7e6-48da-b5c9-c4e9f5a94a3c",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_botafogo_41_robinete.mp4?alt=media&token=1691c276-afbb-4a9f-985d-d08b605baf6d",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_botafogo_45_uva_negra.mp4?alt=media&token=27e54a78-560e-44e3-baa7-2aef1d5b647d",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_botafogo_47_coisa_de_milho.mp4?alt=media&token=e40bb5f9-cebc-4774-ac51-67a48c555dcc",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_botafogo_50_limao_america.mp4?alt=media&token=050a78ee-7a7f-414f-887a-b9f95db1ae3e",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_botafogo_52_uverine.mp4?alt=media&token=46963e56-610d-46cc-a901-b013e28c530f",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_botafogo_53_berinjela_negra.mp4?alt=media&token=6e86a4ed-a0b4-436b-b924-4a5ece394ed9",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_botafogo_56_brulk.mp4?alt=media&token=495ad525-2254-4de1-94fa-05724014e1b5",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_botafogo_58_mandiorpheus.mp4?alt=media&token=1695a7c2-bc7b-4160-acc4-5efc5b27dd98",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_botafogo_59_abobrinha_maravilha.mp4?alt=media&token=9ae1343f-fa88-4afd-b561-a36c0463282e",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_botafogo_63_pepino_verde.mp4?alt=media&token=6a9065d8-9de8-48a6-8b23-18ed0456edfb",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_botafogo_76_beterraba_de_ferro.mp4?alt=media&token=71612028-2518-4f71-b62a-743a52626abb",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_grajau_31_batatman.mp4?alt=media&token=553bcd2c-faee-4863-812f-ce99c0d432cf",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_grajau_32_inhame_aranha.mp4?alt=media&token=3c61b9ac-bf2a-433c-b8c8-570fe1144cc2",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_grajau_35_robinete.mp4?alt=media&token=3aed7d59-3109-4788-b6d8-2aedb3d820cd",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_grajau_37_sporock.mp4?alt=media&token=4ac404e8-c4c6-4239-9e5f-41ed2f0e81f3",
  ];

  providedUrls.forEach(url => {
      const fileName = extractFileNameFromUrl(url);
      if (!allItems.some(item => item.fileName === fileName)) {
          const id = `propaganda-${allItems.length + 1}`;
          let title = fileName.split('.')[0].replace(/_/g, ' '); // Título genérico
          const type = fileName.endsWith('.mp4') ? 'video' : 'image';
          
          // Melhorar o título
          const parts = title.split(' ');
          if(parts.length > 2) {
              const namePart = parts.slice(2).join(' '); // Pega tudo depois dos códigos iniciais
              const formattedName = namePart.split(' feira')[0];
              title = formattedName.charAt(0).toUpperCase() + formattedName.slice(1);
          }

          allItems.push({
              id,
              url,
              fileName,
              title,
              type,
              dataAiHint: title.toLowerCase(),
              fair: getFairCategories(fileName),
              theme: getThemeCategories(fileName),
          });
      }
  });


  return allItems;
}
