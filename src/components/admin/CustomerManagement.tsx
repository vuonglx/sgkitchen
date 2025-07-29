'use client'

import { useState, useEffect } from 'react'
import { adminService, type Customer } from '@/lib/supabase'

export default function CustomerManagement() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    loadCustomers()
  }, [])

  const loadCustomers = async () => {
    try {
      setLoading(true)
      const data = await adminService.getCustomers()
      setCustomers(data)
    } catch (err) {
      setError('Failed to load customers')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleViewDetails = async (customer: Customer) => {
    try {
      const fullCustomer = await adminService.getCustomerById(customer.id)
      setSelectedCustomer(fullCustomer)
      setShowDetails(true)
    } catch (err) {
      setError('Failed to load customer details')
      console.error(err)
    }
  }

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Customer Management</h2>
          <p className="mt-1 text-sm text-gray-600">
            View and manage customer information
          </p>
        </div>
        <div className="flex space-x-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400">🔍</span>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="text-sm text-red-700">{error}</div>
        </div>
      )}

      {/* Customer Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="bg-blue-500 rounded-md p-3 text-white text-2xl">
                  👥
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Customers
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {customers.length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="bg-green-500 rounded-md p-3 text-white text-2xl">
                  🛒
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Active Customers
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {customers.filter(c => c.total_orders > 0).length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="bg-purple-500 rounded-md p-3 text-white text-2xl">
                  💰
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Revenue
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    ${customers.reduce((sum, c) => sum + c.total_spent, 0).toFixed(2)}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Details Modal */}
      {showDetails && selectedCustomer && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-lg shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Customer Details
                </h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedCustomer.name}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedCustomer.email}</p>
                </div>
                
                {selectedCustomer.phone && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedCustomer.phone}</p>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Member Since</label>
                  <p className="mt-1 text-sm text-gray-900">{formatDate(selectedCustomer.created_at)}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Total Orders</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedCustomer.total_orders}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Total Spent</label>
                  <p className="mt-1 text-sm text-gray-900">${selectedCustomer.total_spent.toFixed(2)}</p>
                </div>
                
                {selectedCustomer.last_order_at && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Order</label>
                    <p className="mt-1 text-sm text-gray-900">{formatDate(selectedCustomer.last_order_at)}</p>
                  </div>
                )}
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowDetails(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Customers Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredCustomers.map((customer) => (
            <li key={customer.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-green-600 truncate">
                        {customer.name}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex space-x-2">
                        {customer.total_orders > 5 && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            VIP
                          </span>
                        )}
                        {customer.total_orders === 0 && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            New
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          📧 {customer.email}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <p className="mr-4">
                          {customer.total_orders} orders
                        </p>
                        <p className="mr-4">
                          ${customer.total_spent.toFixed(2)} spent
                        </p>
                        <p>
                          Joined {formatDate(customer.created_at)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4">
                    <button
                      onClick={() => handleViewDetails(customer)}
                      className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {filteredCustomers.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-gray-500">
            <p className="text-lg">No customers found</p>
            <p className="text-sm">
              {searchTerm ? 'Try adjusting your search terms' : 'Customers will appear here once they register'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
