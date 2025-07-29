'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { languages } from '@/lib/languages';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import CartSidebar from './CartSidebar';
import AuthModal from './AuthModal';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { t, language } = useLanguage();
  const { user, logout } = useAuth();
  const { getCartItemCount } = useCart();

  const navigation = [
    { key: 'home', href: '#home' },
    { key: 'menu', href: '#menu' },
    { key: 'about', href: '#about' },
    { key: 'contact', href: '#contact' },
    { key: 'admin', href: '/admin' },
  ];

  const handleAuthAction = () => {
    if (user) {
      logout();
    } else {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <>
      <header className="bg-primary-600 text-white shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-playfair font-bold">
                {t('restaurantName')}
              </div>
              <div className="hidden sm:block text-sm opacity-90">
                {t('restaurantTagline')}
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="hover:text-primary-200 transition-colors duration-200 font-pt-sans"
                >
                  {t(item.key)}
                </a>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <LanguageSelector />

              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 hover:bg-primary-700 rounded-lg transition-colors duration-200"
              >
                <ShoppingCart size={20} />
                {getCartItemCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getCartItemCount()}
                  </span>
                )}
              </button>

              {/* User Auth */}
              <button
                onClick={handleAuthAction}
                className="flex items-center space-x-2 p-2 hover:bg-primary-700 rounded-lg transition-colors duration-200"
              >
                <User size={20} />
                <span className="hidden sm:inline font-pt-sans">
                  {user ? user.name : t('login')}
                </span>
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 hover:bg-primary-700 rounded-lg transition-colors duration-200"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-primary-500">
              <nav className="flex flex-col space-y-2">
                {navigation.map((item) => (
                  <a
                    key={item.key}
                    href={item.href}
                    className="block py-2 px-4 hover:bg-primary-700 rounded-lg transition-colors duration-200 font-pt-sans"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t(item.key)}
                  </a>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
}
