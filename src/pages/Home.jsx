import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  const packages = [
    {
      name: 'Platinum',
      price: 15000,
      discount: 15,
      description: 'Premium experience with luxury accommodations',
      color: '#e8eaf6'
    },
    {
      name: 'Gold',
      price: 10000,
      discount: 10,
      description: 'Comfortable stay with great amenities',
      color: '#fff9c4'
    },
    {
      name: 'Silver',
      price: 5000,
      discount: 5,
      description: 'Budget-friendly option with essential features',
      color: '#f3e5f5'
    }
  ]

  const calculateFinalPrice = (price, discount) => {
    const discountedPrice = price - (price * discount / 100)
    return discountedPrice
  }

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">🎄 New Year & Christmas Celebration in Goa 🎉</h1>
        <p className="hero-subtitle">Book your perfect holiday package now!</p>
      </div>

      <div className="packages-section">
        <h2 className="section-title">Our Holiday Packages</h2>
        <div className="packages-grid">
          {packages.map((pkg) => {
            const finalPrice = calculateFinalPrice(pkg.price, pkg.discount)
            return (
              <div key={pkg.name} className="package-card" style={{ borderTopColor: pkg.color }}>
                <div className="package-header">
                  <h3 className="package-name">{pkg.name} Package</h3>
                  <span className="package-badge">{pkg.discount}% OFF</span>
                </div>
                <p className="package-description">{pkg.description}</p>
                <div className="package-pricing">
                  <div className="price-row">
                    <span className="price-label">Original Price:</span>
                    <span className="original-price">₹{pkg.price.toLocaleString()}</span>
                  </div>
                  <div className="price-row">
                    <span className="price-label">Discount:</span>
                    <span className="discount-amount">-{pkg.discount}%</span>
                  </div>
                  <div className="price-row final">
                    <span className="price-label">Final Price:</span>
                    <span className="final-price">₹{finalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="cta-section">
        <h2 className="cta-title">Ready to Book Your Trip?</h2>
        <div className="cta-buttons">
          <Link to="/enquire" className="cta-button enquire-btn">
            📧 Enquire Now
          </Link>
          <Link to="/booking" className="cta-button booking-btn">
            ✈️ Book Package
          </Link>
        </div>
      </div>

      <div className="voucher-section">
        <div className="voucher-card">
          <h3>🎁 Special New Year Voucher</h3>
          <p>Get an additional ₹1,000 OFF on your total booking price!</p>
          <p className="voucher-note">Available during checkout</p>
        </div>
      </div>
    </div>
  )
}

export default Home

