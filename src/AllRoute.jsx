import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import ContactUs from './pages/ContactUs'
import Footer from './components/Footer'
import Services from './pages/Services'
import Header from './components/Header'
import AboutUs from './pages/AboutUs'

const AllRoute = () => { const location = useLocation();
  const hideHeader = location.pathname === "/";

  return (
    <>
    {!hideHeader && <Header />}
    <Routes>
        <Route path='/' element={<Home/>} ></Route>
        <Route path='/contactus' element={<ContactUs/>}></Route>
        <Route path='/ourservices' element={<Services/>}></Route>
        <Route path='/aboutus' element={<AboutUs/>}></Route>
    </Routes>
        <Footer/>
    </>
  )
}

export default AllRoute