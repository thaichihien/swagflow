import Footer from "./Footer"
import Header from "./Header"
import { Outlet } from "react-router-dom"
import { ToastContainer } from 'react-toastify'

function Layout() {
  return (
    <>
      <Header />
      <ToastContainer/>
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout
