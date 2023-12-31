import {
  fetchBaseQuery,
  createApi,
  FetchArgs,
} from "@reduxjs/toolkit/query/react"
import { RootState } from "../app/store"
import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes"
import { logOut, setCredentials } from "../features/auth/authenticationSlice"
import Cookies from "js-cookie"
import { AUTH_SERVICE_PATH } from "../config/apiRoute"

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_SERVICE_HOST,
  credentials: "include",
  prepareHeaders: (headers: Headers, { getState }) => {
    const token = (getState() as RootState).auth.token
    if (token) {
      headers.set("Authorization", `Bearer ${token}`)
    }

    return headers
  },
})

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {},
) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result?.error?.status === "FETCH_ERROR") {
    console.log("sending refresh token")

    // send refresh token to get new access token
    const refreshResult = await baseQuery(
      `${AUTH_SERVICE_PATH}/refresh`,
      api,
      extraOptions,
    )
    console.log(refreshResult)
    if (refreshResult?.data) {
      // store the new token
      //const token = refreshResult.data

      api.dispatch(setCredentials(refreshResult.data))
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logOut())
    }
  }

  return result
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
})
