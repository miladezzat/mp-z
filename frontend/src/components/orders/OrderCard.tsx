'use client'

import { Card, CardBody, Chip } from '@nextui-org/react'
import type { Order } from '@/types/api.types'

interface OrderCardProps {
  order: Order
  statusColor: 'warning' | 'primary' | 'secondary' | 'success' | 'danger'
}

export function OrderCard({ order, statusColor }: OrderCardProps) {
  return (
    <Card>
      <CardBody>
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-default-500">Order #{order._id.slice(-8)}</p>
            <p className="text-sm text-default-500">
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
          <Chip color={statusColor} variant="flat">
            {order.status.toUpperCase()}
          </Chip>
        </div>

        <div className="space-y-2 mb-4">
          {order.items.map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <span className="font-semibold">Total</span>
          <span className="text-xl font-bold text-primary">${order.totalAmount.toFixed(2)}</span>
        </div>

        <div className="mt-4 text-sm text-default-500">
          <p className="font-semibold">Shipping Address:</p>
          <p>{order.shippingAddress.street}</p>
          <p>
            {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
            {order.shippingAddress.zipCode}
          </p>
          <p>{order.shippingAddress.country}</p>
        </div>
      </CardBody>
    </Card>
  )
}
