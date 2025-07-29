import { supabase } from './supabase'

export interface AdminUser {
  id: string
  email: string
  name: string
  role: 'admin' | 'super_admin'
  created_at: string
  last_login?: string
}

// Default admin credentials
export const DEFAULT_ADMIN = {
  email: 'admin@saigonkitchen.com',
  password: 'admin123',
  name: 'System Administrator',
  role: 'super_admin' as const
}

export class AdminAuthService {
  // Sign in admin user
  async signInAdmin(email: string, password: string): Promise<{ user: AdminUser | null; error: string | null }> {
    try {
      // Always check default admin first (demo mode)
      if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
        const adminUser: AdminUser = {
          id: 'default-admin-001',
          email: DEFAULT_ADMIN.email,
          name: DEFAULT_ADMIN.name,
          role: DEFAULT_ADMIN.role,
          created_at: new Date().toISOString(),
          last_login: new Date().toISOString()
        }
        
        // Store in localStorage for session management
        localStorage.setItem('admin_user', JSON.stringify(adminUser))
        localStorage.setItem('admin_session', Date.now().toString())
        
        return { user: adminUser, error: null }
      }

      // Try Supabase authentication only if configured
      try {
        // Check if Supabase is properly configured
        if (!supabase || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
          return { user: null, error: 'Invalid credentials' }
        }

        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        })

        if (error) {
          return { user: null, error: 'Invalid credentials' }
        }

        // Check if user is admin in admin_users table
        const { data: adminData, error: adminError } = await supabase
          .from('admin_users')
          .select('*')
          .eq('email', email)
          .single()

        if (adminError || !adminData) {
          await supabase.auth.signOut()
          return { user: null, error: 'Access denied. Admin privileges required.' }
        }

        const adminUser: AdminUser = {
          id: adminData.id,
          email: adminData.email,
          name: adminData.name,
          role: adminData.role,
          created_at: adminData.created_at,
          last_login: new Date().toISOString()
        }

        // Update last login
        await supabase
          .from('admin_users')
          .update({ last_login: new Date().toISOString() })
          .eq('id', adminData.id)

        localStorage.setItem('admin_user', JSON.stringify(adminUser))
        localStorage.setItem('admin_session', Date.now().toString())

        return { user: adminUser, error: null }
      } catch (supabaseError) {
        // Fallback to demo mode if Supabase fails
        return { user: null, error: 'Invalid credentials' }
      }
    } catch (error) {
      return { user: null, error: 'Invalid credentials' }
    }
  }

  // Get current admin user
  getCurrentAdmin(): AdminUser | null {
    try {
      const adminUser = localStorage.getItem('admin_user')
      const session = localStorage.getItem('admin_session')
      
      if (!adminUser || !session) return null
      
      // Check if session is still valid (24 hours)
      const sessionTime = parseInt(session)
      const now = Date.now()
      const twentyFourHours = 24 * 60 * 60 * 1000
      
      if (now - sessionTime > twentyFourHours) {
        this.signOut()
        return null
      }
      
      return JSON.parse(adminUser)
    } catch {
      return null
    }
  }

  // Sign out admin
  signOut(): void {
    localStorage.removeItem('admin_user')
    localStorage.removeItem('admin_session')
    supabase.auth.signOut()
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.getCurrentAdmin() !== null
  }

  // Create default admin user in database (for setup)
  async createDefaultAdmin(): Promise<{ success: boolean; error?: string }> {
    try {
      // Check if admin_users table exists and create default admin
      const { error } = await supabase
        .from('admin_users')
        .insert([
          {
            email: DEFAULT_ADMIN.email,
            name: DEFAULT_ADMIN.name,
            role: DEFAULT_ADMIN.role,
            created_at: new Date().toISOString()
          }
        ])

      if (error && !error.message.includes('duplicate key')) {
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (error) {
      return { success: false, error: 'Failed to create default admin' }
    }
  }
}

export const adminAuth = new AdminAuthService()
