'use client'

import { CartItemCard } from './CartItemCard'
import type { CartItem } from '@/types'

interface CartItemsListProps {
  items: CartItem[]
  onQuantityChange: (itemId: string, quantity: number) => void
  onRemove: (itemId: string) => void
}

export function CartItemsList({ items, onQuantityChange, onRemove }: CartItemsListProps) {
  return (
    <div className="lg:col-span-2 space-y-4">
      {items.map((item) => (
        <CartItemCard
          key={item._id}
          item={item}
          onQuantityChange={onQuantityChange}
          onRemove={onRemove}
        />
      ))}
    </div>
  )
}
