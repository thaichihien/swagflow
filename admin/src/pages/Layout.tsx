import React, { useEffect } from "react"
import Sidebar from "../partials/Sidebar"
import Footer from "../partials/Footer"
import Navbar from "../partials/Navbar"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { selectAuth, setProfile } from "../features/auth/authenticationSlice"
import { useProfileMutation } from "../features/auth/authenticationApiSlice"

type Props = {
}

function ProtectedLayout({  }: Props) {
  const user = useAppSelector(selectAuth)
  const dispatch = useAppDispatch()
  const [getProfile] = useProfileMutation()
  let location = useLocation()

  if (!user.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  useEffect(() => {
    if (user.token && !user.user) {
      getProfile()
        .unwrap()
        .then((res) => {
          //console.log(res)
          dispatch(setProfile(res))
        })
    }
  }, [])

  return (
    <>
      <div className="container-scroller">
        {/* <!-- partial:partials/_sidebar.html --> */}
        <Sidebar user={user.user} />
        {/* <!-- partial --> */}
        <div className="container-fluid page-body-wrapper">
          {/* <!-- partial:partials/_navbar.html --> */}
          <Navbar />
          {/* <!-- partial --> */}
          <div className="main-panel">
            <ToastContainer />
            <div className="content-wrapper">
             
              <Outlet />
            </div>
            {/* <!-- content-wrapper ends -->
          <!-- partial:partials/_footer.html --> */}
            <Footer />
            {/* <!-- partial --> */}
          </div>
          {/* <!-- main-panel ends --> */}
        </div>
        {/* <!-- page-body-wrapper ends --> */}
      </div>
    </>
  )
}

export default ProtectedLayout
