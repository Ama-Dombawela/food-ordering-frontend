// Central place for backend endpoint paths used by services and hooks.
export const API_BASE_URL = 'http://localhost:8080';

export const API_URLS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
  },
  USERS: {
    BASE: '/api/users',
    BY_ID: (id: number) => `/api/users/${id}`,
  },
  CATEGORIES: {
    BASE: '/api/categories',
    BY_ID: (id: number) => `/api/categories/${id}`,
  },
  FOODS: {
    BASE: '/api/foods',
    BY_ID: (id: number) => `/api/foods/${id}`,
    BY_CATEGORY: (categoryId: number) => `/api/foods/category/${categoryId}`,
    BY_STATUS: (status: string) => `/api/foods/status/${status}`,
  },
  CART: {
    BY_USER: (userId: number) => `/api/cart/${userId}`,
    ADD_ITEM: (userId: number, foodItemId: number, quantity: number) =>
      `/api/cart/${userId}/add/${foodItemId}/${quantity}`,
    REMOVE_ITEM: (userId: number, cartItemId: number) => `/api/cart/${userId}/remove/${cartItemId}`,
    CLEAR: (userId: number) => `/api/cart/${userId}/clear`,
  },
  ORDERS: {
    PLACE: (userId: number) => `/api/orders/${userId}`,
    BY_ID: (id: number) => `/api/orders/${id}`,
    BY_USER: (userId: number) => `/api/orders/user/${userId}`,
    CANCEL: (id: number) => `/api/orders/${id}/cancel`,
    STATUS: (id: number, status: string) => `/api/orders/${id}/status/${status}`,
  },
  PAYMENTS: {
    BASE: '/api/payments',
    BY_ID: (id: number) => `/api/payments/${id}`,
    BY_ORDER: (orderId: number) => `/api/payments/order/${orderId}`,
    UPDATE_STATUS: (id: number, status: string) => `/api/payments/${id}/status/${status}`,
  },
} as const;