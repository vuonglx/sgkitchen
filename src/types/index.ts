// Align with Supabase schema
export interface Dish {
  id: string;
  name_en: string;
  name_fr: string;
  name_vi: string;
  description_en: string;
  description_fr: string;
  description_vi: string;
  price: number;
  category: 'appetizers' | 'main_dishes' | 'sides' | 'beverages';
  spice_level: number;
  is_popular: boolean;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

// Legacy MenuItem interface for backward compatibility
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

// Align with Supabase schema
export interface Customer {
  id: string;
  email: string;
  name: string;
  phone?: string;
  created_at: string;
  last_order_at?: string;
  total_orders: number;
  total_spent: number;
}

export interface Order {
  id: string;
  customer_id: string;
  items: OrderItem[];
  total_amount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  dish_id: string;
  quantity: number;
  price: number;
  dish_name: string;
}

// Legacy Order interface for backward compatibility
export interface LegacyOrder {
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

// Admin user interface
export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'super_admin';
  created_at: string;
  last_login?: string;
  is_active: boolean;
}

// Legacy User interface for backward compatibility
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
