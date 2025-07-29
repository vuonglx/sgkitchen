# Admin Account Setup Guide

This guide explains how to set up and manage admin accounts for the Vietnamese Restaurant application.

## 🔐 Default Admin Account

The application comes with a pre-configured default admin account for immediate access:

### Default Credentials
- **Email**: `admin@saigonkitchen.com`
- **Password**: `admin123`
- **Role**: `super_admin`
- **Name**: `System Administrator`

### Features
- ✅ **Session Management**: 24-hour session timeout
- ✅ **Role-based Access**: Super admin privileges
- ✅ **Secure Authentication**: Email/password + session validation
- ✅ **Fallback Support**: Works without Supabase connection (demo mode)

## 🚀 Quick Start

1. **Access Admin Panel**:
   ```
   http://localhost:3000/admin
   ```

2. **Login with Default Account**:
   - Email: `admin@saigonkitchen.com`
   - Password: `admin123`

3. **Start Managing**:
   - View analytics dashboard
   - Manage dishes, customers, and orders
   - Access all admin features

## 🏗️ Database Setup

The admin system uses the `admin_users` table in Supabase:

### Table Schema
```sql
CREATE TABLE admin_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true
);
```

### Default Admin Creation
The setup script automatically creates the default admin:
```sql
INSERT INTO admin_users (email, name, role, created_at, is_active) VALUES
('admin@saigonkitchen.com', 'System Administrator', 'super_admin', NOW(), true)
ON CONFLICT (email) DO NOTHING;
```

## 👥 Admin Roles

### Super Admin (`super_admin`)
- Full system access
- Can manage all dishes, customers, and orders
- Can view all analytics
- Can manage other admin accounts (future feature)

### Admin (`admin`)
- Standard admin access
- Can manage dishes and view orders
- Limited analytics access
- Cannot manage other admins

## 🔧 Admin Authentication System

### Authentication Flow
1. **Login**: Email/password validation
2. **Session Creation**: 24-hour session with localStorage
3. **Role Verification**: Check admin privileges
4. **Access Control**: Route-level protection

### Security Features
- **Session Timeout**: Automatic logout after 24 hours
- **Role Validation**: Server-side role checking
- **Secure Storage**: Session data in localStorage
- **Fallback Mode**: Works offline with default credentials

### Code Structure
```
src/lib/adminAuth.ts          # Admin authentication service
src/app/admin/page.tsx        # Admin panel with auth
src/components/admin/         # Admin components
```

## 🛠️ Adding New Admin Users

### Method 1: Database Direct Insert
```sql
INSERT INTO admin_users (email, name, role, is_active) VALUES
('newadmin@saigonkitchen.com', 'New Admin', 'admin', true);
```

### Method 2: Using Admin Service (Future)
```typescript
import { adminAuth } from '@/lib/adminAuth'

await adminAuth.createAdmin({
  email: 'newadmin@saigonkitchen.com',
  name: 'New Admin',
  role: 'admin'
})
```

## 🔄 Admin Management Operations

### Check Current Admin
```typescript
const currentAdmin = adminAuth.getCurrentAdmin()
if (currentAdmin) {
  console.log(`Logged in as: ${currentAdmin.name} (${currentAdmin.role})`)
}
```

### Sign Out Admin
```typescript
adminAuth.signOut()
```

### Validate Session
```typescript
const isValid = adminAuth.isAuthenticated()
```

## 🌐 Environment Configuration

### Required Environment Variables
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: Service Role Key (for admin operations)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Demo Mode
If Supabase is not configured, the system falls back to demo mode:
- Uses default admin credentials
- Stores session in localStorage
- Limited to basic authentication

## 🔒 Security Best Practices

### Production Setup
1. **Change Default Password**: Update default admin credentials
2. **Use Strong Passwords**: Enforce password complexity
3. **Enable 2FA**: Implement two-factor authentication (future)
4. **Regular Audits**: Monitor admin access logs
5. **Role Separation**: Use appropriate role assignments

### Password Security
```typescript
// Example: Change default admin password
const newPassword = 'your-secure-password-here'
// Update in Supabase Auth and admin_users table
```

## 📊 Admin Panel Features

### Analytics Dashboard
- Total dishes, customers, orders
- Revenue tracking
- Recent activity feed
- Quick action buttons

### Dish Management
- Add/edit/delete menu items
- Multilingual content support
- Category and pricing management
- Availability controls

### Customer Management
- View customer profiles
- Order history tracking
- Customer statistics
- Search and filtering

### Order Management
- Real-time order tracking
- Status updates (pending → preparing → ready → delivered)
- Order details and customer info
- Revenue calculations

## 🚨 Troubleshooting

### Common Issues

#### "Access denied" Error
- **Cause**: Invalid credentials or inactive account
- **Solution**: Verify email/password, check `is_active` status

#### Session Expired
- **Cause**: 24-hour session timeout
- **Solution**: Re-login with admin credentials

#### Database Connection Error
- **Cause**: Supabase not configured
- **Solution**: Set up environment variables or use demo mode

#### Admin Panel Not Loading
- **Cause**: JavaScript errors or missing dependencies
- **Solution**: Check browser console, verify all imports

### Debug Mode
Enable debug logging:
```typescript
// In adminAuth.ts
console.log('Admin auth debug:', {
  currentAdmin: adminAuth.getCurrentAdmin(),
  isAuthenticated: adminAuth.isAuthenticated()
})
```

## 🔄 Migration from Firebase

The admin system has been fully migrated from Firebase to Supabase:

### Changes Made
- ✅ Replaced Firebase Auth with Supabase Auth
- ✅ Updated admin user storage to PostgreSQL
- ✅ Enhanced session management
- ✅ Added role-based access control
- ✅ Improved error handling

### Backward Compatibility
- Same admin panel interface
- Identical user experience
- Enhanced security features
- Better performance

## 📞 Support

For admin account issues:
1. Check this documentation
2. Verify environment configuration
3. Test with default credentials
4. Check browser console for errors
5. Review Supabase dashboard logs

---

**Default Admin Account**: `admin@saigonkitchen.com` / `admin123`  
**Admin Panel URL**: `http://localhost:3000/admin`  
**Documentation**: Complete setup and usage guide above
