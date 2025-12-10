'use client'

import { Pagination as NextUIPagination } from '@nextui-org/react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  showControls?: boolean
  size?: 'sm' | 'md' | 'lg'
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  className?: string
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showControls = true,
  size = 'lg',
  color = 'primary',
  className = '',
}: PaginationProps) {
  if (totalPages <= 1) {
    return null
  }

  return (
    <div className={`flex justify-center mt-8 ${className}`}>
      <NextUIPagination
        total={totalPages}
        page={currentPage}
        onChange={onPageChange}
        showControls={showControls}
        showShadow
        color={color}
        size={size}
      />
    </div>
  )
}
