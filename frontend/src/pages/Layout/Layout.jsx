import React from 'react'
import Navbar from '../../common/Navbar/Navbar'

import Footer from '../../common/Footer/Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </>
  )
}

export default Layout