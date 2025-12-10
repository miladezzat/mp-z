'use client'

import { Button } from '@nextui-org/react'

interface EmptyCartProps {
  onBrowseProducts: () => void
}

export function EmptyCart({ onBrowseProducts }: EmptyCartProps) {
  return (
    <div className="text-center py-16">
      <div className="text-8xl mb-4">🛒</div>
      <h2 className="text-2xl font-semibold text-default-500 mb-2">Your cart is empty</h2>
      <p className="text-default-400 mb-6">Add some amazing products to get started</p>
      <Button color="primary" size="lg" onPress={onBrowseProducts}>
        Browse Products
      </Button>
    </div>
  )
}
