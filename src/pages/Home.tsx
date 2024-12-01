import { Helmet } from "react-helmet"
import EarnWithEase from "../components/Homepage/EarnWithEase"
import OurTravelingTips from "../components/Homepage/OurTravelingTips"
import PopularVenues from "../components/Homepage/PopularVenues"
import SearchComponent from "../components/SearchComponent"

const Home = () => {
  return (
    <>
    <Helmet>
      <title>Home - StayNest</title>
      <meta name="description" content="Welcome to staynest, the ultimate venue booking site"/>
    </Helmet>
      <SearchComponent />
      <PopularVenues />
      <OurTravelingTips />
      <EarnWithEase />
    </>
  )
}

export default Home