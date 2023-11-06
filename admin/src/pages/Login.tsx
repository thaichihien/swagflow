import React, { useState } from "react"
import { useLoginMutation } from "../features/auth/authenticationApiSlice"
import { useAppDispatch } from "../app/hooks"
import { useLocation, useNavigate } from "react-router-dom"
import { setCredentials } from "../features/auth/authenticationSlice"

type Props = {}

function Login({}: Props) {
  const [login, { isLoading }] = useLoginMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  async function handleLogin(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    event.preventDefault()
    try {
      const res = await login({
        email: email,
        password: password,
      }).unwrap()
      console.log(res)

      dispatch(setCredentials(res))
      navigate(from, { replace: true })
    } catch (error: any) {
      //setErrorMessage(error.data.message)
      console.log(error)
    }
  }

  return (
    <>
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          <div className="row w-100 m-0">
            <div className="content-wrapper full-page-wrapper d-flex align-items-center auth login-bg">
              <div className="card col-lg-4 mx-auto">
                <div className="card-body px-5 py-5">
                  <h3 className="card-title text-left mb-3">Login</h3>
                  <form>
                    <div className="form-group">
                      <label>Email *</label>
                      <input
                        type="text"
                        className="form-control p_input"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Password *</label>
                      <input
                        type="text"
                        className="form-control p_input"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-group d-flex align-items-center justify-content-between">
                      <div className="form-check">
                        <label className="form-check-label">
                          <input type="checkbox" className="form-check-input" />{" "}
                          Remember me{" "}
                        </label>
                      </div>
                      <a href="#" className="forgot-pass">
                        Forgot password
                      </a>
                    </div>
                    <div className="form-text mb-3 text-danger">
                      {errorMessage}
                    </div>
                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block enter-btn"
                        onClick={handleLogin}
                        disabled={isLoading}
                      >
                        Login
                      </button>
                    </div>

                    <p className="sign-up">
                      Don't have an Account?<a href="#"> Sign Up</a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
