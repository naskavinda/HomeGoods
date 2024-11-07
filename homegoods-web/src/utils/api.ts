import axios from 'axios';
import { Product } from '../types/product';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

// Dummy data for fallback
const dummyProducts: Product[] = [
  {
    id: 1,
    name: 'Modern Sofa'
  },
  {
    id: 2,
    name: 'Dining Table'
  },
  {
    id: 3,
    name: 'Table Lamp'
  }
];

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get('/api/products');
    return response.data;
  } catch (error) {
    console.warn('Failed to fetch products from API, falling back to dummy data:', error);
    return dummyProducts;
  }
};

export const createProduct = async (product: { name: string }): Promise<Product> => {
  const response = await axios.post('/api/products', product);
  return response.data;
}; 