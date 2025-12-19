const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const WS_BASE_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:3000';

export const API_ENDPOINTS = {
  // User endpoints
  USER: {
    REGISTER: `${API_BASE_URL}/reware/user/register`,
    LOGIN: `${API_BASE_URL}/reware/user/login`,
    CHECK_AUTH: `${API_BASE_URL}/reware/user/login`,
    PROFILE: `${API_BASE_URL}/reware/user`,
    LOGOUT: `${API_BASE_URL}/reware/user/logout`,
    WISHLIST: `${API_BASE_URL}/reware/user/wishlist`,
  },
  
  // Product endpoints
  PRODUCT: {
    BASE: `${API_BASE_URL}/reware/product`,
    MY_PRODUCTS: `${API_BASE_URL}/reware/product/my-products`,
    SEARCH: `${API_BASE_URL}/reware/product/search`,
    BY_ID: `${API_BASE_URL}/reware/product/byId`,
  },
  
  // Request endpoints
  REQUEST: {
    BASE: `${API_BASE_URL}/reware/request`,
    ALL: `${API_BASE_URL}/reware/request/all`,
    ACCEPT: `${API_BASE_URL}/reware/request/accept`,
    REJECT: `${API_BASE_URL}/reware/request/reject`,
    CANCEL: `${API_BASE_URL}/reware/request/cancel`,
  },
  
  // Transaction endpoints
  TRANSACTION: {
    BASE: `${API_BASE_URL}/reware/transaction`,
  },
  
  // Notification endpoints
  NOTIFICATION: {
    BASE: `${API_BASE_URL}/reware/notification`,
    BY_ID: (id) => `${API_BASE_URL}/reware/notification/${id}`,
  },
};

export const WS_ENDPOINTS = {
  CHAT: `${WS_BASE_URL}/ws`,
};

export default API_ENDPOINTS;
