'use client';

import { MenuItem, Category } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';

interface MenuSectionProps {
  menuItems: MenuItem[];
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export default function MenuSection({
  menuItems,
  categories,
  selectedCategory,
  onCategoryChange,
}: MenuSectionProps) {
  const { t, getLocalized } = useLanguage();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [addingToCart, setAddingToCart] = useState<string | null>(null);

  const handleAddToCart = async (item: MenuItem) => {
    if (!user) {
      // Could show login modal here
      alert('Please sign in to add items to cart');
      return;
    }

    setAddingToCart(item.id);
    try {
      await addToCart(item, 1);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart');
    } finally {
      setAddingToCart(null);
    }
  };

  return (
    <section id="menu" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-playfair font-bold text-gray-800 mb-4">
            {t('menu')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover authentic Vietnamese flavors crafted with traditional recipes and fresh ingredients
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => onCategoryChange('all')}
            className={`px-6 py-2 rounded-full font-pt-sans transition-all duration-200 ${
              selectedCategory === 'all'
                ? 'bg-primary-500 text-white'
                : 'bg-white text-gray-700 hover:bg-primary-100'
            }`}
          >
            {t('all')}
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`px-6 py-2 rounded-full font-pt-sans transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-primary-100'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {getLocalized(category.name)}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item) => (
            <div key={item.id} className="card p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-playfair font-semibold text-gray-800">
                  {getLocalized(item.name)}
                </h3>
                <span className="text-2xl font-bold text-primary-600">
                  ${item.price.toFixed(2)}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4 font-pt-sans">
                {getLocalized(item.description)}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {item.popular && (
                    <span className="bg-accent-100 text-accent-800 px-2 py-1 rounded-full text-xs font-semibold">
                      {t('popular')}
                    </span>
                  )}
                  <div className="flex items-center">
                    {Array.from({ length: item.spiceLevel }, (_, i) => (
                      <span key={i} className="text-red-500">🌶️</span>
                    ))}
                  </div>
                </div>
                
                <button 
                  onClick={() => handleAddToCart(item)}
                  disabled={addingToCart === item.id || !item.available}
                  className={`btn-primary ${
                    addingToCart === item.id ? 'opacity-50 cursor-not-allowed' : ''
                  } ${
                    !item.available ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {addingToCart === item.id ? 'Adding...' : 
                   !item.available ? 'Unavailable' : 
                   t('addToCart')}
                </button>
              </div>
            </div>
          ))}
        </div>

        {menuItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No items found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
