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
  // Include other fields from your API response as needed
}