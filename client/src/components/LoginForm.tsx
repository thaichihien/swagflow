import React, { useState } from "react"
import axios from "../api/axios"
import { useLocation, useNavigate } from "react-router-dom"
import { useLoginMutation } from "../features/auth/authenticationApiSlice"
import { useAppDispatch } from "../app/hooks"
import { setCredentials } from "../features/auth/authenticationSlice"

type Props = {}

function LoginForm({}: Props) {
  const [login, { isLoading }] = useLoginMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/playground"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleLoginSubmit(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): Promise<void> {
    event.preventDefault()

    try {
      const res = await login({
        email: email,
        password: password,
      }).unwrap()

      dispatch(setCredentials(res))
      navigate(from, { replace: true })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h3>Login</h3>
      <div className="mb-3">
        <label htmlFor="email-input" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="email-input"
          aria-describedby="emailHelp"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
        />
        <label className="form-check-label" htmlFor="exampleCheck1">
          Check me out
        </label>
      </div>
      <div className="d-grid gap-2">
        <button className="btn btn-success" onClick={handleLoginSubmit}>
          Submit
        </button>
      </div>
    </>
  )
}

export default LoginForm
