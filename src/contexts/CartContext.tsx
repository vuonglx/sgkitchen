'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Cart, CartItem, MenuItem } from '@/types';
import { getCart, updateCart } from '@/lib/firestore';
import { useAuth } from './AuthContext';

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  addToCart: (menuItem: MenuItem, quantity?: number, specialInstructions?: string) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadCart();
    } else {
      setCart(null);
      setLoading(false);
    }
  }, [user]);

  const loadCart = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const userCart = await getCart(user.id);
      if (userCart) {
        setCart(userCart);
      } else {
        // Initialize empty cart
        const emptyCart: Omit<Cart, 'id' | 'updatedAt'> = {
          userId: user.id,
          items: [],
          subtotal: 0,
          tax: 0,
          total: 0,
        };
        await updateCart(user.id, emptyCart);
        setCart({
          id: user.id,
          ...emptyCart,
          updatedAt: new Date(),
        });
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotals = (items: CartItem[]) => {
    const subtotal = items.reduce((sum, item) => sum + (item.menuItem.price * item.quantity), 0);
    const tax = subtotal * 0.08875; // 8.875% tax rate
    const total = subtotal + tax;
    
    return { subtotal, tax, total };
  };

  const addToCart = async (menuItem: MenuItem, quantity = 1, specialInstructions?: string) => {
    if (!user || !cart) return;

    const existingItemIndex = cart.items.findIndex(item => 
      item.menuItemId === menuItem.id && item.specialInstructions === specialInstructions
    );

    let updatedItems: CartItem[];

    if (existingItemIndex >= 0) {
      // Update existing item
      updatedItems = [...cart.items];
      updatedItems[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      const newItem: CartItem = {
        id: `${menuItem.id}-${Date.now()}`,
        menuItemId: menuItem.id,
        menuItem,
        quantity,
        specialInstructions,
        addedAt: new Date(),
      };
      updatedItems = [...cart.items, newItem];
    }

    const { subtotal, tax, total } = calculateTotals(updatedItems);

    const updatedCart: Omit<Cart, 'id' | 'updatedAt'> = {
      userId: user.id,
      items: updatedItems,
      subtotal,
      tax,
      total,
    };

    try {
      await updateCart(user.id, updatedCart);
      setCart({
        id: user.id,
        ...updatedCart,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (itemId: string) => {
    if (!user || !cart) return;

    const updatedItems = cart.items.filter(item => item.id !== itemId);
    const { subtotal, tax, total } = calculateTotals(updatedItems);

    const updatedCart: Omit<Cart, 'id' | 'updatedAt'> = {
      userId: user.id,
      items: updatedItems,
      subtotal,
      tax,
      total,
    };

    try {
      await updateCart(user.id, updatedCart);
      setCart({
        id: user.id,
        ...updatedCart,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (!user || !cart) return;

    if (quantity <= 0) {
      await removeFromCart(itemId);
      return;
    }

    const updatedItems = cart.items.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    );

    const { subtotal, tax, total } = calculateTotals(updatedItems);

    const updatedCart: Omit<Cart, 'id' | 'updatedAt'> = {
      userId: user.id,
      items: updatedItems,
      subtotal,
      tax,
      total,
    };

    try {
      await updateCart(user.id, updatedCart);
      setCart({
        id: user.id,
        ...updatedCart,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const clearCart = async () => {
    if (!user) return;

    const emptyCart: Omit<Cart, 'id' | 'updatedAt'> = {
      userId: user.id,
      items: [],
      subtotal: 0,
      tax: 0,
      total: 0,
    };

    try {
      await updateCart(user.id, emptyCart);
      setCart({
        id: user.id,
        ...emptyCart,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const getCartTotal = () => cart?.total || 0;

  const getCartItemCount = () => cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const value: CartContextType = {
    cart,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
