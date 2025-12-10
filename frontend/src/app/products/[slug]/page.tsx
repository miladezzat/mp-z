'use client'

import {
  Card,
  CardBody,
  Button,
  Spinner,
  Chip,
  Divider,
  Badge,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react'
import { toast } from 'sonner'
import { useGetProductQuery } from '@/store/api/productsApi'
import { useAddToCartMutation, useGetCartQuery } from '@/store/api/cartApi'
import { useAppSelector } from '@/hooks/redux'
import { useAuth } from '@/hooks/useAuth'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import NextImage from 'next/image'

export default function ProductDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const { isAuthenticated, user } = useAppSelector((state) => state.auth)
  const { handleLogout, handleNavigate } = useAuth()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Use the slug to fetch the product
  const { data: product, isLoading, error } = useGetProductQuery(slug)

  const { data: cartData } = useGetCartQuery(undefined, {
    skip: !isAuthenticated,
  })

  const [addToCart, { isLoading: isAddingToCart }] = useAddToCartMutation()

  const cartItemCount = cartData?.items?.reduce((sum: number, item) => sum + item.quantity, 0) || 0

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart')
      handleNavigate('/login')
      return
    }

    if (!product) return

    try {
      await addToCart({
        productId: product.id || product._id,
        quantity: 1,
      }).unwrap()
      toast.success('Added to cart!')
    } catch (err) {
      console.error('Add to cart error:', err)
      const error = err as { data?: { message?: string }; message?: string }
      toast.error(error?.data?.message || error?.message || 'Failed to add to cart')
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Product not found</h2>
          <p className="text-default-500 mt-2">
            The product you&apos;re looking for doesn&apos;t exist
          </p>
          <Button color="primary" className="mt-4" onPress={() => handleNavigate('/products')}>
            Back to Products
          </Button>
        </div>
      </div>
    )
  }

  const images =
    product.images && product.images.length > 0
      ? product.images
      : product.imageUrl
        ? [product.imageUrl]
        : ['https://placehold.co/600x400?text=Product']

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="light" onPress={() => handleNavigate('/products')}>
                ← Back
              </Button>
              <h1 className="text-2xl font-bold">Product Details</h1>
            </div>
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <Badge
                    content={cartItemCount}
                    color="primary"
                    isInvisible={cartItemCount === 0}
                    shape="circle"
                  >
                    <Button color="primary" variant="light" onPress={() => handleNavigate('/cart')}>
                      🛒 Cart
                    </Button>
                  </Badge>
                  <Button color="primary" variant="light" onPress={() => handleNavigate('/orders')}>
                    Orders
                  </Button>
                  <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                      <Avatar
                        as="button"
                        className="transition-transform"
                        name={user?.name || user?.email}
                        size="sm"
                        isBordered
                        color="primary"
                      />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                      <DropdownItem key="profile" className="h-14 gap-2">
                        <p className="font-semibold">Signed in as</p>
                        <p className="font-semibold">{user?.email}</p>
                      </DropdownItem>
                      <DropdownItem key="my-profile" onPress={() => handleNavigate('/profile')}>
                        My Profile
                      </DropdownItem>
                      <DropdownItem key="orders" onPress={() => handleNavigate('/orders')}>
                        My Orders
                      </DropdownItem>
                      <DropdownItem key="cart" onPress={() => handleNavigate('/cart')}>
                        Shopping Cart
                      </DropdownItem>
                      <DropdownItem key="logout" color="danger" onPress={handleLogout}>
                        Logout
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </>
              ) : (
                <Button color="primary" onPress={() => handleNavigate('/login')}>
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <Card>
              <CardBody className="p-0">
                <div className="relative w-full aspect-square bg-gray-100">
                  <NextImage
                    src={images[currentImageIndex]}
                    alt={product.name}
                    width={800}
                    height={800}
                    unoptimized
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardBody>
            </Card>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 ${
                      index === currentImageIndex ? 'border-primary' : 'border-gray-300'
                    }`}
                  >
                    <NextImage
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      width={80}
                      height={80}
                      unoptimized
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              {product.rating && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-lg">⭐ {product.rating.toFixed(1)}</span>
                  {product.reviewCount && (
                    <span className="text-default-500">({product.reviewCount} reviews)</span>
                  )}
                </div>
              )}
            </div>

            <Divider />

            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</span>
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <span className="text-xl text-default-400 line-through">
                    ${product.compareAtPrice.toFixed(2)}
                  </span>
                )}
              </div>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <Chip color="success" variant="flat" size="sm">
                  Save ${(product.compareAtPrice - product.price).toFixed(2)}
                </Chip>
              )}
            </div>

            <Divider />

            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-default-600">{product.description}</p>
            </div>

            {product.specifications && (
              <>
                <Divider />
                <div>
                  <h3 className="text-lg font-semibold mb-3">Specifications</h3>
                  <div className="space-y-2">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-default-500 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </span>
                        <span className="font-medium">{value as string}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            <Divider />

            <div className="flex items-center gap-4">
              <Chip color={product.stock > 0 ? 'success' : 'danger'} variant="flat">
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </Chip>
              {product.tags && product.tags.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {product.tags.slice(0, 3).map((tag: string) => (
                    <Chip key={tag} size="sm" variant="bordered">
                      {tag}
                    </Chip>
                  ))}
                </div>
              )}
            </div>

            <Button
              color="primary"
              size="lg"
              className="w-full"
              onPress={handleAddToCart}
              isDisabled={product.stock === 0}
              isLoading={isAddingToCart}
            >
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>

            {product.sku && <p className="text-sm text-default-400">SKU: {product.sku}</p>}
          </div>
        </div>
      </main>
    </div>
  )
}
