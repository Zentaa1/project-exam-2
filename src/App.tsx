import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import ContactUs from './pages/ContactUs'
import Header from './components/header/Header'
import AboutUs from './pages/AboutUs'
import Login from './pages/Login'
import Register from './pages/Register'
import RentOut from './pages/RentOut'
import VenuePage from './pages/VenuePage'
import Venues from './pages/Venues'
import Profile from './pages/Profile'
import Footer from './components/Footer'

function App() {
  return (
    <BrowserRouter>
      <div id="root" className="flex flex-col h-full">
        <Header />
        <div className="container flex-1">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/contact' element={<ContactUs />} />
            <Route path='/about' element={<AboutUs />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/rentout' element={<RentOut />} />
            <Route path='/venues' element={<Venues />} />
            <Route path='/venues/:venueId' element={<VenuePage />} />
            <Route path='/profile/:username' element={<Profile />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
