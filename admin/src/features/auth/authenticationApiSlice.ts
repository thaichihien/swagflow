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
    profile: builder.mutation<UserProfile, void>({
      query: () => ({
        url: `${ACCOUNT_SERVICE_PATH}/profile`,
        method: "GET",
      }),
    }),
   
  }),
})

export const { useLoginMutation, useRegisterMutation,useProfileMutation } = authApiSlice
