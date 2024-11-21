import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import './LuxuryCarousel.css'

const images = [
  '/images/AP-royaloak.webp',
  '/images/patek.jpg',
  '/images/Rolex-submariner.webp',
  '/images/omega-speedmaster.webp',
]

const LuxuryCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    <div className="luxury-carousel">
      <AnimatePresence initial={false}>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Luxury Watch ${currentIndex + 1}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>
    </div>
  )
}

export default LuxuryCarousel