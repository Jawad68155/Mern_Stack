
import React from 'react'
import FetchUsers from './pages/FetchUsers'
import CreateUser from './pages/CreateUser'
import Uploader from './features/Uploader'
import ImgFetcher from './pages/ImgFetcher'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './features/Navbar'
import Footer from './features/Footer'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<FetchUsers />}></Route>
          <Route path="/add" element={<CreateUser />}></Route>
          <Route path="/upload" element={<Uploader />}></Route>
          <Route path="/images" element={<ImgFetcher />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
