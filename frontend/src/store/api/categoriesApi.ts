import { baseApi } from './baseApi'
import { API_ROUTES, API_TAGS } from '../constants/apiRoutes'
import type { Category } from '@/types/entities.types'
import type { GetCategoriesResponse } from '@/types/api.responses'

export const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => API_ROUTES.CATEGORIES.LIST,
      transformResponse: (response: GetCategoriesResponse) => {
        return response.data.map((category: any) => ({
          ...category,
          _id: category.id || category._id,
        }))
      },
      providesTags: [API_TAGS.CATEGORIES],
    }),
  }),
})

export const { useGetCategoriesQuery } = categoriesApi
