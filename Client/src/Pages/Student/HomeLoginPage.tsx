import React from 'react'
import Footer from '../../Components/User/Footer/Footer'
import FeaturedCard from '../../Components/User/Home/FeaturedCard'
import Home from '../../Components/User/Home/Home'
import HomeNavLogin from '../../Components/User/Header/HomeNavLogin'

function HomeLoginPage() {
  return (
    <>
    
      <HomeNavLogin />
      <Home />
      <FeaturedCard />
      <Footer /> 
    </>
  )
}

export default HomeLoginPage
