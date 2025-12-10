'use client'

import { Spinner } from '@nextui-org/react'
import { Header, ProductFilters, ProductGrid, LoginModal } from '@/components/products'
import { Pagination } from '@/components/common'
import { useProductsPage } from '@/hooks/useProductsPage'

export default function ProductsPage() {
  const {
    search,
    categoryId,
    currentPage,
    totalPages,
    isLoginModalOpen,
    isLoading,
    error,
    products,
    categories,
    cartItemCount,
    handleAddToCart,
    handleSearchChange,
    handleCategoryChange,
    handlePageChange,
    handleCloseLoginModal,
  } = useProductsPage()

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
          <h2 className="text-2xl font-bold text-red-600">Error loading products</h2>
          <p className="text-default-500">Please try again later</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header cartItemCount={cartItemCount} />

      <main className="container mx-auto px-4 py-8">
        <ProductFilters
          search={search}
          categoryId={categoryId}
          categories={categories}
          onSearchChange={handleSearchChange}
          onCategoryChange={handleCategoryChange}
        />

        <ProductGrid products={products} onAddToCart={handleAddToCart} />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>

      <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseLoginModal} />
    </div>
  )
}
