'use client'

import { ProductCard } from './ProductCard'
import type { Product } from '@/types'

interface ProductGridProps {
  products: Product[]
  onAddToCart: (productId: string) => void
}

export function ProductGrid({ products, onAddToCart }: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">📦</div>
        <h2 className="text-2xl font-semibold text-default-500 mb-2">No products found</h2>
        <p className="text-default-400">Try adjusting your search or filters</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  )
}
