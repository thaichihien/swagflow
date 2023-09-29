import React from 'react'
import Sidebar from '../partials/Sidebar'
import Footer from '../partials/Footer'
import Navbar from '../partials/Navbar'
import {Outlet} from "react-router-dom"

type Props = {}

function Layout({}: Props) {
  return (
    <>
    <div className="container-scroller">
      {/* <!-- partial:partials/_sidebar.html --> */}
      <Sidebar/>
      {/* <!-- partial --> */}
      <div className="container-fluid page-body-wrapper">
        {/* <!-- partial:partials/_navbar.html --> */}
            <Navbar/>
        {/* <!-- partial --> */}
        <div className="main-panel">
          <div className="content-wrapper">
            <Outlet/>
          </div>
          {/* <!-- content-wrapper ends -->
          <!-- partial:partials/_footer.html --> */}
          <Footer/>
          {/* <!-- partial --> */}
        </div>
        {/* <!-- main-panel ends --> */}
      </div>
      {/* <!-- page-body-wrapper ends --> */}
       </div>
    </>
  )
}

export default Layout