import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import productsReducer from "../features/products/productSlide"
import authReducer from "../features/auth/authenticationSlice"
import { apiSlice } from "../api/apiSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware)
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
