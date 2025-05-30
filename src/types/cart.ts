
export interface CartState {
  items: Array<{
    giftCardId: string;
    price: number;
    quantity: number;
    name?: string;
    image?: string;
  }>;
  total: number;
  count: number;
  loading: boolean;
  error: string | null;
}
