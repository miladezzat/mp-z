'use client'

import { Card, CardBody, CardFooter, Button } from '@nextui-org/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import NextImage from 'next/image'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
  onAddToCart: (productId: string) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const router = useRouter()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const productId = product._id
  const images =
    product.images && product.images.length > 0
      ? product.images
      : product.imageUrl
        ? [product.imageUrl]
        : ['https://placehold.co/600x400?text=Product']

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const handleCardClick = () => {
    router.push(`/products/${product.slug}`)
  }

  const handleAddToCart = () => {
    onAddToCart(product.id || product._id)
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardBody className="p-0 flex flex-col">
        {/* Product Image with Carousel */}
        <div
          className="relative w-full h-48 group flex-shrink-0 bg-gray-100 cursor-pointer"
          onClick={handleCardClick}
        >
          <NextImage
            src={images[currentImageIndex]}
            alt={product.name}
            width={600}
            height={400}
            unoptimized
            className="w-full h-48 object-cover"
          />
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                aria-label="Next image"
              >
                ›
              </button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {images.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      idx === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 flex-grow cursor-pointer" onClick={handleCardClick}>
          <h3 className="text-lg font-semibold mb-2 line-clamp-1">{product.name}</h3>
          <p className="text-sm text-default-500 line-clamp-2 mb-3">{product.description}</p>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xl font-bold text-primary">${product.price.toFixed(2)}</span>
            {product.rating && <span className="text-sm">⭐ {product.rating.toFixed(1)}</span>}
          </div>
          <div className="text-sm text-default-500">
            <span className={product.stock === 0 ? 'text-red-500' : ''}>
              Stock: {product.stock}
            </span>
          </div>
        </div>
      </CardBody>

      {/* Add to Cart Button */}
      <CardFooter className="pt-0">
        <Button
          color="primary"
          className="w-full"
          onPress={handleAddToCart}
          isDisabled={product.stock === 0}
        >
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  )
}
