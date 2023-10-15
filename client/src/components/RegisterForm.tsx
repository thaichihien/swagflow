import React, { useState } from "react"
import axios from "../api/axios"
import { useLocation, useNavigate } from "react-router-dom"
import { useRegisterMutation } from "../features/auth/authenticationApiSlice"
import { useAppDispatch } from "../app/hooks"
import { setCredentials } from "../features/auth/authenticationSlice"

type Props = {}

function RegisterForm({}: Props) {
  const [register, { isLoading }] = useRegisterMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/playground"
  //console.log(location);

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [dob, setDob] = useState(new Date())

  async function handleRegisterSubmit(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): Promise<void> {
    event.preventDefault()

    try {
      const res = await register({
        firstName: firstName,
        lastName: lastName,
        dob: dob,
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
      <h3>Create Account</h3>
      <div className="mb-3">
        <label htmlFor="fullname-input" className="form-label">
          First Name
        </label>
        <input
          className="form-control"
          id="fullname-input"
          aria-describedby="emailHelp"
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="fullname-input" className="form-label">
          Last Name
        </label>
        <input
          className="form-control"
          id="fullname-input"
          aria-describedby="emailHelp"
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
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
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
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
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Date Of Birth
        </label>
        <input
          type="date"
          className="form-control"
          onChange={(e) => {
            setDob(new Date(e.target.value))
          }}
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
        <button className="btn btn-success" onClick={handleRegisterSubmit}>
          Submit
        </button>
      </div>
    </>
  )
}

export default RegisterForm
