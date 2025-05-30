# Gift Card E-commerce API Integration Guide

This document outlines the complete integration of the backend API for the gift card e-commerce web application.

## 🚀 Overview

The application now includes comprehensive integration with the backend API hosted at `https://gift-card-ecommerce-api.onrender.com/api`. This integration covers:

- ✅ User authentication and management
- ✅ Gift card catalog and management
- ✅ Shopping cart functionality
- ✅ Payment processing
- ✅ Order management
- ✅ External API integration (EZPayPin)
- ✅ User profile management
- ✅ Payment history tracking

## 📁 New Files Added

### Services
- `src/services/apiService.ts` - Main API service with all endpoints
- `src/services/paymentService.ts` - Payment processing service
- `src/services/userService.ts` - User management service
- `src/services/externalApiService.ts` - EZPayPin external API service

### Types
- `src/types/api.ts` - TypeScript interfaces for all API responses

### Components
- `src/components/payment/PaymentModal.tsx` - Payment processing modal
- `src/components/payment/PaymentHistory.tsx` - Payment history component
- `src/components/user/UserProfile.tsx` - User profile management

### Pages
- `src/pages/Dashboard.tsx` - User dashboard with profile and payment history

### Configuration
- `.env` - Environment variables for API configuration

## 🔧 Environment Setup

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://gift-card-ecommerce-api.onrender.com/api
```

## 📋 API Endpoints Integrated

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login with OTP
- `POST /auth/verify` - OTP verification
- `POST /auth/forgot-password` - Password reset request
- `POST /auth/reset-password` - Password reset

### User Management
- `GET /users` - Get all users (admin)
- `GET /users/:id` - Get user profile
- `PUT /users/:id` - Update user profile
- `POST /users/:id/change-password` - Change password

### Gift Cards
- `GET /gift-cards` - Get all gift cards
- `GET /gift-cards/:id` - Get gift card details
- `POST /gift-cards` - Create gift card (admin)
- `PUT /gift-cards/:id` - Update gift card (admin)
- `DELETE /gift-cards/:id` - Delete gift card (admin)

### Cart Management
- `GET /cart` - Get user's cart
- `POST /cart` - Add item to cart
- `PUT /cart/:id` - Update cart item
- `DELETE /cart/:id` - Remove cart item
- `DELETE /cart` - Clear cart

### Payment Processing
- `POST /payments/process` - Process payment
- `GET /payments/verify/:orderId` - Verify payment
- `GET /payments` - Get user payments
- `GET /payments/:id` - Get payment details

### External API (EZPayPin)
- `POST /external/ezpaypin/token` - Get EZPayPin token
- `GET /external/ezpaypin/catalogs` - Get EZPayPin catalogs
- `POST /external/ezpaypin/sync` - Sync EZPayPin gift cards
- `GET /external/ezpaypin/gift-cards` - Get EZPayPin gift cards
- `GET /external/ezpaypin/gift-cards/:sku` - Get gift card by SKU
- `GET /external/ezpaypin/gift-cards/:sku/availability` - Check availability

### Analytics (Admin)
- `GET /analytics/dashboard` - Dashboard analytics
- `GET /analytics/users` - User statistics
- `GET /analytics/payments` - Payment statistics

## 🔐 Authentication Flow

1. **Registration**: User registers with email, phone, and password
2. **Login**: User logs in with email, receives OTP
3. **Verification**: User enters OTP to complete login
4. **Token Storage**: JWT token stored in localStorage
5. **Auto-refresh**: Token automatically refreshed on 401 errors

## 💳 Payment Flow

1. **Cart Management**: Users add gift cards to cart
2. **Checkout**: Users proceed to checkout from cart
3. **Payment Method**: Users select payment method (Mobile Money, Bank, Card)
4. **Payment Processing**: Payment processed through backend
5. **Verification**: Payment status verified
6. **History**: Payment stored in user's history

### Supported Payment Methods

#### Mobile Money
- MTN Mobile Money
- Vodafone Cash
- AirtelTigo Money

#### Bank Transfer
- Ghana Commercial Bank
- Ecobank Ghana
- Standard Chartered Bank
- Barclays Bank Ghana
- And 6 more supported banks

#### Card Payment
- Redirects to secure payment gateway

## 🛠️ Usage Examples

### Making API Calls

```typescript
import ApiService from '../services/apiService';

// Get all gift cards
const giftCards = await ApiService.getAllGiftCards();

// Process payment
const paymentResult = await ApiService.processPayment({
  giftCard: 'gift-card-id',
  quantity: 1,
  totalPrice: 50.00,
  paymentMethod: 'mobile_money',
  mobileNetwork: 'MTN',
  mobileNumber: '0551234567'
});
```

### Using Payment Service

```typescript
import PaymentService from '../services/paymentService';

// Process payment with validation
const result = await PaymentService.processPayment({
  giftCardId: 'gift-card-id',
  giftCardName: 'Amazon Gift Card',
  quantity: 1,
  totalPrice: 50.00,
  paymentMethod: 'mobile_money',
  mobileNetwork: 'MTN',
  mobileNumber: '0551234567'
});

if (result.success) {
  console.log('Payment successful:', result.data);
} else {
  console.error('Payment failed:', result.message);
}
```

### User Profile Management

```typescript
import UserService from '../services/userService';

// Update user profile
const result = await UserService.updateProfile({
  firstName: 'John',
  lastName: 'Doe',
  phone: '+233551234567'
});

// Change password
const passwordResult = await UserService.changePassword({
  currentPassword: 'oldpassword',
  newPassword: 'newpassword123'
});
```

## 🎨 UI Components

### Payment Modal
- Supports all payment methods
- Real-time validation
- Loading states
- Error handling

### Payment History
- Paginated payment list
- Payment status indicators
- Detailed payment information
- Refresh functionality

### User Profile
- Editable profile fields
- Password change modal
- Account verification status
- Registration date display

### Dashboard
- Tabbed interface
- Profile management
- Payment history
- Quick stats

## 🔄 State Management

The integration maintains existing state management patterns:

- **AuthContext**: User authentication state
- **CartContext**: Shopping cart state
- **Local State**: Component-specific state with React hooks

## 🚨 Error Handling

Comprehensive error handling includes:

- **Network Errors**: Connection issues
- **Authentication Errors**: Token expiration, invalid credentials
- **Validation Errors**: Form validation, data validation
- **Server Errors**: 500 errors, API unavailability
- **User Feedback**: Toast notifications for all operations

## 🧪 Testing

To test the integration:

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Test Authentication**:
   - Register a new user
   - Login with OTP verification
   - Update profile information

3. **Test Shopping Flow**:
   - Browse gift cards
   - Add items to cart
   - Proceed to checkout
   - Complete payment

4. **Test Dashboard**:
   - View payment history
   - Update profile
   - Change password

## 🔧 Configuration

### API Configuration
The API base URL is configured in `.env` and can be changed for different environments:

```env
# Development
VITE_API_BASE_URL=http://localhost:3000/api

# Production
VITE_API_BASE_URL=https://gift-card-ecommerce-api.onrender.com/api
```

### Axios Interceptors
- **Request Interceptor**: Adds authentication token
- **Response Interceptor**: Handles token refresh and errors

## 📱 Mobile Responsiveness

All new components are fully responsive and work on:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔮 Future Enhancements

Potential improvements for future versions:

1. **Real-time Notifications**: WebSocket integration for payment updates
2. **Offline Support**: Service worker for offline functionality
3. **Advanced Analytics**: More detailed user and payment analytics
4. **Multi-language Support**: Internationalization
5. **Advanced Search**: Gift card filtering and search
6. **Wishlist**: Save favorite gift cards
7. **Referral System**: User referral tracking and rewards

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Issues**:
   - Check `.env` file configuration
   - Verify API server is running
   - Check network connectivity

2. **Authentication Problems**:
   - Clear localStorage and try again
   - Check token expiration
   - Verify OTP is correct

3. **Payment Failures**:
   - Verify payment method details
   - Check network connectivity
   - Contact support for persistent issues

### Debug Mode

Enable debug mode by adding to `.env`:
```env
VITE_DEBUG=true
```

This will enable console logging for API calls and responses.

## 📞 Support

For technical support or questions about the integration:

1. Check the API documentation at the base URL
2. Review error messages in browser console
3. Check network tab for failed requests
4. Contact the development team

---

This integration provides a complete, production-ready e-commerce solution with robust payment processing, user management, and external API integration capabilities.
