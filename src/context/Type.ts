//===== Ensures that the data you’re working with matches the expected structure.======//
//===== Defines the shape of data returned by APIs or passed between components.======//
//===== Helps ensure consistency between the frontend and backend. Define types for data returned by backend APIs.======//

// Request type for generating a token
export interface GenerateTokenRequest {
  client_id?: string;
  secret_key?: string;
}

// Response type for generating a token
export interface GenerateTokenResponse {
  access?: string;
  expire: number;
}

//==== Get Account Balance API response ====/

// Define the structure of a currency object
export interface Currency {
  currency?: string;
  symbol?: string;
  code?: string;
}

// Define the structure of an account balance object
export interface AccountBalance {
  currency?: Currency;
  balance?: number;
}

// The API returns an array of AccountBalance objects
export type GetAccountBalanceResponse = AccountBalance[];

//==== End Get Account Balance API response ====/

//==== Catalog List API Response====//
export interface CatalogItem {
  product_sku?: number; // Unique identifier for the product
  name?: string; // Name of the product
  description?: string; // Optional description of the product
  price?: number; // Price of the product
  currency?: string; // Currency (e.g., "USD", "EUR")
  availability?: boolean; // Whether the product is available
  stock?: number; // Number of available items
  category?: string; // Optional category name
  imageUrl?: string; // Optional product image URL
}

export interface CatalogListResponse {
  products?: CatalogItem[]; // Array of catalog items
  total?: number; // Total number of products in the catalog
  page?: number; // Current page number (for pagination)
  per_page?: number; // Number of items per page
}

//==== End Catalog List API Response===//

//==== Catalog Availability API ====//
export interface CatalogAvailabilityRequest {
  product_sku?: number; // SKU of the product (integer)
  item_count?: number; // Number of items requested (integer)
  price?: number; // Price of the product (float)
  Authorization?: string; // Bearer Token for authentication
}

export interface CatalogAvailabilityResponse {
  availability?: boolean; // Whether the product is available
  detail?: string; // Additional details about availability
  delivery_type?: 0 | 1 | 2 | 3; // 0 = Out of Stock, 1 = Available, 2 = Standard, 3 = Pre-Order
  delivery_type_text?: string; // Human-readable delivery type description
}

//==== End Catalog Availability API ====//


//==== Digital Card Order Create API =====//

export interface DigitalCardOrderRequest {
  sku: number;            // Catalog SKU (integer)
  quantity: number;       // Item count
  price: number;          // Item price (float)
  pre_order: boolean;     // Whether the item is a pre-order
  delivery_type?: number; // 0: None, 1: Email, 2: SMS, 3: WhatsApp (Optional)
  destination?: string;   // Email/Phone/WhatsApp for order delivery (Optional)
  terminal_id?: number;   // Sub-user Terminal ID (Optional)
  terminal_pin?: string;  // PIN for sub-user (Optional)
  reference_code: string; // Unique UUID v4 reference code
}

export interface DigitalCardOrderResponse {
  order_id: number;         // Unique order ID
  delivery_type: number;    // Delivery type (0: None, 1: Email, 2: SMS, 3: WhatsApp)
  destination: string | null; // Destination (email/phone) or null
  status: number;           // Order status (0: pending, 1: accepted, -1: rejected)
  status_text: string;      // Status text (e.g., "accept")
  created_time: string;     // Order creation timestamp
  terminal_id: number;      // Terminal ID
  reference_code: string;   // Unique reference code

  product: {
    sku: number;            // Product SKU
    title: string;          // Product title
  };

  face_value: number;       // Face value of the card
  count: number;            // Number of requested cards
  total_face_value: number; // Total face value of order
  total_fees: number;       // Total fees for the order
  total_discounts: number;  // Total discounts applied
  total_customer_cost: number; // Total amount deducted from customer

  share_link?: string;      // Optional shareable link for the order
  exchange?: {
    exchange_rate: number;  // Exchange rate applied
    total_customer_cost: number; // Total cost after exchange rate conversion
    currency: {
      currency: string;     // Currency name (e.g., "Dollars")
      symbol: string;       // Currency symbol (e.g., "$")
      code: string;         // Currency code (e.g., "USD")
    };
  };
}

//==== End Digital Card Order Create API =====//

//==== Digital Card Order using a reference code ====/

  //Request Interface
export interface DigitalCardOrderDetailsRequest {
  reference_code: string; // UUID reference code of the order
}

  //Response Interface
  export interface DigitalCardOrderDetailsResponse {
    order_id: number;         // Unique order ID
    delivery_type: number;    // Delivery type (0: None, 1: Email, 2: SMS, 3: WhatsApp)
    destination: string | null; // Destination (email/phone) or null
    status: number;           // Order status (0: pending, 1: accepted, -1: rejected)
    status_text: string;      // Status text (e.g., "accept", "pending", "reject")
    created_time: string;     // ISO timestamp of order creation
    terminal_id: number;      // Terminal ID
  
    product: {
      sku: number;            // Product SKU
      title: string;          // Product title
    };
  
    count: number;            // Number of requested cards
    total_face_value: number; // Total face value of order
    total_fees: number;       // Total fees for the order
    total_discounts: number;  // Total discounts applied
    total_customer_cost: number; // Total amount deducted from customer
    is_completed: boolean;    // Whether the order is completed
    share_link?: string;      // Optional shareable link for the order
  }

//==== End Digital Card Order using a reference code ====//

export interface DigitalCardOrderCardsRequest {
  reference_code: string; // UUID reference code of the order
}

export interface DigitalCardOrderCard {
  card_number: string;       // Unique card number
  pin_code: string;          // PIN code for redeeming the card
  claim_url: string;         // URL to claim the card
  expire_date?: string;      // Expiration date (optional, may be empty)
  barcode?: string;          // Barcode (optional)
  barcode_standard?: string; // Barcode standard (optional)
  reward_type?: number;      // Reward type (e.g., 0 for Gift Card)
  reward_type_text?: string; // Reward type description (e.g., "Gift-Card")
}

export interface DigitalCardOrderCardsResponse {
  results: DigitalCardOrderCard[]; // List of digital cards in the order
}

//==== Digital Card Order History API ====//
export interface DigitalCardOrderHistoryRequest {
  start_date: string; // Required: Report Start Date (YYYY-MM-DDTHH:mm:ss)
  end_date: string;   // Required: Report End Date (YYYY-MM-DDTHH:mm:ss)
  limit?: number;     // Optional: Number of results to return
  offset?: number;    // Optional: Offset for pagination
}

export interface DigitalCardOrder {
  order_id: number;
  delivery_type: number;
  destination?: string | null;
  status: number;
  status_text: string;
  created_time: string;
  terminal_id?: string | null;
  reference_code: string;
  product: {
    sku: number;
    title: string;
  };
  count: number;
  total_face_value: number;
  total_fees: number;
  total_discounts: number;
  total_customer_cost: number;
  is_completed: boolean;
  share_link: string;
}

export interface DigitalCardOrderHistoryResponse {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: DigitalCardOrder[];
}

//==== Digital Card Order History API ====//

export interface PcodeCatalogAvailabilityRequest {
  product_code: string;
  item_count: number;
  Authorization: string; // Bearer Token
}

export interface PcodeCatalogAvailabilityResponse {
  availability: boolean;
  detail: string;
  delivery_type: 0 | 1 | 2 | 3 ; // 0 = Out of Stock, 1 = Available, 2 = Standard, 3 = Pre-Order
  delivery_type_text: string;
}

//=== Retailer Create Order API Endpoint ===//
export interface RetailerCreateOrderRequest {
  product_code: string; // Retailer Catalog Product Code (Required)
  quantity: number; // Number of items requested (Required)
  pre_order: boolean; // Whether to pre-order (Required)
  delivery_type?: 0 | 1 | 2 | 3; // 0-None, 1-Email, 2-SMS, 3-WhatsApp (Optional)
  destination?: string; // Email/Phone/WhatsApp for delivery (Optional)
  terminal_id?: number; // Terminal ID of sub-user (Optional)
  terminal_pin?: string; // Pin for sub-user (Optional)
  reference_code: string; // Unique UUID v4 reference code (Required)
  Authorization: string; // Bearer Token for authentication (Required)
}

export interface RetailerCreateOrderResponse {
  order_id: number; // Unique order ID
  delivery_type: 0 | 1 | 2 | 3; // 0-None, 1-Email, 2-SMS, 3-WhatsApp
  destination?: string; // Delivery destination (if applicable)
  status: -1 | 0 | 1; // -1: Rejected, 0: Pending, 1: Accepted
  status_text: "pending" | "accept" | "reject"; // Status description
  created_time: string; // ISO timestamp of order creation
  terminal_id?: number; // Terminal ID of sub-user
  reference_code: string; // Unique reference code
  product: {
    sku: number; // Product SKU
    title: string; // Product name
  };
  count: number; // Number of items ordered
  total_face_value: number; // Total price before discounts
  total_fees: number; // Total fees applied
  total_discounts: number; // Discounts applied
  total_customer_cost: number; // Final cost to customer
  is_completed: boolean; // Whether the order is complete
  share_link?: string; // Optional link for sharing the order
}

//=== End Retailer Create Order API Endpoint ===//

// === Physical Card Transaction History API Endpoint ===//
export interface PhysicalCardTransactionHistoryRequest {
  start_date: string; // Required: Report Start Date (Format: YYYY-MM-DDTHH:mm:ss)
  end_date: string; // Required: Report End Date (Format: YYYY-MM-DDTHH:mm:ss)
  Authorization: string; // Required: Bearer Token for authentication
}

export interface PhysicalCardTransactionHistoryResponse {
  count: number; // Total number of transactions
  next?: string | null; // URL for the next set of results (if paginated)
  previous?: string | null; // URL for the previous set of results (if paginated)
  results: PhysicalCardTransaction[];
}

export interface PhysicalCardTransaction {
  transaction_id: number; // Unique transaction ID
  barcode: string; // Barcode of the physical card
  product: string; // Name of the product (e.g., "iTunes US")
  status: number; // Status code (1 = Activated, etc.)
  status_text: string; // Human-readable status ("Activated", etc.)
  total_face_value: number; // Original card value
  total_fees: number; // Applied fees
  total_discounts: number; // Applied discounts
  total_customer_cost: number; // Final cost to the customer
  currency: string; // Currency (e.g., "USD")
  terminal_id?: number; // Terminal ID (if applicable)
  created_time: string; // ISO timestamp of transaction
  reference_code: string; // Unique reference code for the transaction
}

// === End Physical Card Transaction History API Endpoint ===//