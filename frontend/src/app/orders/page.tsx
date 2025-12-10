'use client'

import { Spinner } from '@nextui-org/react'
import AuthGuard from '@/components/guards/AuthGuard'
import { OrdersHeader, OrdersList, EmptyOrders } from '@/components/orders'
import { useOrders } from '@/hooks/useOrders'

function OrdersPageContent() {
  const { user, orders, isEmpty, isLoading, error, handleLogout, handleNavigate, getStatusColor } =
    useOrders()

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
          <h2 className="text-2xl font-bold text-red-600">Error loading orders</h2>
          <p className="text-default-500">Please try again later</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <OrdersHeader
        userName={user?.name}
        userEmail={user?.email}
        onContinueShopping={() => handleNavigate('/products')}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />

      <main className="container mx-auto px-4 py-8">
        {isEmpty ? (
          <EmptyOrders onBrowseProducts={() => handleNavigate('/products')} />
        ) : (
          <OrdersList orders={orders} getStatusColor={getStatusColor} />
        )}
      </main>
    </div>
  )
}

export default function OrdersPage() {
  return (
    <AuthGuard message="Please login to view your orders">
      <OrdersPageContent />
    </AuthGuard>
  )
}
