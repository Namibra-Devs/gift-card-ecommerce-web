// src/types/giftCard.ts

export type content = {
  title: string;
  description: string;
  type: string;
};


export interface GiftCard {
  _id: string;
  name: string;
  description: content[] | string;
  pricing: number[];
  stock: number;
  image?: string;
  media?: Media[]; // media?: Array<{ image: string; publicId: string }>;
  categories?: Array<{ name: string }>;
  createdAt: string;
  updatedAt: string;
  min_price?: number;
  max_price?: number;
  availability?: boolean;
  inStock?: boolean;
}
export type Media = {
  image: string;
  publicId: string;
  file?: File; // Temporary field for new uploads
  type?: string; // Optional field for media type (e.g., 'image', 'video')
};