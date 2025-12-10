'use client'

import { Button } from '@nextui-org/react'

interface EmptyCheckoutProps {
  onBrowseProducts: () => void
}

export function EmptyCheckout({ onBrowseProducts }: EmptyCheckoutProps) {
  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">🛒</div>
      <h2 className="text-2xl font-semibold text-default-500">Your cart is empty</h2>
      <p className="text-default-400 mt-2">Add some products before checking out</p>
      <Button color="primary" className="mt-4" onPress={onBrowseProducts}>
        Browse Products
      </Button>
    </div>
  )
}
