import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// User Pages
import Home from './pages/Home'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import SeatLayout from './pages/SeatLayout'
import MyBookings from './pages/MyBookings'
import Favorite from './pages/Favorite'

// Admin Pages
import Layout from './pages/admin/Layout'
import ListShows from './pages/admin/ListShows'
import AddShows from './pages/admin/AddShows'
import Dashboard from './pages/admin/Dashboard'
import ListBookings from './pages/admin/ListBookings'

const App = () => {
  const location = useLocation()
  
  // Checking if the current path starts with /admin
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <>
      <Toaster />
      
      {/* Hide Navbar and Footer on Admin pages */}
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* Public Client Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/movies/:id' element={<MovieDetails />} />
        <Route path='/movies/:id/:date' element={<SeatLayout />} />
        <Route path='/my-bookings' element={<MyBookings />} />
        <Route path='/favorite' element={<Favorite />} />

        {/* Admin Nested Routes */}
        <Route path='/admin' element={<Layout />}>
          <Route index element={<Dashboard />} /> 
          {/* Fixed the typo from AddShowsShows to AddShows */}
          <Route path="add-shows" element={<AddShows />} /> 
          <Route path="list-shows" element={<ListShows />} /> 
          <Route path="list-bookings" element={<ListBookings />} /> 
        </Route>
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  )
}

export default App