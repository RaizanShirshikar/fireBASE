export type Image = {
  src: string;
  alt: string;
  "data-ai-hint"?: string;
};

export type Variant = {
  id: string;
  name: string;
  sku: string;
  price: number;
  image: Image;
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  images: Image[];
  category: string;
  brand: string;
  rating: number;
  reviews: Review[];
  variants?: Variant[];
  tags: string[];
};

export type Category = {
  id: string;
  slug: string;
  name: string;
  image: Image;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: Image;
  quantity: number;
  variant?: {
    id: string;
    name: string;
  };
};
