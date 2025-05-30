import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiCreditCard, FiShoppingBag, FiSettings } from 'react-icons/fi';
import UserProfile from '../components/user/UserProfile';
import PaymentHistory from '../components/payment/PaymentHistory';
import { useAuth } from '../context/useAuth';

type DashboardTab = 'profile' | 'payments' | 'orders' | 'settings';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('profile');
  const { user } = useAuth();

  const tabs = [
    {
      id: 'profile' as DashboardTab,
      label: 'Profile',
      icon: FiUser,
      description: 'Manage your personal information',
    },
    {
      id: 'payments' as DashboardTab,
      label: 'Payment History',
      icon: FiCreditCard,
      description: 'View your payment transactions',
    },
    {
      id: 'orders' as DashboardTab,
      label: 'Orders',
      icon: FiShoppingBag,
      description: 'Track your gift card orders',
    },
    {
      id: 'settings' as DashboardTab,
      label: 'Settings',
      icon: FiSettings,
      description: 'Account preferences and security',
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <UserProfile />;
      case 'payments':
        return <PaymentHistory />;
      case 'orders':
        return (
          <div className="text-center py-12">
            <FiShoppingBag className="mx-auto text-4xl text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Orders Coming Soon</h3>
            <p className="text-gray-600">Order tracking functionality will be available soon.</p>
          </div>
        );
      case 'settings':
        return (
          <div className="text-center py-12">
            <FiSettings className="mx-auto text-4xl text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Settings Coming Soon</h3>
            <p className="text-gray-600">Additional settings will be available soon.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back, {user?.firstName || 'User'}! Manage your account and view your activity.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-semibold text-gray-900">Account Menu</h2>
              </div>
              <nav className="p-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-3 rounded-md text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="text-lg" />
                      <div>
                        <div className="font-medium">{tab.label}</div>
                        <div className="text-xs text-gray-500">{tab.description}</div>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 bg-white rounded-lg shadow-md p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Account Status</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    user?.isVerified 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {user?.isVerified ? 'Verified' : 'Unverified'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Member Since</span>
                  <span className="text-sm text-gray-900">
                    {user?.createdAt ? new Date(user.createdAt).getFullYear() : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Role</span>
                  <span className="text-sm text-gray-900 capitalize">{user?.role || 'User'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-md min-h-[600px]"
            >
              <div className="p-6">
                {renderTabContent()}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
