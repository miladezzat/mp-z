'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { useAppSelector } from '@/hooks/redux'
import { useAuth } from './useAuth'
import { useGetCartQuery } from '@/store/api/cartApi'
import { useCreateOrderMutation } from '@/store/api/ordersApi'

export function useCheckout() {
  const { user } = useAppSelector((state) => state.auth)
  const { handleLogout, handleNavigate } = useAuth()

  // API queries
  const { data: cart, isLoading } = useGetCartQuery(undefined)
  const [createOrder, { isLoading: isCreatingOrder }] = useCreateOrderMutation()

  // Form state
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
  })

  // Computed values
  const isEmpty = !cart || cart.items.length === 0
  const subtotal = cart?.totalAmount || 0
  const tax = subtotal * 0.08
  const shipping = 15.99
  const total = subtotal + tax + shipping

  // Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    })
  }

  const handleCheckout = async () => {
    if (
      !shippingAddress.street ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.zipCode
    ) {
      toast.error('Please fill in all shipping address fields')
      return
    }

    try {
      await createOrder({ shippingAddress }).unwrap()
      toast.success('Order placed successfully!')
      handleNavigate('/orders')
    } catch (err: any) {
      console.error('Checkout error:', err)
      toast.error(err?.data?.message || err?.message || 'Failed to place order')
    }
  }

  return {
    // State
    user,
    cart,
    isEmpty,
    isLoading,
    isCreatingOrder,
    shippingAddress,

    // Computed
    subtotal,
    tax,
    shipping,
    total,

    // Handlers
    handleInputChange,
    handleCheckout,
    handleLogout,
    handleNavigate,
  }
}
