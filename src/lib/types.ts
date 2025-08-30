
export type CustomerClassification = 'bronze' | 'prata' | 'ouro' | 'diamante';

export interface Product {
  id: string;
  name: string;
  category: 'Vegetal' | 'Fruta' | 'Laticínio' | 'Padaria';
  price: number;
  unit: string;
  unitAmount?: number;
  image: string;
  farmerId: string;
  description: string;
  dataAiHint: string;
  status: 'active' | 'paused';
  promotion?: {
    isActive: boolean;
    expiresAt: Date;
  };
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
  address: string;
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
  customerContact?: { address: string; phone: string };
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
}


export interface Customer {
  id: string;
  name: string;
  favoriteFarmerIds: string[];
  address: string;
  phone: string;
  image: string;
  classification?: CustomerClassification;
  cep?: string;
}
