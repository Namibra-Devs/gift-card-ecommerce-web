import ApiService from './apiService';
import { EZPayPinToken, EZPayPinCatalog, EZPayPinAvailability, GiftCard } from '../types/api';

export interface EZPayPinSyncResult {
  success: boolean;
  message: string;
  data?: {
    total: number;
    created: number;
    updated: number;
    failed: number;
  };
}

export interface EZPayPinCatalogResult {
  success: boolean;
  message: string;
  data?: {
    count: number;
    results: EZPayPinCatalog[];
  };
}

export interface EZPayPinAvailabilityResult {
  success: boolean;
  message: string;
  data?: EZPayPinAvailability;
}

class ExternalApiService {
  /**
   * Get EZPayPin authentication token
   */
  static async getEZPayPinToken(): Promise<{
    success: boolean;
    message: string;
    data?: EZPayPinToken;
  }> {
    try {
      const response = await ApiService.getEZPayPinToken();

      if (response.success && response.data) {
        return {
          success: true,
          message: 'Token retrieved successfully',
          data: response.data,
        };
      } else {
        return {
          success: false,
          message: response.message || 'Failed to retrieve token',
        };
      }
    } catch (error: any) {
      console.error('EZPayPin token error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to retrieve EZPayPin token. Please try again.',
      };
    }
  }

  /**
   * Get EZPayPin catalog of available gift cards
   */
  static async getEZPayPinCatalogs(): Promise<EZPayPinCatalogResult> {
    try {
      const response = await ApiService.getEZPayPinCatalogs();

      if (response.success && response.data) {
        return {
          success: true,
          message: 'Catalogs retrieved successfully',
          data: response.data,
        };
      } else {
        return {
          success: false,
          message: response.message || 'Failed to retrieve catalogs',
        };
      }
    } catch (error: any) {
      console.error('EZPayPin catalogs error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to retrieve EZPayPin catalogs. Please try again.',
      };
    }
  }

  /**
   * Sync EZPayPin gift cards with local database
   */
  static async syncEZPayPinGiftCards(): Promise<EZPayPinSyncResult> {
    try {
      const response = await ApiService.syncEZPayPinGiftCards();

      if (response.success && response.data) {
        return {
          success: true,
          message: response.message || 'Gift cards synced successfully',
          data: response.data,
        };
      } else {
        return {
          success: false,
          message: response.message || 'Failed to sync gift cards',
        };
      }
    } catch (error: any) {
      console.error('EZPayPin sync error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to sync EZPayPin gift cards. Please try again.',
      };
    }
  }

  /**
   * Get EZPayPin gift cards from local database
   */
  static async getEZPayPinGiftCards(): Promise<{
    success: boolean;
    message: string;
    data?: GiftCard[];
  }> {
    try {
      const response = await ApiService.getEZPayPinGiftCards();

      if (response.success && response.data) {
        return {
          success: true,
          message: 'EZPayPin gift cards retrieved successfully',
          data: response.data,
        };
      } else {
        return {
          success: false,
          message: response.message || 'Failed to retrieve EZPayPin gift cards',
        };
      }
    } catch (error: any) {
      console.error('EZPayPin gift cards error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to retrieve EZPayPin gift cards. Please try again.',
      };
    }
  }

  /**
   * Get specific EZPayPin gift card by SKU
   */
  static async getEZPayPinGiftCardBySku(sku: number): Promise<{
    success: boolean;
    message: string;
    data?: GiftCard;
  }> {
    try {
      const response = await ApiService.getEZPayPinGiftCardBySku(sku);

      if (response.success && response.data) {
        return {
          success: true,
          message: 'Gift card retrieved successfully',
          data: response.data,
        };
      } else {
        return {
          success: false,
          message: response.message || 'Failed to retrieve gift card',
        };
      }
    } catch (error: any) {
      console.error('EZPayPin gift card by SKU error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to retrieve gift card. Please try again.',
      };
    }
  }

  /**
   * Check EZPayPin gift card availability
   */
  static async checkEZPayPinAvailability(
    sku: number,
    itemCount: number,
    price: number
  ): Promise<EZPayPinAvailabilityResult> {
    try {
      const response = await ApiService.checkEZPayPinAvailability(sku, itemCount, price);

      if (response.success && response.data) {
        return {
          success: true,
          message: 'Availability checked successfully',
          data: response.data,
        };
      } else {
        return {
          success: false,
          message: response.message || 'Failed to check availability',
        };
      }
    } catch (error: any) {
      console.error('EZPayPin availability error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to check availability. Please try again.',
      };
    }
  }

  /**
   * Format EZPayPin catalog item for display
   */
  static formatCatalogItem(item: EZPayPinCatalog): {
    id: string;
    name: string;
    description: string;
    minPrice: number;
    maxPrice: number;
    currency: string;
    image: string;
    categories: string[];
    regions: string[];
    isPreOrder: boolean;
    activationFee: number;
  } {
    return {
      id: item.sku.toString(),
      name: item.title,
      description: `SKU: ${item.sku} | UPC: ${item.upc}`,
      minPrice: item.min_price,
      maxPrice: item.max_price,
      currency: item.currency.code,
      image: item.image,
      categories: item.categories.map(cat => cat.name),
      regions: item.regions.map(region => region.name),
      isPreOrder: item.pre_order,
      activationFee: item.activation_fee,
    };
  }

  /**
   * Format availability status for display
   */
  static formatAvailabilityStatus(availability: EZPayPinAvailability): {
    isAvailable: boolean;
    statusText: string;
    statusColor: string;
    deliveryType: string;
  } {
    return {
      isAvailable: availability.availability,
      statusText: availability.availability ? 'Available' : 'Unavailable',
      statusColor: availability.availability ? 'text-green-600' : 'text-red-600',
      deliveryType: availability.delivery_type_text,
    };
  }

  /**
   * Validate EZPayPin purchase parameters
   */
  static validatePurchaseParams(sku: number, itemCount: number, price: number): string | null {
    if (!sku || sku <= 0) {
      return 'Invalid SKU provided';
    }

    if (!itemCount || itemCount <= 0) {
      return 'Item count must be greater than 0';
    }

    if (!price || price <= 0) {
      return 'Price must be greater than 0';
    }

    return null;
  }

  /**
   * Get supported regions for EZPayPin
   */
  static getSupportedRegions(): Array<{ code: string; name: string }> {
    // This would typically come from the API, but for now we'll provide common ones
    return [
      { code: 'US', name: 'United States' },
      { code: 'CA', name: 'Canada' },
      { code: 'UK', name: 'United Kingdom' },
      { code: 'AU', name: 'Australia' },
      { code: 'DE', name: 'Germany' },
      { code: 'FR', name: 'France' },
      { code: 'IT', name: 'Italy' },
      { code: 'ES', name: 'Spain' },
      { code: 'NL', name: 'Netherlands' },
      { code: 'BE', name: 'Belgium' },
    ];
  }

  /**
   * Get supported categories for EZPayPin
   */
  static getSupportedCategories(): Array<{ name: string; description: string }> {
    return [
      { name: 'Gaming', description: 'Video games and gaming platforms' },
      { name: 'Entertainment', description: 'Movies, music, and streaming services' },
      { name: 'Shopping', description: 'Retail and e-commerce platforms' },
      { name: 'Food & Dining', description: 'Restaurants and food delivery' },
      { name: 'Travel', description: 'Airlines, hotels, and travel services' },
      { name: 'Technology', description: 'Software and tech services' },
      { name: 'Fashion', description: 'Clothing and accessories' },
      { name: 'Health & Beauty', description: 'Health and beauty products' },
      { name: 'Home & Garden', description: 'Home improvement and gardening' },
      { name: 'Sports & Outdoors', description: 'Sports equipment and outdoor activities' },
    ];
  }
}

export default ExternalApiService;
