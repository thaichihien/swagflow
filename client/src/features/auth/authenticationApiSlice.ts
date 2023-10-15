import { apiSlice } from "../../api/apiSlice"
import { CustomerProfile } from "../../interfaces/customer-profile"

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
        url: "/auth/sign-in",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<AuthResDto, RegisterDto>({
      query: (credentials) => ({
        url: "/auth/sign-up",
        method: "POST",
        body: credentials,
      }),
    }),
    profile: builder.mutation<CustomerProfile, void>({
      query: () => ({
        url: "/customer/profile",
        method: "GET",
      }),
    }),
   
  }),
})

export const { useLoginMutation, useRegisterMutation,useProfileMutation } = authApiSlice
