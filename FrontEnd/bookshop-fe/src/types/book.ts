export interface Book {
  id: string;
  title: string;
  author: string;
  images: string[];
  price: number;
  saleOffPrice?: number;
  description: string;
  category: string;
  rating?: number;
  sold?: number;
}