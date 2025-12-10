'use client'

import { Card, CardBody } from '@nextui-org/react'
import NextImage from 'next/image'
import type { CartItem } from '@/types/entities.types'

interface OrderItemsListProps {
  items: CartItem[]
}

export function OrderItemsList({ items }: OrderItemsListProps) {
  return (
    <Card>
      <CardBody>
        <h2 className="text-xl font-semibold mb-4">Order Items</h2>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item._id} className="flex gap-4">
              <NextImage
                src={
                  item.product.images?.[0] ||
                  item.product.imageUrl ||
                  'https://placehold.co/100x100?text=Product'
                }
                alt={item.product.name}
                width={80}
                height={80}
                className="rounded object-cover"
                unoptimized
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.product.name}</h3>
                <p className="text-sm text-default-500">Quantity: {item.quantity}</p>
                <p className="text-primary font-bold">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  )
}
