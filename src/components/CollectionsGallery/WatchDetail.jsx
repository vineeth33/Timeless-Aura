import React from 'react'
import './WatchDetail.css'

const WatchDetail = ({ watch, onClose }) => {
  return (
    <div className="watch-detail-overlay">
      <div className="watch-detail">
        <button className="close-button" onClick={onClose}>&times;</button>
        <img src={watch.image} alt={`${watch.brand} ${watch.model}`} className="watch-detail-image" />
        <div className="watch-detail-info">
          <h2 className="watch-detail-brand">{watch.brand}</h2>
          <h3 className="watch-detail-model">{watch.model}</h3>
          <p className="watch-detail-description">{watch.detailedDescription}</p>
          <a href={watch.link} target="_blank" rel="noopener noreferrer" className="watch-detail-link">
            View on Official Website
          </a>
        </div>
      </div>
    </div>
  )
}

export default WatchDetail