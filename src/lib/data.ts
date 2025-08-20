

import type { Product, Farmer, Order, Customer, FarmerWithProducts, CustomerOrder, CustomerClassification } from './types';

let products: Product[] = [
  {
    id: '1',
    name: 'Cenouras Orgânicas',
    category: 'Vegetal',
    price: 2.5,
    unitAmount: 1,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/cenoura.webp?alt=media&token=83e659dc-2bd5-42f5-bc98-a178690858f1',
    dataAiHint: 'organic carrots',
    farmerId: '1',
    description: 'Cenouras orgânicas frescas e crocantes, perfeitas para lanches ou para cozinhar.',
    status: 'active',
  },
  {
    id: '2',
    name: 'Tomates Italianos Orgânicos',
    category: 'Vegetal',
    price: 3.0,
    unitAmount: 1,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/tomate_italiano.webp?alt=media&token=08336411-6ae5-4051-b378-cc4eb7c7e4ba',
    dataAiHint: 'italian tomatoes',
    farmerId: '1',
    description: 'Tomates italianos orgânicos, perfeitos para molhos encorpados e saladas.',
    status: 'active',
    promotion: {
        isActive: true,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }
  },
  {
    id: '4',
    name: 'Morangos Frescos Orgânicos',
    category: 'Fruta',
    price: 4.0,
    unitAmount: 1,
    unit: 'caixa',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/morango.webp?alt=media&token=086479b1-5b7e-451d-9635-193264f55e31',
    dataAiHint: 'fresh strawberries',
    farmerId: '2',
    description: 'Morangos orgânicos maduros e doces, colhidos no pico do frescor.',
    status: 'active',
    promotion: {
        isActive: true,
        expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
    }
  },
  {
    id: '5',
    name: 'Leite Fresco Orgânico',
    category: 'Laticínio',
    price: 3.5,
    unitAmount: 1,
    unit: 'litro',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'farm milk',
    farmerId: '3',
    description: 'Leite integral cremoso e rico de vacas alimentadas com pasto.',
    status: 'active',
  },
  {
    id: '6',
    name: 'Queijo Artesanal Orgânico',
    category: 'Laticínio',
    price: 8.0,
    unitAmount: 100,
    unit: 'g',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'artisan cheese',
    farmerId: '3',
    description: 'Um queijo cheddar forte e quebradiço, maturado por 12 meses.',
    status: 'active',
  },
  {
    id: '7',
    name: 'Pão de Fermentação Natural Orgânico',
    category: 'Padaria',
    price: 5.0,
    unitAmount: 1,
    unit: 'unidade',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'sourdough bread',
    farmerId: '4',
    description: 'Um pão de fermentação natural ácido e mastigável, assado fresco diariamente.',
    status: 'active',
    promotion: {
        isActive: true,
        expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
    }
  },
  {
    id: '8',
    name: 'Couve Mineira Orgânica',
    category: 'Vegetal',
    price: 2.20,
    unitAmount: 1,
    unit: 'maço',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/couve_mineira.webp?alt=media&token=fb0702ac-1c9a-4414-9857-bd0908d68348',
    dataAiHint: 'collard greens',
    farmerId: '1',
    description: 'Couve mineira orgânica, ideal para refogados e para acompanhar a tradicional feijoada.',
    status: 'active',
  },
   {
    id: '9',
    name: 'Laranja Pera Orgânica',
    category: 'Fruta',
    price: 2.0,
    unitAmount: 1,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/laranja_pera.webp?alt=media&token=b4db9a4e-b349-4805-ac9d-fee1fcb4d5d8',
    dataAiHint: 'pera orange',
    farmerId: '2',
    description: 'Laranja Pera orgânica, ideal para sucos, com sabor adocicado e pouca acidez.',
    status: 'active',
  },
  {
    id: '10',
    name: 'Iogurte Grego Orgânico',
    category: 'Laticínio',
    price: 4.5,
    unitAmount: 1,
    unit: 'pote',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'greek yogurt',
    farmerId: '3',
    description: 'Iogurte grego espesso e cremoso, rico em proteínas.',
    status: 'active',
  },
  {
    id: '11',
    name: 'Baguete de Trigo Integral Orgânica',
    category: 'Padaria',
    price: 4.0,
    unitAmount: 1,
    unit: 'unidade',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'wheat baguette',
    farmerId: '4',
    description: 'Uma baguete de trigo integral robusta com uma crosta crocante.',
    status: 'active',
  },
  {
    id: '13',
    name: 'Maçã Fuji Orgânica',
    category: 'Fruta',
    price: 1.8,
    unitAmount: 1,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/maca_fuji.webp?alt=media&token=d9b195e6-0e42-4976-83fe-fdf87dfafd7c',
    dataAiHint: 'fuji apple',
    farmerId: '2',
    description: 'Maçãs Fuji orgânicas, conhecidas por sua doçura e textura crocante.',
    status: 'active',
  },
  {
    id: '14',
    name: 'Alface Americana Orgânica',
    category: 'Vegetal',
    price: 3.50,
    unitAmount: 1,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/alface_americana.webp?alt=media&token=d745a4e5-1f8c-4333-8a8a-48a4201d308a',
    dataAiHint: 'iceberg lettuce',
    farmerId: '1',
    description: 'Alface americana crocante e refrescante, ideal para sanduíches e saladas.',
    status: 'active',
  },
  {
    id: '15',
    name: 'Brócolis Americano Orgânico',
    category: 'Vegetal',
    price: 4.50,
    unitAmount: 1,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/brocolis_americano.webp?alt=media&token=fd124564-9af1-438e-8e3b-34c320279c8b',
    dataAiHint: 'american broccoli',
    farmerId: '1',
    description: 'Brócolis americano fresco, perfeito para cozinhar no vapor ou assar.',
    status: 'active',
  },
  {
    id: '16',
    name: 'Beterraba Orgânica',
    category: 'Vegetal',
    price: 3.20,
    unitAmount: 1,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/beterraba.webp?alt=media&token=d33b9ad6-d6c9-4641-b2fc-e4ed9893cbb0',
    dataAiHint: 'beetroot',
    farmerId: '1',
    description: 'Beterraba orgânica, ótima para sucos, saladas e assados.',
    status: 'active',
  },
  {
    id: '17',
    name: 'Manga Palmer Orgânica',
    category: 'Fruta',
    price: 6.50,
    unitAmount: 1,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/manga_palmer.webp?alt=media&token=fdf4085f-fbef-41b1-be8a-a613dde3c2e4',
    dataAiHint: 'palmer mango',
    farmerId: '2',
    description: 'Manga Palmer doce e sem fibras, perfeita para consumo in natura ou sucos.',
    status: 'active',
  },
  {
    id: '18',
    name: 'Alho Orgânico',
    category: 'Vegetal',
    price: 3.00,
    unitAmount: 1,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/alho.webp?alt=media&token=8071bc57-cdd1-4105-98da-6253f6f13050',
    dataAiHint: 'garlic',
    farmerId: '1',
    description: 'Alho orgânico de sabor intenso, essencial para temperar seus pratos.',
    status: 'active',
  },
  {
    id: '19',
    name: 'Tangerina Pokan Orgânica',
    category: 'Fruta',
    price: 4.80,
    unitAmount: 1,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/tangerina_pokan.webp?alt=media&token=ca18499e-b35d-43f7-9b73-9c77684ef3b4',
    dataAiHint: 'pokan tangerine',
    farmerId: '2',
    description: 'Tangerina Pokan suculenta e fácil de descascar, colhida no ponto certo de doçura.',
    status: 'active',
  },
  {
    id: '20',
    name: 'Batata Doce Orgânica',
    category: 'Vegetal',
    price: 3.80,
    unitAmount: 1,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/batata_doce.webp?alt=media&token=9777102d-626a-4f4e-b2d7-1045f0cc4148',
    dataAiHint: 'sweet potato',
    farmerId: '1',
    description: 'Batata doce orgânica, rica em nutrientes e sabor adocicado. Perfeita para assar ou cozinhar.',
    status: 'active',
  },
  {
    id: '21',
    name: 'Couve Flor Orgânica',
    category: 'Vegetal',
    price: 4.0,
    unitAmount: 1,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/couve_flor.webp?alt=media&token=5e32779d-a643-4845-9b4b-6f3b6474b444',
    dataAiHint: 'cauliflower',
    farmerId: '1',
    description: 'Couve-flor orgânica fresca, versátil para diversas receitas.',
    status: 'active',
  },
  {
    id: '22',
    name: 'Mamão Papaya Orgânico',
    category: 'Fruta',
    price: 5.20,
    unitAmount: 1,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/mamao_papaya.webp?alt=media&token=6935a389-a40d-4eb2-b1ae-cdaed2be18a3',
    dataAiHint: 'papaya',
    farmerId: '2',
    description: 'Mamão Papaya orgânico, doce e macio. Perfeito para o café da manhã ou sobremesas.',
    status: 'active',
  },
  {
    id: '23',
    name: 'Inhame Orgânico',
    category: 'Vegetal',
    price: 4.20,
    unitAmount: 1,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/inhame.webp?alt=media&token=230229d4-3136-45a0-a5df-605c7de2592b',
    dataAiHint: 'yam',
    farmerId: '1',
    description: 'Inhame orgânico, nutritivo e versátil, ideal para sopas, purês e assados.',
    status: 'active',
  },
  {
    id: '24',
    name: 'Limão Taiti Orgânico',
    category: 'Fruta',
    price: 3.90,
    unitAmount: 1,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/limao_taiti.webp?alt=media&token=5f538bf1-e909-4346-8c0d-92c1e145b897',
    dataAiHint: 'tahiti lime',
    farmerId: '2',
    description: 'Limão Taiti orgânico, suculento e com poucas sementes. Ideal para sucos, temperos e sobremesas.',
    status: 'active',
  },
   {
    id: '25',
    name: 'Banana Prata Orgânica',
    category: 'Fruta',
    price: 5.50,
    unitAmount: 1,
    unit: 'dúzia',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/banana_prata.webp?alt=media&token=d38fe201-0312-48fc-9cf7-6e2b1fd97bf8',
    dataAiHint: 'silver banana',
    farmerId: '2',
    description: 'Banana prata orgânica, ideal para o consumo diário, rica em potássio e de sabor suave.',
    status: 'active',
  },
  {
    id: '26',
    name: 'Goiaba Vermelha Orgânica',
    category: 'Fruta',
    price: 5.80,
    unitAmount: 1,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/goiaba_vermelha.webp?alt=media&token=da3e5869-d746-4b9b-b23c-ab5418912991',
    dataAiHint: 'red guava',
    farmerId: '2',
    description: 'Goiabas vermelhas orgânicas, doces e perfumadas, perfeitas para sucos e sobremesas.',
    status: 'active',
  },
  {
    id: '27',
    name: 'Abacaxi Orgânico',
    category: 'Fruta',
    price: 7.00,
    unitAmount: 1,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/abacaxi.webp?alt=media&token=4caa0219-8635-4fbb-8e1c-fdec6909ebda',
    dataAiHint: 'pineapple',
    farmerId: '2',
    description: 'Abacaxi pérola orgânico, doce e suculento, perfeito para o verão.',
    status: 'active',
  },
  {
    id: '28',
    name: 'Berinjela Orgânica',
    category: 'Vegetal',
    price: 3.70,
    unitAmount: 1,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/berinjela.webp?alt=media&token=ad1f7bd9-75db-4fc4-ac6d-3608733d71e9',
    dataAiHint: 'eggplant',
    farmerId: '1',
    description: 'Berinjela orgânica, ideal para antepastos, lasanhas e parmegiana.',
    status: 'active',
  },
  {
    id: '29',
    name: 'Abóbora Japonesa Orgânica',
    category: 'Vegetal',
    price: 3.50,
    unitAmount: 1,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/abobora_japonesa.webp?alt=media&token=9cc8d464-1f1a-404e-8d32-aeddadc861ba',
    dataAiHint: 'kabocha squash',
    farmerId: '1',
    description: 'Abóbora japonesa, também conhecida como cabotiá, com polpa adocicada e textura macia.',
    status: 'active',
  },
  {
    id: '30',
    name: 'Alface Lisa Orgânica',
    category: 'Vegetal',
    price: 2.80,
    unitAmount: 1,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/alface_lisa.webp?alt=media&token=ced73d99-300e-4904-9072-9c8e4fcecd79',
    dataAiHint: 'butter lettuce',
    farmerId: '1',
    description: 'Alface lisa de folhas macias e sabor suave, perfeita para saladas delicadas.',
    status: 'active',
  },
  {
    id: '31',
    name: 'Alface Crespa Orgânica',
    category: 'Vegetal',
    price: 2.80,
    unitAmount: 1,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/alface_crespa.webp?alt=media&token=a057c9ac-0fe9-40b0-a016-49d16b016941',
    dataAiHint: 'leaf lettuce',
    farmerId: '1',
    description: 'Alface crespa com folhas crocantes e textura ondulada, ideal para sanduíches.',
    status: 'active',
  },
  {
    id: '32',
    name: 'Alface Roxa Orgânica',
    category: 'Vegetal',
    price: 3.00,
    unitAmount: 1,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/alface_roxa.webp?alt=media&token=c566920b-b13c-4d87-916a-813e320aedec',
    dataAiHint: 'red leaf lettuce',
    farmerId: '1',
    description: 'Alface roxa, adiciona cor e um sabor levemente amargo às suas saladas.',
    status: 'active',
  },
  {
    id: '33',
    name: 'Abacate Orgânico',
    category: 'Fruta',
    price: 5.50,
    unitAmount: 1,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/abacate.webp?alt=media&token=90d0ec6c-ca97-40eb-b694-5f489d925864',
    dataAiHint: 'avocado',
    farmerId: '2',
    description: 'Abacate cremoso e rico em gorduras saudáveis, perfeito para guacamole ou vitaminas.',
    status: 'active',
  },
  {
    id: '34',
    name: 'Aipim Orgânico',
    category: 'Vegetal',
    price: 4.00,
    unitAmount: 1,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/aipim.webp?alt=media&token=ab467c17-50b2-4319-8aad-0845e323b526',
    dataAiHint: 'cassava',
    farmerId: '1',
    description: 'Aipim (mandioca/macaxeira) orgânico, ideal para cozinhar, fritar ou fazer purês.',
    status: 'active',
  },
  {
    id: '35',
    name: 'Almeirão Orgânico',
    category: 'Vegetal',
    price: 3.20,
    unitAmount: 1,
    unit: 'maço',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/almeirao.webp?alt=media&token=de89169e-8993-46bd-9c82-5a9d289ebdc3',
    dataAiHint: 'chicory',
    farmerId: '1',
    description: 'Almeirão com seu característico sabor amargo, ótimo para saladas e refogados.',
    status: 'active',
  },
  {
    id: '36',
    name: 'Ameixa Orgânica',
    category: 'Fruta',
    price: 8.00,
    unitAmount: 1,
    unit: 'kg',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'plum',
    farmerId: '2',
    description: 'Ameixas orgânicas doces e suculentas, perfeitas para comer in natura ou fazer geleias.',
    status: 'active',
  },
  {
    id: '37',
    name: 'Abobrinha Italiana Orgânica',
    category: 'Vegetal',
    price: 3.80,
    unitAmount: 1,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/abobrinha_italiana.webp?alt=media&token=1c5c4cae-04b4-497f-99bf-94b09f8cdc7d',
    dataAiHint: 'zucchini',
    farmerId: '1',
    description: 'Abobrinha italiana orgânica, versátil para refogados, assados e pratos leves.',
    status: 'active',
  },
  {
    id: '38',
    name: 'Amora Orgânica',
    category: 'Fruta',
    price: 9.50,
    unitAmount: 1,
    unit: 'caixa',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'blackberry',
    farmerId: '2',
    description: 'Amoras orgânicas, ricas em antioxidantes e sabor agridoce.',
    status: 'active',
  },
  {
    id: '39',
    name: 'Azedinha Orgânica',
    category: 'Vegetal',
    price: 3.50,
    unitAmount: 1,
    unit: 'maço',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/azedinha.webp?alt=media&token=9e5fa2ef-55b7-4e80-860c-691ae12f24f8',
    dataAiHint: 'sorrel',
    farmerId: '1',
    description: 'Azedinha com seu sabor cítrico único, ótima para sucos, saladas e sopas.',
    status: 'active',
  },
  {
    id: '40',
    name: 'Banana d\'Água Orgânica',
    category: 'Fruta',
    price: 5.00,
    unitAmount: 1,
    unit: 'dúzia',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'nanica banana',
    farmerId: '2',
    description: 'Banana d\'água, também conhecida como nanica, doce e macia, ideal para sobremesas.',
    status: 'active',
  },
  {
    id: '41',
    name: 'Banana Nanica Orgânica',
    category: 'Fruta',
    price: 5.00,
    unitAmount: 1,
    unit: 'dúzia',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'dwarf banana',
    farmerId: '2',
    description: 'Banana nanica orgânica, doce e macia, ideal para sobremesas e consumo diário.',
    status: 'active',
  },
  {
    id: '42',
    name: 'Coentro Orgânico',
    category: 'Vegetal',
    price: 2.50,
    unitAmount: 1,
    unit: 'maço',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/coentro.webp?alt=media&token=d4bb207b-4d74-4de4-bc80-8843dd338010',
    dataAiHint: 'coriander',
    farmerId: '1',
    description: 'Coentro fresco com aroma marcante, indispensável na culinária nordestina e asiática.',
    status: 'active',
  },
  {
    id: '43',
    name: 'Cebolinha Orgânica',
    category: 'Vegetal',
    price: 2.50,
    unitAmount: 1,
    unit: 'maço',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/cebolinha.webp?alt=media&token=48e03912-a30e-4032-94b8-9a84b6209d3e',
    dataAiHint: 'chives',
    farmerId: '1',
    description: 'Cebolinha fresca para finalizar pratos e adicionar um sabor suave de cebola.',
    status: 'active',
  },
  {
    id: '44',
    name: 'Cebola Roxa Orgânica',
    category: 'Vegetal',
    price: 4.50,
    unitAmount: 1,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/cebola_roxa.webp?alt=media&token=e2c5234f-af01-4481-a046-71295fe900fe',
    dataAiHint: 'red onion',
    farmerId: '1',
    description: 'Cebola roxa de sabor mais suave e adocicado, perfeita para saladas e picles.',
    status: 'active',
  },
  {
    id: '45',
    name: 'Cebola Orgânica',
    category: 'Vegetal',
    price: 4.00,
    unitAmount: 1,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/cebola.webp?alt=media&token=d038a9a2-f0f9-421f-b436-324602f0b5bd',
    dataAiHint: 'onion',
    farmerId: '1',
    description: 'Cebola orgânica, a base para a maioria dos refogados e pratos salgados.',
    status: 'active',
  },
  {
    id: '46',
    name: 'Repolho Verde Orgânico',
    category: 'Vegetal',
    price: 3.80,
    unitAmount: 1,
    unit: 'unidade',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'green cabbage',
    farmerId: '1',
    description: 'Repolho verde crocante, ótimo para saladas, refogados e charutos.',
    status: 'active',
  },
  {
    id: '47',
    name: 'Repolho Roxo Orgânico',
    category: 'Vegetal',
    price: 4.20,
    unitAmount: 1,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/repolho_roxo.webp?alt=media&token=2ea7df6f-0845-4042-aa71-38812b164b6a',
    dataAiHint: 'red cabbage',
    farmerId: '1',
    description: 'Repolho roxo, adiciona cor vibrante e nutrientes a saladas e conservas.',
    status: 'active',
  },
  {
    id: '48',
    name: 'Maçã Gala Orgânica',
    category: 'Fruta',
    price: 6.50,
    unitAmount: 1,
    unit: 'kg',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'gala apple',
    farmerId: '2',
    description: 'Maçãs Gala orgânicas, com sabor suave e doce, ideais para lanches.',
    status: 'active',
  },
  {
    id: '49',
    name: 'Rúcula Orgânica',
    category: 'Vegetal',
    price: 3.50,
    unitAmount: 1,
    unit: 'maço',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'arugula',
    farmerId: '1',
    description: 'Rúcula com sabor picante e folhas tenras, excelente em saladas e pizzas.',
    status: 'active',
  },
  {
    id: '50',
    name: 'Mamão Formosa Orgânico',
    category: 'Fruta',
    price: 6.00,
    unitAmount: 1,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/mamao_formosa.webp?alt=media&token=7887ce63-fb00-42fe-a5d3-8f70e128bdb3',
    dataAiHint: 'formosa papaya',
    farmerId: '2',
    description: 'Mamão Formosa de polpa macia e doce, rico em vitaminas.',
    status: 'active',
  },
  {
    id: '51',
    name: 'Ovos Orgânicos',
    category: 'Laticínio',
    price: 12.00,
    unitAmount: 1,
    unit: 'dúzia',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'organic eggs',
    farmerId: '3',
    description: 'Ovos de galinhas criadas soltas e alimentadas com ração orgânica.',
    status: 'active',
  },
  {
    id: '52',
    name: 'Gengibre Orgânico',
    category: 'Vegetal',
    price: 15.00,
    unitAmount: 1,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/gengibre.webp?alt=media&token=b70596de-b66f-4c39-a8c9-6951a442ff84',
    dataAiHint: 'ginger',
    farmerId: '1',
    description: 'Gengibre fresco com sabor picante, ótimo para chás, sucos e pratos asiáticos.',
    status: 'active',
  },
  {
    id: '53',
    name: 'Cúrcuma Orgânica',
    category: 'Vegetal',
    price: 18.00,
    unitAmount: 1,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/curcuma.webp?alt=media&token=52fffeff-7486-4cab-9021-81331e7c5cc6',
    dataAiHint: 'turmeric',
    farmerId: '1',
    description: 'Cúrcuma (açafrão-da-terra) fresca, conhecida por suas propriedades anti-inflamatórias.',
    status: 'active',
  },
  {
    id: '54',
    name: 'Melão Amarelo Orgânico',
    category: 'Fruta',
    price: 7.00,
    unitAmount: 1,
    unit: 'unidade',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'yellow melon',
    farmerId: '2',
    description: 'Melão amarelo doce e refrescante, perfeito para dias quentes.',
    status: 'active',
  },
  {
    id: '55',
    name: 'Melão Orange Orgânico',
    category: 'Fruta',
    price: 8.00,
    unitAmount: 1,
    unit: 'unidade',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'orange melon',
    farmerId: '2',
    description: 'Melão Orange com polpa alaranjada e sabor adocicado e perfumado.',
    status: 'active',
  },
  {
    id: '56',
    name: 'Melão Pele de Sapo Orgânico',
    category: 'Fruta',
    price: 8.50,
    unitAmount: 1,
    unit: 'unidade',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'piel de sapo melon',
    farmerId: '2',
    description: 'Melão Pele de Sapo, de polpa branca, muito doce e suculenta.',
    status: 'active',
  },
  {
    id: '57',
    name: 'Melão Cantaloupe Orgânico',
    category: 'Fruta',
    price: 9.00,
    unitAmount: 1,
    unit: 'unidade',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'cantaloupe melon',
    farmerId: '2',
    description: 'Melão Cantaloupe, com polpa alaranjada e sabor aromático inconfundível.',
    status: 'active',
  },
  {
    id: '59',
    name: 'Acelga Orgânica',
    category: 'Vegetal',
    price: 3.80,
    unitAmount: 1,
    unit: 'maço',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/acelga.webp?alt=media&token=0721f75b-65a2-40cf-8754-c10afd93acc6',
    dataAiHint: 'swiss chard',
    farmerId: '1',
    description: 'Acelga (couve chinesa) de textura crocante, ideal para o preparo de saladas e refogados.',
    status: 'active',
  },
  {
    id: '60',
    name: 'Alho Poró Orgânico',
    category: 'Vegetal',
    price: 4.50,
    unitAmount: 1,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/alho_poro.webp?alt=media&token=84c5bcc6-06f2-46be-8589-68b3e7be0fa5',
    dataAiHint: 'leek',
    farmerId: '1',
    description: 'Alho poró com sabor suave de cebola, perfeito para sopas, quiches e tortas.',
    status: 'active',
  },
  {
    id: '61',
    name: 'Chuchu Orgânico',
    category: 'Vegetal',
    price: 3.00,
    unitAmount: 1,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/chuchu.webp?alt=media&token=4ef6fcb9-2d57-47b6-b397-ec466ccfc6cd',
    dataAiHint: 'chayote',
    farmerId: '1',
    description: 'Chuchu orgânico, de sabor suave e rico em água, ideal para suflês e saladas cozidas.',
    status: 'active',
  },
  {
    id: '62',
    name: 'Batata Inglesa Orgânica',
    category: 'Vegetal',
    price: 4.50,
    unitAmount: 1,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/batata_inglesa.webp?alt=media&token=41f17e48-9a43-4980-b61d-1c12a91f3cf2',
    dataAiHint: 'potato',
    farmerId: '1',
    description: 'Batata inglesa orgânica, a mais versátil das batatas, ótima para cozinhar, assar e fritar.',
    status: 'active',
  },
  {
    id: '63',
    name: 'Batata Baroa Orgânica',
    category: 'Vegetal',
    price: 7.50,
    unitAmount: 1,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/batata_baroa.webp?alt=media&token=58b079cb-80de-40fb-97f0-a654a34f1c1b',
    dataAiHint: 'arracacha',
    farmerId: '1',
    description: 'Batata baroa (mandioquinha) com seu sabor e aroma únicos, perfeita para purês e sopas.',
    status: 'active',
  },
  {
    id: '64',
    name: 'Batata Yacon Orgânica',
    category: 'Vegetal',
    price: 8.00,
    unitAmount: 1,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/batata_yacon.webp?alt=media&token=1531f6ab-5dde-4141-8715-28005e7d615e',
    dataAiHint: 'yacon',
    farmerId: '1',
    description: 'Batata Yacon, de textura crocante e sabor adocicado, ideal para consumo in natura em saladas.',
    status: 'active',
  },
  {
    id: '65',
    name: 'Tomate Grape Orgânico',
    category: 'Fruta',
    price: 5.50,
    unitAmount: 1,
    unit: 'caixa',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'grape tomato',
    farmerId: '2',
    description: 'Tomatinhos grape, pequenos e muito doces, perfeitos para lanches e saladas.',
    status: 'active',
  },
  {
    id: '66',
    name: 'Tomate Salada Orgânico',
    category: 'Fruta',
    price: 4.80,
    unitAmount: 1,
    unit: 'kg',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'salad tomato',
    farmerId: '2',
    description: 'Tomate para salada, firme e com poucas sementes, ideal para fatiar.',
    status: 'active',
  },
  {
    id: '67',
    name: 'Tomate Cereja Orgânico',
    category: 'Fruta',
    price: 5.00,
    unitAmount: 1,
    unit: 'caixa',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'cherry tomato',
    farmerId: '2',
    description: 'Tomate cereja, pequeno e adocicado, ótimo para saladas, espetinhos e aperitivos.',
    status: 'active',
  },
  {
    id: '68',
    name: 'Cogumelo Shiitake Orgânico',
    category: 'Vegetal',
    price: 15.00,
    unitAmount: 200,
    unit: 'g',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'shiitake mushroom',
    farmerId: '4',
    description: 'Cogumelo Shiitake com sabor terroso e textura firme, delicioso em molhos e refogados.',
    status: 'active',
  },
  {
    id: '69',
    name: 'Cogumelo Paris Orgânico',
    category: 'Vegetal',
    price: 12.00,
    unitAmount: 200,
    unit: 'g',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'paris mushroom',
    farmerId: '4',
    description: 'Cogumelo Paris (champignon) fresco, de sabor suave, o mais versátil dos cogumelos.',
    status: 'active',
  },
  {
    id: '70',
    name: 'Cogumelo Shimeji Orgânico',
    category: 'Vegetal',
    price: 14.00,
    unitAmount: 200,
    unit: 'g',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'shimeji mushroom',
    farmerId: '4',
    description: 'Cogumelo Shimeji, pequeno e delicado, muito apreciado na culinária japonesa.',
    status: 'active',
  },
  {
    id: '71',
    name: 'Cogumelo Portobello Orgânico',
    category: 'Vegetal',
    price: 16.00,
    unitAmount: 200,
    unit: 'g',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'portobello mushroom',
    farmerId: '4',
    description: 'Cogumelo Portobello, grande e carnudo, excelente para grelhar, rechear ou usar como hambúrguer vegetariano.',
    status: 'active',
  },
  {
    id: '72',
    name: 'Limão Siciliano Orgânico',
    category: 'Fruta',
    price: 8.50,
    unitAmount: 1,
    unit: 'kg',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'sicilian lemon',
    farmerId: '2',
    description: 'Limão siciliano, grande, de casca amarela e muito perfumado, ideal para risotos e sobremesas.',
    status: 'active',
  },
  {
    id: '73',
    name: 'Limão Cravo Orgânico',
    category: 'Fruta',
    price: 4.50,
    unitAmount: 1,
    unit: 'kg',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'rangpur lime',
    farmerId: '2',
    description: 'Limão cravo (ou rosa), com casca avermelhada e sabor único, ótimo para temperos e caipirinhas.',
    status: 'active',
  },
  {
    id: '74',
    name: 'Limão Galego Orgânico',
    category: 'Fruta',
    price: 4.80,
    unitAmount: 1,
    unit: 'kg',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'key lime',
    farmerId: '2',
    description: 'Limão galego, pequeno e de casca fina, muito suculento e ácido, um clássico nacional.',
    status: 'active',
  },
  {
    id: '75',
    name: 'Pepino Orgânico',
    category: 'Vegetal',
    price: 3.50,
    unitAmount: 1,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/pepino.webp?alt=media&token=e47fbf50-b714-4f92-846c-5e6e63d284e1',
    dataAiHint: 'cucumber',
    farmerId: '1',
    description: 'Pepino japonês orgânico, com menos sementes e casca fina, perfeito para saladas crocantes.',
    status: 'active',
  },
  {
    id: '76',
    name: 'Couve Toscana Orgânica',
    category: 'Vegetal',
    price: 3.80,
    unitAmount: 1,
    unit: 'maço',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/couve_toscana.webp?alt=media&token=d4d592f2-8fbe-4489-a044-6d46d2fc3753',
    dataAiHint: 'lacinato kale',
    farmerId: '1',
    description: 'Couve toscana (ou cavolo nero), de folhas escuras e sabor intenso, ótima para caldos e refogados.',
    status: 'active',
  },
  {
    id: '77',
    name: 'Kiwi Orgânico',
    category: 'Fruta',
    price: 9.00,
    unitAmount: 1,
    unit: 'kg',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'kiwi',
    farmerId: '2',
    description: 'Kiwi orgânico, com sua polpa verde vibrante e sabor agridoce, rico em vitamina C.',
    status: 'active',
  },
  {
    id: '78',
    name: 'Tangerina Murcote Orgânica',
    category: 'Fruta',
    price: 5.50,
    unitAmount: 1,
    unit: 'kg',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'murcott tangerine',
    farmerId: '2',
    description: 'Tangerina Murcote, de sabor muito doce e cor intensa, perfeita para sucos.',
    status: 'active',
  },
  {
    id: '79',
    name: 'Abóbora Paulistinha Orgânica',
    category: 'Vegetal',
    price: 3.60,
    unitAmount: 1,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/abobora_paulistinha.webp?alt=media&token=085ac67e-9468-4e75-90f7-0698285bcc35',
    dataAiHint: 'brazilian squash',
    farmerId: '1',
    description: 'Abóbora paulista, de casca listrada, ideal para fazer refogada ou em sopas.',
    status: 'active',
  },
  {
    id: '81',
    name: 'Abóbora Moranga Orgânica',
    category: 'Vegetal',
    price: 4.00,
    unitAmount: 1,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/abobora_moranga.webp?alt=media&token=f4ba0711-99f5-4cd5-bd0f-41fafaf1bcd0',
    dataAiHint: 'moranga squash',
    farmerId: '1',
    description: 'Abóbora moranga, famosa pelo prato "camarão na moranga", muito saborosa e decorativa.',
    status: 'active',
  },
  {
    id: '82',
    name: 'Mostarda Orgânica',
    category: 'Vegetal',
    price: 3.00,
    unitAmount: 1,
    unit: 'maço',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/mostarda.webp?alt=media&token=4e6b4187-dc70-41c2-904d-7ec8572c31b0',
    dataAiHint: 'mustard greens',
    farmerId: '1',
    description: 'Folhas de mostarda com sabor picante, ideais para refogados e saladas ousadas.',
    status: 'active',
  },
  {
    id: '83',
    name: 'Salsa Orgânica',
    category: 'Vegetal',
    price: 2.50,
    unitAmount: 1,
    unit: 'maço',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'parsley',
    farmerId: '1',
    description: 'Salsa (ou salsinha) fresca, um dos temperos mais versáteis e usados na culinária.',
    status: 'active',
  },
  {
    id: '84',
    name: 'Chicória Orgânica',
    category: 'Vegetal',
    price: 3.20,
    unitAmount: 1,
    unit: 'maço',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/chicoria.webp?alt=media&token=64cf0f70-4063-4ca5-96a1-4c8026705058',
    dataAiHint: 'endive',
    farmerId: '1',
    description: 'Chicória de folhas recortadas e sabor amargo, muito apreciada na culinária do norte do Brasil.',
    status: 'active',
  },
  {
    id: '85',
    name: 'Rabanete Orgânico',
    category: 'Vegetal',
    price: 3.50,
    unitAmount: 1,
    unit: 'maço',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/rabanete.webp?alt=media&token=fd084d85-6e5f-4519-ae09-e0606e54b063',
    dataAiHint: 'radish',
    farmerId: '1',
    description: 'Rabanetes crocantes e picantes, adicionam um toque especial a qualquer salada.',
    status: 'active',
  },
  {
    id: '86',
    name: 'Alface Romana Orgânica',
    category: 'Vegetal',
    price: 3.20,
    unitAmount: 1,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/alface_romana.webp?alt=media&token=f0a4afb0-0d99-48ad-88a2-0e3a8f048d17',
    dataAiHint: 'romaine lettuce',
    farmerId: '1',
    description: 'Alface romana, com folhas longas e crocantes, ideal para a salada Caesar.',
    status: 'active',
  },
  {
    id: '87',
    name: 'Agrião Orgânico',
    category: 'Vegetal',
    price: 3.00,
    unitAmount: 1,
    unit: 'maço',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/agriao.webp?alt=media&token=c27c2017-aa81-4c03-a41c-c6323c14e213',
    dataAiHint: 'watercress',
    farmerId: '1',
    description: 'Agrião com seu sabor picante característico, ótimo para saladas e sopas.',
    status: 'active',
  },
  {
    id: '88',
    name: 'Espinafre Orgânico',
    category: 'Vegetal',
    price: 3.50,
    unitAmount: 1,
    unit: 'maço',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/espinafre.webp?alt=media&token=314e18aa-482f-4cef-badc-db518683d218',
    dataAiHint: 'spinach',
    farmerId: '1',
    description: 'Espinafre fresco, rico em ferro e nutrientes, perfeito para refogados e recheios.',
    status: 'active',
  },
  {
    id: '89',
    name: 'Laranja Bahia Orgânica',
    category: 'Fruta',
    price: 5.00,
    unitAmount: 1,
    unit: 'kg',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'navel orange',
    farmerId: '2',
    description: 'Laranja Bahia, sem sementes e com umbigo característico, ideal para consumo in natura.',
    status: 'active',
  },
  {
    id: '90',
    name: 'Laranja Seleta Orgânica',
    category: 'Fruta',
    price: 4.50,
    unitAmount: 1,
    unit: 'kg',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'selecta orange',
    farmerId: '2',
    description: 'Laranja Seleta, muito suculenta e de sabor adocicado, excelente para sucos.',
    status: 'active',
  },
  {
    id: '91',
    name: 'Hortelã Orgânica',
    category: 'Vegetal',
    price: 2.80,
    unitAmount: 1,
    unit: 'maço',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/hortela.webp?alt=media&token=97dacb1f-e59f-4891-9176-73eec1e16188',
    dataAiHint: 'mint',
    farmerId: '1',
    description: 'Hortelã fresca e aromática, perfeita para chás, sucos, quibes e sobremesas.',
    status: 'active',
  },
  {
    id: '92',
    name: 'Poejo Orgânico',
    category: 'Vegetal',
    price: 3.00,
    unitAmount: 1,
    unit: 'maço',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'pennyroyal',
    farmerId: '1',
    description: 'Poejo, uma erva de aroma intenso semelhante à menta, usada em chás e licores.',
    status: 'active',
  },
  {
    id: '93',
    name: 'Radicchio Orgânico',
    category: 'Vegetal',
    price: 4.00,
    unitAmount: 1,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/radicchio.webp?alt=media&token=473281ea-32f7-4a12-a93a-23a821b91505',
    dataAiHint: 'radicchio',
    farmerId: '1',
    description: 'Radicchio orgânico com folhas crocantes e sabor amargo, ideal para dar um toque especial em saladas.',
    status: 'active',
  },
  {
    id: '94',
    name: 'Milho Verde Orgânico',
    category: 'Vegetal',
    price: 4.00,
    unitAmount: 1,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/milho_verde.webp?alt=media&token=06cf8e19-7d36-42eb-8b27-cde60f2c41d6',
    dataAiHint: 'corn cob',
    farmerId: '1',
    description: 'Milho verde doce e macio, perfeito para cozinhar, assar ou fazer pamonha.',
    status: 'active',
  },
  {
    id: '95',
    name: 'Vagem Orgânica',
    category: 'Vegetal',
    price: 5.00,
    unitAmount: 1,
    unit: 'kg',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'green beans',
    farmerId: '1',
    description: 'Vagem fresca e crocante, ótima para refogados, saladas e cozidos.',
    status: 'active',
  },
  {
    id: '96',
    name: 'Feijão Preto Orgânico',
    category: 'Vegetal',
    price: 8.00,
    unitAmount: 1,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/feijao_preto.webp?alt=media&token=37fb877a-32f5-419f-a2fd-eb01841d991d',
    dataAiHint: 'black beans',
    farmerId: '1',
    description: 'Feijão preto orgânico, a base para a tradicional feijoada e pratos do dia a dia.',
    status: 'active',
  },
  {
    id: '97',
    name: 'Feijão Carioca Orgânico',
    category: 'Vegetal',
    price: 7.50,
    unitAmount: 1,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/feijao_carioca.webp?alt=media&token=67c3dfb7-4e77-4593-a133-3a7fd51f1ef2',
    dataAiHint: 'carioca beans',
    farmerId: '1',
    description: 'Feijão carioca orgânico, o mais popular do Brasil, com caldo encorpado e sabor suave.',
    status: 'active',
  },
  {
    id: '98',
    name: 'Feijão Vermelho Orgânico',
    category: 'Vegetal',
    price: 8.50,
    unitAmount: 1,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/feijao_vermelho.webp?alt=media&token=0eb5f6e0-33fc-4407-a608-9c44bf770c5f',
    dataAiHint: 'red beans',
    farmerId: '1',
    description: 'Feijão vermelho orgânico, ideal para sopas, saladas e pratos com sabor mais robusto.',
    status: 'active',
  },
  {
    id: '99',
    name: 'Couve Kale Orgânica',
    category: 'Vegetal',
    price: 4.50,
    unitAmount: 1,
    unit: 'maço',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/couve_kale.webp?alt=media&token=0f9318de-5203-44c4-9c85-420452ed7627',
    dataAiHint: 'kale',
    farmerId: '1',
    description: 'Couve Kale, a super-hortaliça, rica em nutrientes e perfeita para sucos verdes, saladas e chips.',
    status: 'active',
  },
  {
    id: '100',
    name: 'Orégano Orgânico',
    category: 'Vegetal',
    price: 3.50,
    unitAmount: 1,
    unit: 'maço',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/oregano.webp?alt=media&token=0b64f7ac-1aa4-4e21-a6b0-67eee4c6124e',
    dataAiHint: 'oregano',
    farmerId: '1',
    description: 'Orégano fresco, com aroma e sabor que transformam molhos, pizzas e saladas.',
    status: 'active',
  },
  {
    id: '101',
    name: 'Alface Mimosa Verde',
    category: 'Vegetal',
    price: 3.30,
    unitAmount: 1,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/alface_mimosa_verde.webp?alt=media&token=4635346b-69f9-4a54-94b6-8cb1b85f4afb',
    dataAiHint: 'mimosa lettuce',
    farmerId: '1',
    description: 'Alface Mimosa com folhas tenras e sabor suave, ótima para saladas.',
    status: 'active',
  },
  {
    id: '102',
    name: 'Abóbora Baianinha Orgânica',
    category: 'Vegetal',
    price: 3.60,
    unitAmount: 1,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/abobora_baianinha.webp?alt=media&token=9860ba6a-82f2-439b-92c2-0c57d6d338a3',
    dataAiHint: 'baianinha squash',
    farmerId: '1',
    description: 'Abóbora Baianinha orgânica, de polpa adocicada, ótima para doces e purês.',
    status: 'active',
  },
  {
    id: '103',
    name: 'Alface Mimosa Roxa',
    category: 'Vegetal',
    price: 3.40,
    unitAmount: 1,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/alface_mimosa_roxa.webp?alt=media&token=c8b001dc-6f00-486f-af0a-22c99ed83d01',
    dataAiHint: 'red mimosa lettuce',
    farmerId: '1',
    description: 'Alface Mimosa Roxa com folhas tenras e um toque de cor, ideal para saladas sofisticadas.',
    status: 'active',
  },
  {
    id: '104',
    name: 'Pimentão Verde Orgânico',
    category: 'Vegetal',
    price: 2.80,
    unitAmount: 1,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/pimentao_verde.webp?alt=media&token=e93a384f-c567-4d1a-9f4a-7140f7b09335',
    dataAiHint: 'green bell pepper',
    farmerId: '1',
    description: 'Pimentão verde orgânico, ideal para rechear, assar ou usar em refogados.',
    status: 'active',
  },
  {
    id: '105',
    name: 'Pimentão Vermelho Orgânico',
    category: 'Vegetal',
    price: 3.20,
    unitAmount: 1,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/pimentao_vermelho.webp?alt=media&token=d10b7b1b-9e4a-4b9e-8b1b-7e6d6e7f8e8e',
    dataAiHint: 'red bell pepper',
    farmerId: '1',
    description: 'Pimentão vermelho orgânico, de sabor adocicado, perfeito para saladas, assados e molhos.',
    status: 'active',
  },
  {
    id: '106',
    name: 'Pimentão Amarelo Orgânico',
    category: 'Vegetal',
    price: 3.20,
    unitAmount: 1,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/pimentao_amarelo.webp?alt=media&token=c4a9a8f2-8e0c-4e8a-8a6a-0c5d5e5f4d4d',
    dataAiHint: 'yellow bell pepper',
    farmerId: '1',
    description: 'Pimentão amarelo orgânico, de sabor suave e adocicado, ótimo para saladas e pratos coloridos.',
    status: 'active',
  }
];

let farmers: Farmer[] = [
  {
    id: '1',
    responsibleName: 'Matias Ponte',
    name: 'Sítio Fazenda Mata Verde',
    prepostos: ['David Bulhões', 'Rosana Santos', 'Evelyn Alcântara'],
    fairs: ['Flamengo', 'Grajaú', 'Tijuca'],
    location: { lat: -22.9068, lng: -43.1729 },
    bio: 'Uma fazenda familiar dedicada à agricultura orgânica e sustentável há mais de 30 anos.',
    address: 'Estrada da Paciência, 123, Santa Cruz, Rio de Janeiro, RJ',
    pixKey: 'fazenda.mata.verde@email.com',
    shippingCost: 15.00,
    phone: '5521987654321',
    image: 'https://placehold.co/100x100.png'
  },
  {
    id: '2',
    responsibleName: 'Ailton Lima',
    name: 'Sítio Tapera',
    prepostos: ['Felipe Carvalho', 'Thiago Carvalho'],
    fairs: ['Laranjeiras', 'Botafogo'],
    location: { lat: -22.91, lng: -43.2 },
    bio: 'Somos especializados no cultivo das frutas orgânicas mais doces e suculentas com amor e carinho.',
    address: 'Rua das Maçãs, 45, Nova Iguaçu, RJ',
    pixKey: '123.456.789-01',
    shippingCost: 12.50,
    phone: '5521987654322',
    image: 'https://placehold.co/100x100.png'
  },
  {
    id: '3',
    responsibleName: 'Onéias Gonçalves',
    name: "Sítio Cachoeirinha I",
    prepostos: ['Luciene Silva'],
    fairs: [],
    location: { lat: -22.88, lng: -43.15 },
    bio: 'Vacas felizes fazem o melhor leite. Nossos produtos lácteos são todos naturais e de vacas alimentadas com pasto.',
    address: 'Avenida do Leite, 789, Duque de Caxias, RJ',
    pixKey: '(21) 99999-8888',
    shippingCost: 10.00,
    phone: '5521987654323',
    image: 'https://placehold.co/100x100.png'
  },
  {
    id: '4',
    responsibleName: 'Walace Oliveira',
    name: 'Sítio Cachoeirinha II',
    prepostos: ['Vitor Hugo', 'Michele Conceição'],
    fairs: ['Laranjeiras', 'Leme'],
    location: { lat: -22.95, lng: -43.22 },
    bio: 'Pães artesanais assados em forno a lenha tradicional com farinha orgânica de origem local.',
    address: 'Travessa do Pão, 10, Niterói, RJ',
    pixKey: 'sitio.cachoeirinha2@email.com',
    shippingCost: 0,
    phone: '5521987654324',
    image: 'https://placehold.co/100x100.png'
  },
  {
    id: '5',
    responsibleName: 'Wendel Oliveira',
    name: 'Sítio Cachoeirinha III',
    prepostos: [],
    fairs: ['Flamengo'],
    location: { lat: -22.93, lng: -43.19 },
    bio: 'Cultivando o futuro, um vegetal de cada vez. Frescor e qualidade direto da terra para sua mesa.',
    address: 'Estrada da Cachoeira, 55, Magé, RJ',
    pixKey: 'wendel.oliveira@email.com',
    shippingCost: 18.00,
    phone: '5521987654325',
    image: 'https://placehold.co/100x100.png'
  },
  {
    id: '6',
    responsibleName: 'Ivison Fragoso',
    name: 'Domicílio Orgânico',
    prepostos: ['Cristina Marques', 'Nathalia Souza'],
    fairs: ['Flamengo', 'Laranjeiras', 'Botafogo'],
    location: { lat: -22.96, lng: -43.18 },
    bio: 'Levando o melhor do campo para a sua casa. Produtos orgânicos com entrega rápida e segura.',
    address: 'Rua do Domicílio, 20, Rio de Janeiro, RJ',
    pixKey: '12.345.678/0001-99',
    shippingCost: 14.00,
    phone: '5521987654326',
    image: 'https://placehold.co/100x100.png'
  },
  {
    id: '7',
    responsibleName: 'Lúcia Rodrigues',
    name: 'Naturalmente Orgânicos',
    prepostos: [],
    fairs: ['Tijuca'],
    location: { lat: -22.92, lng: -43.23 },
    bio: 'Saúde e sabor em cada folha. Nossos produtos são cultivados sem agrotóxicos, com respeito à natureza.',
    address: 'Rua Natural, 30, Rio de Janeiro, RJ',
    pixKey: 'naturalmente.organicos@email.com',
    shippingCost: 0,
    phone: '5521987654327',
    image: 'https://placehold.co/100x100.png'
  },
  {
    id: '8',
    responsibleName: 'Ronilson (Ronin)',
    name: 'Sítio Paraíso',
    prepostos: ['Ruan'],
    fairs: ['Tijuca'],
    location: { lat: -22.89, lng: -43.25 },
    bio: 'O paraíso dos orgânicos. Produção familiar com foco na qualidade e no sabor autêntico dos alimentos.',
    address: 'Caminho do Paraíso, 77, Teresópolis, RJ',
    pixKey: 'ronin.paraiso@email.com',
    shippingCost: 20.00,
    phone: '5521987654328',
    image: 'https://placehold.co/100x100.png'
  }
];

let orders: Order[] = [
    {
        id: 'ORD-001',
        customerName: 'Alice Johnson',
        items: [
            { productName: 'Cenouras Orgânicas', quantity: 2 },
            { productName: 'Leite Fresco da Fazenda Orgânico', quantity: 1 },
        ],
        status: 'Pendente',
        total: 8.50,
        date: new Date(2024, 6, 20),
        deliveryOption: 'delivery',
        customerContact: { address: 'Rua das Flores, 123, Rio de Janeiro, RJ', phone: '21999991111' },
    },
    {
        id: 'ORD-002',
        customerName: 'Bob Williams',
        items: [
            { productName: 'Pão de Fermentação Natural Orgânico', quantity: 1 },
            { productName: 'Queijo Artesanal Orgânico', quantity: 1 },
        ],
        status: 'Confirmado',
        total: 13.00,
        date: new Date(2024, 6, 19),
        deliveryOption: 'pickup',
        pickupLocation: 'Feira da Tijuca',
    },
    {
        id: 'ORD-003',
        customerName: 'Charlie Brown',
        items: [
            { productName: 'Maçã Fuji Orgânica', quantity: 4 },
            { productName: 'Morangos Frescos Orgânicos', quantity: 1 },
        ],
        status: 'Pendente',
        total: 10.00,
        date: new Date(2024, 6, 20),
        deliveryOption: 'pickup',
        pickupLocation: 'Feira de Botafogo',
    },
    {
        id: 'ORD-004',
        customerName: 'Diana Miller',
        items: [
            { productName: 'Tomates Italianos Orgânicos', quantity: 2 },
            { productName: 'Couve Mineira Orgânica', quantity: 1 },
        ],
        status: 'Rejeitado',
        total: 8.00,
        date: new Date(2024, 6, 18),
        deliveryOption: 'delivery',
        customerContact: { address: 'Av. Copacabana, 456, Rio de Janeiro, RJ', phone: '21988882222' },
    }
];

let customers: Customer[] = [
    {
        id: 'cust-001',
        name: 'Cliente Exemplo',
        favoriteFarmerIds: ['1', '2'],
        address: 'Rua de Exemplo, 123, Bairro, Rio de Janeiro, RJ',
        phone: '21912345678',
        image: 'https://placehold.co/100x100.png',
        classification: 'ouro',
        cep: '22221-010'
    },
    {
        id: 'cust-alice',
        name: 'Alice Johnson',
        address: 'Rua das Flores, 123, Rio de Janeiro, RJ',
        phone: '21999991111',
        favoriteFarmerIds: ['1', '3'],
        image: 'https://placehold.co/100x100.png',
        classification: 'prata'
    },
     {
        id: 'cust-bob',
        name: 'Bob Williams',
        address: 'Praça da Bandeira, 789, Rio de Janeiro, RJ',
        phone: '21977773333',
        favoriteFarmerIds: ['4', '3'],
        image: 'https://placehold.co/100x100.png',
        classification: 'bronze'
    },
     {
        id: 'cust-charlie',
        name: 'Charlie Brown',
        address: 'Avenida Atlântica, 123, Rio de Janeiro, RJ',
        phone: '21966664444',
        favoriteFarmerIds: ['2'],
        image: 'https://placehold.co/100x100.png',
        classification: 'diamante'
    },
    {
        id: 'cust-diana',
        name: 'Diana Miller',
        address: 'Av. Copacabana, 456, Rio de Janeiro, RJ',
        phone: '21988882222',
        favoriteFarmerIds: ['1'],
        image: 'https://placehold.co/100x100.png'
    }
];

// Mapa de imagens padrão para produtos básicos
const defaultProductImages = new Map<string, string>([
    ['couve flor', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/couve_flor.webp?alt=media&token=5e32779d-a643-4845-9b4b-6f3b6474b444'],
    ['couve mineira', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/couve_mineira.webp?alt=media&token=fb0702ac-1c9a-4414-9857-bd0908d68348'],
    ['couve toscana', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/couve_toscana.webp?alt=media&token=d4d592f2-8fbe-4489-a044-6d46d2fc3753'],
    ['couve kale', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/couve_kale.webp?alt=media&token=0f9318de-5203-44c4-9c85-420452ed7627'],
    ['couve', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/couve_mineira.webp?alt=media&token=fb0702ac-1c9a-4414-9857-bd0908d68348'],
    ['maca fuji', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/maca_fuji.webp?alt=media&token=d9b195e6-0e42-4976-83fe-fdf87dfafd7c'],
    ['maca', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/maca_fuji.webp?alt=media&token=d9b195e6-0e42-4976-83fe-fdf87dfafd7c'],
    ['alface americana', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/alface_americana.webp?alt=media&token=d745a4e5-1f8c-4333-8a8a-48a4201d308a'],
    ['alface mimosa verde', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/alface_mimosa_verde.webp?alt=media&token=4635346b-69f9-4a54-94b6-8cb1b85f4afb'],
    ['alface mimosa roxa', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/alface_mimosa_roxa.webp?alt=media&token=c8b001dc-6f00-486f-af0a-22c99ed83d01'],
    ['alface mimosa', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/alface_mimosa_verde.webp?alt=media&token=4635346b-69f9-4a54-94b6-8cb1b85f4afb'],
    ['brocolis americano', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/brocolis_americano.webp?alt=media&token=fd124564-9af1-438e-8e3b-34c320279c8b'],
    ['brocolis', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/brocolis_americano.webp?alt=media&token=fd124564-9af1-438e-8e3b-34c320279c8b'],
    ['beterraba', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/beterraba.webp?alt=media&token=d33b9ad6-d6c9-4641-b2fc-e4ed9893cbb0'],
    ['tomate italiano', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/tomate_italiano.webp?alt=media&token=08336411-6ae5-4051-b378-cc4eb7c7e4ba'],
    ['tomates italianos', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/tomate_italiano.webp?alt=media&token=08336411-6ae5-4051-b378-cc4eb7c7e4ba'],
    ['tomate', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/tomate_italiano.webp?alt=media&token=08336411-6ae5-4051-b378-cc4eb7c7e4ba'],
    ['cenoura', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/cenoura.webp?alt=media&token=83e659dc-2bd5-42f5-bc98-a178690858f1'],
    ['morango', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/morango.webp?alt=media&token=086479b1-5b7e-451d-9635-193264f55e31'],
    ['pão', 'https://placehold.co/600x400.png'],
    ['leite', 'https://placehold.co/600x400.png'],
    ['queijo', 'https://placehold.co/600x400.png'],
    ['laranja pera', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/laranja_pera.webp?alt=media&token=b4db9a4e-b349-4805-ac9d-fee1fcb4d5d8'],
    ['laranja', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/laranja_pera.webp?alt=media&token=b4db9a4e-b349-4805-ac9d-fee1fcb4d5d8'],
    ['iogurte', 'https://placehold.co/600x400.png'],
    ['baguete', 'https://placehold.co/600x400.png'],
    ['pimentao verde', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/pimentao_verde.webp?alt=media&token=e93a384f-c567-4d1a-9f4a-7140f7b09335'],
    ['pimentao vermelho', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/pimentao_vermelho.webp?alt=media&token=d10b7b1b-9e4a-4b9e-8b1b-7e6d6e7f8e8e'],
    ['pimentao amarelo', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/pimentao_amarelo.webp?alt=media&token=c4a9a8f2-8e0c-4e8a-8a6a-0c5d5e5f4d4d'],
    ['pimentao', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/pimentao_verde.webp?alt=media&token=e93a384f-c567-4d1a-9f4a-7140f7b09335'],
    ['manga palmer', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/manga_palmer.webp?alt=media&token=fdf4085f-fbef-41b1-be8a-a613dde3c2e4'],
    ['alho', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/alho.webp?alt=media&token=8071bc57-cdd1-4105-98da-6253f6f13050'],
    ['tangerina pokan', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/tangerina_pokan.webp?alt=media&token=ca18499e-b35d-43f7-9b73-9c77684ef3b4'],
    ['batata doce', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/batata_doce.webp?alt=media&token=9777102d-626a-4f4e-b2d7-1045f0cc4148'],
    ['mamao papaya', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/mamao_papaya.webp?alt=media&token=6935a389-a40d-4eb2-b1ae-cdaed2be18a3'],
    ['inhame', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/inhame.webp?alt=media&token=230229d4-3136-45a0-a5df-605c7de2592b'],
    ['limao taiti', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/limao_taiti.webp?alt=media&token=5f538bf1-e909-4346-8c0d-92c1e145b897'],
    ['banana prata', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/banana_prata.webp?alt=media&token=d38fe201-0312-48fc-9cf7-6e2b1fd97bf8'],
    ['goiaba vermelha', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/goiaba_vermelha.webp?alt=media&token=da3e5869-d746-4b9b-b23c-ab5418912991'],
    ['abacaxi', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/abacaxi.webp?alt=media&token=4caa0219-8635-4fbb-8e1c-fdec6909ebda'],
    ['berinjela', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/berinjela.webp?alt=media&token=ad1f7bd9-75db-4fc4-ac6d-3608733d71e9'],
    ['abóbora japonesa', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/abobora_japonesa.webp?alt=media&token=9cc8d464-1f1a-404e-8d32-aeddadc861ba'],
    ['abobora baianinha', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/abobora_baianinha.webp?alt=media&token=9860ba6a-82f2-439b-92c2-0c57d6d338a3'],
    ['alface lisa', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/alface_lisa.webp?alt=media&token=ced73d99-300e-4904-9072-9c8e4fcecd79'],
    ['alface crespa', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/alface_crespa.webp?alt=media&token=a057c9ac-0fe9-40b0-a016-49d16b016941'],
    ['alface roxa', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/alface_roxa.webp?alt=media&token=c566920b-b13c-4d87-916a-813e320aedec'],
    ['abacate', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/abacate.webp?alt=media&token=90d0ec6c-ca97-40eb-b694-5f489d925864'],
    ['aipim', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/aipim.webp?alt=media&token=ab467c17-50b2-4319-8aad-0845e323b526'],
    ['almeirão', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/almeirao.webp?alt=media&token=de89169e-8993-46bd-9c82-5a9d289ebdc3'],
    ['ameixa', 'https://placehold.co/600x400.png'],
    ['abobrinha italiana', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/abobrinha_italiana.webp?alt=media&token=1c5c4cae-04b4-497f-99bf-94b09f8cdc7d'],
    ['amora', 'https://placehold.co/600x400.png'],
    ['azedinha', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/azedinha.webp?alt=media&token=9e5fa2ef-55b7-4e80-860c-691ae12f24f8'],
    ['banana dagua', 'https://placehold.co/600x400.png'],
    ['banana nanica', 'https://placehold.co/600x400.png'],
    ['coentro', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/coentro.webp?alt=media&token=d4bb207b-4d74-4de4-bc80-8843dd338010'],
    ['cebolinha', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/cebolinha.webp?alt=media&token=48e03912-a30e-4032-94b8-9a84b6209d3e'],
    ['cebola roxa', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/cebola_roxa.webp?alt=media&token=e2c5234f-af01-4481-a046-71295fe900fe'],
    ['cebola', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/cebola.webp?alt=media&token=d038a9a2-f0f9-421f-b436-324602f0b5bd'],
    ['repolho verde', 'https://placehold.co/600x400.png'],
    ['repolho roxo', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/repolho_roxo.webp?alt=media&token=2ea7df6f-0845-4042-aa71-38812b164b6a'],
    ['maçã gala', 'https://placehold.co/600x400.png'],
    ['rúcula', 'https://placehold.co/600x400.png'],
    ['mamão formosa', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/mamao_formosa.webp?alt=media&token=7887ce63-fb00-42fe-a5d3-8f70e128bdb3'],
    ['ovos', 'https://placehold.co/600x400.png'],
    ['gengibre', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/gengibre.webp?alt=media&token=b70596de-b66f-4c39-a8c9-6951a442ff84'],
    ['cúrcuma', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/curcuma.webp?alt=media&token=52fffeff-7486-4cab-9021-81331e7c5cc6'],
    ['melão amarelo', 'https://placehold.co/600x400.png'],
    ['melão orange', 'https://placehold.co/600x400.png'],
    ['melão pele de sapo', 'https://placehold.co/600x400.png'],
    ['melão cantaloupe', 'https://placehold.co/600x400.png'],
    ['acelga', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/acelga.webp?alt=media&token=0721f75b-65a2-40cf-8754-c10afd93acc6'],
    ['alho poró', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/alho_poro.webp?alt=media&token=84c5bcc6-06f2-46be-8589-68b3e7be0fa5'],
    ['chuchu', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/chuchu.webp?alt=media&token=4ef6fcb9-2d57-47b6-b397-ec466ccfc6cd'],
    ['batata inglesa', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/batata_inglesa.webp?alt=media&token=41f17e48-9a43-4980-b61d-1c12a91f3cf2'],
    ['batata baroa', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/batata_baroa.webp?alt=media&token=58b079cb-80de-40fb-97f0-a654a34f1c1b'],
    ['batata yacon', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/batata_yacon.webp?alt=media&token=1531f6ab-5dde-4141-8715-28005e7d615e'],
    ['tomate grape', 'https://placehold.co/600x400.png'],
    ['tomate salada', 'https://placehold.co/600x400.png'],
    ['tomate cereja', 'https://placehold.co/600x400.png'],
    ['cogumelo shiitake', 'https://placehold.co/600x400.png'],
    ['cogumelo paris', 'https://placehold.co/600x400.png'],
    ['cogumelo shimeji', 'https://placehold.co/600x400.png'],
    ['cogumelo portobello', 'https://placehold.co/600x400.png'],
    ['limão siciliano', 'https://placehold.co/600x400.png'],
    ['limão cravo', 'https://placehold.co/600x400.png'],
    ['limão galego', 'https://placehold.co/600x400.png'],
    ['pepino', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/pepino.webp?alt=media&token=e47fbf50-b714-4f92-846c-5e6e63d284e1'],
    ['kiwi', 'https://placehold.co/600x400.png'],
    ['tangerina murcote', 'https://placehold.co/600x400.png'],
    ['abóbora paulistinha', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/abobora_paulistinha.webp?alt=media&token=085ac67e-9468-4e75-90f7-0698285bcc35'],
    ['abóbora moranga', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/abobora_moranga.webp?alt=media&token=f4ba0711-99f5-4cd5-bd0f-41fafaf1bcd0'],
    ['mostarda', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/mostarda.webp?alt=media&token=4e6b4187-dc70-41c2-904d-7ec8572c31b0'],
    ['salsa', 'https://placehold.co/600x400.png'],
    ['chicória', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/chicoria.webp?alt=media&token=64cf0f70-4063-4ca5-96a1-4c8026705058'],
    ['rabanete', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/rabanete.webp?alt=media&token=fd084d85-6e5f-4519-ae09-e0606e54b063'],
    ['alface romana', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/alface_romana.webp?alt=media&token=f0a4afb0-0d99-48ad-88a2-0e3a8f048d17'],
    ['agrião', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/agriao.webp?alt=media&token=c27c2017-aa81-4c03-a41c-c6323c14e213'],
    ['espinafre', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/espinafre.webp?alt=media&token=314e18aa-482f-4cef-badc-db518683d218'],
    ['laranja bahia', 'https://placehold.co/600x400.png'],
    ['laranja seleta', 'https://placehold.co/600x400.png'],
    ['hortelã', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/hortela.webp?alt=media&token=97dacb1f-e59f-4891-9176-73eec1e16188'],
    ['poejo', 'https://placehold.co/600x400.png'],
    ['radicchio', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/radicchio.webp?alt=media&token=473281ea-32f7-4a12-a93a-23a821b91505'],
    ['milho verde', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/milho_verde.webp?alt=media&token=06cf8e19-7d36-42eb-8b27-cde60f2c41d6'],
    ['milho', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/milho_verde.webp?alt=media&token=06cf8e19-7d36-42eb-8b27-cde60f2c41d6'],
    ['vagem', 'https://placehold.co/600x400.png'],
    ['feijao preto', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/feijao_preto.webp?alt=media&token=37fb877a-32f5-419f-a2fd-eb01841d991d'],
    ['feijao carioca', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/feijao_carioca.webp?alt=media&token=67c3dfb7-4e77-4593-a133-3a7fd51f1ef2'],
    ['feijao vermelho', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/feijao_vermelho.webp?alt=media&token=0eb5f6e0-33fc-4407-a608-9c44bf770c5f'],
    ['oregano', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/oregano.webp?alt=media&token=0b64f7ac-1aa4-4e21-a6b0-67eee4c6124e'],
]);


export function getProducts(options: { includePaused?: boolean } = {}): Product[] {
  const { includePaused = false } = options;
  let allProducts = products.map(p => {
    // Simula a expiração da promoção
    if (p.promotion && p.promotion.isActive && new Date() > p.promotion.expiresAt) {
      return { ...p, promotion: { ...p.promotion, isActive: false } };
    }
    return p;
  });

  // Aplica imagens padrão com lógica aprimorada
  allProducts = allProducts.map(product => {
      // Normaliza o nome do produto para busca: minúsculas, sem acentos, sem hífen
      const normalizedProductName = product.name
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]|-/g, "");

      let bestMatch = '';
      let bestMatchImageUrl = '';

      // Itera sobre as palavras-chave do mapa para encontrar a correspondência mais longa
      for (const [keyword, imageUrl] of defaultProductImages.entries()) {
          const normalizedKeyword = keyword.normalize("NFD").replace(/[\u0300-\u036f]|-/g, "");
          if (normalizedProductName.includes(normalizedKeyword) && normalizedKeyword.length > bestMatch.length) {
              bestMatch = keyword;
              bestMatchImageUrl = imageUrl;
          }
      }

      // Se uma correspondência foi encontrada, atualiza a imagem do produto
      if (bestMatchImageUrl) {
          return { ...product, image: bestMatchImageUrl };
      }
      
      // Se nenhuma palavra-chave corresponder, garante que haja uma imagem de placeholder válida
      if (!product.image || !product.image.startsWith('http')) {
        return { ...product, image: 'https://placehold.co/600x400.png' };
      }

      return product;
  });

  // Ordena os produtos alfabeticamente pelo nome
  allProducts.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' }));

  if (includePaused) {
    return allProducts;
  }
  
  return allProducts.filter(p => p.status === 'active');
}

export function getProductById(id: string): Product | undefined {
  return getProducts({ includePaused: true }).find((p) => p.id === id);
}

export function deleteProduct(productId: string): boolean {
    const initialLength = products.length;
    products = products.filter(p => p.id !== productId);
    return products.length < initialLength;
}

export function updateProduct(productId: string, updatedData: Partial<Product>): Product | undefined {
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex !== -1) {
        products[productIndex] = { ...products[productIndex], ...updatedData };
        return products[productIndex];
    }
    return undefined;
}

export function toggleProductStatus(productId: string, status: 'active' | 'paused'): Product | undefined {
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex !== -1) {
        products[productIndex].status = status;
        return products[productIndex];
    }
    return undefined;
}

export function toggleProductPromotion(productId: string, promote: boolean): Product | undefined {
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex === -1) return undefined;

    if (promote) {
        products[productIndex].promotion = {
            isActive: true,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 dias a partir de agora
        };
    } else {
        if (products[productIndex].promotion) {
            products[productIndex].promotion!.isActive = false;
        }
    }
    return products[productIndex];
}

export function getPromotionalProducts(): (Product & { farmerName: string })[] {
    const activePromotions = getProducts().filter(p => p.promotion?.isActive);
    return activePromotions.map(p => {
        const farmer = getFarmerById(p.farmerId);
        return {
            ...p,
            farmerName: farmer ? farmer.name : "Agricultor Desconhecido"
        };
    });
}


export function getFarmers(): Farmer[] {
  return farmers;
}

export function getFarmerById(id: string): Farmer | undefined {
  return farmers.find((f) => f.id === id);
}

export function updateFarmer(farmerId: string, updatedData: Partial<Farmer>): Farmer | undefined {
    const farmerIndex = farmers.findIndex(f => f.id === farmerId);
    if (farmerIndex !== -1) {
        farmers[farmerIndex] = { ...farmers[farmerIndex], ...updatedData };
        return farmers[farmerIndex];
    }
    return undefined;
}

export function updateCustomer(customerId: string, updatedData: Partial<Customer>): Customer | undefined {
    const customerIndex = customers.findIndex(c => c.id === customerId);
    if (customerIndex !== -1) {
        customers[customerIndex] = { ...customers[customerIndex], ...updatedData };
        return customers[customerIndex];
    }
    return undefined;
}

export function addFarmer(farmerData: Omit<Farmer, 'id' | 'location' | 'image'>): Farmer {
    const newId = `farmer-${farmers.length + 1 + Date.now()}`;
    const newFarmer: Farmer = {
        id: newId,
        // Usando uma localização aleatória perto do Rio de Janeiro para simulação
        location: { lat: -22.9068 + (Math.random() - 0.5) * 0.5, lng: -43.1729 + (Math.random() - 0.5) * 0.5 },
        image: 'https://placehold.co/100x100.png',
        ...farmerData,
    };
    farmers.push(newFarmer);
    console.log("Novo agricultor adicionado:", newFarmer);
    console.log("Lista de agricultores atualizada:", farmers);
    return newFarmer;
}

export function getFarmersWithProducts(farmerIds?: string[]): FarmerWithProducts[] {
  const result: FarmerWithProducts[] = [];
  const currentProducts = getProducts();

  const targetFarmers = farmerIds ? farmers.filter(f => farmerIds.includes(f.id)) : farmers;

  targetFarmers.forEach(farmer => {
    const farmerProducts = currentProducts.filter(product => product.farmerId === farmer.id);
    if(farmerProducts.length > 0) {
      result.push({ ...farmer, products: farmerProducts });
    }
  });

  return result;
}


export function getOrders(): Order[] {
    return orders;
}

export function getCustomers(): Customer[] {
    const customerIdsFromOrders = new Set(orders.map(o => o.customerName));
    
    // Simula a criação de um 'id' para clientes que só existem em pedidos
    const customersFromOrders: Customer[] = Array.from(customerIdsFromOrders)
      .map(name => {
          const existingCustomer = customers.find(c => c.name === name);
          if (existingCustomer) return null; // Já existe na lista principal

          const order = orders.find(o => o.customerName === name);
          if (!order) return null;

          return {
              id: `cust-${name.toLowerCase().replace(' ', '-')}`,
              name: order.customerName,
              address: order.customerContact?.address || 'Endereço não informado',
              phone: order.customerContact?.phone || 'Telefone não informado',
              favoriteFarmerIds: [],
              image: 'https://placehold.co/100x100.png'
          };
      }).filter((c): c is Customer => Boolean(c));
      
    // Une a lista principal com os clientes derivados dos pedidos, sem duplicatas
    const allKnownCustomers = [...customers];
    customersFromOrders.forEach(c => {
      if (!allKnownCustomers.some(ac => ac.id === c.id)) {
        allKnownCustomers.push(c);
      }
    });

    return allKnownCustomers;
}

export function getCustomerById(id: string): Customer | undefined {
    return getCustomers().find(c => c.id === id);
}

export function updateCustomerClassification(customerId: string, classification: CustomerClassification): Customer | undefined {
    const customerIndex = customers.findIndex(c => c.id === customerId);
    if (customerIndex !== -1) {
        customers[customerIndex].classification = classification;
        return customers[customerIndex];
    }
    // Se o cliente não estava na lista original (veio dos pedidos), adiciona-o
    const orderCustomer = getCustomerById(customerId);
    if (orderCustomer) {
        const newCustomer = { ...orderCustomer, classification };
        customers.push(newCustomer);
        return newCustomer;
    }

    return undefined;
}

















