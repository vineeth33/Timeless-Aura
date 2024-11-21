import React, { useEffect, useRef, useState } from 'react'
import './CollectionsGallery.css'
import WatchCard from './WatchCard'
import WatchDetail from './WatchDetail'

const watches = [
  {
    id: 1,
    brand: "Rolex",
    model: "Submariner",
    image: "/images/Rolex-submariner.webp",
    description: "Iconic diving watch known for its durability and elegance.",
    detailedDescription: "The Rolex Submariner is a classic diving watch that has become an icon of luxury and adventure. First introduced in 1953, it has been worn by explorers, athletes, and style icons alike. The Submariner features a unidirectional rotatable bezel, Chromalight display, and is water-resistant to 300 meters (1,000 feet).",
    link: "https://www.rolex.com/watches/submariner"
  },
  {
    id: 2,
    brand: "Omega",
    model: "Speedmaster",
    image: "/images/omega-speedmaster.webp",
    description: "The first watch worn on the moon, a true piece of history.",
    detailedDescription: "The Omega Speedmaster, often referred to as the 'Moonwatch', was the first watch worn on the moon during the Apollo 11 mission in 1969. This chronograph has been a part of all six lunar landings and continues to be flight-qualified by NASA for all manned space missions. It features a tachymeter scale and manual-winding movement.",
    link: "https://www.omegawatches.com/watches/speedmaster"
  },
  {
    id: 3,
    brand: "Patek Philippe",
    model: "Nautilus",
    image: "/images/patek.jpg",
    description: "Luxury sports watch with a distinctive porthole-shaped case.",
    detailedDescription: "The Patek Philippe Nautilus, designed by the legendary Gérald Genta, was introduced in 1976 and has since become one of the most sought-after luxury sports watches. Its distinctive porthole-shaped case, inspired by maritime portholes, houses some of the finest mechanical movements in the world. The Nautilus combines elegance with ruggedness, making it a versatile timepiece for any occasion.",
    link: "https://www.patek.com/en/collection/nautilus"
  },
  {
    id: 4,
    brand: "Audemars Piguet",
    model: "Royal Oak",
    image: "/images/AP-royaloak.webp",
    description: "Iconic luxury watch known for its octagonal bezel and integrated bracelet.",
    detailedDescription: "The Audemars Piguet Royal Oak, designed by Gérald Genta and introduced in 1972, revolutionized the luxury watch industry by pioneering the concept of the luxury sports watch. Its iconic octagonal bezel secured with visible screws, integrated bracelet, and 'Tapisserie' patterned dial have made it an enduring symbol of craftsmanship and innovation. The Royal Oak is celebrated for its unique blend of high-end aesthetics and robust performance, appealing to those who appreciate bold, timeless design.",
    link: "https://www.audemarspiguet.com/com/en/watch-collection/royal-oak.html"
  }
]

const CollectionsGallery = ({ addToCart, selectedWatch: propSelectedWatch }) => {
  const [selectedWatch, setSelectedWatch] = useState(null)
  const selectedWatchRef = useRef(null)

  useEffect(() => {
    if (propSelectedWatch) {
      setSelectedWatch(propSelectedWatch)
      if (selectedWatchRef.current) {
        selectedWatchRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }, [propSelectedWatch])

  const handleWatchClick = (watch) => {
    setSelectedWatch(watch)
  }

  const handleCloseDetail = () => {
    setSelectedWatch(null)
  }

  const handleAddToCart = (watch) => {
    addToCart(watch)
  }

  return (
    <section id="collections-gallery" className="collections-gallery">
      <h2 className="gallery-title">Our Exquisite Collection</h2>
      <div className="watch-grid">
        {watches.map((watch) => (
          <div
            key={watch.id}
            ref={watch.id === selectedWatch?.id ? selectedWatchRef : null}
          >
            <WatchCard
              watch={watch}
              onClick={() => handleWatchClick(watch)}
              onAddToCart={() => handleAddToCart(watch)}
            />
          </div>
        ))}
      </div>
      {selectedWatch && (
        <WatchDetail 
          watch={selectedWatch} 
          onClose={handleCloseDetail}
          addToCart={handleAddToCart}
        />
      )}
    </section>
  )
}

export default CollectionsGallery