export interface Product {
  id: string;
  name_zh: string;
  name_en: string;
  description_zh: string;
  description_en: string;
  material_zh: string;
  material_en: string;
  origin_zh: string;
  origin_en: string;
  dimensions: string;
  price: number;
  category: string;
  images: string[];
  video?: string;
  createdAt: any;
  updatedAt: any;
}

export interface UserProfile {
  userId: string;
  email: string;
  favorites: string[];
  isAdmin: boolean;
}

export type Language = 'zh' | 'en';
