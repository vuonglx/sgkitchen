import { MenuItem, Category, Order, User, Cart, Recommendation } from '@/types';
import { supabase } from './supabase';

// Helper function to convert Supabase dish to MenuItem
const convertDishToMenuItem = (dish: any): MenuItem => {
  return {
    id: dish.id,
    name: {
      en: dish.name_en,
      fr: dish.name_fr,
      vi: dish.name_vi,
    },
    description: {
      en: dish.description_en,
      fr: dish.description_fr,
      vi: dish.description_vi,
    },
    price: parseFloat(dish.price),
    category: dish.category,
    image: dish.image_url || '/images/default-dish.jpg',
    ingredients: [], // Not in current schema, can be added later
    spiceLevel: dish.spice_level,
    popular: dish.is_popular,
    available: true, // Default to true, can be added to schema later
    allergens: [], // Not in current schema, can be added later
    nutritionalInfo: undefined, // Not in current schema, can be added later
    createdAt: new Date(dish.created_at),
    updatedAt: new Date(dish.updated_at),
  };
};

// Menu Items
export const getMenuItems = async (categoryId?: string, limitCount?: number): Promise<MenuItem[]> => {
  try {
    let query = supabase
      .from('dishes')
      .select('*')
      .order('is_popular', { ascending: false })
      .order('name_en', { ascending: true });

    // Filter by category if specified
    if (categoryId && categoryId !== 'all') {
      query = query.eq('category', categoryId);
    }

    // Apply limit if specified
    if (limitCount) {
      query = query.limit(limitCount);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching menu items:', error);
      throw error;
    }

    return data?.map(convertDishToMenuItem) || [];
  } catch (error) {
    console.error('Error in getMenuItems:', error);
    return [];
  }
};

export const getMenuItem = async (id: string): Promise<MenuItem | null> => {
  try {
    const { data, error } = await supabase
      .from('dishes')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching menu item:', error);
      return null;
    }

    return data ? convertDishToMenuItem(data) : null;
  } catch (error) {
    console.error('Error in getMenuItem:', error);
    return null;
  }
};

export const addMenuItem = async (menuItem: Omit<MenuItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const { data, error } = await supabase
      .from('dishes')
      .insert([{
        name_en: menuItem.name.en,
        name_fr: menuItem.name.fr,
        name_vi: menuItem.name.vi,
        description_en: menuItem.description.en,
        description_fr: menuItem.description.fr,
        description_vi: menuItem.description.vi,
        price: menuItem.price,
        category: menuItem.category,
        spice_level: menuItem.spiceLevel,
        is_popular: menuItem.popular,
        image_url: menuItem.image,
      }])
      .select()
      .single();

    if (error) {
      console.error('Error adding menu item:', error);
      throw error;
    }

    return data.id;
  } catch (error) {
    console.error('Error in addMenuItem:', error);
    throw error;
  }
};

export const updateMenuItem = async (id: string, updates: Partial<MenuItem>): Promise<void> => {
  try {
    const updateData: any = {};
    
    if (updates.name) {
      updateData.name_en = updates.name.en;
      updateData.name_fr = updates.name.fr;
      updateData.name_vi = updates.name.vi;
    }
    
    if (updates.description) {
      updateData.description_en = updates.description.en;
      updateData.description_fr = updates.description.fr;
      updateData.description_vi = updates.description.vi;
    }
    
    if (updates.price !== undefined) updateData.price = updates.price;
    if (updates.category !== undefined) updateData.category = updates.category;
    if (updates.spiceLevel !== undefined) updateData.spice_level = updates.spiceLevel;
    if (updates.popular !== undefined) updateData.is_popular = updates.popular;
    if (updates.image !== undefined) updateData.image_url = updates.image;

    const { error } = await supabase
      .from('dishes')
      .update(updateData)
      .eq('id', id);

    if (error) {
      console.error('Error updating menu item:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in updateMenuItem:', error);
    throw error;
  }
};

export const deleteMenuItem = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('dishes')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting menu item:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in deleteMenuItem:', error);
    throw error;
  }
};

// Categories - Static categories for now, can be made dynamic later
export const getCategories = async (): Promise<Category[]> => {
  const staticCategories: Category[] = [
    {
      id: 'appetizers',
      name: {
        en: 'Appetizers',
        fr: 'Entrées',
        vi: 'Khai vị',
      },
      description: {
        en: 'Start your meal with our delicious appetizers',
        fr: 'Commencez votre repas avec nos délicieuses entrées',
        vi: 'Bắt đầu bữa ăn với những món khai vị ngon miệng',
      },
      icon: '🥗',
      order: 1,
      active: true,
    },
    {
      id: 'main_dishes',
      name: {
        en: 'Main Dishes',
        fr: 'Plats principaux',
        vi: 'Món chính',
      },
      description: {
        en: 'Hearty and satisfying main courses',
        fr: 'Plats principaux copieux et satisfaisants',
        vi: 'Những món chính thịnh soạn và đầy đủ',
      },
      icon: '🍜',
      order: 2,
      active: true,
    },
    {
      id: 'sides',
      name: {
        en: 'Sides',
        fr: 'Accompagnements',
        vi: 'Món phụ',
      },
      description: {
        en: 'Perfect accompaniments to your meal',
        fr: 'Accompagnements parfaits pour votre repas',
        vi: 'Những món ăn kèm hoàn hảo',
      },
      icon: '🥖',
      order: 3,
      active: true,
    },
    {
      id: 'beverages',
      name: {
        en: 'Beverages',
        fr: 'Boissons',
        vi: 'Đồ uống',
      },
      description: {
        en: 'Refreshing drinks to complement your meal',
        fr: 'Boissons rafraîchissantes pour accompagner votre repas',
        vi: 'Những thức uống tươi mát bổ sung cho bữa ăn',
      },
      icon: '🥤',
      order: 4,
      active: true,
    },
  ];

  return staticCategories;
};

export const getCategory = async (id: string): Promise<Category | null> => {
  const categories = await getCategories();
  return categories.find(category => category.id === id) || null;
};

// Orders
export const createOrder = async (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    // First, ensure customer exists
    const { data: existingCustomer } = await supabase
      .from('customers')
      .select('id')
      .eq('email', order.customerInfo.email)
      .single();

    let customerId = existingCustomer?.id;

    if (!customerId) {
      // Create new customer
      const { data: newCustomer, error: customerError } = await supabase
        .from('customers')
        .insert([{
          email: order.customerInfo.email,
          name: order.customerInfo.name,
          phone: order.customerInfo.phone,
        }])
        .select()
        .single();

      if (customerError) {
        console.error('Error creating customer:', customerError);
        throw customerError;
      }

      customerId = newCustomer.id;
    }

    // Create order
    const { data, error } = await supabase
      .from('orders')
      .insert([{
        customer_id: customerId,
        items: order.items.map(item => ({
          dish_id: item.menuItemId,
          dish_name: item.menuItem.name.en,
          quantity: item.quantity,
          price: item.menuItem.price,
        })),
        total_amount: order.total,
        status: order.status,
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating order:', error);
      throw error;
    }

    return data.id;
  } catch (error) {
    console.error('Error in createOrder:', error);
    throw error;
  }
};

export const getOrder = async (id: string): Promise<Order | null> => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        customers (
          name,
          email,
          phone
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching order:', error);
      return null;
    }

    if (!data) return null;

    // Convert to Order format
    const order: Order = {
      id: data.id,
      userId: data.customer_id,
      items: [], // Would need to reconstruct from items JSON
      subtotal: data.total_amount * 0.9, // Approximate
      tax: data.total_amount * 0.1, // Approximate
      deliveryFee: 0, // Not in current schema
      total: data.total_amount,
      status: data.status,
      paymentStatus: 'pending', // Not in current schema
      paymentMethod: 'card', // Not in current schema
      customerInfo: {
        name: data.customers.name,
        email: data.customers.email,
        phone: data.customers.phone || '',
      },
      deliveryType: 'pickup', // Not in current schema
      estimatedTime: 30, // Not in current schema
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };

    return order;
  } catch (error) {
    console.error('Error in getOrder:', error);
    return null;
  }
};

export const getUserOrders = async (userId: string): Promise<Order[]> => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        customers (
          name,
          email,
          phone
        )
      `)
      .eq('customer_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user orders:', error);
      return [];
    }

    return data?.map(orderData => ({
      id: orderData.id,
      userId: orderData.customer_id,
      items: [], // Would need to reconstruct from items JSON
      subtotal: orderData.total_amount * 0.9, // Approximate
      tax: orderData.total_amount * 0.1, // Approximate
      deliveryFee: 0, // Not in current schema
      total: orderData.total_amount,
      status: orderData.status,
      paymentStatus: 'pending', // Not in current schema
      paymentMethod: 'card', // Not in current schema
      customerInfo: {
        name: orderData.customers.name,
        email: orderData.customers.email,
        phone: orderData.customers.phone || '',
      },
      deliveryType: 'pickup', // Not in current schema
      estimatedTime: 30, // Not in current schema
      createdAt: new Date(orderData.created_at),
      updatedAt: new Date(orderData.updated_at),
    })) || [];
  } catch (error) {
    console.error('Error in getUserOrders:', error);
    return [];
  }
};

export const updateOrderStatus = async (id: string, status: Order['status']): Promise<void> => {
  try {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in updateOrderStatus:', error);
    throw error;
  }
};

// Users - Using Supabase Auth users
export const createUser = async (user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    // Create customer record
    const { data, error } = await supabase
      .from('customers')
      .insert([{
        email: user.email,
        name: user.name,
        phone: user.phone,
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating user:', error);
      throw error;
    }

    return data.id;
  } catch (error) {
    console.error('Error in createUser:', error);
    throw error;
  }
};

export const getUser = async (id: string): Promise<User | null> => {
  try {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching user:', error);
      return null;
    }

    if (!data) return null;

    // Convert to User format
    const user: User = {
      id: data.id,
      email: data.email,
      name: data.name,
      phone: data.phone,
      addresses: [], // Not in current schema
      preferences: {
        language: 'en',
        spiceLevel: 2,
        dietaryRestrictions: [],
        favoriteItems: [],
      },
      orderHistory: [], // Would need to fetch separately
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.created_at), // No updated_at in customers table
    };

    return user;
  } catch (error) {
    console.error('Error in getUser:', error);
    return null;
  }
};

export const updateUser = async (id: string, updates: Partial<User>): Promise<void> => {
  try {
    const updateData: any = {};
    
    if (updates.name !== undefined) updateData.name = updates.name;
    if (updates.phone !== undefined) updateData.phone = updates.phone;

    const { error } = await supabase
      .from('customers')
      .update(updateData)
      .eq('id', id);

    if (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in updateUser:', error);
    throw error;
  }
};

// Cart - For now, we'll use localStorage for cart, can be moved to database later
export const getCart = async (userId: string): Promise<Cart | null> => {
  // For now, return null as cart is handled in context with localStorage
  return null;
};

export const updateCart = async (userId: string, cart: Omit<Cart, 'id' | 'updatedAt'>): Promise<void> => {
  // For now, no-op as cart is handled in context with localStorage
};

export const clearCart = async (userId: string): Promise<void> => {
  // For now, no-op as cart is handled in context with localStorage
};

// Recommendations - Not implemented yet
export const getUserRecommendations = async (userId: string): Promise<Recommendation[]> => {
  return [];
};

export const createRecommendation = async (recommendation: Omit<Recommendation, 'id' | 'createdAt'>): Promise<string> => {
  return 'not-implemented';
};

// Utility functions for pagination
export const getPaginatedMenuItems = async (
  pageSize: number,
  lastDoc?: any,
  categoryId?: string
) => {
  const items = await getMenuItems(categoryId, pageSize);
  return {
    items,
    lastDoc: null,
    hasMore: false,
  };
};
