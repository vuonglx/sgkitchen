import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Dish {
  id: string
  name_en: string
  name_fr: string
  name_vi: string
  description_en: string
  description_fr: string
  description_vi: string
  price: number
  category: 'appetizers' | 'main_dishes' | 'sides' | 'beverages'
  spice_level: number
  is_popular: boolean
  image_url?: string
  created_at: string
  updated_at: string
}

export interface Customer {
  id: string
  email: string
  name: string
  phone?: string
  created_at: string
  last_order_at?: string
  total_orders: number
  total_spent: number
}

export interface Order {
  id: string
  customer_id: string
  items: OrderItem[]
  total_amount: number
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled'
  created_at: string
  updated_at: string
}

export interface OrderItem {
  dish_id: string
  quantity: number
  price: number
  dish_name: string
}

// Admin functions
export const adminService = {
  // Dish management
  async getDishes() {
    const { data, error } = await supabase
      .from('dishes')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as Dish[]
  },

  async createDish(dish: Omit<Dish, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('dishes')
      .insert([dish])
      .select()
      .single()
    
    if (error) throw error
    return data as Dish
  },

  async updateDish(id: string, updates: Partial<Dish>) {
    const { data, error } = await supabase
      .from('dishes')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Dish
  },

  async deleteDish(id: string) {
    const { error } = await supabase
      .from('dishes')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // Customer management
  async getCustomers() {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as Customer[]
  },

  async getCustomerById(id: string) {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data as Customer
  },

  async updateCustomer(id: string, updates: Partial<Customer>) {
    const { data, error } = await supabase
      .from('customers')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Customer
  },

  // Order management
  async getOrders() {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        customers (
          name,
          email
        )
      `)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async updateOrderStatus(id: string, status: Order['status']) {
    const { data, error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Order
  },

  // Analytics
  async getAnalytics() {
    const [dishesResult, customersResult, ordersResult] = await Promise.all([
      supabase.from('dishes').select('id'),
      supabase.from('customers').select('id'),
      supabase.from('orders').select('total_amount, created_at')
    ])

    const totalDishes = dishesResult.data?.length || 0
    const totalCustomers = customersResult.data?.length || 0
    const orders = ordersResult.data || []
    const totalRevenue = orders.reduce((sum, order) => sum + order.total_amount, 0)
    
    // Calculate monthly revenue
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    const monthlyRevenue = orders
      .filter(order => {
        const orderDate = new Date(order.created_at)
        return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear
      })
      .reduce((sum, order) => sum + order.total_amount, 0)

    return {
      totalDishes,
      totalCustomers,
      totalOrders: orders.length,
      totalRevenue,
      monthlyRevenue
    }
  }
}
