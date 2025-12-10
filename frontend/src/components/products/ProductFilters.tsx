'use client'

import { Input, Chip } from '@nextui-org/react'
import type { Category } from '@/types/entities.types'

interface ProductFiltersProps {
  search: string
  categoryId: string
  categories: Category[]
  onSearchChange: (value: string) => void
  onCategoryChange: (categoryId: string | null) => void
}

export function ProductFilters({
  search,
  categoryId,
  categories,
  onSearchChange,
  onCategoryChange,
}: ProductFiltersProps) {
  return (
    <div className="mb-8 space-y-4">
      <Input
        type="search"
        placeholder="Search products..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="max-w-md"
      />
      <div className="overflow-x-auto pb-2 scrollbar-hide">
        <div className="flex gap-2 min-w-max">
          <Chip
            variant={!categoryId ? 'solid' : 'bordered'}
            color="primary"
            onClick={() => onCategoryChange(null)}
            className="cursor-pointer"
          >
            All
          </Chip>
          {categories.map((category) => (
            <Chip
              key={category._id}
              variant={categoryId === category._id ? 'solid' : 'bordered'}
              color="primary"
              onClick={() => onCategoryChange(category._id)}
              className="cursor-pointer"
            >
              {category.name}
            </Chip>
          ))}
        </div>
      </div>
    </div>
  )
}
