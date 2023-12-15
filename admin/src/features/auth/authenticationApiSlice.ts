import { apiSlice } from "../../api/apiSlice"
import { ACCOUNT_SERVICE_PATH, AUTH_SERVICE_PATH } from "../../config/apiRoute"
import { UserProfile } from "../../interfaces/user-profile"


export interface LoginDto {
  email: string
  password: string
}
export interface RegisterDto extends LoginDto {
  firstName: string
  lastName: string
  dob: Date
  phone?: string
}

export interface AuthResDto {
  access_token: string
}

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResDto, LoginDto>({
      query: (credentials) => ({
        url: `${AUTH_SERVICE_PATH}/sign-in`,
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<AuthResDto, RegisterDto>({
      query: (credentials) => ({
        url: `${AUTH_SERVICE_PATH}/sign-up`,
        method: "POST",
        body: credentials,
      }),
    }),
    profile: builder.query({
      query: () => ({
        url: `${ACCOUNT_SERVICE_PATH}/profile`,
        method: "GET",
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: `${AUTH_SERVICE_PATH}/log-out`,
        method: "GET",
      }),
    }),


  }),
})

export const { useLoginMutation, useRegisterMutation,useProfileQuery,useLogoutMutation } = authApiSlice
