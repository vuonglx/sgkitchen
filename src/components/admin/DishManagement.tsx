'use client'

import { useState, useEffect } from 'react'
import { adminService, type Dish } from '@/lib/supabase'

export default function DishManagement() {
  const [dishes, setDishes] = useState<Dish[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingDish, setEditingDish] = useState<Dish | null>(null)
  const [formData, setFormData] = useState({
    name_en: '',
    name_fr: '',
    name_vi: '',
    description_en: '',
    description_fr: '',
    description_vi: '',
    price: 0,
    category: 'appetizers' as 'appetizers' | 'main_dishes' | 'sides' | 'beverages',
    spice_level: 0,
    is_popular: false,
    image_url: ''
  })

  useEffect(() => {
    loadDishes()
  }, [])

  const loadDishes = async () => {
    try {
      setLoading(true)
      const data = await adminService.getDishes()
      setDishes(data)
    } catch (err) {
      setError('Failed to load dishes')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingDish) {
        await adminService.updateDish(editingDish.id, formData)
      } else {
        await adminService.createDish(formData)
      }
      await loadDishes()
      resetForm()
    } catch (err) {
      setError('Failed to save dish')
      console.error(err)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this dish?')) {
      try {
        await adminService.deleteDish(id)
        await loadDishes()
      } catch (err) {
        setError('Failed to delete dish')
        console.error(err)
      }
    }
  }

  const handleEdit = (dish: Dish) => {
    setEditingDish(dish)
    setFormData({
      name_en: dish.name_en,
      name_fr: dish.name_fr,
      name_vi: dish.name_vi,
      description_en: dish.description_en,
      description_fr: dish.description_fr,
      description_vi: dish.description_vi,
      price: dish.price,
      category: dish.category,
      spice_level: dish.spice_level,
      is_popular: dish.is_popular,
      image_url: dish.image_url || ''
    })
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({
      name_en: '',
      name_fr: '',
      name_vi: '',
      description_en: '',
      description_fr: '',
      description_vi: '',
      price: 0,
      category: 'appetizers',
      spice_level: 0,
      is_popular: false,
      image_url: ''
    })
    setEditingDish(null)
    setShowForm(false)
  }

  const getCategoryLabel = (category: string) => {
    const labels = {
      appetizers: 'Appetizers',
      main_dishes: 'Main Dishes',
      sides: 'Sides',
      beverages: 'Beverages'
    }
    return labels[category as keyof typeof labels] || category
  }

  const getSpiceLevel = (level: number) => {
    return '🌶️'.repeat(level)
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
          <h2 className="text-2xl font-bold text-gray-900">Dish Management</h2>
          <p className="mt-1 text-sm text-gray-600">
            Manage your restaurant's menu items
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <span className="mr-2">+</span>
          Add New Dish
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="text-sm text-red-700">{error}</div>
        </div>
      )}

      {/* Dish Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingDish ? 'Edit Dish' : 'Add New Dish'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name (English)
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name_en}
                      onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                      className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-base font-bold text-gray-900 bg-white px-3 py-2"
                      style={{ color: '#000000 !important', backgroundColor: '#ffffff !important' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name (French)
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name_fr}
                      onChange={(e) => setFormData({ ...formData, name_fr: e.target.value })}
                      className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-base font-bold text-gray-900 bg-white px-3 py-2"
                      style={{ color: '#000000 !important', backgroundColor: '#ffffff !important' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name (Vietnamese)
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name_vi}
                      onChange={(e) => setFormData({ ...formData, name_vi: e.target.value })}
                      className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-base font-bold text-gray-900 bg-white px-3 py-2"
                      style={{ color: '#000000 !important', backgroundColor: '#ffffff !important' }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Description (English)
                    </label>
                    <textarea
                      required
                      value={formData.description_en}
                      onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                      className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-base font-bold text-gray-900 bg-white px-3 py-2"
                      style={{ color: '#000000 !important', backgroundColor: '#ffffff !important' }}
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Description (French)
                    </label>
                    <textarea
                      required
                      value={formData.description_fr}
                      onChange={(e) => setFormData({ ...formData, description_fr: e.target.value })}
                      className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-base font-bold text-gray-900 bg-white px-3 py-2"
                      style={{ color: '#000000 !important', backgroundColor: '#ffffff !important' }}
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Description (Vietnamese)
                    </label>
                    <textarea
                      required
                      value={formData.description_vi}
                      onChange={(e) => setFormData({ ...formData, description_vi: e.target.value })}
                      className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-base font-bold text-gray-900 bg-white px-3 py-2"
                      style={{ color: '#000000 !important', backgroundColor: '#ffffff !important' }}
                      rows={3}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Price ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                      className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-base font-bold text-gray-900 bg-white px-3 py-2"
                      style={{ color: '#000000 !important', backgroundColor: '#ffffff !important' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                      className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-base font-bold text-gray-900 bg-white px-3 py-2"
                      style={{ color: '#000000 !important', backgroundColor: '#ffffff !important' }}
                    >
                      <option value="appetizers">Appetizers</option>
                      <option value="main_dishes">Main Dishes</option>
                      <option value="sides">Sides</option>
                      <option value="beverages">Beverages</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Spice Level (0-4)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="4"
                      value={formData.spice_level}
                      onChange={(e) => setFormData({ ...formData, spice_level: parseInt(e.target.value) })}
                      className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-base font-bold text-gray-900 bg-white px-3 py-2"
                      style={{ color: '#000000 !important', backgroundColor: '#ffffff !important' }}
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.is_popular}
                      onChange={(e) => setFormData({ ...formData, is_popular: e.target.checked })}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      Popular Item
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Image URL (optional)
                  </label>
                  <input
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-base font-bold text-gray-900 bg-white px-3 py-2"
                    style={{ color: '#000000 !important', backgroundColor: '#ffffff !important' }}
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    {editingDish ? 'Update' : 'Create'} Dish
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Dishes Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {dishes.map((dish) => (
            <li key={dish.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-green-600 truncate">
                        {dish.name_en}
                        {dish.is_popular && (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Popular
                          </span>
                        )}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {getCategoryLabel(dish.category)}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          {dish.description_en}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <p className="mr-4">
                          ${dish.price.toFixed(2)}
                        </p>
                        {dish.spice_level > 0 && (
                          <p className="mr-4">
                            {getSpiceLevel(dish.spice_level)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 flex space-x-2">
                    <button
                      onClick={() => handleEdit(dish)}
                      className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(dish.id)}
                      className="text-red-600 hover:text-red-900 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {dishes.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-gray-500">
            <p className="text-lg">No dishes found</p>
            <p className="text-sm">Add your first dish to get started</p>
          </div>
        </div>
      )}
    </div>
  )
}
