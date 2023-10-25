import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { CartItem } from "../../interfaces/cart-item"
import { Product } from "../../interfaces/product"
import { cartAxios, privateAxios } from "../../api/axios"
import { Cart } from "../../interfaces/cart"
import { RootState } from "../../app/store"
import { CART_SERVICE_PATH } from "../../config/apiRoute"
import { useAppSelector } from "../../app/hooks"
import { selectCurrentToken } from "../auth/authenticationSlice"

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

export const getCart = createAsyncThunk("cart/getCart", async (token : string | null) => {
  try {

    let config = {}

    if(token){
      config = {
        headers: {
          'Authorization': `Bearer ${token}`, 
        }
      }
    }
    
    
    const response = await privateAxios.get(CART_SERVICE_PATH,config)

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
export const removeItemFromCart = createAsyncThunk("cart/removeItemFromCart", async (productId : string) => {
  try {
    const response = await privateAxios.delete(`${CART_SERVICE_PATH}/items/${productId}`)

    if (response.status >= 200 && response.status < 300) {
      const resJson = JSON.parse(response.data)
      return resJson
    } else {
      console.log("fetch error at removeItemFromCart ", response)
    }
  } catch (error) {
    console.log("fetch error at removeItemFromCart ", error)
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
    }),
    
    builder.addCase(removeItemFromCart.pending, (state) => {
      state.status = "loading"
    })
    builder.addCase(
        removeItemFromCart.fulfilled,
      (state, action: PayloadAction<Cart>) => {
        state.status = "succeeded"
        state.cart = action.payload
      },
    )
    builder.addCase(removeItemFromCart.rejected, (state, action) => {
      state.status = "failed"
      state.error = action.error.message || "Something went wrong"
    })
  },
})

export const selectCart = (state : RootState) => state.cart
export default cartSlice.reducer