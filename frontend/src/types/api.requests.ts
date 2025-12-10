import type { ShippingAddress } from './entities.types'

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
  confirmPassword?: string
}

export interface UpdateProfileRequest {
  name?: string
  email?: string
  currentPassword?: string
  newPassword?: string
}

export interface GetProductsParams {
  categoryId?: string
  search?: string
  page?: number
  limit?: number
  sortBy?: 'price' | 'name' | 'rating' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  featured?: boolean
}

export interface AddToCartRequest {
  productId: string
  quantity: number
}

export interface UpdateCartItemRequest {
  itemId: string
  quantity: number
}

export interface CreateOrderRequest {
  shippingAddress: ShippingAddress
  paymentMethod?: string
  notes?: string
}

export interface UpdateOrderStatusRequest {
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled'
}

export interface CreateReviewRequest {
  productId: string
  rating: number
  comment: string
}

export interface UpdateReviewRequest {
  rating?: number
  comment?: string
}
