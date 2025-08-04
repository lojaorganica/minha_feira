import type { Product, Farmer, Order, Customer, FarmerWithProducts, CustomerOrder } from './types';

let products: Product[] = [
  {
    id: '1',
    name: 'Cenouras Orgânicas',
    category: 'Vegetal',
    price: 2.5,
    unitAmount: 1,
    unit: 'kg',
    image: 'https://placehold.co/600x400',
    dataAiHint: 'cenouras orgânicas',
    farmerId: '1',
    description: 'Cenouras orgânicas frescas e crocantes, perfeitas para lanches ou para cozinhar.',
  },
  {
    id: '2',
    name: 'Tomates Antigos',
    category: 'Vegetal',
    price: 3.0,
    unitAmount: 1,
    unit: 'kg',
    image: 'https://placehold.co/600x400',
    dataAiHint: 'tomates antigos',
    farmerId: '1',
    description: 'Tomates antigos suculentos e saborosos, ideais para saladas e molhos.',
    promotion: {
        isActive: true,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }
  },
  {
    id: '3',
    name: 'Maçãs Crocantes',
    category: 'Fruta',
    price: 1.5,
    unitAmount: 1,
    unit: 'unidade',
    image: 'https://placehold.co/600x400',
    dataAiHint: 'maçãs crocantes',
    farmerId: '2',
    description: 'Maçãs orgânicas doces e crocantes, ótimas para um lanche saudável.',
  },
  {
    id: '4',
    name: 'Morangos Frescos',
    category: 'Fruta',
    price: 4.0,
    unitAmount: 1,
    unit: 'caixa',
    image: 'https://placehold.co/600x400',
    dataAiHint: 'morangos frescos',
    farmerId: '2',
    description: 'Morangos orgânicos maduros e doces, colhidos no pico do frescor.',
    promotion: {
        isActive: true,
        expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
    }
  },
  {
    id: '5',
    name: 'Leite Fresco da Fazenda',
    category: 'Laticínio',
    price: 3.5,
    unitAmount: 1,
    unit: 'litro',
    image: 'https://placehold.co/600x400',
    dataAiHint: 'leite de fazenda',
    farmerId: '3',
    description: 'Leite integral cremoso e rico de vacas alimentadas com pasto.',
  },
  {
    id: '6',
    name: 'Queijo Artesanal',
    category: 'Laticínio',
    price: 8.0,
    unitAmount: 100,
    unit: 'g',
    image: 'https://placehold.co/600x400',
    dataAiHint: 'queijo artesanal',
    farmerId: '3',
    description: 'Um queijo cheddar forte e quebradiço, maturado por 12 meses.',
  },
  {
    id: '7',
    name: 'Pão de Fermentação Natural',
    category: 'Padaria',
    price: 5.0,
    unitAmount: 1,
    unit: 'unidade',
    image: 'https://placehold.co/600x400',
    dataAiHint: 'pão de fermentação natural',
    farmerId: '4',
    description: 'Um pão de fermentação natural ácido e mastigável, assado fresco diariamente.',
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
    image: 'https://placehold.co/600x400',
    dataAiHint: 'couve orgânica',
    farmerId: '1',
    description: 'Couve orgânica rica em nutrientes, perfeita para saladas e smoothies.',
  },
   {
    id: '9',
    name: 'Laranjas Doces',
    category: 'Fruta',
    price: 2.0,
    unitAmount: 1,
    unit: 'kg',
    image: 'https://placehold.co/600x400',
    dataAiHint: 'laranjas doces',
    farmerId: '2',
    description: 'Laranjas doces e suculentas, cheias de Vitamina C.',
  },
  {
    id: '10',
    name: 'Iogurte Grego',
    category: 'Laticínio',
    price: 4.5,
    unitAmount: 1,
    unit: 'pote',
    image: 'https://placehold.co/600x400',
    dataAiHint: 'iogurte grego',
    farmerId: '3',
    description: 'Iogurte grego espesso e cremoso, rico em proteínas.',
  },
  {
    id: '11',
    name: 'Baguete de Trigo Integral',
    category: 'Padaria',
    price: 4.0,
    unitAmount: 1,
    unit: 'unidade',
    image: 'https://placehold.co/600x400',
    dataAiHint: 'baguete de trigo',
    farmerId: '4',
    description: 'Uma baguete de trigo integral robusta com uma crosta crocante.',
  },
  {
    id: '12',
    name: 'Pimentões',
    category: 'Vegetal',
    price: 2.75,
    unitAmount: 1,
    unit: 'kg',
    image: 'https://placehold.co/600x400',
    dataAiHint: 'pimentões',
    farmerId: '1',
    description: 'Uma mistura colorida de pimentões doces.',
  },
];

let farmers: Farmer[] = [
  {
    id: '1',
    name: 'Fazendas Vale Verde',
    location: { lat: -22.9068, lng: -43.1729 }, // Rio de Janeiro
    bio: 'Uma fazenda familiar dedicada à agricultura orgânica e sustentável há mais de 30 anos.',
    pixKey: 'fazenda.vale.verde@email.com',
    shippingCost: 15.00,
    phone: '5521987654321',
    fairs: ['Tijuca', 'Grajaú', 'Laranjeiras'],
  },
  {
    id: '2',
    name: 'Pomares do Amanhecer',
    location: { lat: -22.91, lng: -43.2 }, // Near Rio
    bio: 'Somos especializados no cultivo das frutas orgânicas mais doces e suculentas com amor e carinho.',
    pixKey: '123.456.789-00',
    shippingCost: 12.50,
    phone: '5521987654322',
    fairs: ['Flamengo', 'Botafogo', 'Leme'],
  },
  {
    id: '3',
    name: "Laticínios Margarida",
    location: { lat: -22.88, lng: -43.15 }, // Near Rio
    bio: 'Vacas felizes fazem o melhor leite. Nossos produtos lácteos são todos naturais e de vacas alimentadas com pasto.',
    pixKey: '(21) 99999-8888',
    shippingCost: 10.00,
    phone: '5521987654323',
    fairs: ['Tijuca', 'Botafogo'],
  },
  {
    id: '4',
    name: 'O Pão Rústico',
    location: { lat: -22.95, lng: -43.22 }, // Near Rio
    bio: 'Pães artesanais assados em forno a lenha tradicional com farinha orgânica de origem local.',
    pixKey: 'paorustico@email.com',
    shippingCost: 0, // Não oferece delivery
    phone: '5521987654324',
    fairs: ['Laranjeiras', 'Grajaú'],
  },
];

const orders: Order[] = [
    {
        id: 'ORD-001',
        customerName: 'Alice Johnson',
        items: [
            { productName: 'Cenouras Orgânicas', quantity: 2 },
            { productName: 'Leite Fresco da Fazenda', quantity: 1 },
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
            { productName: 'Pão de Fermentação Natural', quantity: 1 },
            { productName: 'Queijo Artesanal', quantity: 1 },
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
            { productName: 'Maçãs Crocantes', quantity: 4 },
            { productName: 'Morangos Frescos', quantity: 1 },
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
            { productName: 'Tomates Antigos', quantity: 2 },
            { productName: 'Couve Orgânica', quantity: 1 },
        ],
        status: 'Rejeitado',
        total: 8.00,
        date: new Date(2024, 6, 18),
        deliveryOption: 'delivery',
        customerContact: { address: 'Av. Copacabana, 456, Rio de Janeiro, RJ', phone: '21988882222' },
    }
];

const customers: Customer[] = [
    {
        id: 'cust-001',
        name: 'Cliente Exemplo',
        favoriteFarmerIds: ['1', '2'],
        address: 'Rua de Exemplo, 123, Bairro, Rio de Janeiro, RJ',
        phone: '21912345678'
    }
];

export function getProducts(): Product[] {
  // Simula a expiração da promoção
  return products.map(p => {
    if (p.promotion && p.promotion.isActive && new Date() > p.promotion.expiresAt) {
      return { ...p, promotion: { ...p.promotion, isActive: false } };
    }
    return p;
  });
}

export function getProductById(id: string): Product | undefined {
  return getProducts().find((p) => p.id === id);
}

export function updateProduct(productId: string, updatedData: Partial<Product>): Product | undefined {
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex !== -1) {
        products[productIndex] = { ...products[productIndex], ...updatedData };
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

export function addFarmer(farmerData: Omit<Farmer, 'id' | 'location'>): Farmer {
    const newId = `${farmers.length + 1}`;
    const newFarmer: Farmer = {
        id: newId,
        // Usando uma localização aleatória perto do Rio de Janeiro para simulação
        location: { lat: -22.9068 + (Math.random() - 0.5) * 0.5, lng: -43.1729 + (Math.random() - 0.5) * 0.5 },
        ...farmerData,
    };
    farmers.push(newFarmer);
    console.log("Novo agricultor adicionado:", newFarmer);
    console.log("Lista de agricultores atualizada:", farmers);
    return newFarmer;
}

export function getFarmersWithProducts(farmerIds: string[]): FarmerWithProducts[] {
  const favoriteFarmers = new Set(farmerIds);
  const result: FarmerWithProducts[] = [];
  const currentProducts = getProducts();

  farmers.forEach(farmer => {
    if (favoriteFarmers.has(farmer.id)) {
      const farmerProducts = currentProducts.filter(product => product.farmerId === farmer.id);
      result.push({ ...farmer, products: farmerProducts });
    }
  });

  return result;
}


export function getOrders(): Order[] {
    return orders;
}

export function getCustomers(): Customer[] {
    return customers;
}

export function getCustomerById(id: string): Customer | undefined {
    return customers.find(c => c.id === id);
}
