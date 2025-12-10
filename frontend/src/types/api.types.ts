export interface User {
  id: string
  email: string
  name: string
}

export interface AuthResponse {
  token: string
  user: User
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
}

export interface Product {
  _id: string
  id?: string
  name: string
  slug: string
  description: string
  price: number
  compareAtPrice?: number
  category?: string
  categoryId?: string
  stock: number
  imageUrl?: string
  images?: string[]
  rating?: number
  reviewCount?: number
  sku?: string
  tags?: string[]
  specifications?: Record<string, string>
  featured?: boolean
  status?: string
}

export interface CartItem {
  _id: string
  id?: string
  product: Product
  quantity: number
}

export interface Cart {
  _id: string
  user: string
  items: CartItem[]
  totalAmount: number
}

export interface AddToCartRequest {
  productId: string
  quantity: number
}

export interface UpdateCartItemRequest {
  itemId: string
  quantity: number
}

export interface Order {
  _id: string
  user: string
  items: Array<{
    productId: string
    name: string
    quantity: number
    price: number
  }>
  totalAmount: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  shippingAddress: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  paymentMethod?: string
  paymentStatus?: string
  createdAt: string
  updatedAt: string
  deliveredAt?: string
  shippedAt?: string
}

export interface CreateOrderRequest {
  shippingAddress: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
}

export interface Category {
  _id: string
  name: string
  description?: string
}

export interface Review {
  _id: string
  product: string
  user: {
    _id: string
    name: string
  }
  rating: number
  comment: string
  createdAt: string
}

export interface CreateReviewRequest {
  productId: string
  rating: number
  comment: string
}

export interface ApiError {
  message: string
  status?: number
}
