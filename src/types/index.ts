export interface MenuItem {
  id: string;
  name: {
    en: string;
    fr: string;
    vi: string;
  };
  description: {
    en: string;
    fr: string;
    vi: string;
  };
  price: number;
  category: string;
  image: string;
  ingredients: string[];
  spiceLevel: number;
  popular: boolean;
  available: boolean;
  allergens?: string[];
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: {
    en: string;
    fr: string;
    vi: string;
  };
  description: {
    en: string;
    fr: string;
    vi: string;
  };
  icon: string;
  order: number;
  active: boolean;
}

export interface CartItem {
  id: string;
  menuItemId: string;
  menuItem: MenuItem;
  quantity: number;
  specialInstructions?: string;
  addedAt: Date;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  updatedAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: 'card' | 'cash' | 'google_pay' | 'apple_pay';
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address?: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
  };
  deliveryType: 'pickup' | 'delivery';
  estimatedTime: number; // in minutes
  specialInstructions?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  addresses: Address[];
  preferences: {
    language: 'en' | 'fr' | 'vi';
    spiceLevel: number;
    dietaryRestrictions: string[];
    favoriteItems: string[];
  };
  orderHistory: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  id: string;
  label: string; // 'Home', 'Work', etc.
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface Recommendation {
  id: string;
  userId: string;
  menuItemId: string;
  menuItem: MenuItem;
  score: number;
  reason: string;
  category: 'popular' | 'similar' | 'new' | 'seasonal' | 'personalized';
  createdAt: Date;
}

export interface Language {
  code: 'en' | 'fr' | 'vi';
  name: string;
  flag: string;
}

export interface Translation {
  [key: string]: {
    en: string;
    fr: string;
    vi: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
