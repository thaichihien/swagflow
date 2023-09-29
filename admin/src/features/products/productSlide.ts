import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { serverConfig } from "../../config/env"

export interface ProductSize {
  name: string
  quantity: number
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  brand: string
  sizes: ProductSize[]
  images: string[]
  createdAt: number
  updatedAt: number
}

export interface ResponseWrapper<T> {
  data: T
  loading: boolean
  error: string | null | undefined
}

const initialState: ResponseWrapper<Product[]> = {
  data: [],
  loading: false,
  error: null,
}

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch(serverConfig.endpoint("/product?view=admin"))
    
    const data = await response.json()
    console.log(data);
    return data
  },
)

const productSlide = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export default productSlide.reducer
