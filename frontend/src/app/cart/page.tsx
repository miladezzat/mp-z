'use client'

import { Spinner } from '@nextui-org/react'
import AuthGuard from '@/components/guards/AuthGuard'
import { CartHeader, CartItemsList, OrderSummary, EmptyCart } from '@/components/cart'
import { useCart } from '@/hooks/useCart'

function CartPageContent() {
  const {
    user,
    cartItems,
    isEmpty,
    isLoading,
    error,
    subtotal,
    shipping,
    total,
    handleQuantityChange,
    handleRemoveItem,
    handleCheckout,
    handleContinueShopping,
    handleLogout,
    handleNavigate,
  } = useCart()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Error loading cart</h2>
          <p className="text-default-500">Please try again later</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <CartHeader
        userName={user?.name}
        userEmail={user?.email}
        onContinueShopping={handleContinueShopping}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />

      <main className="container mx-auto px-4 py-8">
        {isEmpty ? (
          <EmptyCart onBrowseProducts={handleContinueShopping} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <CartItemsList
              items={cartItems}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemoveItem}
            />
            <OrderSummary
              subtotal={subtotal}
              shipping={shipping}
              total={total}
              onCheckout={handleCheckout}
            />
          </div>
        )}
      </main>
    </div>
  )
}

export default function CartPage() {
  return (
    <AuthGuard message="Please login to view your cart">
      <CartPageContent />
    </AuthGuard>
  )
}
