export interface Product {
  id: string;
  name: string;
  category: 'Vegetable' | 'Fruit' | 'Dairy' | 'Bakery';
  price: number;
  image: string;
  farmer: string;
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
  products: string[]; // array of product ids
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  items: { productName: string; quantity: number }[];
  status: 'Pending' | 'Confirmed' | 'Rejected';
  total: number;
}
