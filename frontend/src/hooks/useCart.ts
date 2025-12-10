'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { useAppSelector } from '@/hooks/redux'
import { useAuth } from './useAuth'
import {
  useGetCartQuery,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
} from '@/store/api/cartApi'

export function useCart() {
  const { user } = useAppSelector((state) => state.auth)
  const { handleLogout, handleNavigate } = useAuth()
  const [imageIndexes, setImageIndexes] = useState<Record<string, number>>({})

  // API queries
  const { data: cart, isLoading, error } = useGetCartQuery(undefined)
  const [updateCartItem, { isLoading: isUpdating }] = useUpdateCartItemMutation()
  const [removeFromCart, { isLoading: isRemoving }] = useRemoveFromCartMutation()

  // Computed values
  const cartItems = cart?.items || []
  const isEmpty = cartItems.length === 0
  const subtotal = cart?.totalAmount || 0
  const shipping = 0
  const total = subtotal + shipping

  // Handlers
  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return

    try {
      await updateCartItem({ itemId, quantity: newQuantity }).unwrap()
      toast.success('Quantity updated!')
    } catch (err: any) {
      console.error('Update quantity error:', err)
      toast.error(err?.data?.message || err?.message || 'Failed to update quantity')
    }
  }

  const handleRemoveItem = async (itemId: string) => {
    try {
      await removeFromCart(itemId).unwrap()
      toast.success('Item removed from cart')
    } catch (err: any) {
      console.error('Remove item error:', err)
      toast.error(err?.data?.message || err?.message || 'Failed to remove item')
    }
  }

  const handleCheckout = () => {
    handleNavigate('/checkout')
  }

  const handleContinueShopping = () => {
    handleNavigate('/products')
  }

  const setImageIndex = (itemId: string, index: number) => {
    setImageIndexes((prev) => ({ ...prev, [itemId]: index }))
  }

  const getImageIndex = (itemId: string) => {
    return imageIndexes[itemId] || 0
  }

  return {
    // State
    user,
    cartItems,
    isEmpty,
    isLoading,
    error,
    isUpdating,
    isRemoving,

    // Computed
    subtotal,
    shipping,
    total,

    // Handlers
    handleQuantityChange,
    handleRemoveItem,
    handleCheckout,
    handleContinueShopping,
    handleLogout,
    handleNavigate,
    setImageIndex,
    getImageIndex,
  }
}
