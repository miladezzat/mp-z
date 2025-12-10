'use client'

import { OrderCard } from './OrderCard'
import type { Order } from '@/types/api.types'

interface OrdersListProps {
  orders: Order[]
  getStatusColor: (
    status: Order['status']
  ) => 'warning' | 'primary' | 'secondary' | 'success' | 'danger'
}

export function OrdersList({ orders, getStatusColor }: OrdersListProps) {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard key={order._id} order={order} statusColor={getStatusColor(order.status)} />
      ))}
    </div>
  )
}
