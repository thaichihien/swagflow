import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { serverConfig } from "../../config/env"
import { privateAxios } from "../../api/axios"
import { PRODUCT_SERVICE_PATH } from "../../config/apiRoute"

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
  async (token : string | null) => {
    try {
      let config = {}

      if (token) {
        config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      }

      const response = await privateAxios.get(`${PRODUCT_SERVICE_PATH}/products/admin`,config)

      if (response.status === 200) {
        const resJson = JSON.parse(response.data)
        return resJson
      } else {
        console.log("fetch error at fetchProducts ", response)
      }
    } catch (error) {
      console.log("fetch error at fetchProducts ", error)
      throw error
    }
  },
)

const productSlide = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateProducts: (state, action) => {
      state.data = action.payload;
    },
  },
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
export const {updateProducts} = productSlide.actions
