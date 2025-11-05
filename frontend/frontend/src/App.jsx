import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './pages/loginPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Test from './pages/test'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes path='/*'>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/test' element={<Test/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
