export interface User {
  id: string
  email: string
  name: string
  createdAt?: string
  updatedAt?: string
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
  status?: 'active' | 'inactive' | 'out-of-stock'
  createdAt?: string
  updatedAt?: string
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
  subtotal?: number
  tax?: number
  shipping?: number
}

export interface ShippingAddress {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface OrderItem {
  productId: string
  name: string
  quantity: number
  price: number
  imageUrl?: string
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'

export interface Order {
  _id: string
  user: string
  items: OrderItem[]
  totalAmount: number
  status: OrderStatus
  shippingAddress: ShippingAddress
  paymentMethod?: string
  paymentStatus?: PaymentStatus
  createdAt: string
  updatedAt: string
  deliveredAt?: string
  shippedAt?: string
  cancelledAt?: string
}

export interface Category {
  _id: string
  name: string
  slug?: string
  description?: string
  imageUrl?: string
  productCount?: number
  parentId?: string
  featured?: boolean
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
  updatedAt?: string
  helpful?: number
}
