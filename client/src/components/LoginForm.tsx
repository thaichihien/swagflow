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
  const from = location.state?.from?.pathname || "/"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

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
    } catch (error: any) {
      setErrorMessage(error.data.message)
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
      <div className="form-text mb-3 text-danger">{errorMessage}</div>
      <div className="d-grid gap-2">
        <button
          className="btn btn-success"
          disabled={isLoading}
          onClick={handleLoginSubmit}
        >
          Submit
        </button>
      </div>
    </>
  )
}

export default LoginForm
