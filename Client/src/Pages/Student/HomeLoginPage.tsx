import React from 'react'
import Footer from '../../Components/User/Footer/Footer'
import FeaturedCard from '../../Components/User/Home/FeaturedCard'
import Home from '../../Components/User/Home/Home'
import HomeNavLogin from '../../Components/User/Header/HomeNavLogin'
import Hero from '../../Components/User/Header/Hero'
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'

function HomeLoginPage() {

  const navigate = useNavigate()
  const { user } = useSelector( (state: any) =>state.user)

  if(!user) {
    navigate('/')
  }

  return (
    <>
      <HomeNavLogin />
      <Hero />
      <Home />
      <FeaturedCard />
      <Footer /> 
    </>
  )
}

export default HomeLoginPage
