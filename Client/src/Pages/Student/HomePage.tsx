import React from "react"
import Footer from "../../Components/User/Footer/Footer"
import FeaturedCard from "../../Components/User/Home/FeaturedCard"
import Home from "../../Components/User/Home/Home"
import HomeNav from "../../Components/User/Header/HomeNav"

function HomePage() {
  return (
    <div>
      <HomeNav />
      <Home />
      <FeaturedCard />
      <Footer /> 
    </div>
  )
}

export default HomePage
