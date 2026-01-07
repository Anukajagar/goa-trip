import React, { useState, useEffect } from 'react'
import './Booking.css'

const API_URL = 'http://localhost:5000/api'

function Booking() {
  const [bookings, setBookings] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    package: '',
    persons: 1,
    newYearVoucher: false
  })
  const [errors, setErrors] = useState({})
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  // Fetch bookings from API
  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/bookings`)
      if (response.ok) {
        const data = await response.json()
        setBookings(data)
      }
    } catch (error) {
      console.error('Error fetching bookings:', error)
      setMessage('Error loading bookings. Please check if the server is running.')
    } finally {
      setLoading(false)
    }
  }

  const packageDetails = {
    platinum: { name: 'Platinum', price: 15000, discount: 15 },
    gold: { name: 'Gold', price: 10000, discount: 10 },
    silver: { name: 'Silver', price: 5000, discount: 5 }
  }

  const calculatePrice = () => {
    if (!formData.package) return { basePrice: 0, discount: 0, finalPrice: 0, voucherDiscount: 0, totalPrice: 0 }

    const pkg = packageDetails[formData.package]
    if (!pkg) return { basePrice: 0, discount: 0, finalPrice: 0, voucherDiscount: 0, totalPrice: 0 }

    const basePrice = pkg.price * formData.persons
    const discountAmount = (basePrice * pkg.discount) / 100
    const priceAfterDiscount = basePrice - discountAmount
    const voucherDiscount = formData.newYearVoucher ? 1000 : 0
    const totalPrice = Math.max(0, priceAfterDiscount - voucherDiscount)

    return {
      basePrice,
      discount: pkg.discount,
      discountAmount,
      priceAfterDiscount,
      voucherDiscount,
      totalPrice
    }
  }

  const priceDetails = calculatePrice()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (name === 'persons' ? parseInt(value) || 1 : value)
    }))
    
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

    if (formData.persons < 1 || formData.persons > 20) {
      newErrors.persons = 'Number of persons must be between 1 and 20'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    setMessage('')

    const booking = {
      ...formData,
      ...priceDetails,
      packageName: packageDetails[formData.package].name,
      bookingDate: new Date().toLocaleString()
    }

    try {
      let response
      if (editingId) {
        // Update existing booking
        response = await fetch(`${API_URL}/bookings/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(booking)
        })
      } else {
        // Create new booking
        response = await fetch(`${API_URL}/bookings`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(booking)
        })
      }

      if (response.ok) {
        setMessage(editingId ? 'Booking updated successfully!' : 'Booking created successfully!')
        setFormData({
          name: '',
          email: '',
          phone: '',
          package: '',
          persons: 1,
          newYearVoucher: false
        })
        setEditingId(null)
        fetchBookings()
        setTimeout(() => setMessage(''), 3000)
      } else {
        const error = await response.json()
        setMessage(error.error || 'Error saving booking')
      }
    } catch (error) {
      console.error('Error saving booking:', error)
      setMessage('Error connecting to server. Please check if the server is running.')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (booking) => {
    setFormData({
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      package: booking.package,
      persons: booking.persons,
      newYearVoucher: booking.newYearVoucher
    })
    setEditingId(booking._id)
    setMessage('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) {
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const response = await fetch(`${API_URL}/bookings/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setMessage('Booking deleted successfully!')
        if (editingId === id) {
          setEditingId(null)
          setFormData({
            name: '',
            email: '',
            phone: '',
            package: '',
            persons: 1,
            newYearVoucher: false
          })
        }
        fetchBookings()
        setTimeout(() => setMessage(''), 3000)
      } else {
        const error = await response.json()
        setMessage(error.error || 'Error deleting booking')
      }
    } catch (error) {
      console.error('Error deleting booking:', error)
      setMessage('Error connecting to server. Please check if the server is running.')
    } finally {
      setLoading(false)
    }
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setFormData({
      name: '',
      email: '',
      phone: '',
      package: '',
      persons: 1,
      newYearVoucher: false
    })
  }

  return (
    <div className="booking-container">
      <div className="booking-header">
        <h1 className="booking-title">✈️ Book Your Holiday Package</h1>
        <p className="booking-subtitle">Fill out the form below to book your dream vacation</p>
      </div>

      {message && (
        <div className={`message ${message.includes('Error') ? 'error-message' : 'success-message'}`}>
          {message}
        </div>
      )}

      <div className="booking-content">
        <div className="booking-form-section">
          <div className="form-card">
            <h2 className="form-card-title">
              {editingId ? '✏️ Edit Booking' : '📝 Booking Form'}
            </h2>
            
            <form onSubmit={handleSubmit} className="booking-form">
              <div className="form-row">
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
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? 'input-error' : ''}
                    placeholder="10-digit phone number"
                    maxLength="10"
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="package">Package *</label>
                  <select
                    id="package"
                    name="package"
                    value={formData.package}
                    onChange={handleChange}
                    className={errors.package ? 'input-error' : ''}
                  >
                    <option value="">Select a package</option>
                    <option value="platinum">Platinum (₹15,000 - 15% OFF)</option>
                    <option value="gold">Gold (₹10,000 - 10% OFF)</option>
                    <option value="silver">Silver (₹5,000 - 5% OFF)</option>
                  </select>
                  {errors.package && <span className="error-message">{errors.package}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="persons">Number of Persons *</label>
                  <input
                    type="number"
                    id="persons"
                    name="persons"
                    value={formData.persons}
                    onChange={handleChange}
                    className={errors.persons ? 'input-error' : ''}
                    min="1"
                    max="20"
                  />
                  {errors.persons && <span className="error-message">{errors.persons}</span>}
                </div>

                <div className="form-group voucher-group">
                  <label htmlFor="newYearVoucher" className="voucher-label">
                    <input
                      type="checkbox"
                      id="newYearVoucher"
                      name="newYearVoucher"
                      checked={formData.newYearVoucher}
                      onChange={handleChange}
                    />
                    <span>🎁 Apply New Year Voucher (₹1,000 OFF)</span>
                  </label>
                </div>
              </div>

              {formData.package && (
                <div className="price-summary">
                  <h3 className="price-summary-title">Price Breakdown</h3>
                  <div className="price-details">
                    <div className="price-row">
                      <span>Base Price ({formData.persons} {formData.persons === 1 ? 'person' : 'persons'}):</span>
                      <span>₹{priceDetails.basePrice.toLocaleString()}</span>
                    </div>
                    <div className="price-row discount">
                      <span>Discount ({priceDetails.discount}%):</span>
                      <span>-₹{priceDetails.discountAmount.toLocaleString()}</span>
                    </div>
                    {formData.newYearVoucher && (
                      <div className="price-row voucher">
                        <span>New Year Voucher:</span>
                        <span>-₹{priceDetails.voucherDiscount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="price-row total">
                      <span>Total Price:</span>
                      <span>₹{priceDetails.totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="form-actions">
                {editingId && (
                  <button type="button" onClick={handleCancelEdit} className="cancel-button">
                    Cancel
                  </button>
                )}
                <button type="submit" className="submit-button" disabled={loading}>
                  {loading ? 'Processing...' : (editingId ? 'Update Booking' : 'Book Now')}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="bookings-list-section">
          <div className="bookings-card">
            <h2 className="bookings-title">📋 Your Bookings ({bookings.length})</h2>
            
            {loading && bookings.length === 0 ? (
              <div className="no-bookings">
                <p>Loading bookings...</p>
              </div>
            ) : bookings.length === 0 ? (
              <div className="no-bookings">
                <p>No bookings yet. Create your first booking above!</p>
              </div>
            ) : (
              <div className="bookings-list">
                {bookings.map(booking => (
                  <div key={booking._id} className="booking-item">
                    <div className="booking-item-header">
                      <h3 className="booking-item-name">{booking.name}</h3>
                      <span className="booking-package-badge">{booking.packageName}</span>
                    </div>
                    <div className="booking-item-details">
                      <p><strong>Email:</strong> {booking.email}</p>
                      <p><strong>Phone:</strong> {booking.phone}</p>
                      <p><strong>Persons:</strong> {booking.persons}</p>
                      <p><strong>Booking Date:</strong> {booking.bookingDate}</p>
                      {booking.newYearVoucher && (
                        <p className="voucher-applied">🎁 New Year Voucher Applied</p>
                      )}
                      <div className="booking-price">
                        <strong>Total Price: ₹{booking.totalPrice.toLocaleString()}</strong>
                      </div>
                    </div>
                    <div className="booking-item-actions">
                      <button 
                        onClick={() => handleEdit(booking)} 
                        className="edit-button"
                      >
                        ✏️ Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(booking._id)} 
                        className="delete-button"
                        disabled={loading}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Booking

