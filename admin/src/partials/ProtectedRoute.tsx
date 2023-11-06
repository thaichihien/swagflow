import React from "react"
import { useAppSelector } from "../app/hooks"
import {
  selectCurrentUser,
  selectIsAuthenticated,
} from "../features/auth/authenticationSlice"
import { Navigate, useLocation } from "react-router-dom"

type Props = {
  children: React.ReactNode
}

function ProtectedRoute({ children }: Props) {
  const user = useAppSelector(selectIsAuthenticated)
  let location = useLocation()

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  
  return children
}

export default ProtectedRoute
