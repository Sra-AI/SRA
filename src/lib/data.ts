import { Product } from './types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Smartphone Pro Max',
    price: 999,
    originalPrice: 1199,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    category: 'electronics',
    description: 'Latest flagship smartphone with advanced camera system',
    rating: 4.8,
    reviews: 1247,
    inStock: true,
    badge: 'Best Seller'
  },
  {
    id: '2',
    name: 'Wireless Headphones',
    price: 299,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    category: 'electronics',
    description: 'Premium noise-canceling wireless headphones',
    rating: 4.6,
    reviews: 892,
    inStock: true
  },
  {
    id: '3',
    name: 'Designer T-Shirt',
    price: 49,
    originalPrice: 79,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    category: 'clothing',
    description: 'Premium cotton t-shirt with modern design',
    rating: 4.4,
    reviews: 324,
    inStock: true,
    badge: 'Sale'
  },
  {
    id: '4',
    name: 'Smart Watch',
    price: 399,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    category: 'electronics',
    description: 'Advanced fitness tracking and smart features',
    rating: 4.7,
    reviews: 567,
    inStock: true
  },
  {
    id: '5',
    name: 'Modern Lamp',
    price: 129,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop',
    category: 'home',
    description: 'Minimalist desk lamp with adjustable brightness',
    rating: 4.3,
    reviews: 189,
    inStock: true
  },
  {
    id: '6',
    name: 'Running Shoes',
    price: 159,
    originalPrice: 199,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    category: 'sports',
    description: 'High-performance running shoes for athletes',
    rating: 4.5,
    reviews: 743,
    inStock: true,
    badge: 'New'
  },
  {
    id: '7',
    name: 'Programming Book',
    price: 39,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop',
    category: 'books',
    description: 'Complete guide to modern web development',
    rating: 4.9,
    reviews: 456,
    inStock: true
  },
  {
    id: '8',
    name: 'Denim Jacket',
    price: 89,
    image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=400&fit=crop',
    category: 'clothing',
    description: 'Classic denim jacket with modern fit',
    rating: 4.2,
    reviews: 267,
    inStock: false
  },
  {
    id: '9',
    name: 'Coffee Maker',
    price: 199,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop',
    category: 'home',
    description: 'Professional-grade coffee maker for home use',
    rating: 4.6,
    reviews: 334,
    inStock: true
  },
  {
    id: '10',
    name: 'Yoga Mat',
    price: 29,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
    category: 'sports',
    description: 'Premium non-slip yoga mat for all practices',
    rating: 4.4,
    reviews: 512,
    inStock: true
  },
  {
    id: '11',
    name: 'Laptop Stand',
    price: 79,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop',
    category: 'electronics',
    description: 'Ergonomic aluminum laptop stand',
    rating: 4.5,
    reviews: 198,
    inStock: true
  },
  {
    id: '12',
    name: 'Throw Pillow',
    price: 24,
    originalPrice: 35,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
    category: 'home',
    description: 'Soft decorative pillow with geometric pattern',
    rating: 4.1,
    reviews: 89,
    inStock: true,
    badge: 'Sale'
  }
];

export const categories = [
  { id: 'all', name: 'All Products', count: mockProducts.length },
  { id: 'electronics', name: 'Electronics', count: mockProducts.filter(p => p.category === 'electronics').length },
  { id: 'clothing', name: 'Clothing', count: mockProducts.filter(p => p.category === 'clothing').length },
  { id: 'home', name: 'Home & Garden', count: mockProducts.filter(p => p.category === 'home').length },
  { id: 'books', name: 'Books', count: mockProducts.filter(p => p.category === 'books').length },
  { id: 'sports', name: 'Sports', count: mockProducts.filter(p => p.category === 'sports').length }
];