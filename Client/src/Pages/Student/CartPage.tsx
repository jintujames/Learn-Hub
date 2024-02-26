import React from 'react'
import Cart from '../../Components/User/Courses/Cart'
import HomeNavLogin from '../../Components/User/Header/HomeNavLogin'
import NavbarLogin from '../../Components/User/Header/NavbarLogin'
import Footer from '../../Components/User/Footer/Footer'

function cartPage() {
  return (
    <div>
       <HomeNavLogin />
      <NavbarLogin />
      <Cart />
      <Footer /> 
    </div>
  )
}

export default cartPage
