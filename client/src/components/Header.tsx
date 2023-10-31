import { Link } from "react-router-dom"
import { BsSearch, BsPersonFill, BsCart2 } from "react-icons/bs"
import { IoMdClose } from "react-icons/io"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
  logOut,
  selectCurrentToken,
  selectCurrentUser,
  setProfile,
} from "../features/auth/authenticationSlice"
import { useProfileMutation } from "../features/auth/authenticationApiSlice"
import { getCart, selectCart } from "../features/cart/cartSlice"

function Header() {
  const [searching, setSearching] = useState(false)
  const cartResponse = useAppSelector(selectCart)

  const token = useAppSelector(selectCurrentToken)
  const profile = useAppSelector(selectCurrentUser)
  console.log(`token : ${token}`)
  const dispatch = useAppDispatch()
  const [getProfile] = useProfileMutation()

  useEffect(() => {
    if (token && !profile) {
      // call "customer/profile"
      getProfile()
        .unwrap()
        .then((res) => {
          console.log(res)
          dispatch(setProfile(res))
        })
    }

    dispatch(getCart(token))
  }, [])

  function switchToSearch(event: any): void {
    event.preventDefault()
    setSearching(!searching)
  }

  function handleLogOut(): void {
    dispatch(logOut())
  }

  return (
    <header>
      <div className="header-background">
        <div className="container">
          <div className="row p-2">
            <div className="col d-flex justify-content-center align-items-center">
              <h2>
                <Link className="logo-font" to="/">
                  Swag<span>Flow</span>
                </Link>
              </h2>
            </div>
            <div className="col-8 d-flex  align-items-center">
              {searching ? (
                <div className="input-group search-wrapper">
                  <input
                    type="text"
                    className="form-control search-bar"
                    placeholder="Search for name, category,..."
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                  />
                  <button
                    className="search-btn btn"
                    type="button"
                    id="button-addon2"
                  >
                    Search
                  </button>
                </div>
              ) : (
                <ul className="nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="#">
                      About
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                      href="#"
                      role="button"
                      aria-expanded="false"
                    >
                      Top
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" to="/products/T-Shirts">
                          T-Shirts
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/products/Jackets">
                          Jackets
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/products/Hoodies">
                          Hoodies
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                      href="#"
                      role="button"
                      aria-expanded="false"
                    >
                      Bottoms
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" to="/products/Shorts">
                          Shorts
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/products/Sweatpants"
                        >
                          Sweatpants
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/products/Jeans">
                          Jeans
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/products/Baggies">
                          Baggies
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="#">
                      Contact
                    </Link>
                  </li>
                  <li></li>
                </ul>
              )}
            </div>
            <div className="col d-flex align-items-center justify-content-end">
              <ul className="mb-3 d-flex gap-4 customer">
                <li>
                  <div className="header-icon" onClick={switchToSearch}>
                    {searching ? (
                      <IoMdClose className="fs-3" />
                    ) : (
                      <BsSearch className="fs-4" />
                    )}
                  </div>
                </li>
                <li>
                  <div className="header-icon dropdown">
                    <BsPersonFill
                      className="fs-4 dropdown-toggle"
                      id="dropdownMenuLink"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    />
                    <ul
                      className="dropdown-menu account-menu"
                      aria-labelledby="dropdownMenuLink"
                    >
                      {token == null ? (
                        <>
                          <li>
                            <Link className="dropdown-item" to="/auth#signin">
                              Sign In
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/auth#signup">
                              Sign Up
                            </Link>
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <div className="dropdown-item">
                              Welcome, {profile?.firstName}
                            </div>
                          </li>
                          <li>
                            <div
                              className="dropdown-item"
                              onClick={handleLogOut}
                            >
                              Log out
                            </div>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </li>
                <li>
                  <Link className="header-icon" to="/cart">
                    <BsCart2 className="fs-4" />
                    <span className="badge badge-warning lblCartCount">{cartResponse.cart.totalQuantity}</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
