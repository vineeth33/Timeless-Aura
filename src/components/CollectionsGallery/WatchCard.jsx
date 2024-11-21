import React, { useState } from 'react';
import './WatchCard.css';

export default function WatchCard({ watch, onClick, onAddToCart }) {
  const [showAddedMessage, setShowAddedMessage] = useState(false)

  if (!watch) {
    return null;
  }

  const handleAddToCart = () => {
    onAddToCart(watch)
    setShowAddedMessage(true)
    setTimeout(() => setShowAddedMessage(false), 2000) // Hide message after 2 seconds
  }

  return (
    <div className="watch-card">
      <img 
        src={watch.image} 
        alt={`${watch.brand} ${watch.model}`} 
        className="watch-image" 
        onClick={onClick}
      />
      <div className="watch-info">
        <h3 className="watch-brand">{watch.brand || 'Unknown Brand'}</h3>
        <h4 className="watch-model">{watch.model || 'Unknown Model'}</h4>
        <p className="watch-description">{watch.description || 'No description available'}</p>
        <button 
          className="add-to-cart-btn" 
          onClick={handleAddToCart}
          aria-label={`Add ${watch.brand} ${watch.model} to cart`}
        >
          Add to Cart
        </button>
        {showAddedMessage && (
          <p className="added-to-cart-message">Added to cart!</p>
        )}
      </div>
    </div>
  )
}