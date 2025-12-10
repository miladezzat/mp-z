import { baseApi } from './baseApi'
import { API_ROUTES, API_TAGS, HTTP_METHODS } from '../constants/apiRoutes'
import type { Cart, AddToCartRequest, UpdateCartItemRequest } from '@/types'

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<Cart, void>({
      query: () => API_ROUTES.CART.BASE,
      transformResponse: (response: any) => {
        const data = response.data || response
        return {
          _id: 'cart-' + Date.now(),
          user: data.userId || 'user-1',
          items:
            data.items?.map((item: any) => ({
              _id: item.id || item._id,
              id: item.id,
              product: {
                _id: item.product.id || item.product._id,
                id: item.product.id,
                name: item.product.name,
                description: item.product.description || '',
                price: item.product.price,
                stock: item.product.stock,
                images: item.product.images,
                imageUrl: item.product.images?.[0],
              },
              quantity: item.quantity,
            })) || [],
          totalAmount: data.subtotal || 0,
        }
      },
      providesTags: [API_TAGS.CART],
    }),
    addToCart: builder.mutation<Cart, AddToCartRequest>({
      query: (item: AddToCartRequest) => ({
        url: API_ROUTES.CART.BASE,
        method: HTTP_METHODS.POST,
        body: item,
      }),
      transformResponse: (response: any) => {
        const data = response.data || response
        return {
          _id: 'cart-' + Date.now(),
          user: data.userId || 'user-1',
          items:
            data.items?.map((item: any) => ({
              _id: item.id || item._id,
              product: {
                _id: item.product.id || item.product._id,
                id: item.product.id,
                name: item.product.name,
                description: item.product.description || '',
                price: item.product.price,
                stock: item.product.stock,
                images: item.product.images,
                imageUrl: item.product.images?.[0],
              },
              quantity: item.quantity,
            })) || [],
          totalAmount: data.subtotal || 0,
        }
      },
      // Optimistic update
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          cartApi.util.updateQueryData('getCart', undefined, (draft) => {
            // Optimistically add item to cart
            const existingItem = draft.items.find((item) => item.product._id === arg.productId)
            if (existingItem) {
              existingItem.quantity += arg.quantity
            }
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      invalidatesTags: [API_TAGS.CART],
    }),
    updateCartItem: builder.mutation<Cart, UpdateCartItemRequest>({
      query: ({ itemId, quantity }: UpdateCartItemRequest) => ({
        url: API_ROUTES.CART.UPDATE(itemId),
        method: HTTP_METHODS.PUT,
        body: { quantity },
      }),
      transformResponse: (response: any) => {
        const data = response.data || response
        return {
          _id: 'cart-' + Date.now(),
          user: data.userId || 'user-1',
          items:
            data.items?.map((item: any) => ({
              _id: item.id || item._id,
              product: {
                _id: item.product.id || item.product._id,
                id: item.product.id,
                name: item.product.name,
                description: item.product.description || '',
                price: item.product.price,
                stock: item.product.stock,
                images: item.product.images,
                imageUrl: item.product.images?.[0],
              },
              quantity: item.quantity,
            })) || [],
          totalAmount: data.subtotal || 0,
        }
      },
      // Optimistic update
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          cartApi.util.updateQueryData('getCart', undefined, (draft) => {
            const item = draft.items.find((item) => item._id === arg.itemId)
            if (item) {
              item.quantity = arg.quantity
            }
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      invalidatesTags: [API_TAGS.CART],
    }),
    removeFromCart: builder.mutation<Cart, string>({
      query: (itemId: string) => ({
        url: API_ROUTES.CART.REMOVE(itemId),
        method: HTTP_METHODS.DELETE,
      }),
      transformResponse: (response: any) => {
        const data = response.data || response
        return {
          _id: 'cart-' + Date.now(),
          user: data.userId || 'user-1',
          items:
            data.items?.map((item: any) => ({
              _id: item.id || item._id,
              product: {
                _id: item.product.id || item.product._id,
                id: item.product.id,
                name: item.product.name,
                description: item.product.description || '',
                price: item.product.price,
                stock: item.product.stock,
                images: item.product.images,
                imageUrl: item.product.images?.[0],
              },
              quantity: item.quantity,
            })) || [],
          totalAmount: data.subtotal || 0,
        }
      },
      // Optimistic update
      async onQueryStarted(itemId, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          cartApi.util.updateQueryData('getCart', undefined, (draft) => {
            draft.items = draft.items.filter((item) => item._id !== itemId)
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      invalidatesTags: [API_TAGS.CART],
    }),
    clearCart: builder.mutation<void, void>({
      query: () => ({
        url: API_ROUTES.CART.CLEAR,
        method: HTTP_METHODS.DELETE,
      }),
      invalidatesTags: [API_TAGS.CART],
    }),
  }),
})

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
} = cartApi
