import './App.css'
import React from 'react'
import LandingPage from './pages/LandingPage'
import LawBotPage from './pages/LawBotPage'
import LanguageAssistantPage from './pages/LanguageAssistantPage'


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/Home" element={<LandingPage />} />
        <Route path="/LawBot" element={<LawBotPage />} />
        <Route path="/Language" element={<LanguageAssistantPage />} />
      </Routes>
    </Router>
  )
}

export default App
