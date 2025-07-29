'use client'

import { useState, useEffect } from 'react'
import { adminService, type Dish, type Customer } from '@/lib/supabase'
import { adminAuth, type AdminUser, DEFAULT_ADMIN } from '@/lib/adminAuth'
import { useLanguage } from '@/contexts/LanguageContext'
import DishManagement from '@/components/admin/DishManagement'
import CustomerManagement from '@/components/admin/CustomerManagement'
import OrderManagement from '@/components/admin/OrderManagement'
import Analytics from '@/components/admin/Analytics'

type TabType = 'analytics' | 'dishes' | 'customers' | 'orders'

export default function AdminPage() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<TabType>('analytics')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Check authentication on mount
  useEffect(() => {
    const admin = adminAuth.getCurrentAdmin()
    if (admin) {
      setCurrentAdmin(admin)
      setIsAuthenticated(true)
    }
  }, [])

  // Handle admin login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { user, error: authError } = await adminAuth.signInAdmin(email, password)
    
    if (authError) {
      setError(authError)
    } else if (user) {
      setCurrentAdmin(user)
      setIsAuthenticated(true)
    }
    
    setLoading(false)
  }

  // Handle logout
  const handleLogout = () => {
    adminAuth.signOut()
    setCurrentAdmin(null)
    setIsAuthenticated(false)
    setEmail('')
    setPassword('')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Admin Access
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Sign in to access the admin dashboard
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border-2 border-gray-400 placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-base font-bold"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ color: '#000000 !important', backgroundColor: '#ffffff !important' }}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border-2 border-gray-400 placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-base font-bold"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ color: '#000000 !important', backgroundColor: '#ffffff !important' }}
                />
              </div>
            </div>
            {error && (
              <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-md">
                {error}
              </div>
            )}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
            <div className="bg-blue-50 p-4 rounded-md">
              <h4 className="text-sm font-medium text-blue-800 mb-2">Default Admin Account:</h4>
              <div className="text-xs text-blue-700 space-y-1">
                <div><strong>Email:</strong> {DEFAULT_ADMIN.email}</div>
                <div><strong>Password:</strong> {DEFAULT_ADMIN.password}</div>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'analytics', name: 'Analytics', icon: '📊' },
    { id: 'dishes', name: 'Dishes', icon: '🍜' },
    { id: 'customers', name: 'Customers', icon: '👥' },
    { id: 'orders', name: 'Orders', icon: '📋' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">
                🍜 Saigon Kitchen Admin
              </h1>
              {currentAdmin && (
                <div className="text-sm text-gray-600">
                  Welcome, <span className="font-medium">{currentAdmin.name}</span>
                  <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    {currentAdmin.role.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'analytics' && <Analytics />}
        {activeTab === 'dishes' && <DishManagement />}
        {activeTab === 'customers' && <CustomerManagement />}
        {activeTab === 'orders' && <OrderManagement />}
      </div>
    </div>
  )
}
