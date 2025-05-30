import ApiService from './apiService';
import { User, UpdateProfileRequest, ChangePasswordRequest } from '../types/api';

export interface UserUpdateResult {
  success: boolean;
  message: string;
  data?: User;
}

export interface PasswordChangeResult {
  success: boolean;
  message: string;
}

class UserService {
  /**
   * Get current user profile
   */
  static async getCurrentUserProfile(): Promise<{
    success: boolean;
    message: string;
    data?: User;
  }> {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        return {
          success: false,
          message: 'User ID not found. Please log in again.',
        };
      }

      const response = await ApiService.getUserProfile(userId);

      if (response.success && response.data) {
        return {
          success: true,
          message: 'Profile retrieved successfully',
          data: response.data,
        };
      } else {
        return {
          success: false,
          message: response.message || 'Failed to retrieve profile',
        };
      }
    } catch (error: any) {
      console.error('Profile retrieval error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to retrieve profile. Please try again.',
      };
    }
  }

  /**
   * Update user profile
   */
  static async updateProfile(updateData: UpdateProfileRequest): Promise<UserUpdateResult> {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        return {
          success: false,
          message: 'User ID not found. Please log in again.',
        };
      }

      // Validate update data
      const validationError = this.validateUpdateData(updateData);
      if (validationError) {
        return {
          success: false,
          message: validationError,
        };
      }

      const response = await ApiService.updateProfile(userId, updateData);

      if (response.success && response.data) {
        return {
          success: true,
          message: response.message || 'Profile updated successfully',
          data: response.data,
        };
      } else {
        return {
          success: false,
          message: response.message || 'Failed to update profile',
        };
      }
    } catch (error: any) {
      console.error('Profile update error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update profile. Please try again.',
      };
    }
  }

  /**
   * Change user password
   */
  static async changePassword(passwordData: ChangePasswordRequest): Promise<PasswordChangeResult> {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        return {
          success: false,
          message: 'User ID not found. Please log in again.',
        };
      }

      // Validate password data
      const validationError = this.validatePasswordData(passwordData);
      if (validationError) {
        return {
          success: false,
          message: validationError,
        };
      }

      const response = await ApiService.changePassword(userId, passwordData);

      if (response.success) {
        return {
          success: true,
          message: response.message || 'Password changed successfully',
        };
      } else {
        return {
          success: false,
          message: response.message || 'Failed to change password',
        };
      }
    } catch (error: any) {
      console.error('Password change error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to change password. Please try again.',
      };
    }
  }

  /**
   * Validate profile update data
   */
  private static validateUpdateData(data: UpdateProfileRequest): string | null {
    if (data.email && !this.isValidEmail(data.email)) {
      return 'Please enter a valid email address';
    }

    if (data.secondaryEmail && !this.isValidEmail(data.secondaryEmail)) {
      return 'Please enter a valid secondary email address';
    }

    if (data.phone && !this.isValidPhone(data.phone)) {
      return 'Please enter a valid phone number';
    }

    if (data.firstName && data.firstName.trim().length < 2) {
      return 'First name must be at least 2 characters long';
    }

    if (data.lastName && data.lastName.trim().length < 2) {
      return 'Last name must be at least 2 characters long';
    }

    if (data.userName && data.userName.trim().length < 3) {
      return 'Username must be at least 3 characters long';
    }

    return null;
  }

  /**
   * Validate password change data
   */
  private static validatePasswordData(data: ChangePasswordRequest): string | null {
    if (!data.currentPassword) {
      return 'Current password is required';
    }

    if (!data.newPassword) {
      return 'New password is required';
    }

    if (data.newPassword.length < 8) {
      return 'New password must be at least 8 characters long';
    }

    if (data.currentPassword === data.newPassword) {
      return 'New password must be different from current password';
    }

    // Check password strength
    const hasUpperCase = /[A-Z]/.test(data.newPassword);
    const hasLowerCase = /[a-z]/.test(data.newPassword);
    const hasNumbers = /\d/.test(data.newPassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(data.newPassword);

    if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
      return 'New password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    return null;
  }

  /**
   * Validate email format
   */
  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate phone number format
   */
  private static isValidPhone(phone: string): boolean {
    // Basic phone validation - adjust based on your requirements
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
  }

  /**
   * Format user display name
   */
  static formatUserDisplayName(user: User): string {
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    } else if (user.firstName) {
      return user.firstName;
    } else if (user.userName) {
      return user.userName;
    } else {
      return user.email;
    }
  }

  /**
   * Get user initials for avatar
   */
  static getUserInitials(user: User): string {
    if (user.firstName && user.lastName) {
      return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
    } else if (user.firstName) {
      return user.firstName.charAt(0).toUpperCase();
    } else if (user.userName) {
      return user.userName.charAt(0).toUpperCase();
    } else {
      return user.email.charAt(0).toUpperCase();
    }
  }

  /**
   * Format user role for display
   */
  static formatUserRole(role: string): string {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'Administrator';
      case 'user':
        return 'User';
      default:
        return role;
    }
  }

  /**
   * Check if user is verified
   */
  static isUserVerified(user: User): boolean {
    return user.isVerified === true;
  }

  /**
   * Format user registration date
   */
  static formatRegistrationDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}

export default UserService;
