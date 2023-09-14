import { Link } from "react-router-dom"
import { BsSearch, BsPersonFill, BsCart2 } from "react-icons/bs"
import { IoMdClose } from "react-icons/io"
import { useState } from "react"

function Header() {
  const [searching, setSearching] = useState(false)

  function switchToSearch(event: any): void {
    event.preventDefault()
    setSearching(!searching)
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
                      Dropdown
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="#">
                          Action
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Another action
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Something else here
                        </a>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Separated link
                        </a>
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
                  <div className="header-icon">
                    <BsPersonFill className="fs-4" />
                  </div>
                </li>
                <li>
                  <div className="header-icon">
                    <BsCart2 className="fs-4" />
                    <span className="badge badge-warning lblCartCount">15</span>
                  </div>
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
