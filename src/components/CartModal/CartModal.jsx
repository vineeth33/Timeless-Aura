import React, { useState } from 'react'
import './CartModal.css'

export default function CartModal({ cart, removeFromCart, onClose }) {
  const [selectedWatch, setSelectedWatch] = useState(null)

  const handleWatchClick = (watch) => {
    setSelectedWatch(watch)
  }

  const handleCloseDetail = () => {
    setSelectedWatch(null)
  }

  return (
    <div className="cart-modal-overlay">
      <div className="cart-modal">
        <button className="close-btn" onClick={onClose} aria-label="Close cart">×</button>
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul className="cart-items">
              {cart.map((item, index) => (
                <li key={index} className="cart-item" onClick={() => handleWatchClick(item)}>
                  <img src={item.image} alt={`${item.brand} ${item.model}`} className="cart-item-image" />
                  <div className="cart-item-info">
                    <h3>{item.brand} {item.model}</h3>
                    <p>{item.description}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFromCart(index)
                    }}
                    className="remove-btn"
                    aria-label={`Remove ${item.brand} ${item.model} from cart`}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <button className="checkout-btn">Proceed to Checkout</button>
          </>
        )}
      </div>
      {selectedWatch && (
        <div className="watch-detail-modal">
          <div className="watch-detail-content">
            <button className="close-btn" onClick={handleCloseDetail} aria-label="Close details">×</button>
            <h2>{selectedWatch.brand} {selectedWatch.model}</h2>
            <img src={selectedWatch.image} alt={`${selectedWatch.brand} ${selectedWatch.model}`} className="watch-detail-image" />
            <p>{selectedWatch.detailedDescription}</p>
            <a href={selectedWatch.link} target="_blank" rel="noopener noreferrer" className="buy-link">Buy Now</a>
          </div>
        </div>
      )}
    </div>
  )
}