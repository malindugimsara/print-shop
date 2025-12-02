import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './pages/loginPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home'
import AdminPage from './pages/AdminPage'

function App() {
  return (
    <>
    <BrowserRouter>
      <Toaster position="top-center" />

      <Routes path='/*'>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/*' element={<Home/>}/>
        <Route path="/admin/*" element={<AdminPage />} />
      </Routes>

    </BrowserRouter>
    </>
  )
}

export default App
