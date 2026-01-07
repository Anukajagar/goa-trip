import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Enquire from './pages/Enquire'
import Booking from './pages/Booking'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-container">
            <h1 className="nav-logo">🏖️ Goa Holidays</h1>
            <div className="nav-links">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/enquire" className="nav-link">Enquire</Link>
              <Link to="/booking" className="nav-link">Booking</Link>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/enquire" element={<Enquire />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

