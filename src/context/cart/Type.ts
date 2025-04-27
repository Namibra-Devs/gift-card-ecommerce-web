// Type.ts
interface Media {
  image?: string;
  publicId?: string;
}

export interface GiftCardItem {
  _id: string;
  name: string;
  description: string;
  pricing: number[];
  media: Media[];
  stock: number;
  inStock: boolean;
  image?: string;  // Added to match API response
  min_price?: number;
  max_price?: number;
}