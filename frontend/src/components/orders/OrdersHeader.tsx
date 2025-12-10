'use client'

import {
  Button,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react'

interface OrdersHeaderProps {
  userName?: string
  userEmail?: string
  onContinueShopping: () => void
  onNavigate: (path: string) => void
  onLogout: () => void
}

export function OrdersHeader({
  userName,
  userEmail,
  onContinueShopping,
  onNavigate,
  onLogout,
}: OrdersHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Orders</h1>
          <div className="flex items-center gap-4">
            <Button color="primary" variant="light" onPress={onContinueShopping}>
              Continue Shopping
            </Button>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  as="button"
                  className="transition-transform"
                  name={userName || userEmail}
                  size="sm"
                  isBordered
                  color="primary"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{userEmail}</p>
                </DropdownItem>
                <DropdownItem key="my-profile" onPress={() => onNavigate('/profile')}>
                  My Profile
                </DropdownItem>
                <DropdownItem key="cart" onPress={() => onNavigate('/cart')}>
                  Cart
                </DropdownItem>
                <DropdownItem key="logout" color="danger" onPress={onLogout}>
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
    </header>
  )
}
