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
import { GoogleOAuthProvider } from '@react-oauth/google'


function App() {
  return (
    <>
    <GoogleOAuthProvider clientId="391195891094-gda44kflv0i1rlvh3doc9579ui100p19.apps.googleusercontent.com">
      <BrowserRouter>
        <Toaster position="top-center" />

        <Routes path='/*'>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/*' element={<Home/>}/>
          <Route path="/admin/*" element={<AdminPage />} />
        </Routes>

      </BrowserRouter>
    </GoogleOAuthProvider>
    </>
  )
}

export default App
