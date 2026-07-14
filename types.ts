export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  specs: Record<string, string>;
  isBestSeller?: boolean;
  stockStatus?: 'in-stock' | 'limited' | 'made-to-order';
  popularIn?: string[];
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  image: string;
  product?: string;
  productRef?: string;
}
