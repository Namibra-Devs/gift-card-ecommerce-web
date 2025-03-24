//===== Ensures that the data you’re working with matches the expected structure.======//
//===== Defines the shape of data returned by APIs or passed between components.======//
//===== Helps ensure consistency between the frontend and backend. Define types for data returned by backend APIs.======//

export interface IMedia {
  image: string;
  publicId: string;
}

// Interface for gift card
export interface GiftCardItem {
  _id: string;
  name: string;
  media: { image: string }[]; // Media is an array, but we'll take the first image
}

export interface GiftCardProps {
  item: {
    name: string;
    media: { image: string }[]; // Media array with at least one image
  };
}

export interface IGiftCard {
  _id: string;
  name: string;
  description: string;
  pricing: number[]; // Array of available prices
  media: IMedia[]; // Array of images
  stock: number;
  inStock: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}


export interface IGiftCardResponse {
  success: boolean;
  count: number;
  data: IGiftCard[]; // Array of gift cards
}
