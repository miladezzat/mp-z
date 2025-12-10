import { baseApi } from './baseApi'
import { API_ROUTES, API_TAGS, HTTP_METHODS } from '../constants/apiRoutes'
import type { AuthResponse, LoginRequest, RegisterRequest, User } from '@/types'

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials: LoginRequest) => ({
        url: API_ROUTES.AUTH.LOGIN,
        method: HTTP_METHODS.POST,
        body: credentials,
      }),
      transformResponse: (response: any) => {
        const data = response.data || response
        return {
          token: data.token,
          user: data.user,
        }
      },
      invalidatesTags: [API_TAGS.USER],
    }),
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (userData: RegisterRequest) => ({
        url: API_ROUTES.AUTH.REGISTER,
        method: HTTP_METHODS.POST,
        body: userData,
      }),
      invalidatesTags: [API_TAGS.USER],
    }),
    getProfile: builder.query<User, void>({
      query: () => API_ROUTES.AUTH.PROFILE,
      providesTags: [API_TAGS.USER],
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation, useGetProfileQuery } = authApi
