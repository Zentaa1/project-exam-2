import EarnWithEase from "../components/Homepage/EarnWithEase"
import OurTravelingTips from "../components/Homepage/OurTravelingTips"
import PopularVenues from "../components/Homepage/PopularVenues"
import SearchComponent from "../components/SearchComponent"

const Home = () => {
  return (
    <>
      <SearchComponent />
      <PopularVenues />
      <OurTravelingTips />
      <EarnWithEase />
    </>
  )
}

export default Home