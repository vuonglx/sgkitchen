import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Saigon Kitchen - Authentic Vietnamese Cuisine',
  description: 'Experience authentic Vietnamese flavors with our traditional dishes, fresh ingredients, and warm hospitality. Order online for pickup or delivery.',
  keywords: 'Vietnamese restaurant, authentic Vietnamese food, pho, banh mi, fresh spring rolls, Vietnamese cuisine, Asian food',
  authors: [{ name: 'Saigon Kitchen' }],
  openGraph: {
    title: 'Saigon Kitchen - Authentic Vietnamese Cuisine',
    description: 'Experience authentic Vietnamese flavors with our traditional dishes, fresh ingredients, and warm hospitality.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['fr_FR', 'vi_VN'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=PT+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          <AuthProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
