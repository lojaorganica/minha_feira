export interface Product {
  id: string;
  name: string;
  category: 'Vegetal' | 'Fruta' | 'Laticínio' | 'Padaria';
  price: number;
  unit: string;
  image: string;
  farmerId: string;
  description: string;
  dataAiHint: string;
}

export interface Farmer {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  bio: string;
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
}

export interface Customer {
  id: string;
  name: string;
  favoriteFarmerIds: string[];
}
