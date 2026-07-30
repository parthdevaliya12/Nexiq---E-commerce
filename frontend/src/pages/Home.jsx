import Hero from "@/components/Hero"
import Features from "./Features"
import Footer from "./Footer"
import DeveloperInfo from "@/components/DeveloperInfo"
import FeaturedProducts from "@/components/FeaturedProducts"

const Home = () => {
  return (
    <div className="bg-white">
      <Hero/>
      <FeaturedProducts />
      <Features/>
      <DeveloperInfo/>
      <Footer/>
    </div>
  )
}

export default Home
