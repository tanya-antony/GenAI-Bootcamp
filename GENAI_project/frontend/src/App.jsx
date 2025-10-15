import './App.css'
import React from 'react'
import LandingPage from './pages/LandingPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/Home" element={<LandingPage />} />
      </Routes>
    </Router>
  )
}

export default App
