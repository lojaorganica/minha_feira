
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
    name: 'Tomates Antigos Orgânicos',
    category: 'Vegetal',
    price: 3.0,
    unitAmount: 1,
    unit: 'kg',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'heirloom tomatoes',
    farmerId: '1',
    description: 'Tomates antigos suculentos e saborosos, ideais para saladas e molhos.',
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
    name: 'Leite Fresco Orgânico da Fazenda',
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
    name: 'Couve Orgânica',
    category: 'Vegetal',
    price: 2.0,
    unitAmount: 1,
    unit: 'maço',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'organic kale',
    farmerId: '1',
    description: 'Couve orgânica rica em nutrientes, perfeita para saladas e smoothies.',
    status: 'active',
  },
   {
    id: '9',
    name: 'Laranjas Doces Orgânicas',
    category: 'Fruta',
    price: 2.0,
    unitAmount: 1,
    unit: 'kg',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'sweet oranges',
    farmerId: '2',
    description: 'Laranjas doces e suculentas, cheias de Vitamina C.',
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
    id: '12',
    name: 'Pimentões Orgânicos',
    category: 'Vegetal',
    price: 2.75,
    unitAmount: 1,
    unit: 'kg',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'bell peppers',
    farmerId: '1',
    description: 'Uma mistura colorida de pimentões doces.',
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
];

let farmers: Farmer[] = [
  {
    id: '1',
    responsibleName: 'João da Silva',
    name: 'Fazendas Vale Verde',
    location: { lat: -22.9068, lng: -43.1729 }, // Rio de Janeiro
    bio: 'Uma fazenda familiar dedicada à agricultura orgânica e sustentável há mais de 30 anos.',
    address: 'Estrada da Paciência, 123, Santa Cruz, Rio de Janeiro, RJ',
    pixKey: 'fazenda.vale.verde@email.com',
    shippingCost: 15.00,
    phone: '5521987654321',
    fairs: ['Tijuca', 'Grajaú', 'Laranjeiras'],
    image: 'https://placehold.co/100x100.png'
  },
  {
    id: '2',
    responsibleName: 'Maria Oliveira',
    name: 'Pomares do Amanhecer',
    location: { lat: -22.91, lng: -43.2 }, // Near Rio
    bio: 'Somos especializados no cultivo das frutas orgânicas mais doces e suculentas com amor e carinho.',
    address: 'Rua das Maçãs, 45, Nova Iguaçu, RJ',
    pixKey: '123.456.789-00',
    shippingCost: 12.50,
    phone: '5521987654322',
    fairs: ['Flamengo', 'Botafogo', 'Leme'],
    image: 'https://placehold.co/100x100.png'
  },
  {
    id: '3',
    responsibleName: 'Carlos Pereira',
    name: "Laticínios Margarida",
    location: { lat: -22.88, lng: -43.15 }, // Near Rio
    bio: 'Vacas felizes fazem o melhor leite. Nossos produtos lácteos são todos naturais e de vacas alimentadas com pasto.',
    address: 'Avenida do Leite, 789, Duque de Caxias, RJ',
    pixKey: '(21) 99999-8888',
    shippingCost: 10.00,
    phone: '5521987654323',
    fairs: ['Tijuca', 'Botafogo'],
    image: 'https://placehold.co/100x100.png'
  },
  {
    id: '4',
    responsibleName: 'Ana Souza',
    name: 'O Pão Rústico',
    location: { lat: -22.95, lng: -43.22 }, // Near Rio
    bio: 'Pães artesanais assados em forno a lenha tradicional com farinha orgânica de origem local.',
    address: 'Travessa do Pão, 10, Niterói, RJ',
    pixKey: 'paorustico@email.com',
    shippingCost: 0, // Não oferece delivery
    phone: '5521987654324',
    fairs: ['Laranjeiras', 'Grajaú'],
    image: 'https://placehold.co/100x100.png'
  },
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
            { productName: 'Tomates Antigos Orgânicos', quantity: 2 },
            { productName: 'Couve Orgânica', quantity: 1 },
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
    ['maca fuji', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/maca_fuji.webp?alt=media&token=d9b195e6-0e42-4976-83fe-fdf87dfafd7c'],
    ['maca', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/maca_fuji.webp?alt=media&token=d9b195e6-0e42-4976-83fe-fdf87dfafd7c'],
    ['alface americana', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/alface_americana.webp?alt=media&token=d745a4e5-1f8c-4333-8a8a-48a4201d308a'],
    ['brocolis americano', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/brocolis_americano.webp?alt=media&token=fd124564-9af1-438e-8e3b-34c320279c8b'],
    ['brocolis', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/brocolis_americano.webp?alt=media&token=fd124564-9af1-438e-8e3b-34c320279c8b'],
    ['beterraba', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/beterraba.webp?alt=media&token=d33b9ad6-d6c9-4641-b2fc-e4ed9893cbb0'],
    ['tomate', 'https://placehold.co/600x400.png'],
    ['cenoura', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/cenoura.webp?alt=media&token=83e659dc-2bd5-42f5-bc98-a178690858f1'],
    ['morango', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/morango.webp?alt=media&token=086479b1-5b7e-451d-9635-193264f55e31'],
    ['pão', 'https://placehold.co/600x400.png'],
    ['leite', 'https://placehold.co/600x400.png'],
    ['queijo', 'https://placehold.co/600x400.png'],
    ['couve', 'https://placehold.co/600x400.png'],
    ['laranja', 'https://placehold.co/600x400.png'],
    ['iogurte', 'https://placehold.co/600x400.png'],
    ['baguete', 'https://placehold.co/600x400.png'],
    ['pimentão', 'https://placehold.co/600x400.png'],
    ['manga palmer', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/manga_palmer.webp?alt=media&token=fdf4085f-fbef-41b1-be8a-a613dde3c2e4'],
    ['alho', 'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/alho.webp?alt=media&token=8071bc57-cdd1-4105-98da-6253f6f13050'],
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

  // Aplica imagens padrão
  allProducts = allProducts.map(product => {
      const productNameLower = product.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      for (const [keyword, imageUrl] of defaultProductImages.entries()) {
          if (productNameLower.includes(keyword)) {
              return { ...product, image: imageUrl };
          }
      }
      // Se nenhuma palavra-chave corresponder, garante que haja uma imagem de placeholder válida
      if (!product.image || !product.image.startsWith('http')) {
        return { ...product, image: 'https://placehold.co/600x400.png' };
      }
      return product;
  });

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
    const newId = `${farmers.length + 1}`;
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
