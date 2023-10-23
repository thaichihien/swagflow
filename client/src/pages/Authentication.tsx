import React, { useState } from "react"
import { Link } from "react-router-dom"
import RegisterForm from "../components/RegisterForm"
import LoginForm from "../components/LoginForm"

type Props = {}

function Authentication({}: Props) {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabClick = (index: number) => {
    setActiveTab(index)
  }
  return (
    <>
      <div
        className={
          activeTab === 0
            ? "authentication-background login-background"
            : "authentication-background register-background"
        }
      >
        <div
          style={{
            margin: "0px auto",
            position: "relative",
            maxWidth: "200px",
            textAlign: "center",
          }}
        >
          <Link className="logo-font" to="/" style={{ fontSize: "2rem" }}>
            Swag<span>Flow</span>
          </Link>
        </div>

        <div className="forms">
          <ul className="tab-group">
            <li className={activeTab === 0 ? "tab active" : "tab"}>
              <a href="#signin" onClick={(e) => handleTabClick(0)}>
                Log In
              </a>
            </li>
            <li className={activeTab === 1 ? "tab active" : "tab"}>
              <a href="#signup" onClick={(e) => handleTabClick(1)}>
                Sign Up
              </a>
            </li>
          </ul>
          <form
            action="#"
            id="login"
            style={{ display: activeTab === 0 ? "block" : "none" }}
          >
            <LoginForm />
          </form>
          <form
            action="#"
            id="signup"
            style={{ display: activeTab === 1 ? "block" : "none" }}
          >
            <RegisterForm />
          </form>
        </div>
      </div>
    </>
  )
}

export default Authentication
