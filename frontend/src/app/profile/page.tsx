'use client'

import { Card, CardBody, Button, Avatar, Divider } from '@nextui-org/react'
import { useAppSelector } from '@/hooks/redux'
import { useAuth } from '@/hooks/useAuth'
import AuthGuard from '@/components/guards/AuthGuard'

function ProfilePageContent() {
  const { user } = useAppSelector((state) => state.auth)
  const { handleLogout, handleNavigate } = useAuth()

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
              <h1 className="text-2xl font-bold">My Profile</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardBody className="p-6">
            <div className="flex flex-col items-center text-center mb-6">
              <Avatar
                name={user?.name || user?.email}
                size="lg"
                className="w-24 h-24 text-2xl mb-4"
              />
              <h2 className="text-2xl font-bold">{user?.name || 'User'}</h2>
              <p className="text-default-500">{user?.email}</p>
            </div>

            <Divider className="my-6" />

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-3">Account Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-default-500">Email:</span>
                    <span className="font-medium">{user?.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-default-500">Name:</span>
                    <span className="font-medium">{user?.name || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-default-500">User ID:</span>
                    <span className="font-medium text-sm">{user?.id}</span>
                  </div>
                </div>
              </div>

              <Divider />

              <div>
                <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <Button
                    className="w-full"
                    variant="flat"
                    onPress={() => handleNavigate('/orders')}
                  >
                    View Orders
                  </Button>
                  <Button className="w-full" variant="flat" onPress={() => handleNavigate('/cart')}>
                    View Cart
                  </Button>
                  <Button
                    className="w-full"
                    variant="flat"
                    onPress={() => handleNavigate('/products')}
                  >
                    Browse Products
                  </Button>
                </div>
              </div>

              <Divider />

              <Button color="danger" variant="flat" className="w-full" onPress={handleLogout}>
                Logout
              </Button>
            </div>
          </CardBody>
        </Card>
      </main>
    </div>
  )
}

export default function ProfilePage() {
  return (
    <AuthGuard message="Please login to view your profile">
      <ProfilePageContent />
    </AuthGuard>
  )
}
