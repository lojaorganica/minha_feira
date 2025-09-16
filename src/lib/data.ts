

import type { Product, Farmer, Order, Customer, FarmerWithProducts, CustomerClassification, CustomerAddress, ProductCategory } from './types';

// ============================================================================
// IN-MEMORY DATA STORE
// ============================================================================

// A lógica complexa de hidratação e cache foi removida para garantir estabilidade.
// O aplicativo agora carrega os dados "de fábrica" diretamente do código-fonte,
// eliminando problemas de dessincronização e a "piscada" na tela.

const FARMERS_KEY = 'minha_feira_farmers_v3';
const ORDERS_KEY = 'minha_feira_orders';
const CUSTOMERS_KEY = 'minha_feira_customers';

// Helper to get data from localStorage (para dados que não precisam de atualização constante)
function getStoredData<T>(key: string, defaultValue: T[]): T[] {
  if (typeof window === 'undefined') {
    return defaultValue;
  }
  try {
    const storedData = localStorage.getItem(key);
    if (storedData) {
      return JSON.parse(storedData);
    } else {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
  } catch (error) {
    console.error(`Error hydrating ${key} from localStorage`, error);
    return defaultValue;
  }
}

// Helper function to save data to localStorage
function setStoredData<T>(key: string, value: T[]): void {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing ${key} to localStorage`, error);
  }
}


const lojaOrganicaProducts: Product[] = [
    {
        id: '1001',
        name: 'Mel de Aroeira Orgânico',
        price: 35.00,
        unit: 'pote',
        category: 'Apícola',
        image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/mel_de_aroeira.webp?alt=media&token=cc691f95-6565-42b1-9abd-95cca2e6b31d',
        dataAiHint: 'aroeira honey',
        farmerId: '134',
        description: 'O mel de aroeira é raro e considerado um dos mais especiais do Brasil, não apenas por seu sabor diferenciado e intenso, mas também pelas propriedades medicinais comprovadas. De coloração âmbar bastante escura e sabor menos adocicado, apresenta altos índices de invertase — enzima responsável pela transformação do néctar em mel —, baixa acidez e uma característica rara: dificilmente se cristaliza.\n\nProduzido pelas abelhas a partir de múltiplas fontes da própria árvore (Myracrodruon urundeuva), o mel reúne o néctar das flores, compostos fenólicos presentes em suas folhas e flores, além do melato — uma substância adocicada produzida por pulgões que se alimentam da seiva da aroeira. Essa complexidade confere ao mel não apenas um sabor marcante, que lembra melado de cana pelo seu teor de ferro, mas também uma riqueza nutricional extraordinária, com altos teores de minerais como ferro, magnésio, potássio, cálcio e cobre.\n\nEstudos conduzidos pela Fundação Ezequiel Dias, em Belo Horizonte, sob liderança da Dra. Esther Bastos, revelaram que o mel de aroeira possui atividade antibiótica contra a bactéria Helicobacter pylori, responsável por gastrite, úlceras e até câncer de estômago. Por isso, esse mel tem sido apontado como promissor no desenvolvimento de medicamentos e no tratamento de doenças gástricas. Além disso, destaca-se por suas propriedades anti-inflamatórias, antioxidantes, cicatrizantes, antibacterianas e imunofortalecedoras, sendo um excelente aliado no combate à anemia, no fortalecimento da imunidade e na promoção do bem-estar.\n\nO mel de aroeira é envasado em Timóteo, no Vale do Rio Doce (MG), região marcada pela biodiversidade da cordilheira do Espinhaço, próxima à Serra do Gandu e à Serra da Piedade. Parte de seu território é protegida pela APA da Serra do Timóteo e pelo Parque Estadual do Rio Doce, a maior reserva de Mata Atlântica de Minas Gerais, garantindo a preservação ambiental que sustenta sua produção.\n\nUm mel medicinal e extraordinário!',
        status: 'active',
        stock: 30
    },
    {
        id: '1002',
        name: 'Mel de Acácia Orgânico',
        price: 32.00,
        unit: 'pote',
        category: 'Apícola',
        image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/mel_de_acacia.webp?alt=media&token=b94ee3e6-52de-4f78-a801-38f5254c840c',
        dataAiHint: 'acacia honey',
        farmerId: '134',
        description: 'Cultivado numa propriedade na Serra do Roncador, no Mato Grosso — onde se entrelaçam biomas da Amazônia e do Cerrado — este mel orgânico de acácia se destaca não só pelo sabor delicado, mas por suas qualidades nutricionais e funcionais. A acácia (gênero Acacia) tem sido associada à simbologia de “Árvore da Vida” desde a antiguidade, presente na mitologia egípcia como símbolo de renovação e imortalidade. Ele costuma ter cor clara e aroma floral suave, delicioso!\n\nPesquisas recentes mostram que o mel de acácia contém compostos fenólicos e flavonoides significativos, que atuam como antioxidantes protetores do organismo. Estudos também apontam que amostras de acácia têm teor mineral considerável: potássio (K), magnésio (Mg), ferro (Fe), zinco (Zn) e sódio (Na) entre os elementos detectados. A acidez livre costuma estar entre valores moderados (por volta de 16-21 meq/kg), o que contribui para seu sabor suave. Além disso, enzimas como invertase e diastase são observadas em acácia de boa qualidade, atestando sua pureza e frescor.\nEsse mel fornece energia rápida (principalmente pelos açúcares naturais), antioxidantes que ajudam a combater estresse oxidativo e inflamações, minerais que participam de processos metabólicos essenciais — entre eles ferro (útil para quem está com anemia), magnésio que ajuda contra câimbras e fadiga, potássio para o funcionamento circulatório e nervoso — e vitamina C em pequenas proporções, que atua protegendo o sistema imunológico.\nSe você busca um mel que una leveza, pureza, benefícios comprovados, sabor refinado e significado simbólico, este mel de acácia do Serra do Roncador entrega tudo isso. Um presente da natureza com doçura divina!',
        status: 'active',
        stock: 35
    },
    {
        id: '136',
        name: 'Mel de Eucalipto Orgânico',
        price: 26.00,
        unit: 'pote',
        category: 'Apícola',
        image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/mel_de_eucalipto.webp?alt=media&token=22fad2b2-c030-4f6e-ac57-6d5b6fa0cc49',
        dataAiHint: 'eucalyptus honey',
        farmerId: '134',
        description: 'O mel de eucalipto é um dos mais reconhecidos por suas propriedades medicinais expectorantes, antissépticas, antibacterianas, anti-inflamatórias e antioxidantes. Produzido a partir das flores de eucalipto, ele concentra compostos naturais como o eucaliptol (1,8-cineol), que ajuda a fluidificar secreções e aliviar sintomas de gripes, resfriados, tosses e problemas respiratórios. De fato, o eucaliptol tem sido amplamente estudado por sua ação broncodilatadora e sua capacidade de atuar como um componente ativo em inalantes e xaropes respiratórios.\nRico em minerais como ferro, cálcio e magnésio, vitaminas B e C, além de antioxidantes potentes, esse mel fortalece o sistema imunológico, auxilia na recuperação de quadros de anemia e promove energia e vitalidade no dia a dia — com benefícios também documentados para a saúde gastrointestinal e proteção contra infecções do trato respiratório superior. Seja puro, em salada de frutas no café da manhã, chás, o mel de eucalipto é mais que alimento: é cuidado e saúde.',
        status: 'active',
        stock: 45
    },
    {
        id: '134',
        name: 'Mel Silvestre Orgânico',
        price: 25.00,
        unit: 'pote',
        category: 'Apícola',
        image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/mel_silvestre.webp?alt=media&token=4856b4c9-7f07-4559-8977-2b5e6f3fdeb9',
        dataAiHint: 'wildflower honey',
        farmerId: '134',
        description: 'Um blend de néctares de diversas flores silvestres, resultando em um mel de sabor complexo e único a cada safra.',
        status: 'active',
        stock: 50
    },
];

const allMasterFruits: Product[] = [
  {
    id: '2',
    name: 'Tomate Italiano Orgânico',
    category: 'Fruta',
    price: 3.0,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/tomate_italiano.webp?alt=media&token=f4195895-85ed-42f7-92b7-55085c4c1a72',
    dataAiHint: 'italian tomatoes',
    farmerId: '2',
    description: 'Tomates italianos orgânicos, perfeitos para molhos encorpados e saladas.',
    status: 'active',
    stock: 30,
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
    unit: 'caixa',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/morango.webp?alt=media&token=086479b1-5b7e-451d-9635-193264f55e31',
    dataAiHint: 'fresh strawberries',
    farmerId: '2',
    description: 'Morangos orgânicos maduros e doces, colhidos no pico do frescor.',
    status: 'active',
    stock: 25,
    promotion: {
        isActive: true,
        expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
    }
  },
  {
    id: '9',
    name: 'Laranja Pera Orgânica',
    category: 'Fruta',
    price: 2.0,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/laranja_pera.webp?alt=media&token=b4db9a4e-b349-4805-ac9d-fee1fcb4d5d8',
    dataAiHint: 'pera orange',
    farmerId: '2',
    description: 'Laranja Pera orgânica, ideal para sucos, com sabor adocicado e pouca acidez.',
    status: 'active',
    stock: 100,
  },
  {
    id: '12',
    name: 'Amora Orgânica',
    price: 6.00,
    unit: 'caixa',
    category: 'Fruta',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/amora.webp?alt=media&token=86e42b5a-4e5b-4b1e-9e7b-8e9e1c7c4a3b',
    dataAiHint: 'blackberry',
    farmerId: '2',
    description: 'Amoras orgânicas, doces e suculentas, perfeitas para geleias, tortas e consumo in natura.',
    status: 'active',
    stock: 15,
  },
  {
    id: '13',
    name: 'Maçã Fuji Orgânica',
    category: 'Fruta',
    price: 1.8,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/maca_fuji.webp?alt=media&token=d9b195e6-0e42-4976-83fe-fdf87dfafd7c',
    dataAiHint: 'fuji apple',
    farmerId: '2',
    description: 'Maçãs Fuji orgânicas, conhecidas por sua doçura e textura crocante.',
    status: 'active',
    stock: 120,
  },
  {
    id: '17',
    name: 'Manga Palmer Orgânica',
    category: 'Fruta',
    price: 6.50,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/manga_palmer.webp?alt=media&token=fdf4085f-fbef-41b1-be8a-a613dde3c2e4',
    dataAiHint: 'palmer mango',
    farmerId: '2',
    description: 'Manga Palmer doce e sem fibras, perfeita para consumo in natura ou sucos.',
    status: 'active',
    stock: 40,
  },
  {
    id: '19',
    name: 'Tangerina Ponkan Orgânica',
    category: 'Fruta',
    price: 4.80,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/tangerina_ponkan.webp?alt=media&token=eceafacb-80ae-44f1-8349-8edd8222bf30',
    dataAiHint: 'ponkan tangerine',
    farmerId: '2',
    description: 'Tangerina Ponkan suculenta e fácil de descascar, colhida no ponto certo de doçura.',
    status: 'active',
    stock: 60,
  },
  {
    id: '22',
    name: 'Mamão Papaya Orgânico',
    category: 'Fruta',
    price: 5.20,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/mamao_papaya.webp?alt=media&token=6935a389-a40d-4eb2-b1ae-cdaed2be18a3',
    dataAiHint: 'papaya',
    farmerId: '2',
    description: 'Mamão Papaya orgânico, doce e macio. Perfeito para o café da manhã ou sobremesas.',
    status: 'active',
    stock: 25,
  },
  {
    id: '24',
    name: 'Limão Taiti Orgânico',
    category: 'Fruta',
    price: 3.90,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/limao_taiti.webp?alt=media&token=5f538bf1-e909-4346-8c0d-92c1e145b897',
    dataAiHint: 'tahiti lime',
    farmerId: '2',
    description: 'Limão Taiti orgânico, suculento e com poucas sementes. Ideal para sucos, temperos e sobremesas.',
    status: 'active',
    stock: 90,
  },
  {
    id: '25',
    name: 'Banana Prata Orgânica',
    category: 'Fruta',
    price: 5.50,
    unit: 'dúzia',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/banana_prata.webp?alt=media&token=d38fe201-0312-48fc-9cf7-6e2b1fd97bf8',
    dataAiHint: 'silver banana',
    farmerId: '2',
    description: 'Banana prata orgânica, ideal para o consumo diário, rica em potássio e de sabor suave.',
    status: 'active',
    stock: 50,
  },
  {
    id: '26',
    name: 'Goiaba Vermelha Orgânica',
    category: 'Fruta',
    price: 5.80,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/goiaba_vermelha.webp?alt=media&token=da3e5869-d746-4b9b-b23c-ab5418912991',
    dataAiHint: 'red guava',
    farmerId: '2',
    description: 'Goiabas vermelhas orgânicas, doces e perfumadas, perfeitas para sucos e sobremesas.',
    status: 'active',
    stock: 30,
  },
  {
    id: '27',
    name: 'Abacaxi Orgânico',
    category: 'Fruta',
    price: 7.00,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/abacaxi.webp?alt=media&token=4caa0219-8635-4fbb-8e1c-fdec6909ebda',
    dataAiHint: 'pineapple',
    farmerId: '2',
    description: 'Abacaxi pérola orgânico, doce e suculento, perfeito para o verão.',
    status: 'active',
    stock: 20,
  },
  {
    id: '28',
    name: 'Berinjela Orgânica',
    category: 'Fruta',
    price: 3.70,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/berinjela.webp?alt=media&token=ad1f7bd9-75db-4fc4-ac6d-3608733d71e9',
    dataAiHint: 'eggplant',
    farmerId: '2',
    description: 'Berinjela orgânica, ideal para antepastos, lasanhas e parmegiana.',
    status: 'active',
    stock: 15,
  },
  {
    id: '33',
    name: 'Abacate Orgânico',
    category: 'Fruta',
    price: 5.50,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/abacate.webp?alt=media&token=90d0ec6c-ca97-40eb-b694-5f489d925864',
    dataAiHint: 'avocado',
    farmerId: '2',
    description: 'Abacate cremoso e rico em gorduras saudáveis, perfeito para guacamole ou vitaminas.',
    status: 'active',
    stock: 15,
  },
  {
    id: '36',
    name: 'Ameixa Orgânica',
    category: 'Fruta',
    price: 8.00,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/ameixa.webp?alt=media&token=9216759e-b1b0-44ce-9404-09cd0503a111',
    dataAiHint: 'plum',
    farmerId: '2',
    description: 'Ameixas orgânicas doces e suculentas, perfeitas para comer in natura ou fazer geleias.',
    status: 'active',
    stock: 10,
  },
  {
    id: '40',
    name: 'Banana d\'Água Orgânica',
    category: 'Fruta',
    price: 5.00,
    unit: 'dúzia',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/banana_dagua.webp?alt=media&token=e09c1df0-0a4c-42eb-b356-d668db6e80c9',
    dataAiHint: 'nanica banana',
    farmerId: '2',
    description: 'Banana d\'água, também conhecida como nanica, doce e macia, ideal para sobremesas.',
    status: 'active',
    stock: 40,
  },
  {
    id: '41',
    name: 'Banana Nanica Orgânica',
    category: 'Fruta',
    price: 5.00,
    unit: 'dúzia',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/banana_nanica.webp?alt=media&token=f55bf317-5650-497b-92a7-0d6da754f1b1',
    dataAiHint: 'dwarf banana',
    farmerId: '2',
    description: 'Banana nanica orgânica, doce e macia, ideal para sobremesas e consumo diário.',
    status: 'active',
    stock: 40,
  },
  {
    id: '48',
    name: 'Maçã Gala Orgânica',
    category: 'Fruta',
    price: 6.50,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/maca_gala.webp?alt=media&token=1f30fbe4-e6db-4958-81e1-e953db358643',
    dataAiHint: 'gala apple',
    farmerId: '2',
    description: 'Maçãs Gala orgânicas, com sabor suave e doce, ideais para lanches.',
    status: 'active',
    stock: 80,
  },
  {
    id: '50',
    name: 'Mamão Formosa Orgânico',
    category: 'Fruta',
    price: 6.00,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/mamao_formosa.webp?alt=media&token=7887ce63-fb00-42fe-a5d3-8f70e128bdb3',
    dataAiHint: 'formosa papaya',
    farmerId: '2',
    description: 'Mamão Formosa de polpa macia e doce, rico em vitaminas.',
    status: 'active',
    stock: 10,
  },
  {
    id: '54',
    name: 'Melão Amarelo Orgânico',
    category: 'Fruta',
    price: 7.00,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/melao_amarelo.webp?alt=media&token=718ddb9c-9381-44aa-be87-31514c4426df',
    dataAiHint: 'yellow melon',
    farmerId: '2',
    description: 'Melão amarelo doce e refrescante, perfeito para dias quentes.',
    status: 'active',
    stock: 12,
  },
  {
    id: '55',
    name: 'Melão Orange Orgânico',
    category: 'Fruta',
    price: 8.00,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/melao_orange.webp?alt=media&token=fb9e85b4-2fa0-44f0-92b0-b2e492c58fab',
    dataAiHint: 'orange melon',
    farmerId: '2',
    description: 'Melão Orange com polpa alaranjada e sabor adocicado e perfumado.',
    status: 'active',
    stock: 10,
  },
  {
    id: '56',
    name: 'Melão Pele de Sapo Orgânico',
    category: 'Fruta',
    price: 8.50,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/melao_pele_de_sapo.webp?alt=media&token=47c0283d-6af0-47a9-ace4-340f8331b100',
    dataAiHint: 'piel de sapo melon',
    farmerId: '2',
    description: 'Melão Pele de Sapo, de polpa branca, muito doce e suculenta.',
    status: 'active',
    stock: 8,
  },
  {
    id: '57',
    name: 'Melão Cantaloupe Orgânico',
    category: 'Fruta',
    price: 9.00,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/melao_cantaloupe.webp?alt=media&token=04174dc3-46c3-49d6-8096-ecb20dd1e978',
    dataAiHint: 'cantaloupe melon',
    farmerId: '2',
    description: 'Melão Cantaloupe, com polpa alaranjada e sabor aromático inconfundível.',
    status: 'active',
    stock: 8,
  },
  {
    id: '63',
    name: 'Jiló Orgânico',
    category: 'Fruta',
    price: 4.50,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/jilo.webp?alt=media&token=21a949a4-5df3-4b27-ae98-7469466f94be',
    dataAiHint: 'scarlet eggplant',
    farmerId: '2',
    description: 'Jiló orgânico com seu sabor amargo característico, perfeito para fritadas e conservas.',
    status: 'active',
    stock: 15,
  },
  {
    id: '65',
    name: 'Tomatinho Grape Orgânico',
    category: 'Fruta',
    price: 5.50,
    unit: 'caixa',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/tomate_grape.webp?alt=media&token=34f6fc49-11e6-49bb-9ef2-28ff3d6690c3',
    dataAiHint: 'grape tomato',
    farmerId: '2',
    description: 'Tomatinhos grape, pequenos e muito doces, perfeitos para lanches e saladas.',
    status: 'active',
    stock: 20,
  },
  {
    id: '66',
    name: 'Tomate Salada Orgânico',
    category: 'Fruta',
    price: 4.80,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/tomate_salada.webp?alt=media&token=3fd5f103-22d9-4781-936a-46409e4da5fd',
    dataAiHint: 'salad tomato',
    farmerId: '2',
    description: 'Tomate para salada, firme e com poucas sementes, ideal para fatiar.',
    status: 'active',
    stock: 35,
  },
  {
    id: '67',
    name: 'Tomatinho Cereja Orgânico',
    category: 'Fruta',
    price: 5.00,
    unit: 'caixa',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/tomate_cereja.webp?alt=media&token=675a4a40-8ff8-439b-9366-db40ed3b7b96',
    dataAiHint: 'cherry tomato',
    farmerId: '2',
    description: 'Tomate cereja, pequeno e adocicado, ótimo para saladas, espetinhos e aperitivos.',
    status: 'active',
    stock: 20,
  },
  {
    id: '68',
    name: 'Kiwi Orgânico',
    category: 'Fruta',
    price: 9.00,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/kiwi.webp?alt=media&token=4e24b5ed-6b1f-44e8-8655-95eec46e1521',
    dataAiHint: 'kiwi',
    farmerId: '2',
    description: 'Kiwi orgânico, com sua polpa verde vibrante e sabor agridoce, rico em vitamina C.',
    status: 'active',
    stock: 12,
  },
  {
    id: '69',
    name: 'Pera Williams Orgânica',
    category: 'Fruta',
    price: 7.80,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/pera_williams.webp?alt=media&token=5bb791b0-9f75-4cd6-9a50-c4a978b351b7',
    dataAiHint: 'williams pear',
    farmerId: '2',
    description: 'Pera Williams com polpa macia, suculenta e muito aromática, ideal para consumo in natura e sobremesas.',
    status: 'active',
    stock: 18,
  },
  {
    id: '72',
    name: 'Limão Siciliano Orgânico',
    category: 'Fruta',
    price: 8.50,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/limao_siciliano.webp?alt=media&token=a2d02d86-f7b4-45f2-85f4-5e0bd2affeaf',
    dataAiHint: 'sicilian lemon',
    farmerId: '2',
    description: 'Limão siciliano, grande, de casca amarela e muito perfumado, ideal para risotos e sobremesas.',
    status: 'active',
    stock: 10,
  },
  {
    id: '73',
    name: 'Limão Cravo Orgânico',
    category: 'Fruta',
    price: 4.50,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/limao_cravo.webp?alt=media&token=d631609c-427a-4e87-be2c-6242f94b37ef',
    dataAiHint: 'rangpur lime',
    farmerId: '2',
    description: 'Limão cravo (ou rosa), com casca avermelhada e sabor único, ótimo para temperos e caipirinhas.',
    status: 'active',
    stock: 20,
  },
  {
    id: '74',
    name: 'Limão Galego Orgânico',
    category: 'Fruta',
    price: 4.80,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/limao_galego.webp?alt=media&token=e8341d8b-9733-478b-9bd0-0104de2365cb',
    dataAiHint: 'key lime',
    farmerId: '2',
    description: 'Limão galego, pequeno e de casca fina, muito suculento e ácido, um clássico nacional.',
    status: 'active',
    stock: 25,
  },
  {
    id: '78',
    name: 'Tangerina Murcote Orgânica',
    category: 'Fruta',
    price: 5.50,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/tangerina_murcote.webp?alt=media&token=191284e1-755c-41e5-91d8-7af8d3798906',
    dataAiHint: 'murcott tangerine',
    farmerId: '2',
    description: 'Tangerina Murcote, de sabor muito doce e cor intensa, perfeita para sucos.',
    status: 'active',
    stock: 30,
  },
  {
    id: '83',
    name: 'Pimentão Verde Orgânico',
    category: 'Fruta',
    price: 2.80,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/pimentao_verde.webp?alt=media&token=e93a384f-c567-4d1a-9f4a-7140f7b09335',
    dataAiHint: 'green bell pepper',
    farmerId: '2',
    description: 'Pimentão verde orgânico, ideal para rechear, assar ou usar em refogados.',
    status: 'active',
    stock: 15,
  },
  {
    id: '85',
    name: 'Pimentão Amarelo Orgânico',
    category: 'Fruta',
    price: 3.20,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/pimentao_amarelo.webp?alt=media&token=c4a9a8f2-8e0c-4e8a-8a6a-0c5d5e5f4d4d',
    dataAiHint: 'yellow bell pepper',
    farmerId: '2',
    description: 'Pimentão amarelo orgânico, de sabor suave e adocicado, ótimo para saladas e pratos coloridos.',
    status: 'active',
    stock: 15,
  },
  {
    id: '89',
    name: 'Laranja Bahia Orgânica',
    category: 'Fruta',
    price: 5.00,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/laranja_bahia.webp?alt=media&token=edcc24af-9353-41c9-9be9-bc03b08beeaa',
    dataAiHint: 'navel orange',
    farmerId: '2',
    description: 'Laranja Bahia, sem sementes e com umbigo característico, ideal para consumo in natura.',
    status: 'active',
    stock: 40,
  },
  {
    id: '90',
    name: 'Laranja Seleta Orgânica',
    category: 'Fruta',
    price: 4.50,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/laranja_seleta.webp?alt=media&token=e38ae12f-82ae-4bd9-a08f-593634abfdc5',
    dataAiHint: 'selecta orange',
    farmerId: '2',
    description: 'Laranja seleta, ótima para sucos e com sabor equilibrado entre doce e ácido.',
    status: 'active',
    stock: 35
  },
  {
    id: 'prod-caju',
    name: 'Caju Orgânico',
    category: 'Fruta',
    price: 9.50,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/caju.webp?alt=media&token=7a76f64c-ed10-4451-8112-5d09020049b9',
    dataAiHint: 'cashew fruit',
    farmerId: '2',
    description: 'Caju orgânico, fruto de sabor único, perfeito para sucos e doces. Acompanha a castanha.',
    status: 'active',
    stock: 20
  },
  {
    id: 'prod-caqui',
    name: 'Caqui Orgânico',
    category: 'Fruta',
    price: 6.80,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/caqui.webp?alt=media&token=6d9835e9-ae1c-4cb0-83e3-e839ccb780c2',
    dataAiHint: 'persimmon',
    farmerId: '2',
    description: 'Caqui orgânico de polpa doce e macia, sem cica. Ideal para consumo in natura.',
    status: 'active',
    stock: 25
  },
  {
    id: 'prod-carambola',
    name: 'Carambola Orgânica',
    category: 'Fruta',
    price: 7.20,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/carambola.webp?alt=media&token=57b1c4f3-5d99-4bc3-ae84-b627807beed3',
    dataAiHint: 'star fruit',
    farmerId: '2',
    description: 'Carambola orgânica, com seu formato de estrela e sabor agridoce. Ótima para sucos, saladas e decoração.',
    status: 'active',
    stock: 18
  },
  {
    id: 'prod-laranja-lima',
    name: 'Laranja Lima Orgânica',
    category: 'Fruta',
    price: 5.20,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/laranja_lima.webp?alt=media&token=df719cd2-1767-436b-9ab5-b2a55c3a2000',
    dataAiHint: 'lima orange',
    farmerId: '2',
    description: 'Laranja Lima, de sabor suave e doce, com baixa acidez, ideal para bebês e crianças.',
    status: 'active',
    stock: 30
  },
  {
    id: 'prod-manga-carlotinha',
    name: 'Manga Carlotinha Orgânica',
    category: 'Fruta',
    price: 7.00,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/manga_carlotinha.webp?alt=media&token=0417fa54-ab7b-4bf2-9078-1945e2da9b07',
    dataAiHint: 'carlotinha mango',
    farmerId: '2',
    description: 'Manga Carlotinha, variedade de sabor adocicado e polpa suculenta.',
    status: 'active',
    stock: 25
  },
  {
    id: 'prod-manga-tommy',
    name: 'Manga Tommy Orgânica',
    category: 'Fruta',
    price: 6.80,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/manga_tommy.webp?alt=media&token=a5b2a911-0dc0-4266-a433-08c018eb8b68',
    dataAiHint: 'tommy atkins mango',
    farmerId: '2',
    description: 'Manga Tommy, a mais popular do Brasil, com polpa firme e sabor que equilibra doce e ácido.',
    status: 'active',
    stock: 45
  },
  {
    id: 'prod-mexerica-bergamota',
    name: 'Mexerica Bergamota Orgânica',
    category: 'Fruta',
    price: 5.80,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/mexerica_bergamota.webp?alt=media&token=452f0390-d797-4c48-acb1-996b765ea883',
    dataAiHint: 'bergamot tangerine',
    farmerId: '2',
    description: 'Mexerica Bergamota (ou vergamota), muito aromática e de sabor intenso, um clássico do sul.',
    status: 'active',
    stock: 25
  },
  {
    id: 'prod-mexerica-ole',
    name: 'Mexerica Olé Orgânica',
    category: 'Fruta',
    price: 6.00,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/mexerica_ole.webp?alt=media&token=67cc4615-dfe9-47ba-b982-fe173d0c3023',
    dataAiHint: 'ole tangerine',
    farmerId: '2',
    description: 'Mexerica Olé, variedade nova de casca fina, sem sementes e muito suculenta.',
    status: 'active',
    stock: 20
  },
  {
    id: 'prod-melancia-mini',
    name: 'Melancia Mini Orgânica',
    category: 'Fruta',
    price: 9.00,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/mini_melancia.webp?alt=media&token=e26cd7c8-9313-4eb6-8c60-050147ea898b',
    dataAiHint: 'mini watermelon',
    farmerId: '2',
    description: 'Mini melancia, com todo o sabor e doçura da melancia tradicional em um tamanho prático.',
    status: 'active',
    stock: 15
  },
  {
    id: 'prod-pessego',
    name: 'Pêssego Orgânico',
    category: 'Fruta',
    price: 9.50,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/pessego.webp?alt=media&token=40ca1fb9-a000-4b9e-bbd5-52775e5d0720',
    dataAiHint: 'peach',
    farmerId: '2',
    description: 'Pêssegos orgânicos, suculentos e aveludados, para comer ao natural ou em compotas e tortas.',
    status: 'active',
    stock: 20
  },
  {
    id: 'prod-pimentao-vermelho',
    name: 'Pimentão Vermelho Orgânico',
    category: 'Fruta',
    price: 3.50,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/pimentao_vermelho.webp?alt=media&token=3d566dc3-61ba-4f68-9b7c-9004207bb8ff',
    dataAiHint: 'red bell pepper',
    farmerId: '2',
    description: 'Pimentão vermelho, o mais doce entre os pimentões, ótimo para assados, saladas e molhos.',
    status: 'active',
    stock: 15
  },
  {
    id: 'prod-uva-vitoria',
    name: 'Uva Vitória Orgânica',
    category: 'Fruta',
    price: 12.00,
    unit: 'caixa',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/uva_vitoria.webp?alt=media&token=a3ba40e3-ac32-44f0-b9b4-e75c875f2d4f',
    dataAiHint: 'vitoria grape',
    farmerId: '2',
    description: 'Uva Vitória sem sementes, de sabor doce e cor intensa, ideal para consumo in natura.',
    status: 'active',
    stock: 30
  }
];

const domicilioOrganicoProducts: Product[] = [
    {
        id: 'prod-domicilio-cenoura',
        name: 'Cenouras Orgânicas',
        category: 'Raiz e Tubérculo',
        price: 3.00,
        unit: 'maço',
        image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/cenoura.webp?alt=media&token=83e659dc-2bd5-42f5-bc98-a178690858f1',
        dataAiHint: 'organic carrots',
        farmerId: '6',
        description: 'Cenouras orgânicas do Domicílio Orgânico, frescas e crocantes.',
        status: 'active',
        stock: 40
    },
    ...allMasterFruits.map((fruit, index) => ({
      ...fruit,
      id: `domicilio-fruit-${index}-${fruit.id}`,
      farmerId: '6',
      name: fruit.name.replace(' (Domicílio)', ''),
      description: fruit.description.replace(' (do Domicílio Orgânico)', '')
    }))
];

// Initial default data
const defaultProducts: Product[] = [
   {
    id: '1',
    name: 'Cenouras Orgânicas',
    category: 'Raiz e Tubérculo',
    price: 2.5,
    unit: 'maço',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/cenoura.webp?alt=media&token=83e659dc-2bd5-42f5-bc98-a178690858f1',
    dataAiHint: 'organic carrots',
    farmerId: '1',
    description: 'Cenouras orgânicas frescas e crocantes, perfeitas para lanches ou para cozinhar.',
    status: 'active',
    stock: 50,
  },
  {
    id: '2',
    name: 'Tomate Italiano Orgânico',
    category: 'Fruta',
    price: 3.0,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/tomate_italiano.webp?alt=media&token=f4195895-85ed-42f7-92b7-55085c4c1a72',
    dataAiHint: 'italian tomatoes',
    farmerId: '2',
    description: 'Tomates italianos orgânicos, perfeitos para molhos encorpados e saladas.',
    status: 'active',
    stock: 30,
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
    unit: 'caixa',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/morango.webp?alt=media&token=086479b1-5b7e-451d-9635-193264f55e31',
    dataAiHint: 'fresh strawberries',
    farmerId: '2',
    description: 'Morangos orgânicos maduros e doces, colhidos no pico do frescor.',
    status: 'active',
    stock: 25,
    promotion: {
        isActive: true,
        expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
    }
  },
  {
    id: '5',
    name: 'Alho Poró Orgânico',
    category: 'Tempero',
    price: 4.50,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/alho_poro.webp?alt=media&token=84c5bcc6-06f2-46be-8589-68b3e7be0fa5',
    dataAiHint: 'leek',
    farmerId: '3',
    description: 'Alho poró com sabor suave de cebola, perfeito para sopas, quiches e tortas.',
    status: 'active',
    stock: 40,
  },
  {
    id: '6',
    name: 'Chuchu Orgânico',
    category: 'Legume',
    price: 3.00,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/chuchu.webp?alt=media&token=4ef6fcb9-2d57-47b6-b397-ec466ccfc6cd',
    dataAiHint: 'chayote',
    farmerId: '3',
    description: 'Chuchu orgânico, de sabor suave e rico em água, ideal para suflês e saladas cozidas.',
    status: 'active',
    stock: 0,
  },
  {
    id: '7',
    name: 'Abóbora Moranga Orgânica',
    category: 'Legume',
    price: 4.00,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/abobora_moranga.webp?alt=media&token=f4ba0711-99f5-4cd5-bd0f-41fafaf1bcd0',
    dataAiHint: 'moranga squash',
    farmerId: '4',
    description: 'Abóbora moranga, famosa pelo prato "camarão na moranga", muito saborosa e decorativa.',
    status: 'active',
    stock: 15,
  },
  {
    id: '8',
    name: 'Couve Mineira Orgânica',
    category: 'Verdura',
    price: 2.20,
    unit: 'maço',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/couve_mineira.webp?alt=media&token=fb0702ac-1c9a-4414-9857-bd0908d68348',
    dataAiHint: 'collard greens',
    farmerId: '1',
    description: 'Couve mineira orgânica, ideal para refogados e para acompanhar a tradicional feijoada.',
    status: 'active',
    stock: 60,
  },
   {
    id: '9',
    name: 'Laranja Pera Orgânica',
    category: 'Fruta',
    price: 2.0,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/laranja_pera.webp?alt=media&token=b4db9a4e-b349-4805-ac9d-fee1fcb4d5d8',
    dataAiHint: 'pera orange',
    farmerId: '2',
    description: 'Laranja Pera orgânica, ideal para sucos, com sabor adocicado e pouca acidez.',
    status: 'active',
    stock: 100,
  },
  {
    id: '10',
    name: 'Salsa Orgânica',
    category: 'Tempero',
    price: 2.50,
    unit: 'maço',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/salsa.webp?alt=media&token=dca13030-a3a2-43ea-b5ef-b33e5fb918e0',
    dataAiHint: 'parsley',
    farmerId: '3',
    description: 'Salsa (ou salsinha) fresca, um dos temperos mais versáteis e usados na culinária.',
    status: 'active',
    stock: 80,
  },
  {
    id: '11',
    name: 'Hortelã Orgânica',
    category: 'Tempero',
    price: 2.80,
    unit: 'maço',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/hortela.webp?alt=media&token=97dacb1f-e59f-4891-9176-73eec1e16188',
    dataAiHint: 'mint',
    farmerId: '4',
    description: 'Hortelã fresca e aromática, perfeita para chás, sucos, quibes e sobremesas.',
    status: 'active',
    stock: 70,
  },
   {
    id: '12',
    name: 'Amora Orgânica',
    price: 6.00,
    unit: 'caixa',
    category: 'Fruta',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/amora.webp?alt=media&token=86e42b5a-4e5b-4b1e-9e7b-8e9e1c7c4a3b',
    dataAiHint: 'blackberry',
    farmerId: '2',
    description: 'Amoras orgânicas, doces e suculentas, perfeitas para geleias, tortas e consumo in natura.',
    status: 'active',
    stock: 15,
  },
  {
    id: '13',
    name: 'Maçã Fuji Orgânica',
    category: 'Fruta',
    price: 1.8,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/maca_fuji.webp?alt=media&token=d9b195e6-0e42-4976-83fe-fdf87dfafd7c',
    dataAiHint: 'fuji apple',
    farmerId: '2',
    description: 'Maçãs Fuji orgânicas, conhecidas por sua doçura e textura crocante.',
    status: 'active',
    stock: 120,
  },
  {
    id: '14',
    name: 'Alface Americana Orgânica',
    category: 'Verdura',
    price: 3.50,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/alface_americana.webp?alt=media&token=d745a4e5-1f8c-4333-8a8a-48a4201d308a',
    dataAiHint: 'iceberg lettuce',
    farmerId: '1',
    description: 'Alface americana crocante e refrescante, ideal para sanduíches e saladas.',
    status: 'active',
    stock: 40,
  },
  {
    id: '15',
    name: 'Brócolis Americano Orgânico',
    category: 'Verdura',
    price: 4.50,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/brocolis_americano.webp?alt=media&token=fd124564-9af1-438e-8e3b-34c320279c8b',
    dataAiHint: 'american broccoli',
    farmerId: '1',
    description: 'Brócolis americano fresco, perfeito para cozinhar no vapor ou assar.',
    status: 'active',
    stock: 35,
  },
   {
    id: '150',
    name: 'Brócolis Brasileiro Orgânico',
    category: 'Verdura',
    price: 4.20,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/brocolis_brasileiro.webp?alt=media&token=30d32afc-e5e7-4f0e-a740-e43efeda8862',
    dataAiHint: 'brazilian broccoli',
    farmerId: '1',
    description: 'Brócolis brasileiro (de rama), com talos e folhas aproveitáveis e sabor mais intenso.',
    status: 'active',
    stock: 30
  },
  {
    id: '16',
    name: 'Beterraba Orgânica',
    category: 'Raiz e Tubérculo',
    price: 3.20,
    unit: 'maço',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/beterraba.webp?alt=media&token=d33b9ad6-d6c9-4641-b2fc-e4ed9893cbb0',
    dataAiHint: 'beetroot',
    farmerId: '1',
    description: 'Beterraba orgânica, ótima para sucos, saladas e assados.',
    status: 'active',
    stock: 20,
  },
  {
    id: '17',
    name: 'Manga Palmer Orgânica',
    category: 'Fruta',
    price: 6.50,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/manga_palmer.webp?alt=media&token=fdf4085f-fbef-41b1-be8a-a613dde3c2e4',
    dataAiHint: 'palmer mango',
    farmerId: '2',
    description: 'Manga Palmer doce e sem fibras, perfeita para consumo in natura ou sucos.',
    status: 'active',
    stock: 40,
  },
  {
    id: '18',
    name: 'Alho Orgânico',
    category: 'Tempero',
    price: 3.00,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/alho.webp?alt=media&token=8071bc57-cdd1-4105-98da-6253f6f13050',
    dataAiHint: 'garlic',
    farmerId: '1',
    description: 'Alho orgânico de sabor intenso, essencial para temperar seus pratos.',
    status: 'active',
    stock: 50,
  },
  {
    id: '19',
    name: 'Tangerina Ponkan Orgânica',
    category: 'Fruta',
    price: 4.80,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/tangerina_ponkan.webp?alt=media&token=eceafacb-80ae-44f1-8349-8edd8222bf30',
    dataAiHint: 'ponkan tangerine',
    farmerId: '2',
    description: 'Tangerina Ponkan suculenta e fácil de descascar, colhida no ponto certo de doçura.',
    status: 'active',
    stock: 60,
  },
  {
    id: '20',
    name: 'Batata Doce Orgânica',
    category: 'Raiz e Tubérculo',
    price: 3.80,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/batata_doce.webp?alt=media&token=9777102d-626a-4f4e-b2d7-1045f0cc4148',
    dataAiHint: 'sweet potato',
    farmerId: '1',
    description: 'Batata doce orgânica, rica em nutrientes e sabor adocicado. Perfeita para assar ou cozinhar.',
    status: 'active',
    stock: 80,
  },
  {
    id: '21',
    name: 'Couve Flor Orgânica',
    category: 'Verdura',
    price: 4.0,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/couve_flor.webp?alt=media&token=5e32779d-a643-4845-9b4b-6f3b6474b444',
    dataAiHint: 'cauliflower',
    farmerId: '1',
    description: 'Couve-flor orgânica fresca, versátil para diversas receitas.',
    status: 'active',
    stock: 20,
  },
  {
    id: '22',
    name: 'Mamão Papaya Orgânico',
    category: 'Fruta',
    price: 5.20,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/mamao_papaya.webp?alt=media&token=6935a389-a40d-4eb2-b1ae-cdaed2be18a3',
    dataAiHint: 'papaya',
    farmerId: '2',
    description: 'Mamão Papaya orgânico, doce e macio. Perfeito para o café da manhã ou sobremesas.',
    status: 'active',
    stock: 25,
  },
  {
    id: '23',
    name: 'Inhame Orgânico',
    category: 'Raiz e Tubérculo',
    price: 4.20,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/inhame.webp?alt=media&token=230229d4-3136-45a0-a5df-605c7de2592b',
    dataAiHint: 'yam',
    farmerId: '1',
    description: 'Inhame orgânico, nutritivo e versátil, ideal para sopas, purês e assados.',
    status: 'active',
    stock: 45,
  },
  {
    id: '24',
    name: 'Limão Taiti Orgânico',
    category: 'Fruta',
    price: 3.90,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/limao_taiti.webp?alt=media&token=5f538bf1-e909-4346-8c0d-92c1e145b897',
    dataAiHint: 'tahiti lime',
    farmerId: '2',
    description: 'Limão Taiti orgânico, suculento e com poucas sementes. Ideal para sucos, temperos e sobremesas.',
    status: 'active',
    stock: 90,
  },
   {
    id: '25',
    name: 'Banana Prata Orgânica',
    category: 'Fruta',
    price: 5.50,
    unit: 'dúzia',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/banana_prata.webp?alt=media&token=d38fe201-0312-48fc-9cf7-6e2b1fd97bf8',
    dataAiHint: 'silver banana',
    farmerId: '2',
    description: 'Banana prata orgânica, ideal para o consumo diário, rica em potássio e de sabor suave.',
    status: 'active',
    stock: 50,
  },
  {
    id: '26',
    name: 'Goiaba Vermelha Orgânica',
    category: 'Fruta',
    price: 5.80,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/goiaba_vermelha.webp?alt=media&token=da3e5869-d746-4b9b-b23c-ab5418912991',
    dataAiHint: 'red guava',
    farmerId: '2',
    description: 'Goiabas vermelhas orgânicas, doces e perfumadas, perfeitas para sucos e sobremesas.',
    status: 'active',
    stock: 30,
  },
  {
    id: '27',
    name: 'Abacaxi Orgânico',
    category: 'Fruta',
    price: 7.00,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/abacaxi.webp?alt=media&token=4caa0219-8635-4fbb-8e1c-fdec6909ebda',
    dataAiHint: 'pineapple',
    farmerId: '2',
    description: 'Abacaxi pérola orgânico, doce e suculento, perfeito para o verão.',
    status: 'active',
    stock: 20,
  },
  {
    id: '28',
    name: 'Berinjela Orgânica',
    category: 'Fruta',
    price: 3.70,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/berinjela.webp?alt=media&token=ad1f7bd9-75db-4fc4-ac6d-3608733d71e9',
    dataAiHint: 'eggplant',
    farmerId: '2',
    description: 'Berinjela orgânica, ideal para antepastos, lasanhas e parmegiana.',
    status: 'active',
    stock: 15,
  },
  {
    id: '29',
    name: 'Abóbora Japonesa (Cabotiá) Orgânica',
    category: 'Legume',
    price: 3.50,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/abobora_japonesa.webp?alt=media&token=9cc8d464-1f1a-404e-8d32-aeddadc861ba',
    dataAiHint: 'kabocha squash',
    farmerId: '1',
    description: 'Abóbora japonesa, também conhecida como cabotiá, com polpa adocicada e textura macia.',
    status: 'active',
    stock: 10,
  },
  {
    id: '30',
    name: 'Alface Lisa Orgânica',
    category: 'Verdura',
    price: 2.80,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/alface_lisa.webp?alt=media&token=ced73d99-300e-4904-9072-9c8e4fcecd79',
    dataAiHint: 'butter lettuce',
    farmerId: '1',
    description: 'Alface lisa de folhas macias e sabor suave, perfeita para saladas delicadas.',
    status: 'active',
    stock: 30,
  },
  {
    id: '31',
    name: 'Alface Crespa Orgânica',
    category: 'Verdura',
    price: 2.80,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/alface_crespa.webp?alt=media&token=a057c9ac-0fe9-40b0-a016-49d16b016941',
    dataAiHint: 'leaf lettuce',
    farmerId: '1',
    description: 'Alface crespa com folhas crocantes e textura ondulada, ideal para sanduíches.',
    status: 'active',
    stock: 30,
  },
  {
    id: '32',
    name: 'Alface Roxa Orgânica',
    category: 'Verdura',
    price: 3.00,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/alface_roxa.webp?alt=media&token=c566920b-b13c-4d87-916a-813e320aedec',
    dataAiHint: 'red leaf lettuce',
    farmerId: '1',
    description: 'Alface roxa, adiciona cor e um sabor levemente amargo às suas saladas.',
    status: 'active',
    stock: 25,
  },
  {
    id: '33',
    name: 'Abacate Orgânico',
    category: 'Fruta',
    price: 5.50,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/abacate.webp?alt=media&token=90d0ec6c-ca97-40eb-b694-5f489d925864',
    dataAiHint: 'avocado',
    farmerId: '2',
    description: 'Abacate cremoso e rico em gorduras saudáveis, perfeito para guacamole ou vitaminas.',
    status: 'active',
    stock: 15,
  },
  {
    id: '34',
    name: 'Aipim Orgânico',
    category: 'Raiz e Tubérculo',
    price: 4.00,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/aipim.webp?alt=media&token=ab467c17-50b2-4319-8aad-0845e323b526',
    dataAiHint: 'cassava',
    farmerId: '1',
    description: 'Aipim (mandioca/macaxeira) orgânico, ideal para cozinhar, fritar ou fazer purês.',
    status: 'active',
    stock: 40,
  },
  {
    id: '35',
    name: 'Almeirão Orgânico',
    category: 'Verdura',
    price: 3.20,
    unit: 'maço',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/almeirao.webp?alt=media&token=de89169e-8993-46bd-9c82-5a9d289ebdc3',
    dataAiHint: 'chicory',
    farmerId: '1',
    description: 'Almeirão com seu característico sabor amargo, ótimo para saladas e refogados.',
    status: 'active',
    stock: 20,
  },
  {
    id: '36',
    name: 'Ameixa Orgânica',
    category: 'Fruta',
    price: 8.00,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/ameixa.webp?alt=media&token=9216759e-b1b0-44ce-9404-09cd0503a111',
    dataAiHint: 'plum',
    farmerId: '2',
    description: 'Ameixas orgânicas doces e suculentas, perfeitas para comer in natura ou fazer geleias.',
    status: 'active',
    stock: 10,
  },
  {
    id: '37',
    name: 'Abobrinha Italiana Orgânica',
    category: 'Legume',
    price: 3.80,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/abobrinha_italiana.webp?alt=media&token=1c5c4cae-04b4-497f-99bf-94b09f8cdc7d',
    dataAiHint: 'zucchini',
    farmerId: '1',
    description: 'Abobrinha italiana orgânica, versátil para refogados, assados e pratos leves.',
    status: 'active',
    stock: 30,
  },
  {
    id: '39',
    name: 'Azedinha Orgânica',
    category: 'Verdura',
    price: 3.50,
    unit: 'maço',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/azedinha.webp?alt=media&token=9e5fa2ef-55b7-4e80-860c-691ae12f24f8',
    dataAiHint: 'sorrel',
    farmerId: '1',
    description: 'Azedinha com seu sabor cítrico único, ótima para sucos, saladas e sopas.',
    status: 'active',
    stock: 15,
  },
  {
    id: '40',
    name: 'Banana d\'Água Orgânica',
    category: 'Fruta',
    price: 5.00,
    unit: 'dúzia',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/banana_dagua.webp?alt=media&token=e09c1df0-0a4c-42eb-b356-d668db6e80c9',
    dataAiHint: 'nanica banana',
    farmerId: '2',
    description: 'Banana d\'água, também conhecida como nanica, doce e macia, ideal para sobremesas.',
    status: 'active',
    stock: 40,
  },
  {
    id: '41',
    name: 'Banana Nanica Orgânica',
    category: 'Fruta',
    price: 5.00,
    unit: 'dúzia',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/banana_nanica.webp?alt=media&token=f55bf317-5650-497b-92a7-0d6da754f1b1',
    dataAiHint: 'dwarf banana',
    farmerId: '2',
    description: 'Banana nanica orgânica, doce e macia, ideal para sobremesas e consumo diário.',
    status: 'active',
    stock: 40,
  },
  {
    id: '42',
    name: 'Coentro Orgânico',
    category: 'Tempero',
    price: 2.50,
    unit: 'maço',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/coentro.webp?alt=media&token=d4bb207b-4d74-4de4-bc80-8843dd338010',
    dataAiHint: 'coriander',
    farmerId: '1',
    description: 'Coentro fresco com aroma marcante, indispensável na culinária nordestina e asiática.',
    status: 'active',
    stock: 50,
  },
  {
    id: '43',
    name: 'Cebolinha Orgânica',
    category: 'Tempero',
    price: 2.50,
    unit: 'maço',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/cebolinha.webp?alt=media&token=48e03912-a30e-4032-94b8-9a84b6209d3e',
    dataAiHint: 'chives',
    farmerId: '1',
    description: 'Cebolinha fresca para finalizar pratos e adicionar um sabor suave de cebola.',
    status: 'active',
    stock: 60,
  },
  {
    id: '44',
    name: 'Cebola Roxa Orgânica',
    category: 'Tempero',
    price: 4.50,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/cebola_roxa.webp?alt=media&token=e2c5234f-af01-4481-a046-71295fe900fe',
    dataAiHint: 'red onion',
    farmerId: '1',
    description: 'Cebola roxa de sabor mais suave e adocicado, perfeita para saladas e picles.',
    status: 'active',
    stock: 25,
  },
  {
    id: '45',
    name: 'Cebola Orgânica',
    category: 'Tempero',
    price: 4.00,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/cebola.webp?alt=media&token=d038a9a2-f0f9-421f-b436-324602f0b5bd',
    dataAiHint: 'onion',
    farmerId: '1',
    description: 'Cebola orgânica, a base para a maioria dos refogados e pratos salgados.',
    status: 'active',
    stock: 40,
  },
  {
    id: '46',
    name: 'Repolho Verde Orgânico',
    category: 'Verdura',
    price: 3.80,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/repolho_verde.webp?alt=media&token=8a4ea4ee-bcac-4757-a54d-f0a4b095a9dc',
    dataAiHint: 'green cabbage',
    farmerId: '1',
    description: 'Repolho verde crocante, ótimo para saladas, refogados e charutos.',
    status: 'active',
    stock: 15,
  },
  {
    id: '47',
    name: 'Repolho Roxo Orgânico',
    category: 'Verdura',
    price: 4.20,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/repolho_roxo.webp?alt=media&token=2ea7df6f-0845-4042-aa71-38812b164b6a',
    dataAiHint: 'red cabbage',
    farmerId: '1',
    description: 'Repolho roxo, adiciona cor vibrante e nutrientes a saladas e conservas.',
    status: 'active',
    stock: 15,
  },
  {
    id: '48',
    name: 'Maçã Gala Orgânica',
    category: 'Fruta',
    price: 6.50,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/maca_gala.webp?alt=media&token=1f30fbe4-e6db-4958-81e1-e953db358643',
    dataAiHint: 'gala apple',
    farmerId: '2',
    description: 'Maçãs Gala orgânicas, com sabor suave e doce, ideais para lanches.',
    status: 'active',
    stock: 80,
  },
  {
    id: '49',
    name: 'Rúcula Cultivada Orgânica',
    category: 'Verdura',
    price: 3.50,
    unit: 'maço',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/rucula_cultivada.webp?alt=media&token=e5386372-e97f-479e-9559-eb3202d5e946',
    dataAiHint: 'arugula',
    farmerId: '1',
    description: 'Rúcula com sabor picante e folhas tenras, excelente em saladas e pizzas.',
    status: 'active',
    stock: 25,
  },
  {
    id: '50',
    name: 'Mamão Formosa Orgânico',
    category: 'Fruta',
    price: 6.00,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/mamao_formosa.webp?alt=media&token=7887ce63-fb00-42fe-a5d3-8f70e128bdb3',
    dataAiHint: 'formosa papaya',
    farmerId: '2',
    description: 'Mamão Formosa de polpa macia e doce, rico em vitaminas.',
    status: 'active',
    stock: 10,
  },
  {
    id: '51',
    name: 'Batata Baroa Orgânica',
    category: 'Raiz e Tubérculo',
    price: 7.50,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/batata_baroa.webp?alt=media&token=58b079cb-80de-40fb-97f0-a654a34f1c1b',
    dataAiHint: 'arracacha',
    farmerId: '3',
    description: 'Batata baroa (mandioquinha) com seu sabor e aroma únicos, perfeita para purês e sopas.',
    status: 'active',
    stock: 20,
  },
  {
    id: '52',
    name: 'Gengibre Orgânico',
    category: 'Raiz e Tubérculo',
    price: 15.00,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/gengibre.webp?alt=media&token=b70596de-b66f-4c39-a8c9-6951a442ff84',
    dataAiHint: 'ginger',
    farmerId: '1',
    description: 'Gengibre fresco com sabor picante, ótimo para chás, sucos e pratos asiáticos.',
    status: 'active',
    stock: 10,
  },
  {
    id: '53',
    name: 'Cúrcuma Orgânica',
    category: 'Raiz e Tubérculo',
    price: 18.00,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/curcuma.webp?alt=media&token=52fffeff-7486-4cab-9021-81331e7c5cc6',
    dataAiHint: 'turmeric',
    farmerId: '1',
    description: 'Cúrcuma (açafrão-da-terra) fresca, conhecida por suas propriedades anti-inflamatórias.',
    status: 'active',
    stock: 10,
  },
  {
    id: '54',
    name: 'Melão Amarelo Orgânico',
    category: 'Fruta',
    price: 7.00,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/melao_amarelo.webp?alt=media&token=718ddb9c-9381-44aa-be87-31514c4426df',
    dataAiHint: 'yellow melon',
    farmerId: '2',
    description: 'Melão amarelo doce e refrescante, perfeito para dias quentes.',
    status: 'active',
    stock: 12,
  },
  {
    id: '55',
    name: 'Melão Orange Orgânico',
    category: 'Fruta',
    price: 8.00,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/melao_orange.webp?alt=media&token=fb9e85b4-2fa0-44f0-92b0-b2e492c58fab',
    dataAiHint: 'orange melon',
    farmerId: '2',
    description: 'Melão Orange com polpa alaranjada e sabor adocicado e perfumado.',
    status: 'active',
    stock: 10,
  },
  {
    id: '56',
    name: 'Melão Pele de Sapo Orgânico',
    category: 'Fruta',
    price: 8.50,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/melao_pele_de_sapo.webp?alt=media&token=47c0283d-6af0-47a9-ace4-340f8331b100',
    dataAiHint: 'piel de sapo melon',
    farmerId: '2',
    description: 'Melão Pele de Sapo, de polpa branca, muito doce e suculenta.',
    status: 'active',
    stock: 8,
  },
  {
    id: '57',
    name: 'Melão Cantaloupe Orgânico',
    category: 'Fruta',
    price: 9.00,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/melao_cantaloupe.webp?alt=media&token=04174dc3-46c3-49d6-8096-ecb20dd1e978',
    dataAiHint: 'cantaloupe melon',
    farmerId: '2',
    description: 'Melão Cantaloupe, com polpa alaranjada e sabor aromático inconfundível.',
    status: 'active',
    stock: 8,
  },
  {
    id: '59',
    name: 'Acelga Orgânica',
    category: 'Verdura',
    price: 3.80,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/acelga.webp?alt=media&token=0721f75b-65a2-40cf-8754-c10afd93acc6',
    dataAiHint: 'swiss chard',
    farmerId: '1',
    description: 'Acelga (couve chinesa) de textura crocante, ideal para o preparo de saladas e refogados.',
    status: 'active',
    stock: 18,
  },
  {
    id: '60',
    name: 'Batata Inglesa Orgânica',
    category: 'Raiz e Tubérculo',
    price: 4.50,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/batata_inglesa.webp?alt=media&token=41f17e48-9a43-4980-b61d-1c12a91f3cf2',
    dataAiHint: 'potato',
    farmerId: '4',
    description: 'Batata inglesa orgânica, a mais versátil das batatas, ótima para cozinhar, assar e fritar.',
    status: 'active',
    stock: 50,
  },
  {
    id: '61',
    name: 'Cebolinha Orgânica',
    category: 'Tempero',
    price: 2.50,
    unit: 'maço',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/cebolinha.webp?alt=media&token=48e03912-a30e-4032-94b8-9a84b6209d3e',
    dataAiHint: 'chives',
    farmerId: '5',
    description: 'Cebolinha fresca para finalizar pratos e adicionar um sabor suave de cebola.',
    status: 'active',
    stock: 40,
  },
  {
    id: '62',
    name: 'Coentro Orgânico',
    category: 'Tempero',
    price: 2.50,
    unit: 'maço',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/coentro.webp?alt=media&token=d4bb207b-4d74-4de4-bc80-8843dd338010',
    dataAiHint: 'coriander',
    farmerId: '5',
    description: 'Coentro fresco com aroma marcante, indispensável na culinária nordestina e asiática.',
    status: 'active',
    stock: 40,
  },
  {
    id: '63',
    name: 'Jiló Orgânico',
    category: 'Fruta',
    price: 4.50,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/jilo.webp?alt=media&token=21a949a4-5df3-4b27-ae98-7469466f94be',
    dataAiHint: 'scarlet eggplant',
    farmerId: '2',
    description: 'Jiló orgânico com seu sabor amargo característico, perfeito para fritadas e conservas.',
    status: 'active',
    stock: 15,
  },
  {
    id: '64',
    name: 'Batata Yacon Orgânica',
    category: 'Raiz e Tubérculo',
    price: 8.00,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/batata_yacon.webp?alt=media&token=1531f6ab-5dde-4141-8715-28005e7d615e',
    dataAiHint: 'yacon',
    farmerId: '1',
    description: 'Batata Yacon, de textura crocante e sabor adocicado, ideal para consumo in natura em saladas.',
    status: 'active',
    stock: 8,
  },
  {
    id: '65',
    name: 'Tomatinho Grape Orgânico',
    category: 'Fruta',
    price: 5.50,
    unit: 'caixa',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/tomate_grape.webp?alt=media&token=34f6fc49-11e6-49bb-9ef2-28ff3d6690c3',
    dataAiHint: 'grape tomato',
    farmerId: '2',
    description: 'Tomatinhos grape, pequenos e muito doces, perfeitos para lanches e saladas.',
    status: 'active',
    stock: 20,
  },
  {
    id: '66',
    name: 'Tomate Salada Orgânico',
    category: 'Fruta',
    price: 4.80,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/tomate_salada.webp?alt=media&token=3fd5f103-22d9-4781-936a-46409e4da5fd',
    dataAiHint: 'salad tomato',
    farmerId: '2',
    description: 'Tomate para salada, firme e com poucas sementes, ideal para fatiar.',
    status: 'active',
    stock: 35,
  },
  {
    id: '67',
    name: 'Tomatinho Cereja Orgânico',
    category: 'Fruta',
    price: 5.00,
    unit: 'caixa',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/tomate_cereja.webp?alt=media&token=675a4a40-8ff8-439b-9366-db40ed3b7b96',
    dataAiHint: 'cherry tomato',
    farmerId: '2',
    description: 'Tomate cereja, pequeno e adocicado, ótimo para saladas, espetinhos e aperitivos.',
    status: 'active',
    stock: 20,
  },
  {
    id: '68',
    name: 'Kiwi Orgânico',
    category: 'Fruta',
    price: 9.00,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/kiwi.webp?alt=media&token=4e24b5ed-6b1f-44e8-8655-95eec46e1521',
    dataAiHint: 'kiwi',
    farmerId: '2',
    description: 'Kiwi orgânico, com sua polpa verde vibrante e sabor agridoce, rico em vitamina C.',
    status: 'active',
    stock: 12,
  },
  {
    id: '69',
    name: 'Pera Williams Orgânica',
    category: 'Fruta',
    price: 7.80,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/pera_williams.webp?alt=media&token=5bb791b0-9f75-4cd6-9a50-c4a978b351b7',
    dataAiHint: 'williams pear',
    farmerId: '2',
    description: 'Pera Williams com polpa macia, suculenta e muito aromática, ideal para consumo in natura e sobremesas.',
    status: 'active',
    stock: 18,
  },
  {
    id: '70',
    name: 'Agrião Orgânico',
    category: 'Verdura',
    price: 3.00,
    unit: 'maço',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/agriao.webp?alt=media&token=c27c2017-aa81-4c03-a41c-c6323c14e213',
    dataAiHint: 'watercress',
    farmerId: '5',
    description: 'Agrião com seu sabor picante característico, ótimo para saladas e sopas.',
    status: 'active',
    stock: 30,
  },
  {
    id: '71',
    name: 'Alface Romana Orgânica',
    category: 'Verdura',
    price: 3.20,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/alface_romana.webp?alt=media&token=f0a4afb0-0d99-48ad-88a2-0e3a8f048d17',
    dataAiHint: 'romaine lettuce',
    farmerId: '5',
    description: 'Alface romana, com folhas longas e crocantes, ideal para a salada Caesar.',
    status: 'active',
    stock: 25,
  },
  {
    id: '72',
    name: 'Limão Siciliano Orgânico',
    category: 'Fruta',
    price: 8.50,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/limao_siciliano.webp?alt=media&token=a2d02d86-f7b4-45f2-85f4-5e0bd2affeaf',
    dataAiHint: 'sicilian lemon',
    farmerId: '2',
    description: 'Limão siciliano, grande, de casca amarela e muito perfumado, ideal para risotos e sobremesas.',
    status: 'active',
    stock: 10,
  },
  {
    id: '73',
    name: 'Limão Cravo Orgânico',
    category: 'Fruta',
    price: 4.50,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/limao_cravo.webp?alt=media&token=d631609c-427a-4e87-be2c-6242f94b37ef',
    dataAiHint: 'rangpur lime',
    farmerId: '2',
    description: 'Limão cravo (ou rosa), com casca avermelhada e sabor único, ótimo para temperos e caipirinhas.',
    status: 'active',
    stock: 20,
  },
  {
    id: '74',
    name: 'Limão Galego Orgânico',
    category: 'Fruta',
    price: 4.80,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/limao_galego.webp?alt=media&token=e8341d8b-9733-478b-9bd0-0104de2365cb',
    dataAiHint: 'key lime',
    farmerId: '2',
    description: 'Limão galego, pequeno e de casca fina, muito suculento e ácido, um clássico nacional.',
    status: 'active',
    stock: 25,
  },
  {
    id: '75',
    name: 'Pepino Orgânico',
    category: 'Legume',
    price: 3.50,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/pepino.webp?alt=media&token=e47fbf50-b714-4f92-846c-5e6e63d284e1',
    dataAiHint: 'cucumber',
    farmerId: '1',
    description: 'Pepino japonês orgânico, com menos sementes e casca fina, perfeito para saladas crocantes.',
    status: 'active',
    stock: 35,
  },
  {
    id: '76',
    name: 'Couve Toscana Orgânica',
    category: 'Verdura',
    price: 3.80,
    unit: 'maço',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/couve_toscana.webp?alt=media&token=d4d592f2-8fbe-4489-a044-6d46d2fc3753',
    dataAiHint: 'lacinato kale',
    farmerId: '1',
    description: 'Couve toscana (ou cavolo nero), de folhas escuras e sabor intenso, ótima para caldos e refogados.',
    status: 'active',
    stock: 20,
  },
  {
    id: '77',
    name: 'Mostarda Orgânica',
    category: 'Verdura',
    price: 3.00,
    unit: 'maço',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/mostarda.webp?alt=media&token=4e6b4187-dc70-41c2-904d-7ec8572c31b0',
    dataAiHint: 'mustard greens',
    farmerId: '4',
    description: 'Folhas de mostarda com sabor picante, ideais para refogados e saladas ousadas.',
    status: 'active',
    stock: 25,
  },
  {
    id: '78',
    name: 'Tangerina Murcote Orgânica',
    category: 'Fruta',
    price: 5.50,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/tangerina_murcote.webp?alt=media&token=191284e1-755c-41e5-91d8-7af8d3798906',
    dataAiHint: 'murcott tangerine',
    farmerId: '2',
    description: 'Tangerina Murcote, de sabor muito doce e cor intensa, perfeita para sucos.',
    status: 'active',
    stock: 30,
  },
  {
    id: '79',
    name: 'Abóbora Paulistinha Orgânica',
    category: 'Legume',
    price: 3.60,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/abobora_paulistinha.webp?alt=media&token=085ac67e-9468-4e75-90f7-0698285bcc35',
    dataAiHint: 'brazilian squash',
    farmerId: '1',
    description: 'Abóbora paulista, de casca listrada, ideal para fazer refogada ou em sopas.',
    status: 'active',
    stock: 12,
  },
  {
    id: '81',
    name: 'Rabanete Orgânico',
    category: 'Raiz e Tubérculo',
    price: 3.50,
    unit: 'maço',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/rabanete.webp?alt=media&token=fd084d85-6e5f-4519-ae09-e0606e54b063',
    dataAiHint: 'radish',
    farmerId: '4',
    description: 'Rabanetes crocantes e picantes, adicionam um toque especial a qualquer salada.',
    status: 'active',
    stock: 20,
  },
  {
    id: '82',
    name: 'Espinafre Orgânico',
    category: 'Verdura',
    price: 3.50,
    unit: 'maço',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/espinafre.webp?alt=media&token=314e18aa-482f-4cef-badc-db518683d218',
    dataAiHint: 'spinach',
    farmerId: '4',
    description: 'Espinafre fresco, rico em ferro e nutrientes, perfeito para refogados e recheios.',
    status: 'active',
    stock: 25,
  },
  {
    id: '83',
    name: 'Pimentão Verde Orgânico',
    category: 'Fruta',
    price: 2.80,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/pimentao_verde.webp?alt=media&token=e93a384f-c567-4d1a-9f4a-7140f7b09335',
    dataAiHint: 'green bell pepper',
    farmerId: '2',
    description: 'Pimentão verde orgânico, ideal para rechear, assar ou usar em refogados.',
    status: 'active',
    stock: 15,
  },
  {
    id: '84',
    name: 'Chicória Orgânica',
    category: 'Verdura',
    price: 3.20,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/chicoria.webp?alt=media&token=64cf0f70-4063-4ca5-96a1-4c8026705058',
    dataAiHint: 'endive',
    farmerId: '1',
    description: 'Chicória de folhas recortadas e sabor amargo, muito apreciada na culinária do norte do Brasil.',
    status: 'active',
    stock: 10,
  },
  {
    id: '85',
    name: 'Pimentão Amarelo Orgânico',
    category: 'Fruta',
    price: 3.20,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/pimentao_amarelo.webp?alt=media&token=c4a9a8f2-8e0c-4e8a-8a6a-0c5d5e5f4d4d',
    dataAiHint: 'yellow bell pepper',
    farmerId: '2',
    description: 'Pimentão amarelo orgânico, de sabor suave e adocicado, ótimo para saladas e pratos coloridos.',
    status: 'active',
    stock: 15,
  },
  {
    id: '86',
    name: 'Alface Romana Orgânica',
    category: 'Verdura',
    price: 3.20,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/alface_romana.webp?alt=media&token=f0a4afb0-0d99-48ad-88a2-0e3a8f048d17',
    dataAiHint: 'romaine lettuce',
    farmerId: '1',
    description: 'Alface romana, com folhas longas e crocantes, ideal para a salada Caesar.',
    status: 'paused',
    stock: 20,
  },
  {
    id: '87',
    name: 'Agrião Orgânico',
    category: 'Verdura',
    price: 3.00,
    unit: 'maço',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/agriao.webp?alt=media&token=c27c2017-aa81-4c03-a41c-c6323c14e213',
    dataAiHint: 'watercress',
    farmerId: '1',
    description: 'Agrião com seu sabor picante característico, ótimo para saladas e sopas.',
    status: 'active',
    stock: 25,
  },
  {
    id: '88',
    name: 'Espinafre Orgânico',
    category: 'Verdura',
    price: 3.50,
    unit: 'maço',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/espinafre.webp?alt=media&token=314e18aa-482f-4cef-badc-db518683d218',
    dataAiHint: 'spinach',
    farmerId: '1',
    description: 'Espinafre fresco, rico em ferro e nutrientes, perfeito para refogados e recheios.',
    status: 'active',
    stock: 25,
  },
  {
    id: '89',
    name: 'Laranja Bahia Orgânica',
    category: 'Fruta',
    price: 5.00,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/laranja_bahia.webp?alt=media&token=edcc24af-9353-41c9-9be9-bc03b08beeaa',
    dataAiHint: 'navel orange',
    farmerId: '2',
    description: 'Laranja Bahia, sem sementes e com umbigo característico, ideal para consumo in natura.',
    status: 'active',
    stock: 40,
  },
  {
    id: '90',
    name: 'Laranja Seleta Orgânica',
    category: 'Fruta',
    price: 4.50,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/laranja_seleta.webp?alt=media&token=e38ae12f-82ae-4bd9-a08f-593634abfdc5',
    dataAiHint: 'selecta orange',
    farmerId: '2',
    description: 'Laranja seleta, ótima para sucos e com sabor equilibrado entre doce e ácido.',
    status: 'active',
    stock: 35
  },
  {
    id: '91',
    name: 'Ora-pro-nóbis Orgânica',
    category: 'Verdura',
    price: 3.8,
    unit: 'maço',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/ora_pro_nobis.webp?alt=media&token=8f0077e9-7a90-4371-a98f-fd53ed7c2ef0',
    dataAiHint: 'ora pro nobis',
    farmerId: '3',
    description: 'Planta rica em proteínas, conhecida por suas folhas nutritivas. Ideal para refogados, saladas e sucos.',
    status: 'active',
    stock: 20
  },
  {
    id: '92',
    name: 'Abóbora Baianinha Orgânica',
    category: 'Legume',
    price: 3.90,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/abobora_baianinha.webp?alt=media&token=9860ba6a-82f2-439b-92c2-0c57d6d338a3',
    dataAiHint: 'brazilian squash',
    farmerId: '1',
    description: 'Abóbora Baianinha, de polpa alaranjada e sabor adocicado, ótima para doces e purês.',
    status: 'active',
    stock: 15
  },
  {
    id: '93',
    name: 'Aipo Orgânico',
    category: 'Tempero',
    price: 3.70,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/aipo.webp?alt=media&token=568de33a-7127-4e14-a96e-cce9357ebbf2',
    dataAiHint: 'celery',
    farmerId: '3',
    description: 'Aipo (ou salsão) com talos crocantes e sabor aromático, excelente para caldos, sopas e saladas.',
    status: 'active',
    stock: 22
  },
  {
    id: '94',
    name: 'Alface Frisée Orgânica',
    category: 'Verdura',
    price: 3.30,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/alface_frisee.webp?alt=media&token=060f2493-fb76-4a37-b40a-5de7bd0981c9',
    dataAiHint: 'frisee lettuce',
    farmerId: '1',
    description: 'Alface Frisée, com folhas finas, rendadas e um sabor levemente amargo, ideal para saladas sofisticadas.',
    status: 'active',
    stock: 18
  },
  {
    id: '95',
    name: 'Alface Mimosa Roxa Orgânica',
    category: 'Verdura',
    price: 3.10,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/alface_mimosa_roxa.webp?alt=media&token=c8b001dc-6f00-486f-af0a-22c99ed83d01',
    dataAiHint: 'red mimosa lettuce',
    farmerId: '1',
    description: 'Alface Mimosa com folhas tenras e bordas avermelhadas, de sabor suave e amanteigado.',
    status: 'active',
    stock: 25
  },
  {
    id: '96',
    name: 'Alface Mimosa Verde Orgânica',
    category: 'Verdura',
    price: 3.10,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/alface_mimosa_verde.webp?alt=media&token=4635346b-69f9-4a54-94b6-8cb1b85f4afb',
    dataAiHint: 'green mimosa lettuce',
    farmerId: '1',
    description: 'Alface Mimosa de folhas macias e sabor delicado, uma variedade clássica e muito apreciada.',
    status: 'active',
    stock: 25
  },
  {
    id: 'prod-batata-bolinha',
    name: 'Batata Bolinha Orgânica',
    category: 'Raiz e Tubérculo',
    price: 5.00,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/batata_bolinha.webp?alt=media&token=19bff4eb-5e8d-47a7-9aeb-ce51db6b8c87',
    dataAiHint: 'small potatoes',
    farmerId: '4',
    description: 'Batatinhas bolinha, pequenas e macias, perfeitas para assar, cozinhar em conservas ou como acompanhamento.',
    status: 'active',
    stock: 30
  },
  {
    id: 'prod-caju',
    name: 'Caju Orgânico',
    category: 'Fruta',
    price: 9.50,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/caju.webp?alt=media&token=7a76f64c-ed10-4451-8112-5d09020049b9',
    dataAiHint: 'cashew fruit',
    farmerId: '2',
    description: 'Caju orgânico, fruto de sabor único, perfeito para sucos e doces. Acompanha a castanha.',
    status: 'active',
    stock: 20
  },
  {
    id: 'prod-capuchinha',
    name: 'Capuchinha Orgânica',
    category: 'Verdura',
    price: 4.00,
    unit: 'maço',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/capuchinha.webp?alt=media&token=beb2ab63-17f2-4044-8b3a-30561cacf991',
    dataAiHint: 'nasturtium',
    farmerId: '3',
    description: 'Flores e folhas de capuchinha, com sabor picante que lembra agrião. Perfeitas para saladas e decoração de pratos.',
    status: 'active',
    stock: 15
  },
  {
    id: 'prod-caqui',
    name: 'Caqui Orgânico',
    category: 'Fruta',
    price: 6.80,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/caqui.webp?alt=media&token=6d9835e9-ae1c-4cb0-83e3-e839ccb780c2',
    dataAiHint: 'persimmon',
    farmerId: '2',
    description: 'Caqui orgânico de polpa doce e macia, sem cica. Ideal para consumo in natura.',
    status: 'active',
    stock: 25
  },
  {
    id: 'prod-carambola',
    name: 'Carambola Orgânica',
    category: 'Fruta',
    price: 7.20,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/carambola.webp?alt=media&token=57b1c4f3-5d99-4bc3-ae84-b627807beed3',
    dataAiHint: 'star fruit',
    farmerId: '2',
    description: 'Carambola orgânica, com seu formato de estrela e sabor agridoce. Ótima para sucos, saladas e decoração.',
    status: 'active',
    stock: 18
  },
  {
    id: 'prod-china',
    name: 'China Orgânica',
    category: 'Verdura',
    price: 4.50,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/china.webp?alt=media&token=39bf916d-67aa-4534-81f6-cdade5a4aeca',
    dataAiHint: 'napa cabbage',
    farmerId: '1',
    description: 'Acelga chinesa, de folhas claras e crocantes. Perfeita para refogados rápidos e pratos asiáticos como o kimchi.',
    status: 'active',
    stock: 20
  },
  {
    id: 'prod-couve-kale',
    name: 'Couve Kale Orgânica',
    category: 'Verdura',
    price: 4.80,
    unit: 'maço',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/couve_kale.webp?alt=media&token=0f9318de-5203-44c4-9c85-420452ed7627',
    dataAiHint: 'kale',
    farmerId: '1',
    description: 'Couve Kale com folhas crespas e ricas em nutrientes. Ideal para saladas, sucos verdes e chips assados.',
    status: 'active',
    stock: 22
  },
  {
    id: 'prod-feijao-preto',
    name: 'Feijão Preto Orgânico',
    category: 'Grão e Cereal',
    price: 12.00,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/feijao_preto.webp?alt=media&token=37fb877a-32f5-419f-a2fd-eb01841d991d',
    dataAiHint: 'black beans',
    farmerId: '5',
    description: 'Feijão preto orgânico, a base da culinária brasileira. Grãos macios e caldo encorpado.',
    status: 'active',
    stock: 50
  },
  {
    id: 'prod-feijao-carioca',
    name: 'Feijão Carioca Orgânico',
    category: 'Grão e Cereal',
    price: 11.50,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/feijao_carioca.webp?alt=media&token=67c3dfb7-4e77-4593-a133-3a7fd51f1ef2',
    dataAiHint: 'carioca beans',
    farmerId: '5',
    description: 'Feijão carioca orgânico, o preferido em muitas regiões do Brasil para o dia a dia.',
    status: 'active',
    stock: 50
  },
  {
    id: 'prod-feijao-vermelho',
    name: 'Feijão Vermelho Orgânico',
    category: 'Grão e Cereal',
    price: 13.00,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/feijao_vermelho.webp?alt=media&token=0eb5f6e0-33fc-4407-a608-9c44bf770c5f',
    dataAiHint: 'red beans',
    farmerId: '5',
    description: 'Feijão vermelho orgânico, de grãos firmes, ideal para sopas, saladas e pratos com inspiração mexicana.',
    status: 'active',
    stock: 40
  },
  {
    id: 'prod-laranja-lima',
    name: 'Laranja Lima Orgânica',
    category: 'Fruta',
    price: 5.20,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/laranja_lima.webp?alt=media&token=df719cd2-1767-436b-9ab5-b2a55c3a2000',
    dataAiHint: 'lima orange',
    farmerId: '2',
    description: 'Laranja Lima, de sabor suave e doce, com baixa acidez, ideal para bebês e crianças.',
    status: 'active',
    stock: 30
  },
  {
    id: 'prod-manga-carlotinha',
    name: 'Manga Carlotinha Orgânica',
    category: 'Fruta',
    price: 7.00,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/manga_carlotinha.webp?alt=media&token=0417fa54-ab7b-4bf2-9078-1945e2da9b07',
    dataAiHint: 'carlotinha mango',
    farmerId: '2',
    description: 'Manga Carlotinha, variedade de sabor adocicado e polpa suculenta.',
    status: 'active',
    stock: 25
  },
  {
    id: 'prod-manga-tommy',
    name: 'Manga Tommy Orgânica',
    category: 'Fruta',
    price: 6.80,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/manga_tommy.webp?alt=media&token=a5b2a911-0dc0-4266-a433-08c018eb8b68',
    dataAiHint: 'tommy atkins mango',
    farmerId: '2',
    description: 'Manga Tommy, a mais popular do Brasil, com polpa firme e sabor que equilibra doce e ácido.',
    status: 'active',
    stock: 45
  },
  {
    id: 'prod-mexerica-bergamota',
    name: 'Mexerica Bergamota Orgânica',
    category: 'Fruta',
    price: 5.80,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/mexerica_bergamota.webp?alt=media&token=452f0390-d797-4c48-acb1-996b765ea883',
    dataAiHint: 'bergamot tangerine',
    farmerId: '2',
    description: 'Mexerica Bergamota (ou vergamota), muito aromática e de sabor intenso, um clássico do sul.',
    status: 'active',
    stock: 25
  },
  {
    id: 'prod-mexerica-ole',
    name: 'Mexerica Olé Orgânica',
    category: 'Fruta',
    price: 6.00,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/mexerica_ole.webp?alt=media&token=67cc4615-dfe9-47ba-b982-fe173d0c3023',
    dataAiHint: 'ole tangerine',
    farmerId: '2',
    description: 'Mexerica Olé, variedade nova de casca fina, sem sementes e muito suculenta.',
    status: 'active',
    stock: 20
  },
  {
    id: 'prod-milho-verde',
    name: 'Milho Verde Orgânico',
    category: 'Grão e Cereal',
    price: 4.50,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/milho_verde.webp?alt=media&token=06cf8e19-7d36-42eb-8b27-cde60f2c41d6',
    dataAiHint: 'green corn',
    farmerId: '5',
    description: 'Milho verde orgânico, doce e macio. Perfeito para cozinhar, assar na brasa ou para pamonhas e curau.',
    status: 'active',
    stock: 60
  },
  {
    id: 'prod-melancia-mini',
    name: 'Melancia Mini Orgânica',
    category: 'Fruta',
    price: 9.00,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/mini_melancia.webp?alt=media&token=e26cd7c8-9313-4eb6-8c60-050147ea898b',
    dataAiHint: 'mini watermelon',
    farmerId: '2',
    description: 'Mini melancia, com todo o sabor e doçura da melancia tradicional em um tamanho prático.',
    status: 'active',
    stock: 15
  },
  {
    id: 'prod-oregano',
    name: 'Orégano Orgânico',
    category: 'Tempero',
    price: 3.50,
    unit: 'maço',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/oregano.webp?alt=media&token=0b64f7ac-1aa4-4e21-a6b0-67eee4c6124e',
    dataAiHint: 'oregano',
    farmerId: '3',
    description: 'Orégano fresco, com aroma intenso que realça molhos, pizzas e carnes.',
    status: 'active',
    stock: 30
  },
  {
    id: 'prod-pepino-caipira',
    name: 'Pepino Caipira Orgânico',
    category: 'Legume',
    price: 3.80,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/pepino_caipira.webp?alt=media&token=5e96c1ce-de1b-475d-9d12-4fa0b6d269e4',
    dataAiHint: 'caipira cucumber',
    farmerId: '1',
    description: 'Pepino caipira, variedade mais rústica de sabor marcante, ideal para saladas e picles.',
    status: 'active',
    stock: 25
  },
  {
    id: 'prod-pessego',
    name: 'Pêssego Orgânico',
    category: 'Fruta',
    price: 9.50,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/pessego.webp?alt=media&token=40ca1fb9-a000-4b9e-bbd5-52775e5d0720',
    dataAiHint: 'peach',
    farmerId: '2',
    description: 'Pêssegos orgânicos, suculentos e aveludados, para comer ao natural ou em compotas e tortas.',
    status: 'active',
    stock: 20
  },
  {
    id: 'prod-pimentao-vermelho',
    name: 'Pimentão Vermelho Orgânico',
    category: 'Fruta',
    price: 3.50,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/pimentao_vermelho.webp?alt=media&token=3d566dc3-61ba-4f68-9b7c-9004207bb8ff',
    dataAiHint: 'red bell pepper',
    farmerId: '2',
    description: 'Pimentão vermelho, o mais doce entre os pimentões, ótimo para assados, saladas e molhos.',
    status: 'active',
    stock: 15
  },
  {
    id: 'prod-poejo',
    name: 'Poejo Orgânico',
    category: 'Tempero',
    price: 3.00,
    unit: 'maço',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/poejo.webp?alt=media&token=47edb116-120c-4c97-910a-a6c49e85a8e9',
    dataAiHint: 'pennyroyal',
    farmerId: '3',
    description: 'Poejo, erva de aroma mentolado intenso, usada em chás e licores.',
    status: 'active',
    stock: 20
  },
  {
    id: 'prod-quiabo',
    name: 'Quiabo Orgânico',
    category: 'Legume',
    price: 4.80,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/quiabo.webp?alt=media&token=de5f050e-8c83-46ab-9671-e370b659ff1f',
    dataAiHint: 'okra',
    farmerId: '1',
    description: 'Quiabo orgânico, sem baba, perfeito para o clássico frango com quiabo e outras receitas.',
    status: 'active',
    stock: 30
  },
  {
    id: 'prod-radicchio',
    name: 'Radicchio Orgânico',
    category: 'Verdura',
    price: 5.00,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/radicchio.webp?alt=media&token=473281ea-32f7-4a12-a93a-23a821b91505',
    dataAiHint: 'radicchio',
    farmerId: '1',
    description: 'Radicchio, uma verdura de folhas arroxeadas e sabor amargo, ideal para saladas sofisticadas.',
    status: 'active',
    stock: 15
  },
  {
    id: 'prod-rucula-selvagem',
    name: 'Rúcula Selvagem Orgânica',
    category: 'Verdura',
    price: 3.80,
    unit: 'maço',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/rucula_selvagem.webp?alt=media&token=96d7f629-4be6-46c7-9e67-3108758865c7',
    dataAiHint: 'wild arugula',
    farmerId: '1',
    description: 'Rúcula selvagem com folhas mais escuras e sabor ainda mais intenso e picante.',
    status: 'active',
    stock: 20
  },
  {
    id: 'prod-uva-vitoria',
    name: 'Uva Vitória Orgânica',
    category: 'Fruta',
    price: 12.00,
    unit: 'caixa',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/uva_vitoria.webp?alt=media&token=a3ba40e3-ac32-44f0-b9b4-e75c875f2d4f',
    dataAiHint: 'vitoria grape',
    farmerId: '2',
    description: 'Uva Vitória sem sementes, de sabor doce e cor intensa, ideal para consumo in natura.',
    status: 'active',
    stock: 30
  },
  {
    id: 'prod-vagem',
    name: 'Vagem Orgânica',
    category: 'Legume',
    price: 5.50,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/vagem.webp?alt=media&token=d034c795-629f-40c8-a033-a6dec200a0b3',
    dataAiHint: 'green beans',
    farmerId: '1',
    description: 'Vagem orgânica, macia e crocante. Perfeita para cozinhar no vapor ou refogar.',
    status: 'active',
    stock: 25
  }
];

const defaultFarmers: Farmer[] = [
  {
    id: '1',
    name: 'Sítio Fazenda Mata Verde',
    responsibleName: 'Matias Ponte',
    prepostos: ['Rui Ponte'],
    location: { lat: -22.4632, lng: -42.9335 },
    bio: 'Nossa fazenda se dedica ao cultivo orgânico, respeitando a natureza e trazendo alimentos saudáveis para sua mesa. Especializados em verduras e legumes frescos, colhidos diariamente. Nossos produtos são cultivados com amor, em um ambiente livre de agrotóxicos. Cada folha, cada raiz, carrega o sabor autêntico da terra e o cuidado de quem planta com responsabilidade e carinho.',
    address: {
        street: 'Estrada do Sumidouro',
        number: '1200',
        complement: 'Sítio Mata Verde',
        neighborhood: 'Várzea de Mão',
        city: 'Cachoeiras de Macacu',
        state: 'RJ',
        zipCode: '28680-000'
    },
    pixKey: 'matias.ponte@email.com',
    shippingCost: 15,
    phone: '5521998877665',
    fairs: ['Tijuca', 'Grajaú'],
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/farmers%2Ffarmer_1.png?alt=media&token=8e945c2f-e8b9-43c3-9acb-d2e5a407336a'
  },
  {
    id: '2',
    name: 'Fazenda Sol Nascente',
    responsibleName: 'Juliana Paes',
    prepostos: ['Marco Paes'],
    location: { lat: -22.5202, lng: -42.9856 },
    bio: 'Especialistas em frutas orgânicas, nossa fazenda aproveita o sol generoso para produzir frutas doces e suculentas. Doçura e frescor que vêm direto do pé para a sua casa. Cultivamos com paixão, seguindo os ciclos da natureza para oferecer frutas com o máximo de sabor e nutrientes. Cada mordida é uma celebração da vida e da agricultura sustentável.',
    address: {
        street: 'Estrada da Uva',
        number: '800',
        complement: 'Sítio Sol Nascente',
        neighborhood: 'Vale das Videiras',
        city: 'Petrópolis',
        state: 'RJ',
        zipCode: '25755-351'
    },
    pixKey: 'fazenda.sol.nascente@email.com',
    shippingCost: 20,
    phone: '5521987654321',
    fairs: ['Botafogo', 'Leme'],
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/farmers%2Ffarmer_2.png?alt=media&token=09c8052d-f9e4-41d3-8208-724d27f673f8'
  },
  {
    id: '3',
    name: 'Orgânicos da Serra',
    responsibleName: 'Ailton Disuné',
    prepostos: [],
    location: { lat: -22.4277, lng: -42.9847 },
    bio: 'Das montanhas, trazemos para você temperos e raízes com sabores intensos e puros. Cultivados em altitude, nossos produtos têm um toque especial. Nossa terra é nossa maior riqueza, e por isso a tratamos com respeito, utilizando técnicas de cultivo que preservam o solo e a biodiversidade. Acreditamos que o segredo de um bom tempero está na sua origem e no cuidado com a terra.',
    address: {
        street: 'Rua das Hortênsias',
        number: '550',
        neighborhood: 'Quebra Frascos',
        city: 'Teresópolis',
        state: 'RJ',
        zipCode: '25963-090'
    },
    pixKey: 'organicos.serra@email.com',
    shippingCost: 18,
    phone: '5521976543210',
    fairs: ['Grajaú'],
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/farmers%2Ffarmer_3.png?alt=media&token=162649b5-c0a0-4384-8848-3560f64c6764'
  },
  {
    id: '4',
    name: 'Sítio Verdejar',
    responsibleName: 'Luciana Mello',
    prepostos: [],
    location: { lat: -22.3855, lng: -42.9692 },
    bio: 'Cultivamos uma grande variedade de legumes e verduras, sempre frescos e livres de veneno. Da nossa horta para a sua mesa. No Sítio Verdejar, cada semente é plantada com a esperança de um futuro mais saudável e sustentável. Nosso compromisso é com a qualidade de vida, oferecendo alimentos que nutrem o corpo e a alma, enquanto cuidamos do nosso planeta.',
    address: {
        street: 'Estrada Teresópolis-Friburgo',
        number: 'Km 15',
        neighborhood: 'Venda Nova',
        city: 'Teresópolis',
        state: 'RJ',
        zipCode: '25970-060'
    },
    pixKey: 'luciana.mello@email.com',
    shippingCost: 22,
    phone: '5521965432109',
    fairs: ['Flamengo', 'Laranjeiras'],
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/farmers%2Ffarmer_4.png?alt=media&token=8d2345e6-7b1c-43f1-9c3f-c3d69b935613'
  },
  {
    id: '5',
    name: 'Horta da Vovó',
    responsibleName: 'Onéias Ribeiro',
    prepostos: [],
    location: { lat: -22.4851, lng: -43.0135 },
    bio: 'Com o carinho e a sabedoria de gerações, a Horta da Vovó produz hortaliças e temperos que parecem ter sido colhidos no quintal de casa. Sabor de comida de verdade. Resgatamos receitas e técnicas de cultivo tradicionais para oferecer alimentos com sabor de memória afetiva. Cada maço de cheiro-verde, cada folha de alface, é um convite para reviver os bons momentos em família.',
    address: {
        street: 'Rua do Imperador',
        number: '2023',
        neighborhood: 'Centro',
        city: 'Petrópolis',
        state: 'RJ',
        zipCode: '25620-002'
    },
    pixKey: '5521954321098',
    shippingCost: 0, // Não oferece delivery
    phone: '5521954321098',
    fairs: ['Botafogo'],
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/farmers%2Ffarmer_5.png?alt=media&token=d4b29b6e-781c-4d5e-8e6d-6a5814529f7e'
  },
  {
    id: '6',
    name: 'Domicílio Orgânico',
    responsibleName: 'Paloma Portugal',
    prepostos: ['João Portugal'],
    location: { lat: -22.9519, lng: -43.2105 },
    bio: 'Facilitamos o acesso a produtos orgânicos de qualidade, conectando você a diversos produtores certificados. Uma seleção cuidadosa para sua saúde e conveniência. O Domicílio Orgânico nasceu do desejo de tornar a alimentação saudável mais prática e acessível. Selecionamos os melhores produtos de pequenos agricultores, criando uma ponte entre o campo e a sua casa.',
    address: {
        street: 'Rua das Laranjeiras',
        number: '300',
        neighborhood: 'Laranjeiras',
        city: 'Rio de Janeiro',
        state: 'RJ',
        zipCode: '22240-003'
    },
    pixKey: 'contato@domicilioorganico.com.br',
    shippingCost: 12,
    phone: '5521943210987',
    fairs: ['Flamengo', 'Laranjeiras'],
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/farmers%2Ffarmer_6.png?alt=media&token=f0d23588-466a-4d26-8094-c8c362a7596a'
  },
  {
    id: '134',
    name: 'Loja Orgânica',
    responsibleName: 'Rosana',
    prepostos: ['Evelyn'],
    location: { lat: -22.9139, lng: -43.2094 },
    bio: 'Somos apaixonados por apicultura e oferecemos uma variedade de méis orgânicos, cada um com suas características e benefícios únicos. O mais puro néctar da natureza. Nossas abelhas trabalham em floradas selecionadas, em áreas de mata preservada, para produzir um mel puro e cheio de vida. A Loja Orgânica é o resultado de anos de dedicação e respeito às abelhas e ao meio ambiente.',
    address: {
        street: 'Rua Haddock Lobo',
        number: '123',
        neighborhood: 'Tijuca',
        city: 'Rio de Janeiro',
        state: 'RJ',
        zipCode: '20260-141'
    },
    pixKey: 'loja.organica@email.com',
    shippingCost: 10,
    phone: '5521932109876',
    fairs: ['Tijuca'],
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/farmers%2Ffarmer_7.png?alt=media&token=c8b030b6-136b-4e89-9a00-51a7e4b2d3d3'
  }
];

const defaultCustomers: Customer[] = [
  {
    id: 'cust-001',
    name: 'Ana Silva',
    email: 'ana.silva@exemplo.com',
    favoriteFarmerIds: ['1', '3'],
    address: {
        street: 'Rua das Flores',
        number: '123',
        complement: 'Apto 405',
        neighborhood: 'Botafogo',
        city: 'Rio de Janeiro',
        state: 'RJ',
        zipCode: '22270-001'
    },
    phone: '5521999998888',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/customers%2Fcustomer_1.png?alt=media&token=0b674d87-6e9f-43e8-9e5c-204481358d83',
    classification: 'ouro'
  },
  {
    id: 'cust-002',
    name: 'Bruno Costa',
    email: 'bruno.costa@exemplo.com',
    favoriteFarmerIds: ['2'],
     address: {
        street: 'Avenida Atlântica',
        number: '1702',
        complement: 'Bloco A, Apto 801',
        neighborhood: 'Copacabana',
        city: 'Rio de Janeiro',
        state: 'RJ',
        zipCode: '22021-001'
    },
    phone: '5521988887777',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/customers%2Fcustomer_2.png?alt=media&token=e937d57a-9a80-496a-85b4-d7575231c584',
    classification: 'prata'
  },
  {
    id: 'cust-003',
    name: 'Carla Dias',
    email: 'carla.dias@exemplo.com',
    favoriteFarmerIds: ['1', '4', '5'],
     address: {
        street: 'Rua Marquês de Abrantes',
        number: '50',
        complement: 'Apto 202',
        neighborhood: 'Flamengo',
        city: 'Rio de Janeiro',
        state: 'RJ',
        zipCode: '22230-061'
    },
    phone: '5521977776666',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/customers%2Fcustomer_3.png?alt=media&token=14b2b291-a537-4d92-8a9d-5a81e35a7458',
    classification: 'diamante'
  },
];

const defaultOrders: Order[] = [
  {
    id: 'ORD-1678886400000',
    customerName: 'Ana Silva',
    items: [
        { productName: 'Cenouras Orgânicas', quantity: 2 },
        { productName: 'Alface Americana Orgânica', quantity: 1 }
    ],
    status: 'Pendente',
    total: 8.50,
    date: new Date('2024-07-10T10:00:00Z'),
    deliveryOption: 'pickup',
    pickupLocation: 'Feira da Tijuca'
  },
  {
    id: 'ORD-1678972800000',
    customerName: 'Bruno Costa',
    items: [
        { productName: 'Tomate Italiano Orgânico', quantity: 1.5 },
        { productName: 'Morangos Frescos Orgânicos', quantity: 2 }
    ],
    status: 'Pendente',
    total: 12.50,
    date: new Date('2024-07-11T11:30:00Z'),
    deliveryOption: 'delivery',
    customerContact: {
        address: {
            street: 'Avenida Atlântica',
            number: '1702',
            complement: 'Bloco A, Apto 801',
            neighborhood: 'Copacabana',
            city: 'Rio de Janeiro',
            state: 'RJ',
            zipCode: '22021-001'
        },
        phone: '5521988887777'
    }
  },
    {
    id: 'ORD-1679059200000',
    customerName: 'Carla Dias',
    items: [
        { productName: 'Alho Poró Orgânico', quantity: 3 },
        { productName: 'Salsa Orgânica', quantity: 1 },
        { productName: 'Couve Mineira Orgânica', quantity: 2 }
    ],
    status: 'Confirmado',
    total: 20.40,
    date: new Date('2024-06-12T09:00:00Z'),
    deliveryOption: 'pickup',
    pickupLocation: 'Feira do Grajaú'
  },
  {
    id: 'ORD-1679145600000',
    customerName: 'Ana Silva',
    items: [
        { productName: 'Abóbora Moranga Orgânica', quantity: 0.8 },
        { productName: 'Hortelã Orgânica', quantity: 1 }
    ],
    status: 'Rejeitado',
    total: 6.00,
    date: new Date('2024-05-13T14:00:00Z'),
    deliveryOption: 'delivery',
    customerContact: {
         address: {
            street: 'Rua das Flores',
            number: '123',
            complement: 'Apto 405',
            neighborhood: 'Botafogo',
            city: 'Rio de Janeiro',
            state: 'RJ',
            zipCode: '22270-001'
        },
        phone: '5521999998888'
    }
  }
];


// ============================================================================
// DATA ACCESS FUNCTIONS
// ============================================================================

let allProducts: Product[] = [...defaultProducts, ...lojaOrganicaProducts, ...domicilioOrganicoProducts];
let allFarmers: Farmer[] = defaultFarmers;
let allCustomers: Customer[] = defaultCustomers;
let allOrders: Order[] = defaultOrders;

let isHydrated = false;

function hydrateOnce() {
    if (isHydrated) return;
    
    // Para agricultores e clientes, mantemos o cache, pois eles são atualizáveis
    allFarmers = getStoredData(FARMERS_KEY, defaultFarmers);
    allCustomers = getStoredData(CUSTOMERS_KEY, defaultCustomers);

    // Para produtos e pedidos, que podem mudar com o código, forçamos a atualização
    // se o cache for inválido.
    const storedProducts = getStoredData<Product>('minha_feira_products_v6', defaultProducts);
    const isCacheValid = (
        storedProducts.length === allProducts.length &&
        storedProducts[0]?.description === defaultProducts[0]?.description &&
        storedProducts[storedProducts.length - 1]?.description === defaultProducts[defaultProducts.length - 1]?.description
    );

    if (isCacheValid) {
        allProducts = storedProducts;
    } else {
        allProducts = [...defaultProducts, ...lojaOrganicaProducts, ...domicilioOrganicoProducts];
        setStoredData('minha_feira_products_v6', allProducts);
    }
    
    allOrders = getStoredData(ORDERS_KEY, defaultOrders);

    isHydrated = true;
}


// GETTERS - Funções para ler os dados
// ----------------------------------------------------------------------------

export function getProducts(options?: { includePaused?: boolean }): Product[] {
  hydrateOnce();
  const activeProducts = allProducts.map(p => {
    if (p.promotion?.expiresAt && new Date(p.promotion.expiresAt) < new Date()) {
        return { ...p, promotion: { ...p.promotion, isActive: false }};
    }
    return p;
  });

  if (options?.includePaused) {
    return activeProducts;
  }
  return activeProducts.filter(p => p.status === 'active');
}

export function getProductById(id: string): Product | undefined {
  hydrateOnce();
  return allProducts.find((p) => p.id === id);
}

export function getProductByName(name: string): Product | undefined {
  hydrateOnce();
  return allProducts.find(p => p.name === name);
}

export function getFarmers(): Farmer[] {
  hydrateOnce();
  return allFarmers;
}

export function getFarmerById(id: string): Farmer | undefined {
  hydrateOnce();
  return allFarmers.find((f) => f.id === id);
}

export function getFarmersWithProducts(farmerIds?: string[]): FarmerWithProducts[] {
  hydrateOnce();
  const farmersToProcess = farmerIds
    ? allFarmers.filter(f => farmerIds.includes(f.id))
    : allFarmers;
  
  return farmersToProcess.map(farmer => ({
    ...farmer,
    products: allProducts.filter(p => p.farmerId === farmer.id && p.status === 'active')
  }));
}

export function getPromotionalProducts(): (Product & { farmerName: string, responsibleName?: string })[] {
    hydrateOnce();
    const activePromotions = allProducts.filter(p =>
        p.promotion?.isActive &&
        p.promotion.expiresAt &&
        new Date(p.promotion.expiresAt) > new Date()
    );

    return activePromotions.map(p => {
        const farmer = getFarmerById(p.farmerId);
        return {
            ...p,
            farmerName: farmer?.name || 'Desconhecido',
            responsibleName: farmer?.responsibleName
        };
    });
}

export function getOrders(): Order[] {
  hydrateOnce();
  return allOrders;
}

export function getCustomers(): Customer[] {
  hydrateOnce();
  return allCustomers;
}

export function getCustomerById(id: string): Customer | undefined {
  hydrateOnce();
  return allCustomers.find((c) => c.id === id);
}

// SETTERS / UPDATERS - Funções para modificar os dados
// ----------------------------------------------------------------------------

export function toggleProductPromotion(productId: string, isActive: boolean) {
    hydrateOnce();
    const productIndex = allProducts.findIndex(p => p.id === productId);
    if (productIndex !== -1) {
        allProducts[productIndex] = {
            ...allProducts[productIndex],
            promotion: {
                isActive: isActive,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 dias a partir de agora
            }
        };
        setStoredData('minha_feira_products_v6', allProducts);
    }
}

export function toggleProductStatus(productId: string, status: 'active' | 'paused') {
    hydrateOnce();
    const productIndex = allProducts.findIndex(p => p.id === productId);
    if (productIndex !== -1) {
        allProducts[productIndex].status = status;
        setStoredData('minha_feira_products_v6', allProducts);
    }
}

export function updateProduct(productId: string, updates: Partial<Omit<Product, 'id'>>) {
    hydrateOnce();
    const productIndex = allProducts.findIndex(p => p.id === productId);
    if (productIndex !== -1) {
        allProducts[productIndex] = { ...allProducts[productIndex], ...updates };
        setStoredData('minha_feira_products_v6', allProducts);
    }
}

export function deleteProduct(productId: string) {
    hydrateOnce();
    allProducts = allProducts.filter(p => p.id !== productId);
    setStoredData('minha_feira_products_v6', allProducts);
}

export function updateProductStock(productId: string, newStock: number | undefined) {
    hydrateOnce();
     const productIndex = allProducts.findIndex(p => p.id === productId);
    if (productIndex !== -1) {
        allProducts[productIndex].stock = newStock;
        setStoredData('minha_feira_products_v6', allProducts);
    }
}

export function addProduct(newProductData: Omit<Product, 'id' | 'status'>) {
    hydrateOnce();
    const newProduct: Product = {
        id: `prod-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        status: 'active',
        ...newProductData
    };
    allProducts.push(newProduct);
    setStoredData('minha_feira_products_v6', allProducts);
    return newProduct;
}

export function updateCustomerClassification(customerId: string, classification: CustomerClassification) {
    hydrateOnce();
    const customerIndex = allCustomers.findIndex(c => c.id === customerId);
    if (customerIndex !== -1) {
        allCustomers[customerIndex].classification = classification;
        setStoredData(CUSTOMERS_KEY, allCustomers);
    }
}


export function updateFarmer(farmerId: string, updates: Partial<Omit<Farmer, 'id'>>) {
    hydrateOnce();
    const farmerIndex = allFarmers.findIndex(f => f.id === farmerId);
    if (farmerIndex !== -1) {
        allFarmers[farmerIndex] = { ...allFarmers[farmerIndex], ...updates };
        setStoredData(FARMERS_KEY, allFarmers);
    }
}

export function updateCustomer(customerId: string, updates: Partial<Omit<Customer, 'id'>>) {
    hydrateOnce();
    const customerIndex = allCustomers.findIndex(c => c.id === customerId);
    if (customerIndex !== -1) {
        allCustomers[customerIndex] = { ...allCustomers[customerIndex], ...updates };
        setStoredData(CUSTOMERS_KEY, allCustomers);
    }
}

export function addFarmer(farmerData: Omit<Farmer, 'id' | 'location' | 'image'>): Farmer {
    hydrateOnce();
    const newFarmer: Farmer = {
        id: `farmer-${Date.now()}`,
        // Localização padrão, já que não temos como obter a real no cadastro
        location: { lat: -22.9068, lng: -43.1729 }, 
        image: 'https://placehold.co/100x100.png', // Imagem padrão
        ...farmerData
    };
    allFarmers.push(newFarmer);
    setStoredData(FARMERS_KEY, allFarmers);
    return newFarmer;
}

    
