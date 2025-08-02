import type { Product, Farmer, Order } from './types';

const products: Product[] = [
  {
    id: '1',
    name: 'Organic Carrots',
    category: 'Vegetable',
    price: 2.5,
    image: 'https://placehold.co/600x400',
    dataAiHint: 'organic carrots',
    farmer: 'Green Valley Farms',
    description: 'Fresh, crunchy organic carrots, perfect for snacking or cooking.',
  },
  {
    id: '2',
    name: 'Heirloom Tomatoes',
    category: 'Vegetable',
    price: 3.0,
    image: 'https://placehold.co/600x400',
    dataAiHint: 'heirloom tomatoes',
    farmer: 'Green Valley Farms',
    description: 'Juicy and flavorful heirloom tomatoes, ideal for salads and sauces.',
  },
  {
    id: '3',
    name: 'Crisp Apples',
    category: 'Fruit',
    price: 1.5,
    image: 'https://placehold.co/600x400',
    dataAiHint: 'crisp apples',
    farmer: 'Sunrise Orchards',
    description: 'Sweet and crisp organic apples, great for a healthy snack.',
  },
  {
    id: '4',
    name: 'Fresh Strawberries',
    category: 'Fruit',
    price: 4.0,
    image: 'https://placehold.co/600x400',
    dataAiHint: 'fresh strawberries',
    farmer: 'Sunrise Orchards',
    description: 'Ripe and sweet organic strawberries, picked at peak freshness.',
  },
  {
    id: '5',
    name: 'Farm Fresh Milk',
    category: 'Dairy',
    price: 3.5,
    image: 'https://placehold.co/600x400',
    dataAiHint: 'farm milk',
    farmer: "Daisy's Dairy",
    description: 'Creamy and rich whole milk from grass-fed cows.',
  },
  {
    id: '6',
    name: 'Artisanal Cheese',
    category: 'Dairy',
    price: 8.0,
    image: 'https://placehold.co/600x400',
    dataAiHint: 'artisanal cheese',
    farmer: "Daisy's Dairy",
    description: 'A sharp and crumbly cheddar, aged for 12 months.',
  },
  {
    id: '7',
    name: 'Sourdough Bread',
    category: 'Bakery',
    price: 5.0,
    image: 'https://placehold.co/600x400',
    dataAiHint: 'sourdough bread',
    farmer: 'The Rustic Loaf',
    description: 'A tangy and chewy sourdough loaf, baked fresh daily.',
  },
  {
    id: '8',
    name: 'Organic Kale',
    category: 'Vegetable',
    price: 2.0,
    image: 'https://placehold.co/600x400',
    dataAiHint: 'organic kale',
    farmer: 'Green Valley Farms',
    description: 'Nutrient-rich organic kale, perfect for salads and smoothies.',
  },
   {
    id: '9',
    name: 'Sweet Oranges',
    category: 'Fruit',
    price: 2.0,
    image: 'https://placehold.co/600x400',
    dataAiHint: 'sweet oranges',
    farmer: 'Sunrise Orchards',
    description: 'Juicy, sweet oranges packed with Vitamin C.',
  },
  {
    id: '10',
    name: 'Greek Yogurt',
    category: 'Dairy',
    price: 4.5,
    image: 'https://placehold.co/600x400',
    dataAiHint: 'greek yogurt',
    farmer: "Daisy's Dairy",
    description: 'Thick and creamy Greek yogurt, high in protein.',
  },
  {
    id: '11',
    name: 'Whole Wheat Baguette',
    category: 'Bakery',
    price: 4.0,
    image: 'https://placehold.co/600x400',
    dataAiHint: 'wheat baguette',
    farmer: 'The Rustic Loaf',
    description: 'A hearty whole wheat baguette with a crispy crust.',
  },
  {
    id: '12',
    name: 'Bell Peppers',
    category: 'Vegetable',
    price: 2.75,
    image: 'https://placehold.co/600x400',
    dataAiHint: 'bell peppers',
    farmer: 'Green Valley Farms',
    description: 'A colorful mix of sweet bell peppers.',
  },
];

const farmers: Farmer[] = [
  {
    id: '1',
    name: 'Green Valley Farms',
    location: { lat: 34.0522, lng: -118.2437 }, // Los Angeles
    bio: 'A family-owned farm dedicated to sustainable and organic vegetable farming for over 30 years.',
    products: ['1', '2', '8', '12'],
  },
  {
    id: '2',
    name: 'Sunrise Orchards',
    location: { lat: 34.1522, lng: -118.4437 }, // Near LA
    bio: 'We specialize in growing the sweetest and juiciest organic fruits with love and care.',
    products: ['3', '4', '9'],
  },
  {
    id: '3',
    name: "Daisy's Dairy",
    location: { lat: 33.9522, lng: -118.1437 }, // Near LA
    bio: 'Happy cows make the best milk. Our dairy products are all-natural and from grass-fed cows.',
    products: ['5', '6', '10'],
  },
  {
    id: '4',
    name: 'The Rustic Loaf',
    location: { lat: 34.0522, lng: -118.3437 }, // Near LA
    bio: 'Artisanal breads baked in a traditional wood-fired oven using organic, locally-sourced flour.',
    products: ['7', '11'],
  },
];

const orders: Order[] = [
    {
        id: 'ORD-001',
        customerName: 'Alice Johnson',
        items: [
            { productName: 'Organic Carrots', quantity: 2 },
            { productName: 'Farm Fresh Milk', quantity: 1 },
        ],
        status: 'Pending',
        total: 8.50,
    },
    {
        id: 'ORD-002',
        customerName: 'Bob Williams',
        items: [
            { productName: 'Sourdough Bread', quantity: 1 },
            { productName: 'Artisanal Cheese', quantity: 1 },
        ],
        status: 'Confirmed',
        total: 13.00,
    },
    {
        id: 'ORD-003',
        customerName: 'Charlie Brown',
        items: [
            { productName: 'Crisp Apples', quantity: 4 },
            { productName: 'Fresh Strawberries', quantity: 1 },
        ],
        status: 'Pending',
        total: 10.00,
    },
    {
        id: 'ORD-004',
        customerName: 'Diana Miller',
        items: [
            { productName: 'Heirloom Tomatoes', quantity: 2 },
            { productName: 'Organic Kale', quantity: 1 },
        ],
        status: 'Rejected',
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
