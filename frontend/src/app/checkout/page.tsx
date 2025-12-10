'use client'

import { Spinner } from '@nextui-org/react'
import { useCheckout } from '@/hooks/useCheckout'
import {
  CheckoutHeader,
  ShippingAddressForm,
  OrderItemsList,
  CheckoutSummary,
  EmptyCheckout,
} from '@/components/checkout'
import AuthGuard from '@/components/guards/AuthGuard'

function CheckoutPageContent() {
  const {
    user,
    cart,
    isEmpty,
    isLoading,
    isCreatingOrder,
    shippingAddress,
    subtotal,
    tax,
    shipping,
    total,
    handleInputChange,
    handleCheckout,
    handleLogout,
    handleNavigate,
  } = useCheckout()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    )
  }

  if (isEmpty) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <CheckoutHeader
          userName={user?.name}
          userEmail={user?.email}
          onBackToCart={() => handleNavigate('/cart')}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
        <div className="container mx-auto px-4 py-8">
          <EmptyCheckout onBrowseProducts={() => handleNavigate('/products')} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <CheckoutHeader
        userName={user?.name}
        userEmail={user?.email}
        onBackToCart={() => handleNavigate('/cart')}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ShippingAddressForm
              shippingAddress={shippingAddress}
              onInputChange={handleInputChange}
            />
            <OrderItemsList items={cart!.items} />
          </div>

          <div>
            <CheckoutSummary
              subtotal={subtotal}
              tax={tax}
              shipping={shipping}
              total={total}
              isLoading={isCreatingOrder}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <AuthGuard message="Please login to checkout">
      <CheckoutPageContent />
    </AuthGuard>
  )
}
