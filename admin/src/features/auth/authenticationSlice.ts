import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { UserProfile } from "../../interfaces/user-profile"


export interface AuthState {
  isAuthenticated: boolean
  user: UserProfile | null
  token: string | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { access_token } = action.payload
      state.token = access_token
      state.isAuthenticated = true
    },
    setProfile : (state,action) => {
      const data = action.payload
      state.user = data
    },
    logOut : (state) => {
        state.user = null
        state.token = null
        state.isAuthenticated = false
    }
  },
})

export const {setCredentials,logOut,setProfile} = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state : RootState) => state.auth.token
export const selectCurrentUser = (state : RootState) => state.auth.user
export const selectIsAuthenticated = (state : RootState) => state.auth.isAuthenticated
export const selectAuth = (state : RootState) => state.auth
