
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
function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/rentout' element={<RentOut />} />
        <Route path='/venues' element={<Venues />} />
        <Route path='/venues/:venueId' element={<VenuePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
