import { baseApi } from './baseApi'
import { API_ROUTES, API_TAGS, buildQueryString } from '../constants/apiRoutes'
import type { Product, GetProductsParams, GetProductsResponse } from '@/types'

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<GetProductsResponse, GetProductsParams | void>({
      query: (params) => {
        if (!params) return API_ROUTES.PRODUCTS.LIST

        const queryParams: Record<string, string | number | boolean | undefined> = {}
        if (params.categoryId) queryParams.category = params.categoryId
        if (params.search) queryParams.search = params.search
        if (params.page) queryParams.page = params.page
        if (params.limit) queryParams.limit = params.limit
        if (params.sortBy) queryParams.sortBy = params.sortBy
        if (params.sortOrder) queryParams.sortOrder = params.sortOrder
        if (params.minPrice) queryParams.minPrice = params.minPrice
        if (params.maxPrice) queryParams.maxPrice = params.maxPrice
        if (params.inStock !== undefined) queryParams.inStock = params.inStock
        if (params.featured !== undefined) queryParams.featured = params.featured

        return `${API_ROUTES.PRODUCTS.LIST}${buildQueryString(queryParams)}`
      },
      transformResponse: (response: any) => {
        const data = response.data || response
        return {
          products:
            data.products?.map((p: any) => ({
              ...p,
              _id: p.id || p._id,
              id: p.id || p._id,
            })) || [],
          total: data.pagination?.total || data.total || 0,
          page: data.pagination?.page || data.page || 1,
          pages: data.pagination?.pages || data.pages || 1,
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.products.map(({ _id }) => ({ type: API_TAGS.PRODUCTS, id: _id }) as const),
              { type: API_TAGS.PRODUCTS, id: 'LIST' } as const,
            ]
          : [{ type: API_TAGS.PRODUCTS, id: 'LIST' } as const],
    }),
    getProduct: builder.query<Product, string>({
      query: (id: string) => API_ROUTES.PRODUCTS.DETAIL(id),
      transformResponse: (response: any) => {
        const product = response.data || response
        return {
          ...product,
          _id: product.id || product._id,
          id: product.id || product._id,
        }
      },
      providesTags: (_result, _error, id) => [{ type: API_TAGS.PRODUCT, id } as const],
    }),
  }),
})

export const { useGetProductsQuery, useGetProductQuery } = productsApi
