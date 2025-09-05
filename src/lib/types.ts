


export type CustomerClassification = 'bronze' | 'prata' | 'ouro' | 'diamante';

export type ProductCategory = 'Fruta' | 'Verdura' | 'Legume' | 'Raiz e Tubérculo' | 'Tempero' | 'Ovos' | 'Apícola' | 'Laticínio' | 'Padaria' | 'Grão e Cereal';

export type GalleryTheme = 'Fotografias' | 'Agricultores - Animações e Cartoon' | 'Alimentos - Animações e Cartoon' | 'Personagens - Animações e Cartoon';
export type GalleryFair = 'Todas' | 'Flamengo e Laranjeiras' | 'Grajaú' | 'Tijuca' | 'Botafogo' | 'Leme';

export interface GalleryItem {
  id: string;
  title: string;
  type: 'image' | 'video';
  url: string;
  fair: GalleryFair[];
  theme: GalleryTheme[];
  dataAiHint: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  unit: string;
  image: string;
  farmerId: string;
  description: string;
  dataAiHint: string;
  status: 'active' | 'paused';
  stock?: number;
  promotion?: {
    isActive: boolean;
    expiresAt: Date;
  };
}

export interface CustomerAddress {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
}

export interface Farmer {
  id: string;
  responsibleName?: string;
  prepostos?: string[];
  name:string;
  location: {
    lat: number;
    lng: number;
  };
  bio: string;
  address: CustomerAddress;
  pixKey: string;
  shippingCost?: number;
  phone?: string;
  fairs: string[];
  image: string;
}

export interface FarmerWithProducts extends Farmer {
  products: Product[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  items: { productName: string; quantity: number }[];
  status: 'Pendente' | 'Confirmado' | 'Rejeitado';
  total: number;
  date: Date;
  deliveryOption: 'pickup' | 'delivery';
  customerContact?: { address: CustomerAddress; phone: string };
  pickupLocation?: string;
}


export interface OrderHistoryItem {
    productName: string;
    quantity: number;
    productUnit: string;
}

export interface CustomerOrder extends Omit<Order, 'items' | 'status' | 'customerContact'> {
    status: 'Pendente'; // O status do cliente é sempre pendente até o agricultor confirmar
    farmerName: string;
    items: OrderHistoryItem[];
    customerContact?: {
        address: CustomerAddress | string; // Permitir string para retrocompatibilidade
        phone: string;
    }
}

export interface Customer {
  id: string;
  name: string;
  email?: string;
  favoriteFarmerIds: string[];
  address: CustomerAddress;
  phone: string;
  image: string;
  classification?: CustomerClassification;
}
