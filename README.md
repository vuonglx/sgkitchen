# Saigon Kitchen - Vietnamese Restaurant Website

A modern, multilingual Vietnamese restaurant website built with Next.js, TypeScript, Supabase, and Tailwind CSS. Features online ordering, authentication, admin panel, and support for English, French, and Vietnamese languages.

## 🌟 Features

### Core Functionality
- **Multilingual Support**: English, French, and Vietnamese with seamless language switching
- **Online Ordering**: Browse menu, add items to cart, and place orders
- **Authentication**: Secure login with Google OAuth and email/password
- **Order Management**: View order history and track order status
- **Admin Panel**: Manage dishes, customers, and orders
- **Responsive Design**: Mobile-first design that works on all devices

### Technical Features
- **Next.js 14**: Modern React framework with App Router
- **TypeScript**: Type-safe development
- **Supabase**: Authentication, PostgreSQL database, and real-time subscriptions
- **Tailwind CSS**: Utility-first CSS framework
- **Real-time Updates**: Live order status updates
- **SEO Optimized**: Meta tags and structured data

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vietnamese-restaurant-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new Supabase project at [Supabase Dashboard](https://supabase.com/dashboard)
   - Go to Settings > API to get your project URL and anon key
   - Enable Google OAuth in Authentication > Providers (optional)
   - Run the SQL setup script in the SQL Editor

4. **Configure environment variables**
   ```bash
   cp .env.local.sample .env.local
   ```
   
   Fill in your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   ```

5. **Set up the database**
   - Copy the contents of `scripts/setupSupabase.sql`
   - Go to your Supabase project dashboard
   - Navigate to the SQL Editor
   - Paste and run the SQL script to create tables and sample data

6. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
vietnamese-restaurant-nextjs/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── auth/callback/     # OAuth callback page
│   │   ├── admin/             # Admin panel
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   │   ├── admin/             # Admin panel components
│   │   ├── Header.tsx         # Navigation header
│   │   ├── Hero.tsx           # Hero section
│   │   ├── MenuSection.tsx    # Menu display
│   │   ├── AuthModal.tsx      # Authentication modal
│   │   └── ...
│   ├── contexts/              # React contexts
│   │   ├── AuthContext.tsx    # Authentication
│   │   ├── CartContext.tsx    # Shopping cart
│   │   └── LanguageContext.tsx # Internationalization
│   ├── lib/                   # Utilities and configurations
│   │   ├── supabase.ts        # Supabase client config
│   │   ├── firestore.ts       # Database operations
│   │   ├── languages.ts       # Translation system
│   │   └── sampleData.ts      # Sample menu data
│   └── types/                 # TypeScript type definitions
├── scripts/                   # Database setup scripts
│   └── setupSupabase.sql      # Supabase database schema
├── public/                    # Static assets
└── tailwind.config.ts        # Tailwind CSS configuration
```

## 🌐 Multilingual Support

The application supports three languages:
- **English (en)** - Default language
- **French (fr)** - Français
- **Vietnamese (vi)** - Tiếng Việt

### Adding New Languages
1. Update the `languages` array in `src/lib/languages.ts`
2. Add translations to the `translations` object
3. Update the `Language` type in `src/types/index.ts`

### Translation System
- All UI text is stored in `src/lib/languages.ts`
- Menu items and categories support multilingual content
- Language preference is saved in localStorage
- Use the `useLanguage()` hook to access translations

## 🗄️ Supabase Database

### Database Tables
- `dishes` - Restaurant menu items with multilingual support
- `customers` - Customer profiles and information
- `orders` - Customer orders with order items

### Row Level Security (RLS)
The database uses RLS policies to ensure:
- Public read access to dishes
- Users can only access their own customer data and orders
- Service role has full access for admin functions

### Real-time Features
- Live order status updates
- Real-time inventory management
- Instant menu updates

## 🎨 Design System

### Colors
- **Primary**: Natural greens (#3a9a3a)
- **Secondary**: Warm earth tones (#dc8b2a)
- **Accent**: Vietnamese-inspired oranges (#ed7328)

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: PT Sans (sans-serif)
- **Vietnamese**: Custom Vietnamese font support

### Components
- Responsive grid layout
- Hand-drawn style icons
- Smooth animations and transitions
- Accessible design patterns

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Touch-friendly interfaces
- Optimized images and assets
- Progressive Web App features

## 🚀 Deployment

### Firebase Hosting
```bash
npm run build
firebase deploy
```

### Environment Setup
Ensure all environment variables are configured in your hosting environment.

### Performance Optimization
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Caching strategies
- Bundle size optimization

## 🧪 Testing

```bash
# Run tests
npm test

# Run Firebase emulators
npm run firebase:emulators
```

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation

---

Built with ❤️ for authentic Vietnamese cuisine lovers worldwide.
