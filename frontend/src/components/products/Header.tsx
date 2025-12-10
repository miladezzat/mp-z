'use client'

import {
  Button,
  Badge,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useAppSelector, useAppDispatch } from '@/hooks/redux'
import { logout } from '@/store/slices/authSlice'
import { toast } from 'sonner'

interface HeaderProps {
  cartItemCount: number
}

export function Header({ cartItemCount }: HeaderProps) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { isAuthenticated, user } = useAppSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    toast.success('Logged out successfully')
    router.push('/login')
  }

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1
            className="text-2xl font-bold cursor-pointer"
            onClick={() => router.push('/products')}
          >
            Marketplace
          </h1>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Badge
                  content={cartItemCount}
                  color="primary"
                  isInvisible={cartItemCount === 0}
                  shape="circle"
                >
                  <Button color="primary" variant="light" onPress={() => router.push('/cart')}>
                    🛒 Cart
                  </Button>
                </Badge>
                <Button color="primary" variant="light" onPress={() => router.push('/orders')}>
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
                    <DropdownItem key="my-profile" onPress={() => router.push('/profile')}>
                      My Profile
                    </DropdownItem>
                    <DropdownItem key="orders" onPress={() => router.push('/orders')}>
                      My Orders
                    </DropdownItem>
                    <DropdownItem key="cart" onPress={() => router.push('/cart')}>
                      Shopping Cart
                    </DropdownItem>
                    <DropdownItem key="logout" color="danger" onPress={handleLogout}>
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </>
            ) : (
              <Button color="primary" onPress={() => router.push('/login')}>
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
