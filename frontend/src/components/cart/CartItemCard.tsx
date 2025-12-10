'use client'

import { Card, CardBody, Button, Input } from '@nextui-org/react'
import { useState } from 'react'
import NextImage from 'next/image'
import type { CartItem } from '@/types'

interface CartItemCardProps {
  item: CartItem
  onQuantityChange: (itemId: string, quantity: number) => void
  onRemove: (itemId: string) => void
}

export function CartItemCard({ item, onQuantityChange, onRemove }: CartItemCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const itemId = item._id
  const images =
    item.product.images && item.product.images.length > 0
      ? item.product.images
      : item.product.imageUrl
        ? [item.product.imageUrl]
        : ['https://placehold.co/600x400?text=Product']

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const handleQuantityInput = (value: string) => {
    const quantity = parseInt(value) || 1
    if (quantity >= 1) {
      onQuantityChange(item.product.id || item.product._id, quantity)
    }
  }

  return (
    <Card>
      <CardBody>
        <div className="flex gap-4">
          {/* Product Image */}
          <div className="relative w-24 h-24 flex-shrink-0 group bg-gray-100 rounded">
            <NextImage
              src={images[currentImageIndex]}
              alt={item.product.name}
              width={100}
              height={100}
              unoptimized
              className="w-24 h-24 rounded object-cover"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                  aria-label="Next image"
                >
                  ›
                </button>
              </>
            )}
          </div>

          {/* Product Details */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{item.product.name}</h3>
            <p className="text-sm text-default-500 line-clamp-2">{item.product.description}</p>
            <p className="text-xl font-bold text-primary mt-2">${item.product.price.toFixed(2)}</p>

            {/* Quantity Controls */}
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  isIconOnly
                  onPress={() =>
                    onQuantityChange(item.product.id || item.product._id, item.quantity - 1)
                  }
                  isDisabled={item.quantity <= 1}
                >
                  -
                </Button>
                <Input
                  type="number"
                  value={String(item.quantity)}
                  onChange={(e) => handleQuantityInput(e.target.value)}
                  className="w-20"
                  size="sm"
                  min="1"
                />
                <Button
                  size="sm"
                  isIconOnly
                  onPress={() =>
                    onQuantityChange(item.product.id || item.product._id, item.quantity + 1)
                  }
                >
                  +
                </Button>
              </div>
              <Button
                size="sm"
                color="danger"
                variant="light"
                onPress={() => onRemove(item.product.id || item.product._id)}
              >
                Remove
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
