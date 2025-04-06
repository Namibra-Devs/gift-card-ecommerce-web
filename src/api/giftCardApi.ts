import axios from "axios";

// Get API Base URL from environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Function to send a gift card
export const sendGiftCard = async (giftData: {
  email: string;
  senderName: string;
  message?: string;
  sendDate: string;
  giftCardId: string;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/gift/send`, giftData);
    return response.data;
  } catch (error) {
    console.error("Error sending gift card:", error);
    throw new Error("Failed to send gift card");
  }
};

// Function to get gift card details
export const getGiftCardDetails = async (giftCardId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/gift/${giftCardId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching gift card details:", error);
    throw new Error("Failed to fetch gift card details");
  }
};

// Function to fetch available gift cards (if needed)
export const getAllGiftCards = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/gift`);
    return response.data;
  } catch (error) {
    console.error("Error fetching gift cards:", error);
    throw new Error("Failed to fetch gift cards");
  }
};
