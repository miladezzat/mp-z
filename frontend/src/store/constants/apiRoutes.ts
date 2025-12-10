export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    PROFILE: '/auth/profile',
    LOGOUT: '/auth/logout',
  },

  PRODUCTS: {
    LIST: '/products',
    DETAIL: (id: string) => `/products/${id}`,
    BY_CATEGORY: (categoryId: string) => `/products?category=${categoryId}`,
    SEARCH: (query: string) => `/products?search=${query}`,
  },

  CART: {
    BASE: '/cart',
    ITEM: (itemId: string) => `/cart/${itemId}`,
    UPDATE: (itemId: string) => `/cart/${itemId}`,
    REMOVE: (itemId: string) => `/cart/${itemId}`,
    CLEAR: '/cart',
  },

  ORDERS: {
    LIST: '/orders',
    DETAIL: (id: string) => `/orders/${id}`,
    CREATE: '/orders',
    CANCEL: (id: string) => `/orders/${id}/cancel`,
    UPDATE_STATUS: (id: string) => `/orders/${id}/status`,
  },

  CATEGORIES: {
    LIST: '/categories',
    DETAIL: (id: string) => `/categories/${id}`,
  },

  REVIEWS: {
    BY_PRODUCT: (productId: string) => `/products/${productId}/reviews`,
    CREATE: '/reviews',
    UPDATE: (id: string) => `/reviews/${id}`,
    DELETE: (id: string) => `/reviews/${id}`,
  },
} as const

export const API_TAGS = {
  USER: 'User',
  PRODUCTS: 'Products',
  PRODUCT: 'Product',
  CART: 'Cart',
  ORDERS: 'Orders',
  CATEGORIES: 'Categories',
  REVIEWS: 'Reviews',
} as const

export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const

export const buildQueryString = (
  params: Record<string, string | number | boolean | undefined>
): string => {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value))
    }
  })

  const queryString = searchParams.toString()
  return queryString ? `?${queryString}` : ''
}
