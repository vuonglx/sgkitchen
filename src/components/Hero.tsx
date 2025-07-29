'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-6 text-shadow">
            {t('restaurantName')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 font-pt-sans">
            {t('restaurantTagline')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#menu"
              className="btn-secondary inline-flex items-center justify-center px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 hover:transform hover:scale-105"
            >
              {t('menu')}
            </a>
            <a
              href="#about"
              className="btn-outline inline-flex items-center justify-center px-8 py-3 text-lg font-semibold rounded-lg border-2 border-white text-white hover:bg-white hover:text-primary-600 transition-all duration-200"
            >
              {t('about')}
            </a>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 opacity-20">
        <div className="text-6xl">🍜</div>
      </div>
      <div className="absolute bottom-10 right-10 opacity-20">
        <div className="text-6xl">🥢</div>
      </div>
      <div className="absolute top-1/2 left-20 opacity-10">
        <div className="text-4xl">🌿</div>
      </div>
    </section>
  );
}
