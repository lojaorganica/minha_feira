import type { Product, Farmer, Order } from './types';

const products: Product[] = [
  {
    id: '1',
    name: 'Cenouras Orgânicas',
    category: 'Vegetal',
    price: 2.5,
    unit: 'por kg',
    image: 'https://placehold.co/600x400',
    dataAiHint: 'cenouras orgânicas',
    farmer: 'Fazendas Vale Verde',
    description: 'Cenouras orgânicas frescas e crocantes, perfeitas para lanches ou para cozinhar.',
  },
  {
    id: '2',
    name: 'Tomates Antigos',
    category: 'Vegetal',
    price: 3.0,
    unit: 'por kg',
    image: 'https://placehold.co/600x400',
    dataAiHint: 'tomates antigos',
    farmer: 'Fazendas Vale Verde',
    description: 'Tomates antigos suculentos e saborosos, ideais para saladas e molhos.',
  },
  {
    id: '3',
    name: 'Maçãs Crocantes',
    category: 'Fruta',
    price: 1.5,
    unit: 'unidade',
    image: 'https://placehold.co/600x400',
    dataAiHint: 'maçãs crocantes',
    farmer: 'Pomares do Amanhecer',
    description: 'Maçãs orgânicas doces e crocantes, ótimas para um lanche saudável.',
  },
  {
    id: '4',
    name: 'Morangos Frescos',
    category: 'Fruta',
    price: 4.0,
    unit: 'caixa',
    image: 'https://placehold.co/600x400',
    dataAiHint: 'morangos frescos',
    farmer: 'Pomares do Amanhecer',
    description: 'Morangos orgânicos maduros e doces, colhidos no pico do frescor.',
  },
  {
    id: '5',
    name: 'Leite Fresco da Fazenda',
    category: 'Laticínio',
    price: 3.5,
    unit: 'litro',
    image: 'https://placehold.co/600x400',
    dataAiHint: 'leite de fazenda',
    farmer: "Laticínios Margarida",
    description: 'Leite integral cremoso e rico de vacas alimentadas com pasto.',
  },
  {
    id: '6',
    name: 'Queijo Artesanal',
    category: 'Laticínio',
    price: 8.0,
    unit: '100g',
    image: 'https://placehold.co/600x400',
    dataAiHint: 'queijo artesanal',
    farmer: "Laticínios Margarida",
    description: 'Um queijo cheddar forte e quebradiço, maturado por 12 meses.',
  },
  {
    id: '7',
    name: 'Pão de Fermentação Natural',
    category: 'Padaria',
    price: 5.0,
    unit: 'unidade',
    image: 'https://placehold.co/600x400',
    dataAiHint: 'pão de fermentação natural',
    farmer: 'O Pão Rústico',
    description: 'Um pão de fermentação natural ácido e mastigável, assado fresco diariamente.',
  },
  {
    id: '8',
    name: 'Couve Orgânica',
    category: 'Vegetal',
    price: 2.0,
    unit: 'maço',
    image: 'https://placehold.co/600x400',
    dataAiHint: 'couve orgânica',
    farmer: 'Fazendas Vale Verde',
    description: 'Couve orgânica rica em nutrientes, perfeita para saladas e smoothies.',
  },
   {
    id: '9',
    name: 'Laranjas Doces',
    category: 'Fruta',
    price: 2.0,
    unit: 'kg',
    image: 'https://placehold.co/600x400',
    dataAiHint: 'laranjas doces',
    farmer: 'Pomares do Amanhecer',
    description: 'Laranjas doces e suculentas, cheias de Vitamina C.',
  },
  {
    id: '10',
    name: 'Iogurte Grego',
    category: 'Laticínio',
    price: 4.5,
    unit: 'pote',
    image: 'https://placehold.co/600x400',
    dataAiHint: 'iogurte grego',
    farmer: "Laticínios Margarida",
    description: 'Iogurte grego espesso e cremoso, rico em proteínas.',
  },
  {
    id: '11',
    name: 'Baguete de Trigo Integral',
    category: 'Padaria',
    price: 4.0,
    unit: 'unidade',
    image: 'https://placehold.co/600x400',
    dataAiHint: 'baguete de trigo',
    farmer: 'O Pão Rústico',
    description: 'Uma baguete de trigo integral robusta com uma crosta crocante.',
  },
  {
    id: '12',
    name: 'Pimentões',
    category: 'Vegetal',
    price: 2.75,
    unit: 'kg',
    image: 'https://placehold.co/600x400',
    dataAiHint: 'pimentões',
    farmer: 'Fazendas Vale Verde',
    description: 'Uma mistura colorida de pimentões doces.',
  },
];

const farmers: Farmer[] = [
  {
    id: '1',
    name: 'Fazendas Vale Verde',
    location: { lat: 34.0522, lng: -118.2437 }, // Los Angeles
    bio: 'Uma fazenda familiar dedicada à agricultura orgânica e sustentável há mais de 30 anos.',
    products: ['1', '2', '8', '12'],
  },
  {
    id: '2',
    name: 'Pomares do Amanhecer',
    location: { lat: 34.1522, lng: -118.4437 }, // Near LA
    bio: 'Somos especializados no cultivo das frutas orgânicas mais doces e suculentas com amor e carinho.',
    products: ['3', '4', '9'],
  },
  {
    id: '3',
    name: "Laticínios Margarida",
    location: { lat: 33.9522, lng: -118.1437 }, // Near LA
    bio: 'Vacas felizes fazem o melhor leite. Nossos produtos lácteos são todos naturais e de vacas alimentadas com pasto.',
    products: ['5', '6', '10'],
  },
  {
    id: '4',
    name: 'O Pão Rústico',
    location: { lat: 34.0522, lng: -118.3437 }, // Near LA
    bio: 'Pães artesanais assados em forno a lenha tradicional com farinha orgânica de origem local.',
    products: ['7', '11'],
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
    }
];

export function getProducts(): Product[] {
  return products;
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getFarmers(): Farmer[] {
  return farmers;
}

export function getFarmerById(id: string): Farmer | undefined {
  return farmers.find((f) => f.id === id);
}

export function getOrders(): Order[] {
    return orders;
}
