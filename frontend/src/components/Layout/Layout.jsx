import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Navbar from '../Navbar.jsx'

const Layout = () => {
  return (
    <>
    <Navbar />
    <Outlet />
    <ToastContainer />
    </>
  )
}

export default Layout