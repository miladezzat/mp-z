import type { User, Product, Cart, Order, Category, Review } from './entities.types'

export interface ApiResponse<T = any> {
  success: boolean
  data: T
  message?: string
  error?: string
}

export interface ApiError {
  message: string
  status?: number
  code?: string
}

export interface PaginationMeta {
  total: number
  page: number
  pages: number
  limit: number
  hasNext?: boolean
  hasPrev?: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: PaginationMeta
}

export interface AuthResponse {
  token: string
  user: User
}

export interface GetProductsResponse {
  products: Product[]
  total: number
  page: number
  pages: number
}

export interface GetProductResponse {
  product: Product
}

export interface GetCartResponse {
  cart: Cart
}

export interface GetOrdersResponse {
  orders: Order[]
  total: number
}

export interface GetOrderResponse {
  order: Order
}

export interface CreateOrderResponse {
  order: Order
  message: string
}

export interface GetCategoriesResponse {
  success: boolean
  data: Category[]
}

export interface GetReviewsResponse {
  reviews: Review[]
  total: number
  averageRating: number
}

export interface CreateReviewResponse {
  review: Review
  message: string
}
