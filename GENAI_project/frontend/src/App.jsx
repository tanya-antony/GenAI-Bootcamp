import './App.css'
import React from 'react'
import LandingPage from './pages/LandingPage'
import LawBotPage from './pages/LawBotPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/Home" element={<LandingPage />} />
        <Route path="/LawBot" element={<LawBotPage />} />
      </Routes>
    </Router>
  )
}

export default App
