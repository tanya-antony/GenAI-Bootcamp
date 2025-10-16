
import './App.css'
import React from 'react'
import LandingPage from './pages/LandingPage'
import LawBotPage from './pages/LawBotPage'
import Talk2Gov from './pages/Talk2GovPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


function App() {
  
  return (
    <Router>
      <Routes>

        <Route path="/" element={<LandingPage />} />
        <Route path="/LawBot" element={<LawBotPage />} />
        <Route path="/Talk2Gov" element={<Talk2Gov />} />

      </Routes>
    </Router>
  )
}

export default App;
