
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
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_todas_feiras_79_abobrinha_maravilha.png?alt=media&token=f8621c97-24e7-44bd-98aa-2b10413a420d",
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
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_todas_feiras_75_berinjela_negra.png?alt=media&token=757d7d6e-9bdb-4cad-b8ad-373647305b22",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_todas_feiras_76_brulk.png?alt=media&token=73c957a3-2746-41b8-b137-6a1b9f8ecab2",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_todas_feiras_78_mandiorpheus.png?alt=media&token=a29d4869-4f1e-4ffa-bbc5-c4c8b25faf13",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_todas_feiras_80_abobrinha_maravilha.png?alt=media&token=0d956922-c7ac-4fb3-8c84-2a52225502a8",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_todas_feiras_83_pepino_verde.mp4?alt=media&token=86aac784-9b1c-4536-8c86-b5364ccfb0bb",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fespecial_dia_das_maes_03.jpg?alt=media&token=eea2f616-5285-40ce-9e05-bb2be3aa8d9b",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fespecial_dia_das_maes_03a.jpg?alt=media&token=c9ef1937-3e34-4b1f-8e09-1270491cc69c",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fespecial_dia_das_maes_04.jpg?alt=media&token=306c8efd-d544-4283-a06d-e69ea78b77bb",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fespecial_dia_das_maes_04a.png?alt=media&token=56eb3966-ed22-41b4-89e2-0d8b11f60a5d",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fespecial_dia_das_maes_05.jpg?alt=media&token=eab791d1-4a1a-42e8-b84d-1ff8768da672",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fespecial_dia_das_maes_05a.jpg?alt=media&token=5934a0bb-7a8a-4c9b-a4c8-fb5a2b1cff68",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fespecial_dia_das_maes_06.jpg?alt=media&token=1f6d9fc7-df77-400c-9401-fd8b5fddf81a",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fespecial_dia_das_maes_06a.jpg?alt=media&token=23eacb2d-4a81-4514-b7dd-49a3f974d4d5",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fespecial_dia_das_maes_07.jpg?alt=media&token=32184c51-723b-41e2-8bd7-36307eec316d",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fespecial_dia_das_maes_07a.jpg?alt=media&token=6cde3804-c774-4ba7-bb3c-659e75ea8b5e",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fespecial_dia_das_maes_08.jpg?alt=media&token=f144d7bc-72e5-4066-b0e7-d254acc8ceda",
       "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fespecial_dia_das_maes_08a.jpg?alt=media&token=724a63b2-9ea1-4497-bf8b-6b413669c957",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fespecial_dia_das_maes_09.jpg?alt=media&token=1f785f0e-0995-4f4e-b922-c176ccf0844f",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fespecial_dia_das_maes_09a.jpg?alt=media&token=a5a42437-792d-43ba-8dac-735f51d851c7",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fespecial_dia_das_maes_10.jpg?alt=media&token=ba4f5d34-e2c2-4dea-ba86-efdd9fe4e845",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fespecial_dia_das_maes_10a.jpg?alt=media&token=04867325-bff0-4e2d-a18a-3eedcd98cae7",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_100_feiras_flamengo_laranjeiras.png?alt=media&token=91ea86db-096f-4a19-b23b-21554960e9b0",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_101_feiras_flamengo_laranjeiras.png?alt=media&token=a91e2c0f-3af0-4532-941d-f1d7d4b94d7c",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_104_feiras_flamengo_laranjeiras.png?alt=media&token=9645ed01-1b76-4e27-85c5-dcd5f518745f",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_104_todas_feiras.png?alt=media&token=33d6ff96-1419-4605-89a6-bb5bc623854f",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_105_feiras_flamengo_laranjeiras.png?alt=media&token=28ba7cae-3e5a-4c30-8453-8998ef421160",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_105_todas_feiras.png?alt=media&token=f81cd7b8-7341-453b-9d25-315ab25f12d2",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_106_feiras_flamengo_laranjeiras.png?alt=media&token=ea662e40-ce90-4943-87a3-b22042138950",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_106_todas_feiras.png?alt=media&token=2878e890-ced7-4d06-953e-79bf347d5ee1",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_16_feira_grajau.png?alt=media&token=3f092fbe-dfad-4a55-b341-447b0331bdb1",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_17_feira_botafogo.png?alt=media&token=0f21f6fe-99b4-4681-ab29-4a4c00f7424b",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_17_feira_grajau.png?alt=media&token=33cfad97-7e6a-4615-b43a-0f4543c2bd5e",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_17_feira_leme.png?alt=media&token=4c1d7ef5-8402-4bcc-ad7c-ba5a92c14249",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_17_todas_feiras.png?alt=media&token=c43cccf1-d6c5-47d9-81b8-41f9da4cf8da",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_18_feira_botafogo.png?alt=media&token=0a2a9081-5a5b-461c-80f3-34c1301b9135",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_18_feira_leme.png?alt=media&token=78f550ee-60a5-4bad-b032-393c7cc601d5",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_19_feira_grajau.png?alt=media&token=ee63d15d-48b5-4b7b-9c63-5f81e2b6ee27",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_19_feira_tijuca.png?alt=media&token=4e260f86-df2f-48ce-b2b7-fb4392238c78",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_20_feira_botafogo.png?alt=media&token=80b3b03e-47ed-429f-b627-d5b96173d193",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_20_feira_leme.png?alt=media&token=bdb52e1c-825d-4376-ac8b-a3ff89ffc2b5",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_20_feira_tijuca.png?alt=media&token=03b7cf6a-1a44-4ce7-8124-a226d015e744",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_21_feira_grajau.png?alt=media&token=5c211af7-9160-4daf-9f4f-4519da582ce1",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_22_feira_botafogo.png?alt=media&token=77e3ae70-2104-408b-9a81-ec93e1d85fef",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_22_feira_leme.png?alt=media&token=a446e764-afce-4bf7-8f68-57c7389b0723",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_24_feira_tijuca.png?alt=media&token=832130cc-aa17-4c9c-8831-65ce5afa6f7e",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_24_feiras_flamengo_laranjeiras.png?alt=media&token=0ac5b001-8917-45c3-948e-3e2df672a4c8",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_24_todas_feiras.png?alt=media&token=c1041860-0b95-4c20-b2b0-92de0997b0e6",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_26_feira_tijuca.png?alt=media&token=87d284bb-fcb4-45a3-bf78-22df26b61fa2",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_26_todas_feiras.png?alt=media&token=8378bf23-e5e8-4ff5-b281-b23d3bfb216d",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_28_feiras_flamengo_laranjeiras.png?alt=media&token=43e62ab2-c4ce-4932-9d9a-e260d5265421",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_29_feiras_flamengo_laranjeiras.png?alt=media&token=0d51bbb2-3781-4828-a305-83b990b948f4",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_30_feiras_flamengo_laranjeiras.png?alt=media&token=fd137203-7560-41f7-ae15-214a993bbe75",
      "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_30_todas_feiras.png?alt=media&token=5a072510-7284-417c-aedd-42a3ca69f515",
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
