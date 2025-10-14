import type { Product, Category } from './types';
import imageData from './placeholder-images.json';

const findImage = (id: string) => {
  const img = imageData.placeholderImages.find(i => i.id === id);
  if (!img) {
    return { src: 'https://picsum.photos/seed/error/600/800', alt: 'Placeholder', 'data-ai-hint': 'placeholder image' };
  }
  return { src: img.imageUrl, alt: img.description, 'data-ai-hint': img.imageHint };
}

export const categories: Category[] = [
  { id: 'cat1', slug: 'womens-fashion', name: "Women's Fashion", image: findImage('category-women') },
  { id: 'cat2', slug: 'mens-fashion', name: "Men's Fashion", image: findImage('category-men') },
  { id: 'cat3', slug: 'accessories', name: 'Accessories', image: findImage('category-accessories') },
  { id: 'cat4', slug: 'footwear', name: 'Footwear', image: findImage('category-footwear') },
];

export const products: Product[] = [
  {
    id: 'prod1',
    slug: 'silk-elegance-blouse',
    name: 'Silk Elegance Blouse',
    description: 'A luxurious silk blouse that drapes beautifully. Perfect for office wear or a classy evening out. Features a classic collar and button-front closure.',
    price: 120.00,
    images: [findImage('product-blouse-1'), findImage('product-blouse-2')],
    category: 'womens-fashion',
    brand: 'Aurelia',
    rating: 4.8,
    reviews: [{ id: 'rev1', author: 'Jane D.', rating: 5, text: 'Absolutely stunning, the fabric feels amazing!', date: '2023-10-15' }],
    variants: [
      { id: 'v1-s', name: 'Small', sku: 'SEB-W-S', price: 120.00, image: findImage('product-blouse-1') },
      { id: 'v1-m', name: 'Medium', sku: 'SEB-W-M', price: 120.00, image: findImage('product-blouse-1') },
      { id: 'v1-l', name: 'Large', sku: 'SEB-W-L', price: 120.00, image: findImage('product-blouse-1') },
    ],
    tags: ['featured', 'top-seller', 'women']
  },
  {
    id: 'prod2',
    slug: 'classic-trench-coat',
    name: 'Classic Trench Coat',
    description: 'A timeless wardrobe staple. This double-breasted trench coat is crafted from water-resistant cotton gabardine, perfect for transitional weather.',
    price: 250.00,
    images: [findImage('product-trench-1'), findImage('product-trench-2')],
    category: 'womens-fashion',
    brand: 'London Fog',
    rating: 4.9,
    reviews: [],
    tags: ['featured', 'women']
  },
  {
    id: 'prod3',
    slug: 'linen-tailored-shirt',
    name: 'Linen Tailored Shirt',
    description: 'Stay cool and sharp in this tailored linen shirt. A versatile piece for smart-casual occasions, featuring a crisp collar and mother-of-pearl buttons.',
    price: 95.00,
    images: [findImage('product-shirt-men-1'), findImage('product-shirt-men-2')],
    category: 'mens-fashion',
    brand: 'Artisan Co.',
    rating: 4.6,
    reviews: [],
    tags: ['featured', 'men']
  },
  {
    id: 'prod4',
    slug: 'urban-explorer-backpack',
    name: 'Urban Explorer Backpack',
    description: 'A sleek, minimalist backpack designed for the modern commuter. Features a padded laptop compartment and multiple pockets for organization.',
    price: 150.00,
    images: [findImage('product-backpack-1')],
    category: 'accessories',
    brand: 'Nomad Gear',
    rating: 4.7,
    reviews: [],
    tags: ['accessories']
  },
  {
    id: 'prod5',
    slug: 'suede-chelsea-boots',
    name: 'Suede Chelsea Boots',
    description: 'Effortlessly stylish Chelsea boots crafted from premium suede with a durable crepe sole. A must-have for any discerning gentleman.',
    price: 180.00,
    images: [findImage('product-boots-1'), findImage('product-boots-2')],
    category: 'footwear',
    brand: 'Kingsman',
    rating: 4.9,
    reviews: [],
    tags: ['featured', 'men', 'footwear']
  },
  {
    id: 'prod6',
    slug: 'cashmere-v-neck-sweater',
    name: 'Cashmere V-Neck Sweater',
    description: 'Indulge in the supreme softness of this 100% cashmere sweater. A lightweight yet warm layer for any season.',
    price: 199.00,
    images: [findImage('product-sweater-1')],
    category: 'mens-fashion',
    brand: 'Aurelia',
    rating: 5.0,
    reviews: [],
    tags: ['men']
  },
  {
    id: 'prod7',
    slug: 'high-waist-denim-jeans',
    name: 'High-Waist Denim Jeans',
    description: 'Flattering high-waist jeans with a straight-leg cut. Made from premium stretch denim for comfort and style.',
    price: 110.00,
    images: [findImage('product-jeans-1')],
    category: 'womens-fashion',
    brand: 'Denim Co.',
    rating: 4.5,
    reviews: [],
    tags: ['women']
  },
  {
    id: 'prod8',
    slug: 'leather-tote-bag',
    name: 'Leather Tote Bag',
    description: 'A spacious and elegant tote bag handcrafted from full-grain Italian leather. Perfect for work, travel, or everyday use.',
    price: 220.00,
    images: [findImage('product-tote-1')],
    category: 'accessories',
    brand: 'Artisan Co.',
    rating: 4.8,
    reviews: [],
    tags: ['featured', 'accessories', 'women']
  },
  {
    id: 'prod9',
    slug: 'minimalist-leather-sneakers',
    name: 'Minimalist Leather Sneakers',
    description: 'Clean and versatile, these sneakers are made from supple calfskin leather. They pair perfectly with everything from suits to jeans.',
    price: 165.00,
    images: [findImage('product-sneakers-1')],
    category: 'footwear',
    brand: 'Apollo',
    rating: 4.7,
    reviews: [],
    tags: ['footwear', 'men', 'women']
  },
  {
    id: 'prod10',
    slug: 'aviator-sunglasses',
    name: 'Aviator Sunglasses',
    description: 'Classic aviator sunglasses with a lightweight metal frame and polarized lenses for superior clarity and UV protection.',
    price: 85.00,
    images: [findImage('product-sunglasses-1')],
    category: 'accessories',
    brand: 'Nomad Gear',
    rating: 4.6,
    reviews: [],
    tags: ['accessories', 'men', 'women']
  }
];
