

import type { Product, Farmer, Order, Customer, FarmerWithProducts, CustomerClassification, CustomerAddress, ProductCategory } from './types';

// ============================================================================
// IN-MEMORY DATA STORE WITH LOCALSTORAGE PERSISTENCE
// ============================================================================

const PRODUCTS_KEY = 'minha_feira_products_v6';
const FARMERS_KEY = 'minha_feira_farmers_v3';
const ORDERS_KEY = 'minha_feira_orders';
const CUSTOMERS_KEY = 'minha_feira_customers';

let isHydrated = false;

// Helper to hydrate data from localStorage on the client side
function hydrateFromStorage() {
  if (typeof window === 'undefined' || isHydrated) {
    return;
  }

  try {
    const storedProducts = localStorage.getItem(PRODUCTS_KEY);
    if (storedProducts) {
      const parsedProducts = JSON.parse(storedProducts);
      // Validation check: If the stored products don't match the default ones (e.g., length mismatch, missing critical items),
      // it's safer to discard the cache and use the fresh data from the code.
      if (parsedProducts.length === defaultProducts.length && parsedProducts.find((p: Product) => p.id === '1001')) {
         products = parsedProducts;
      } else {
        // Cache is invalid, use default and overwrite
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(defaultProducts));
      }
    } else {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(defaultProducts));
    }

    const storedFarmers = localStorage.getItem(FARMERS_KEY);
    if (storedFarmers) {
      farmers = JSON.parse(storedFarmers);
    } else {
      localStorage.setItem(FARMERS_KEY, JSON.stringify(defaultFarmers));
    }
    
    const storedOrders = localStorage.getItem(ORDERS_KEY);
    if (storedOrders) {
      orders = JSON.parse(storedOrders);
    } else {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(defaultOrders));
    }

    const storedCustomers = localStorage.getItem(CUSTOMERS_KEY);
    if (storedCustomers) {
      customers = JSON.parse(storedCustomers);
    } else {
      localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(defaultCustomers));
    }

  } catch (error) {
    console.error("Error hydrating data from localStorage", error);
    // If hydration fails, reset to defaults
    products = defaultProducts;
    farmers = defaultFarmers;
    orders = defaultOrders;
    customers = defaultCustomers;
  }

  isHydrated = true;
}


// Helper function to save data to localStorage
function setStoredData<T>(key: string, value: T[], sortFn?: (a: T, b: T) => number): void {
   if (sortFn) {
    value.sort(sortFn);
  }
  if (typeof window === 'undefined') {
    return;
  }
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing ${key} to localStorage`, error);
  }
}

const productSortFn = (a: Product, b: Product) => a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' });

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
        description: 'Um mel raro e de sabor intenso, produzido pelas abelhas a partir da florada e da seiva da Aroeira (Myracrodruon urundeuva), árvore nativa do Vale do Jequitinhonha. Esse mel de aroeira é envasado em Timóteo, cidade localizada no Vale do Rio Doce, na parte sul da cordilheira do Espinhaço, que abrange áreas próximas à Serra do Gandu e à Serra da Piedade, e onde parte de sua área municipal é protegida pela APA da Serra do Timóteo e pelo Parque Estadual do Rio Doce, que constitui a maior reserva de Mata Atlântica de Minas Gerais.\n\nEste mel, de coloração escura e sabor marcante, é valorizado por sua ação anti-inflamatória, antioxidante, cicatrizante e antibacteriana. Rico em compostos fenólicos e minerais, principalmente o ferro, o mel de aroeira é excelente no tratamento de doenças gástricas, para fortalecer a imunidade e no combate à anemia. Outro diferencial importantíssimo está na complexidade de sua composição: não se baseia só no néctar das flores da aroeira, mas também no melato — esse líquido adocicado formado por insetos (como pulgões) que se alimentam da seiva da árvore, participando da produção do mel junto com enzimas naturais.\n\nTudo isso torna este mel extraordinário!',
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
        description: 'Mel de Acácia, de cor clara e sabor suave e floral. Cristaliza muito lentamente, mantendo-se líquido por mais tempo.',
        status: 'active',
        stock: 35
    },
    {
        id: '136',
        name: 'Mel de Flores de Eucalipto Orgânico',
        price: 26.00,
        unit: 'pote',
        category: 'Apícola',
        image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/mel_de_eucalipto.webp?alt=media&token=22fad2b2-c030-4f6e-ac57-6d5b6fa0cc49',
        dataAiHint: 'eucalyptus honey',
        farmerId: '134',
        description: 'Mel de eucalipto, com sabor mais robusto e notas mentoladas, ideal para acompanhar queijos ou em chás.',
        status: 'active',
        stock: 45
    },
    {
        id: '134',
        name: 'Mel de Flores Silvestres Orgânico',
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

const domicilioOrganicoProducts: Product[] = [
    {
        id: 'prod-domicilio-amora',
        name: 'Amora Orgânica (Domicílio)',
        price: 6.50,
        unit: 'caixa',
        category: 'Fruta',
        image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/amora.webp?alt=media&token=86e42b5a-4e5b-4b1e-9e7b-8e9e1c7c4a3b',
        dataAiHint: 'blackberry',
        farmerId: '6',
        description: 'Amoras orgânicas do Domicílio Orgânico, doces e suculentas, perfeitas para geleias e consumo in natura.',
        status: 'active',
        stock: 15
    },
    {
        id: 'prod-domicilio-cenoura',
        name: 'Cenouras Orgânicas (Domicílio)',
        category: 'Raiz e Tubérculo',
        price: 3.00,
        unit: 'maço',
        image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/cenoura.webp?alt=media&token=83e659dc-2bd5-42f5-bc98-a178690858f1',
        dataAiHint: 'organic carrots',
        farmerId: '6',
        description: 'Cenouras orgânicas do Domicílio Orgânico, frescas e crocantes.',
        status: 'active',
        stock: 40
    }
];

// Initial default data
let defaultProducts: Product[] = [
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
    description: 'Laranja Seleta, muito suculenta e de sabor adocicado, excelente para sucos.',
    status: 'active',
    stock: 50,
  },
  {
    id: '91',
    name: 'Hortelã Orgânica',
    category: 'Tempero',
    price: 2.80,
    unit: 'maço',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/hortela.webp?alt=media&token=97dacb1f-e59f-4891-9176-73eec1e16188',
    dataAiHint: 'mint',
    farmerId: '1',
    description: 'Hortelã fresca e aromática, perfeita para chás, sucos, quibes e sobremesas.',
    status: 'active',
    stock: 30,
  },
  {
    id: '92',
    name: 'Poejo Orgânico',
    category: 'Tempero',
    price: 3.00,
    unit: 'maço',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/poejo.webp?alt=media&token=47edb116-120c-4c97-910a-a6c49e85a8e9',
    dataAiHint: 'pennyroyal',
    farmerId: '1',
    description: 'Poejo, uma erva de aroma intenso semelhante à menta, usada em chás e licores.',
    status: 'active',
    stock: 15,
  },
  {
    id: '93',
    name: 'Radicchio Orgânico',
    category: 'Verdura',
    price: 4.00,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/radicchio.webp?alt=media&token=473281ea-32f7-4a12-a93a-23a821b91505',
    dataAiHint: 'radicchio',
    farmerId: '1',
    description: 'Radicchio orgânico com folhas crocantes e sabor amargo, ideal para dar um toque especial em saladas.',
    status: 'active',
    stock: 10,
  },
  {
    id: '94',
    name: 'Milho Verde Orgânico',
    category: 'Grão e Cereal',
    price: 4.00,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/milho_verde.webp?alt=media&token=06cf8e19-7d36-42eb-8b27-cde60f2c41d6',
    dataAiHint: 'corn cob',
    farmerId: '1',
    description: 'Milho verde doce e macio, perfeito para cozinhar, assar ou fazer pamonha.',
    status: 'active',
    stock: 40,
  },
  {
    id: '95',
    name: 'Vagem Orgânica',
    category: 'Legume',
    price: 5.00,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/vagem.webp?alt=media&token=d034c795-629f-40c8-a033-a6dec200a0b3',
    dataAiHint: 'green beans',
    farmerId: '1',
    description: 'Vagem fresca e crocante, ótima para refogados, saladas e cozidos.',
    status: 'active',
    stock: 25,
  },
  {
    id: '96',
    name: 'Feijão Preto Orgânico',
    category: 'Grão e Cereal',
    price: 8.00,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/feijao_preto.webp?alt=media&token=37fb877a-32f5-419f-a2fd-eb01841d991d',
    dataAiHint: 'black beans',
    farmerId: '1',
    description: 'Feijão preto orgânico, a base para a tradicional feijoada e pratos do dia a dia.',
    status: 'active',
    stock: 50,
  },
  {
    id: '97',
    name: 'Feijão Carioca Orgânico',
    category: 'Grão e Cereal',
    price: 7.50,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/feijao_carioca.webp?alt=media&token=67c3dfb7-4e77-4593-a133-3a7fd51f1ef2',
    dataAiHint: 'carioca beans',
    farmerId: '1',
    description: 'Feijão carioca orgânico, o mais popular do Brasil, com caldo encorpado e sabor suave.',
    status: 'active',
    stock: 50,
  },
  {
    id: '98',
    name: 'Feijão Vermelho Orgânico',
    category: 'Grão e Cereal',
    price: 8.50,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/feijao_vermelho.webp?alt=media&token=0eb5f6e0-33fc-4407-a608-9c44bf770c5f',
    dataAiHint: 'red beans',
    farmerId: '1',
    description: 'Feijão vermelho orgânico, ideal para sopas, saladas e pratos com sabor mais robusto.',
    status: 'active',
    stock: 30,
  },
  {
    id: '99',
    name: 'Couve Kale Orgânica',
    category: 'Verdura',
    price: 4.50,
    unit: 'maço',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/couve_kale.webp?alt=media&token=0f9318de-5203-44c4-9c85-420452ed7627',
    dataAiHint: 'kale',
    farmerId: '1',
    description: 'Couve Kale, a super-hortaliça, rica em nutrientes e perfeita para sucos verdes, saladas e chips.',
    status: 'active',
    stock: 20,
  },
  {
    id: '100',
    name: 'Orégano Orgânico',
    category: 'Tempero',
    price: 3.50,
    unit: 'maço',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/oregano.webp?alt=media&token=0b64f7ac-1aa4-4e21-a6b0-67eee4c6124e',
    dataAiHint: 'oregano',
    farmerId: '1',
    description: 'Orégano fresco, com aroma e sabor que transformam molhos, pizzas e saladas.',
    status: 'active',
    stock: 30,
  },
  {
    id: '101',
    name: 'Alface Mimosa Verde Orgânica',
    category: 'Verdura',
    price: 3.30,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/alface_mimosa_verde.webp?alt=media&token=4635346b-69f9-4a54-94b6-8cb1b85f4afb',
    dataAiHint: 'mimosa lettuce',
    farmerId: '1',
    description: 'Alface Mimosa com folhas tenras e sabor suave, ótima para saladas.',
    status: 'active',
    stock: 20,
  },
  {
    id: '102',
    name: 'Abóbora Baianinha Orgânica',
    category: 'Legume',
    price: 3.60,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/abobora_baianinha.webp?alt=media&token=9860ba6a-82f2-439b-92c2-0c57d6d338a3',
    dataAiHint: 'baianinha squash',
    farmerId: '1',
    description: 'Abóbora Baianinha orgânica, de polpa adocicada, ótima para doces e purês.',
    status: 'active',
    stock: 10,
  },
  {
    id: '103',
    name: 'Alface Mimosa Roxa Orgânica',
    category: 'Verdura',
    price: 3.40,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/alface_mimosa_roxa.webp?alt=media&token=c8b001dc-6f00-486f-af0a-22c99ed83d01',
    dataAiHint: 'red mimosa lettuce',
    farmerId: '1',
    description: 'Alface Mimosa Roxa com folhas tenras e um toque de cor, ideal para saladas sofisticadas.',
    status: 'active',
    stock: 20,
  },
  {
    id: '104',
    name: 'Pimentão Vermelho Orgânico',
    category: 'Fruta',
    price: 3.20,
    unit: 'kg',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/pimentao_vermelho.webp?alt=media&token=d10b7b1b-9e4a-4b9e-8b1b-7e6d6e7f8e8e',
    dataAiHint: 'red bell pepper',
    farmerId: '2',
    description: 'Pimentão vermelho orgânico, de sabor adocicado, perfeito para saladas, assados e molhos.',
    status: 'active',
    stock: 15,
  },
  {
    id: '107',
    name: 'Alface Frisée Orgânica',
    category: 'Verdura',
    price: 3.50,
    unit: 'unidade',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/alface_frisee.webp?alt=media&token=060f2493-fb76-4a37-b40a-5de7bd0981c9',
    dataAiHint: 'frisee lettuce',
    farmerId: '1',
    description: 'Alface Frisée orgânica, de folhas crocantes e um leve amargor, ótima para saladas gourmet.',
    status: 'active',
    stock: 15,
  }
];

defaultProducts.push(...lojaOrganicaProducts);
defaultProducts.push(...domicilioOrganicoProducts);

const defaultFarmers: Farmer[] = [
  {
    id: '1',
    responsibleName: 'Matias Ponte',
    prepostos: ['Cristiane Alcântara', 'David Bulhões', 'Guilherme Ponte', 'Rosana Paixão', 'Evelyn Alcântara'],
    name: 'Sítio Fazenda Mata Verde',
    location: { lat: -22.469, lng: -42.969 },
    bio: 'Produzimos hortaliças e legumes com muito carinho, seguindo os princípios da agricultura orgânica para levar saúde e sabor à sua mesa.',
    address: {
      street: 'Estrada do Brejal',
      number: '1200',
      complement: 'Sítio Verdejar',
      neighborhood: 'Brejal',
      city: 'Petrópolis',
      state: 'RJ',
      zipCode: '25755-352'
    },
    pixKey: 'matiasponte@email.com',
    shippingCost: 20.00,
    phone: '5521912345678',
    fairs: ['Flamengo', 'Tijuca', 'Grajaú'],
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/matias_ponte.jpg?alt=media&token=8d2e854d-7634-46a2-9e9b-31d7f46146c9'
  },
  {
    id: '5',
    name: 'Sítio Tapera',
    responsibleName: 'Ailton Lima',
    prepostos: ['Felipe Carvalho', 'Thiago Carvalho'],
    location: { lat: -22.450, lng: -42.850 },
    bio: 'Desde 1990, nossa família se dedica à produção de orgânicos, com foco em folhas, ervas e temperos frescos e aromáticos.',
    address: {
      street: 'Estrada do Tinguá',
      number: 'km 5',
      neighborhood: 'Tinguá',
      city: 'Nova Iguaçu',
      state: 'RJ',
      zipCode: '26060-000'
    },
    pixKey: 'ailton.lima@email.com',
    shippingCost: 15.00,
    phone: '5521977778888',
    fairs: ['Laranjeiras', 'Botafogo'],
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/ailton_lima.jpg?alt=media&token=8d2e854d-7634-46a2-9e9b-31d7f46146c9'
  },
  {
    id: '2',
    name: 'Sítio Cachoeirinha I',
    responsibleName: 'Onéias Gonçalves',
    prepostos: ['Luciene Silva'],
    location: { lat: -22.319, lng: -42.531 },
    bio: 'Nossa paixão é cultivar frutas orgânicas, suculentas e cheias de sabor. Do nosso pomar para a sua casa.',
    address: {
      street: 'Rua das Macieiras',
      number: '50',
      neighborhood: 'Vale das Frutas',
      city: 'Nova Friburgo',
      state: 'RJ',
      zipCode: '28600-000'
    },
    pixKey: '24987654321',
    shippingCost: 22.00,
    phone: '5521987654321',
    fairs: ['Tijuca'],
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/oneias_goncalves.jpg?alt=media&token=8d2e854d-7634-46a2-9e9b-31d7f46146c9'
  },
  {
    id: '4',
    name: 'Sítio Cachoeirinha II',
    responsibleName: 'Walace Oliveira',
    prepostos: ['Michelli Conceição', 'Vitor Hugo'],
    location: { lat: -22.427, lng: -42.991 },
    bio: 'Da nossa horta na montanha para a sua mesa. Produtos frescos, orgânicos e cultivados com técnicas de permacultura.',
    address: {
      street: 'Caminho do Imperador',
      number: '3000',
      neighborhood: 'Fazenda Inglesa',
      city: 'Petrópolis',
      state: 'RJ',
      zipCode: '25755-352'
    },
    pixKey: 'walace.oliveira@picpay.com',
    shippingCost: 18.00,
    phone: '5521988889999',
    fairs: ['Laranjeiras', 'Leme'],
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/walace_oliveira.jpg?alt=media&token=8d2e854d-7634-46a2-9e9b-31d7f46146c9'
  },
  {
    id: '7',
    responsibleName: 'Wendel Oliveira',
    name: 'Sítio Cachoeirinha III',
    prepostos: ['Fafi'],
    location: { lat: -22.420, lng: -42.980 },
    bio: 'Especialistas em raízes e tubérculos. Produtos orgânicos com sabor autêntico da terra serrana.',
    address: {
        street: 'Estrada do Rocio',
        number: 's/n',
        complement: '',
        neighborhood: 'Rocio',
        city: 'Petrópolis',
        state: 'RJ',
        zipCode: '25725-000'
    },
    pixKey: 'wendel.oliveira@email.com',
    shippingCost: 20.00,
    phone: '5521955554444',
    fairs: ['Flamengo'],
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/wendel_oliveira.jpg?alt=media&token=8d2e854d-7634-46a2-9e9b-31d7f46146c9'
  },
  {
    id: '3',
    name: 'Sítio Paraíso',
    responsibleName: 'Ronilson',
    prepostos: [],
    location: { lat: -22.520, lng: -43.170 },
    bio: 'Cultivamos uma grande variedade de legumes e temperos orgânicos, sempre respeitando a terra e os ciclos da natureza.',
    address: {
      street: 'Estrada da Saudade',
      number: 's/n',
      neighborhood: 'Itaipava',
      city: 'Petrópolis',
      state: 'RJ',
      zipCode: '25730-000'
    },
    pixKey: 'sitio.paraiso@email.com',
    shippingCost: 25.00,
    phone: '5521998877665',
    fairs: ['Tijuca'],
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/ronilson.jpg?alt=media&token=8d2e854d-7634-46a2-9e9b-31d7f46146c9'
  },
  {
    id: '6',
    name: 'Domicílio Orgânico',
    responsibleName: 'Ivison Fragoso',
    prepostos: [],
    location: { lat: -22.906, lng: -43.172 },
    bio: 'Levando o melhor do campo para a sua casa. Produtos orgânicos com entrega rápida e segura.',
    address: {
      street: 'Rua do Catete',
      number: '100',
      neighborhood: 'Catete',
      city: 'Rio de Janeiro',
      state: 'RJ',
      zipCode: '22220-000'
    },
    pixKey: 'ivison.fragoso@email.com',
    shippingCost: 12.00,
    phone: '5521966667777',
    fairs: ['Botafogo', 'Flamengo', 'Laranjeiras'],
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/ivison_fragoso.jpg?alt=media&token=7c1b1c1b-1c1c-4b1b-8b1b-1c1c1c1c1c1c'
  },
  {
    id: '134',
    responsibleName: 'Marcos Melo',
    name: 'Loja Orgânica',
    location: { lat: -22.48, lng: -43.05 },
    bio: 'Méis orgânicos certificados, de alta qualidade, raros e medicinais, produzidos com respeito às abelhas e à natureza.',
    address: {
      street: 'Avenida Brasil',
      number: '1000',
      complement: '',
      neighborhood: 'Centro',
      city: 'Rio de Janeiro',
      state: 'RJ',
      zipCode: '20000-000'
    },
    pixKey: 'loja.organica@email.com',
    shippingCost: 15.00,
    phone: '5521955556666',
    fairs: ['Tijuca'],
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/marcos_melo.jpg?alt=media&token=8d2e854d-7634-46a2-9e9b-31d7f46146c9'
  }
];

const defaultCustomers: Customer[] = [
  {
    id: 'cust-001',
    name: 'Maria Oliveira',
    email: 'maria.oliveira@exemplo.com',
    favoriteFarmerIds: ['1', '3'],
    address: {
        street: 'Rua das Flores',
        number: '123',
        complement: 'Apto 405',
        neighborhood: 'Copacabana',
        city: 'Rio de Janeiro',
        state: 'RJ',
        zipCode: '22050002'
    },
    phone: '5521999998888',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/maria_oliveira.jpg?alt=media&token=7c1b1c1b-1c1c-4b1b-8b1b-1c1c1c1c1c1c',
    classification: 'ouro'
  },
   {
    id: 'cust-002',
    name: 'José Santos',
    email: 'jose.santos@exemplo.com',
    favoriteFarmerIds: ['2'],
     address: {
        street: 'Avenida Atlântica',
        number: '1702',
        complement: 'Bloco 2, Apto 801',
        neighborhood: 'Copacabana',
        city: 'Rio de Janeiro',
        state: 'RJ',
        zipCode: '22021001'
    },
    phone: '5521988887777',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/jose_santos.jpg?alt=media&token=7c1b1c1b-1c1c-4b1b-8b1b-1c1c1c1c1c1c',
    classification: 'prata'
  },
   {
    id: 'cust-003',
    name: 'Ana Pereira',
    email: 'ana.pereira@exemplo.com',
    favoriteFarmerIds: ['4', '5'],
     address: {
        street: 'Rua Barata Ribeiro',
        number: '502',
        complement: 'Apto 202',
        neighborhood: 'Copacabana',
        city: 'Rio de Janeiro',
        state: 'RJ',
        zipCode: '22040002'
    },
    phone: '5521977776666',
    image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/ana_pereira.jpg?alt=media&token=7c1b1c1b-1c1c-4b1b-8b1b-1c1c1c1c1c1c',
    classification: 'diamante'
  }
];

const defaultOrders: Order[] = [
  {
    id: 'ORD-1699981200000-abc',
    customerName: 'Maria Oliveira',
    items: [
      { productName: 'Cenouras Orgânicas', quantity: 2 },
      { productName: 'Tomate Italiano Orgânico', quantity: 1 },
    ],
    status: 'Pendente',
    total: 8.00,
    date: new Date('2024-07-14T10:00:00Z'),
    deliveryOption: 'pickup',
    pickupLocation: 'Feira da Tijuca'
  },
  {
    id: 'ORD-1700067600000-def',
    customerName: 'José Santos',
    items: [
      { productName: 'Morangos Frescos Orgânicos', quantity: 1 },
      { productName: 'Laranja Pera Orgânica', quantity: 3 },
    ],
    status: 'Pendente',
    total: 10.00,
    date: new Date('2024-07-15T11:00:00Z'),
    deliveryOption: 'delivery',
    customerContact: {
        address: {
            street: 'Avenida Atlântica',
            number: '1702',
            complement: 'Bloco 2, Apto 801',
            neighborhood: 'Copacabana',
            city: 'Rio de Janeiro',
            state: 'RJ',
            zipCode: '22021001'
        },
        phone: '5521988887777'
    }
  },
  {
    id: 'ORD-1700154000000-ghi',
    customerName: 'Ana Pereira',
    items: [
      { productName: 'Cenouras Orgânicas', quantity: 1 },
      { productName: 'Alho Poró Orgânico', quantity: 2 },
    ],
    status: 'Confirmado',
    total: 11.50,
    date: new Date('2024-06-16T12:00:00Z'),
    deliveryOption: 'pickup',
    pickupLocation: 'Feira do Grajaú'
  },
  {
    id: 'ORD-1700240400000-jkl',
    customerName: 'Maria Oliveira',
    items: [
      { productName: 'Morangos Frescos Orgânicos', quantity: 2 },
      { productName: 'Couve Mineira Orgânica', quantity: 1 },
    ],
    status: 'Confirmado',
    total: 10.20,
    date: new Date('2024-05-10T13:00:00Z'),
    deliveryOption: 'delivery',
    customerContact: {
         address: {
            street: 'Rua das Flores',
            number: '123',
            complement: 'Apto 405',
            neighborhood: 'Copacabana',
            city: 'Rio de Janeiro',
            state: 'RJ',
            zipCode: '22050002'
        },
        phone: '5521999998888'
    }
  }
];


// State management for data
let products = defaultProducts;
let farmers = defaultFarmers;
let orders = defaultOrders;
let customers = defaultCustomers;


// ============================================================================
// DATA ACCESS FUNCTIONS
// ============================================================================

export function getProducts(options: { includePaused?: boolean, farmerId?: string } = {}): Product[] {
  hydrateFromStorage();
  let filteredProducts = [...products];

  if (!options.includePaused) {
    filteredProducts = filteredProducts.filter(p => p.status === 'active');
  }
  
  if (options.farmerId) {
    filteredProducts = filteredProducts.filter(p => p.farmerId === options.farmerId);
  }

  // Check and update promotion status
  const now = new Date();
  filteredProducts.forEach(p => {
    if (p.promotion && p.promotion.isActive && new Date(p.promotion.expiresAt) < now) {
      p.promotion.isActive = false;
    }
  });

  setStoredData(PRODUCTS_KEY, products, productSortFn); // Save any promotion status changes
  return filteredProducts;
}

export function getProductById(id: string): Product | undefined {
  hydrateFromStorage();
  return products.find(p => p.id === id);
}

export function getProductByName(name: string): Product | undefined {
  hydrateFromStorage();
  return products.find(p => p.name === name);
}

export function getFarmers(): Farmer[] {
  hydrateFromStorage();
  return farmers;
}

export function getFarmerById(id: string): Farmer | undefined {
  hydrateFromStorage();
  return farmers.find(f => f.id === id);
}

export function getOrders(options: { farmerId?: string } = {}): Order[] {
  hydrateFromStorage();
  const allOrders = [...orders];
  if(options.farmerId) {
      const farmerProducts = new Set(getProducts({farmerId: options.farmerId, includePaused: true}).map(p => p.name));
      return allOrders.filter(order => order.items.some(item => farmerProducts.has(item.productName)));
  }
  return allOrders;
}

export function getCustomers(): Customer[] {
  hydrateFromStorage();
  return customers;
}

export function getCustomerById(id: string): Customer | undefined {
  hydrateFromStorage();
  return customers.find(c => c.id === id);
}

export function getFarmersWithProducts(farmerIds?: string[]): FarmerWithProducts[] {
  hydrateFromStorage();
  const farmersToProcess = farmerIds ? farmers.filter(f => farmerIds.includes(f.id)) : farmers;
  
  return farmersToProcess.map(farmer => {
    const farmerProducts = getProducts({includePaused: false}).filter(product => product.farmerId === farmer.id);
    return {
      ...farmer,
      products: farmerProducts,
    };
  });
}

export function getPromotionalProducts() {
    hydrateFromStorage();
    return getProducts({includePaused: false})
        .filter(p => p.promotion?.isActive)
        .map(p => {
            const farmer = getFarmerById(p.farmerId);
            return {
                ...p,
                farmerName: farmer?.name || 'Desconhecido',
                responsibleName: farmer?.responsibleName
            };
        });
}

// ============================================================================
// DATA MODIFICATION FUNCTIONS
// ============================================================================

export function addProduct(newProductData: Omit<Product, 'id' | 'status'>): Product {
    hydrateFromStorage();
    const newId = `prod-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const newProduct: Product = {
        ...newProductData,
        id: newId,
        status: 'active',
    };
    products.push(newProduct);
    setStoredData(PRODUCTS_KEY, products, productSortFn);
    return newProduct;
}


export function updateProduct(id: string, updates: Partial<Omit<Product, 'id' | 'farmerId'>>) {
  hydrateFromStorage();
  products = products.map(p => {
    if (p.id === id) {
      return { ...p, ...updates };
    }
    return p;
  });
  setStoredData(PRODUCTS_KEY, products, productSortFn);
}

export function updateProductStock(id: string, newStock: number) {
    updateProduct(id, { stock: newStock });
}

export function deleteProduct(id: string) {
  hydrateFromStorage();
  products = products.filter(p => p.id !== id);
  setStoredData(PRODUCTS_KEY, products, productSortFn);
}

export function toggleProductStatus(id: string, newStatus: 'active' | 'paused') {
    updateProduct(id, { status: newStatus });
}


export function toggleProductPromotion(id: string, isActive: boolean) {
    hydrateFromStorage();
    const product = getProductById(id);
    if(product) {
        const promotion = {
            isActive,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 dias a partir de agora
        };
        updateProduct(id, { promotion });
    }
}

export function addOrder(order: CustomerOrder) {
    hydrateFromStorage();
    orders.push(order);
    setStoredData(ORDERS_KEY, orders);
}

export function updateCustomerClassification(customerId: string, classification: CustomerClassification) {
    hydrateFromStorage();
    customers = customers.map(c => {
        if(c.id === customerId) {
            return { ...c, classification };
        }
        return c;
    });
    setStoredData(CUSTOMERS_KEY, customers);
}

export function addFarmer(farmerData: Omit<Farmer, 'id' | 'location' | 'image'>): Farmer {
    hydrateFromStorage();
    const newId = `farm-${Date.now()}`;
    const newFarmer: Farmer = {
        ...farmerData,
        id: newId,
        location: { lat: -22.9068, lng: -43.1729 }, // Posição padrão (Centro do Rio)
        image: 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/default_farmer.png?alt=media&token=8e9e1c7c-4a3b-4f1e-9e7b-8e9e1c7c4a3b' // Imagem padrão
    };
    farmers.push(newFarmer);
    setStoredData(FARMERS_KEY, farmers);
    return newFarmer;
}

export function updateFarmer(id: string, updates: Partial<Omit<Farmer, 'id'>>) {
  hydrateFromStorage();
  farmers = farmers.map(f => {
    if (f.id === id) {
      // Mescla o endereço corretamente se ele for fornecido nas atualizações
      const newAddress = updates.address ? { ...f.address, ...updates.address } : f.address;
      return { ...f, ...updates, address: newAddress };
    }
    return f;
  });
  setStoredData(FARMERS_KEY, farmers);
}

export function updateCustomer(id: string, updates: Partial<Omit<Customer, 'id'>>) {
  hydrateFromStorage();
  customers = customers.map(c => {
    if (c.id === id) {
      const newAddress = updates.address ? { ...c.address, ...updates.address } : c.address;
      return { ...c, ...updates, address: newAddress };
    }
    return c;
  });
  setStoredData(CUSTOMERS_KEY, customers);
}
