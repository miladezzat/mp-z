'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQueryState } from 'nuqs'
import { toast } from 'sonner'
import { useAppSelector } from '@/hooks/redux'
import { useGetProductsQuery } from '@/store/api/productsApi'
import { useAddToCartMutation, useGetCartQuery } from '@/store/api/cartApi'
import { useGetCategoriesQuery } from '@/store/api/categoriesApi'

export function useProductsPage() {
  const router = useRouter()
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const [search, setSearch] = useQueryState('search', {
    defaultValue: '',
    throttleMs: 500,
  })

  const [categoryId, setCategoryId] = useQueryState('categoryId', {
    defaultValue: '',
  })

  const [page, setPage] = useQueryState('page', {
    defaultValue: '1',
    parse: (value) => value || '1',
  })

  const currentPage = parseInt(page) || 1
  const limit = 12

  const { data, isLoading, error } = useGetProductsQuery({
    search: search || undefined,
    categoryId: categoryId || undefined,
    page: currentPage,
    limit,
  })

  const { data: categoriesData, isLoading: isCategoriesLoading } = useGetCategoriesQuery()

  const { data: cartData } = useGetCartQuery(undefined, {
    skip: !isAuthenticated,
  })

  const [addToCart, { isLoading: isAddingToCart }] = useAddToCartMutation()

  const cartItemCount =
    cartData?.items?.reduce((sum: number, item: any) => sum + item.quantity, 0) || 0
  const totalPages = data?.pages || 1
  const categories = categoriesData || []

  const handleAddToCart = async (productId: string) => {
    if (!isAuthenticated) {
      setIsLoginModalOpen(true)
      return
    }

    try {
      await addToCart({ productId, quantity: 1 }).unwrap()
      toast.success('Added to cart!')
    } catch (err: any) {
      console.error('Add to cart error:', err)
      toast.error(err?.data?.message || err?.message || 'Failed to add to cart')
    }
  }

  const handleSearchChange = (value: string) => {
    setSearch(value)
  }

  const handleCategoryChange = (categoryId: string | null) => {
    setCategoryId(categoryId)
    setPage('1')
  }

  const handlePageChange = (newPage: number) => {
    setPage(String(newPage))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false)
  }

  return {
    search,
    categoryId,
    currentPage,
    totalPages,
    isLoginModalOpen,
    isLoading: isLoading || isCategoriesLoading,
    error,
    products: data?.products || [],
    categories,
    cartItemCount,
    isAddingToCart,

    handleAddToCart,
    handleSearchChange,
    handleCategoryChange,
    handlePageChange,
    handleCloseLoginModal,
  }
}
