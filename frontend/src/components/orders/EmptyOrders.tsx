'use client'

import { Button } from '@nextui-org/react'

interface EmptyOrdersProps {
  onBrowseProducts: () => void
}

export function EmptyOrders({ onBrowseProducts }: EmptyOrdersProps) {
  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">📦</div>
      <h2 className="text-2xl font-semibold text-default-500">No orders yet</h2>
      <p className="text-default-400 mt-2">Start shopping to see your orders here</p>
      <Button color="primary" className="mt-4" onPress={onBrowseProducts}>
        Browse Products
      </Button>
    </div>
  )
}
