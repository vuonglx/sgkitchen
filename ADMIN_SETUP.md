# Admin Panel Setup Guide

This guide will help you set up the admin panel for the Vietnamese Restaurant application with Supabase integration.

## Prerequisites

1. **Supabase Account**: Create a free account at [supabase.com](https://supabase.com)
2. **Node.js**: Ensure you have Node.js 18+ installed
3. **Environment Variables**: Supabase credentials (already configured)

## Database Setup

### 1. Create Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click "New Project"
3. Choose your organization
4. Enter project name: `vietnamese-restaurant`
5. Enter database password (save this securely)
6. Select region closest to your users
7. Click "Create new project"

### 2. Run Database Setup Script

1. In your Supabase project dashboard, go to the SQL Editor
2. Copy the contents of `scripts/setupSupabase.sql`
3. Paste it into the SQL Editor
4. Click "Run" to execute the script

This will create:
- **Tables**: `dishes`, `customers`, `orders`
- **Sample Data**: 9 Vietnamese dishes, 5 sample customers, 3 sample orders
- **Security Rules**: Row Level Security (RLS) policies
- **Triggers**: Auto-update customer statistics
- **Indexes**: Performance optimizations

### 3. Verify Database Setup

Check that the following tables were created:
- `dishes` (9 sample Vietnamese dishes)
- `customers` (5 sample customers)
- `orders` (3 sample orders)

## Admin Panel Features

### 🏠 Analytics Dashboard
- **Overview Stats**: Total dishes, customers, orders, revenue
- **Monthly Revenue**: Current month earnings
- **Quick Actions**: Add dish, export data, send newsletter
- **Recent Activity**: Live activity feed

### 🍜 Dish Management
- **CRUD Operations**: Create, read, update, delete dishes
- **Multilingual Support**: English, French, Vietnamese translations
- **Rich Data**: Price, category, spice level, popularity
- **Image Support**: Optional image URLs
- **Categories**: Appetizers, Main Dishes, Sides, Beverages

### 👥 Customer Management
- **Customer List**: View all registered customers
- **Search Function**: Find customers by name or email
- **Customer Stats**: Total orders, spending, join date
- **VIP Status**: Automatic VIP marking for frequent customers
- **Detailed View**: Complete customer profiles

### 📋 Order Management
- **Order Tracking**: View all orders with status
- **Status Updates**: Change order status in real-time
- **Order Details**: View items, customer info, totals
- **Status Filtering**: Filter by pending, preparing, ready, etc.
- **Order History**: Complete order timeline

## Access the Admin Panel

### 1. Start the Application
```bash
cd vietnamese-restaurant-nextjs
npm run dev
```

### 2. Navigate to Admin
- Open your browser to `http://localhost:3000`
- Click "Admin" in the navigation menu
- Or go directly to `http://localhost:3000/admin`

### 3. Admin Login
- **Password**: `admin123`
- This is a demo password for development
- In production, implement proper authentication

## Admin Panel Navigation

The admin panel has 4 main sections:

1. **📊 Analytics** - Dashboard overview
2. **🍜 Dishes** - Menu management
3. **👥 Customers** - Customer database
4. **📋 Orders** - Order processing

## Sample Data Included

### Dishes (9 items)
- **Bún Bò Huế** - Spicy beef noodle soup ($13.99)
- **Phở Bò** - Traditional beef pho ($12.99)
- **Phở Gà** - Chicken pho ($11.99)
- **Gỏi Cuốn** - Fresh spring rolls ($7.99)
- **Nem Rán** - Fried spring rolls ($8.99)
- **Bánh Mì Chả Cá** - Fish cake sandwich ($6.99)
- **Xôi Vò** - Sticky rice with mung beans ($4.99)
- **Cà Phê Sữa Đá** - Vietnamese iced coffee ($3.99)
- **Trà Đá** - Iced tea ($2.99)

### Customers (5 profiles)
- John Doe (3 orders, $45.97 spent)
- Marie Martin (7 orders, $89.43 spent)
- Nguyễn Văn A (2 orders, $26.98 spent)
- Sarah Wilson (1 order, $13.99 spent)
- Pierre Dubois (5 orders, $67.95 spent)

### Orders (3 sample orders)
- Recent orders with different statuses
- Complete order details with items
- Customer information linked

## Customization

### Adding New Dish Categories
1. Update the `category` enum in `src/lib/supabase.ts`
2. Add translations in `src/lib/languages.ts`
3. Update the category options in `DishManagement.tsx`

### Modifying Order Statuses
1. Update the `status` enum in `src/lib/supabase.ts`
2. Add translations for new statuses
3. Update status options in `OrderManagement.tsx`

### Adding New Languages
1. Add language to `languages` array in `src/lib/languages.ts`
2. Add translations for all keys
3. Update database schema to include new language columns

## Security Notes

### Development
- Simple password authentication (`admin123`)
- No user roles or permissions
- Direct database access

### Production Recommendations
- Implement proper authentication (Auth0, Firebase Auth, etc.)
- Add role-based access control
- Use environment variables for sensitive data
- Enable audit logging
- Implement rate limiting
- Add CSRF protection

## Troubleshooting

### Database Connection Issues
1. Check Supabase project status
2. Verify environment variables in `.env.local`
3. Ensure RLS policies are correctly set

### Admin Panel Not Loading
1. Check console for JavaScript errors
2. Verify all admin components are created
3. Ensure Supabase client is properly configured

### Data Not Displaying
1. Check network tab for API errors
2. Verify database tables have data
3. Check RLS policies allow reading

## API Endpoints

The admin panel uses the following Supabase operations:

### Dishes
- `adminService.getDishes()` - Get all dishes
- `adminService.createDish(dish)` - Create new dish
- `adminService.updateDish(id, updates)` - Update dish
- `adminService.deleteDish(id)` - Delete dish

### Customers
- `adminService.getCustomers()` - Get all customers
- `adminService.getCustomerById(id)` - Get customer details
- `adminService.updateCustomer(id, updates)` - Update customer

### Orders
- `adminService.getOrders()` - Get all orders with customer info
- `adminService.updateOrderStatus(id, status)` - Update order status

### Analytics
- `adminService.getAnalytics()` - Get dashboard statistics

## Support

For issues or questions:
1. Check the console for error messages
2. Verify database setup in Supabase dashboard
3. Ensure all environment variables are set
4. Review the sample data in the database

The admin panel is now ready to use! You can manage dishes, track customers, process orders, and view analytics all from one centralized dashboard.
