import { baseApi } from './baseApi'
import { API_ROUTES, API_TAGS, HTTP_METHODS } from '../constants/apiRoutes'
import type { Order, CreateOrderRequest, GetOrdersResponse } from '@/types'

export const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<GetOrdersResponse, void>({
      query: () => API_ROUTES.ORDERS.LIST,
      transformResponse: (response: any) => {
        const orders = response?.data || response?.orders || []
        return {
          orders: orders.map((order: any) => ({
            _id: order._id || order.id,
            user: order.user || order.userId,
            items: order.items || [],
            totalAmount: order.totalAmount || order.total || 0,
            status: order.status,
            shippingAddress: order.shippingAddress,
            paymentMethod: order.paymentMethod,
            paymentStatus: order.paymentStatus,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
            deliveredAt: order.deliveredAt,
            shippedAt: order.shippedAt,
          })),
          total: orders.length,
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.orders.map(({ _id }) => ({ type: API_TAGS.ORDERS, id: _id }) as const),
              { type: API_TAGS.ORDERS, id: 'LIST' } as const,
            ]
          : [{ type: API_TAGS.ORDERS, id: 'LIST' } as const],
    }),
    getOrder: builder.query<Order, string>({
      query: (id: string) => API_ROUTES.ORDERS.DETAIL(id),
      providesTags: (_result, _error, id) => [{ type: API_TAGS.ORDERS, id } as const],
    }),
    createOrder: builder.mutation<Order, CreateOrderRequest>({
      query: (orderData: CreateOrderRequest) => ({
        url: API_ROUTES.ORDERS.CREATE,
        method: HTTP_METHODS.POST,
        body: orderData,
      }),
      invalidatesTags: [{ type: API_TAGS.ORDERS, id: 'LIST' } as const, API_TAGS.CART],
    }),
    cancelOrder: builder.mutation<Order, string>({
      query: (id: string) => ({
        url: API_ROUTES.ORDERS.CANCEL(id),
        method: HTTP_METHODS.PUT,
      }),
      invalidatesTags: (_result, _error, id) => [{ type: API_TAGS.ORDERS, id } as const],
    }),
  }),
})

export const {
  useGetOrdersQuery,
  useGetOrderQuery,
  useCreateOrderMutation,
  useCancelOrderMutation,
} = ordersApi
