'use client'

import { useAppSelector } from '@/hooks/redux'
import { useAuth } from './useAuth'
import { useGetOrdersQuery } from '@/store/api/ordersApi'
import type { Order } from '@/types/api.types'

export function useOrders() {
  const { user } = useAppSelector((state) => state.auth)
  const { handleLogout, handleNavigate } = useAuth()

  // API queries
  const { data, isLoading, error } = useGetOrdersQuery(undefined)

  // Computed values
  const orders = data?.orders || []
  const isEmpty = orders.length === 0

  // Helper function
  const getStatusColor = (status: Order['status']) => {
    const colors = {
      pending: 'warning',
      processing: 'primary',
      shipped: 'secondary',
      delivered: 'success',
      cancelled: 'danger',
    }
    return colors[status] as 'warning' | 'primary' | 'secondary' | 'success' | 'danger'
  }

  return {
    // State
    user,
    orders,
    isEmpty,
    isLoading,
    error,

    // Handlers
    handleLogout,
    handleNavigate,

    // Helpers
    getStatusColor,
  }
}
