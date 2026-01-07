import React, { useState } from 'react'
import './Enquire.css'

const API_URL = 'http://localhost:5000/api'

function Enquire() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    package: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number'
    }

    if (!formData.package) {
      newErrors.package = 'Please select a package'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    setErrorMessage('')

    try {
      const response = await fetch(`${API_URL}/enquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          package: '',
          message: ''
        })
        setTimeout(() => {
          setSubmitted(false)
        }, 3000)
      } else {
        const error = await response.json()
        setErrorMessage(error.error || 'Error submitting enquiry. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting enquiry:', error)
      setErrorMessage('Error connecting to server. Please check if the server is running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="enquire-container">
      <div className="enquire-card">
        <h1 className="enquire-title">📧 Enquire About Our Packages</h1>
        <p className="enquire-subtitle">Fill out the form below and we'll get back to you soon!</p>

        {submitted && (
          <div className="success-message">
            ✅ Thank you for your enquiry! We'll contact you shortly.
          </div>
        )}

        {errorMessage && (
          <div className="error-message">
            ❌ {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="enquire-form">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'input-error' : ''}
              placeholder="Enter your full name"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
              placeholder="Enter your email"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? 'input-error' : ''}
              placeholder="Enter 10-digit phone number"
              maxLength="10"
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="package">Package Interest *</label>
            <select
              id="package"
              name="package"
              value={formData.package}
              onChange={handleChange}
              className={errors.package ? 'input-error' : ''}
            >
              <option value="">Select a package</option>
              <option value="platinum">Platinum Package (₹15,000 - 15% OFF)</option>
              <option value="gold">Gold Package (₹10,000 - 10% OFF)</option>
              <option value="silver">Silver Package (₹5,000 - 5% OFF)</option>
            </select>
            {errors.package && <span className="error-message">{errors.package}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={errors.message ? 'input-error' : ''}
              placeholder="Tell us about your requirements..."
              rows="5"
            />
            {errors.message && <span className="error-message">{errors.message}</span>}
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Sending...' : 'Send Enquiry'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Enquire

