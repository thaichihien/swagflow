import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { CartItem } from "../../interfaces/cart-item"
import { Product } from "../../interfaces/product"
import { cartAxios } from "../../api/axios"
import { Cart } from "../../interfaces/cart"
import { RootState } from "../../app/store"

export interface CartState {
    cart : Cart
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState : CartState = {
    cart: {
        items: [],
        totalPrice: 0
    },
    status: "idle",
    error: null
}

export const getCart = createAsyncThunk("cart/getCart", async () => {
  try {
    const response = await cartAxios.get("")

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
})

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCart.pending, (state) => {
      state.status = "loading"
    })
    builder.addCase(
        getCart.fulfilled,
      (state, action: PayloadAction<Cart>) => {
        state.status = "succeeded"
        state.cart = action.payload
      },
    )
    builder.addCase(getCart.rejected, (state, action) => {
      state.status = "failed"
      state.error = action.error.message || "Something went wrong"
    })
  },
})

export const selectCart = (state : RootState) => state.cart
export default cartSlice.reducer