'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Restaurant Info */}
          <div>
            <h3 className="text-2xl font-playfair font-bold mb-4">
              {t('restaurantName')}
            </h3>
            <p className="text-gray-300 mb-4 font-pt-sans">
              {t('restaurantTagline')}
            </p>
            <p className="text-gray-400 text-sm">
              Authentic Vietnamese cuisine made with love and traditional recipes.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('contact')}</h4>
            <div className="space-y-2 text-gray-300">
              <p>📍 123 Vietnamese Street, Food City</p>
              <p>📞 (555) 123-4567</p>
              <p>✉️ info@saigonkitchen.com</p>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('openingHours')}</h4>
            <div className="space-y-2 text-gray-300">
              <p>Monday - Friday: 11:00 AM - 10:00 PM</p>
              <p>Saturday - Sunday: 10:00 AM - 11:00 PM</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 {t('restaurantName')}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
